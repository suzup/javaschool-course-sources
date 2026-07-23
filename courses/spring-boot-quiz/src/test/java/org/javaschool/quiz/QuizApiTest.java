package org.javaschool.quiz;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.javaschool.quiz.answer.AnswerAttemptRepository;
import org.javaschool.quiz.question.Question;
import org.javaschool.quiz.question.QuestionRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
// 브라우저가 사용하는 문제 조회, 정답 제출과 MySQL 통계 흐름을 검증합니다.
class QuizApiTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private QuestionRepository questionRepository;

    @Autowired
    private AnswerAttemptRepository answerAttemptRepository;

    @BeforeEach
    void clearAttempts() {
        answerAttemptRepository.deleteAll();
    }

    @Test
    void returnsQuestionsWithoutAnswers() throws Exception {
        Question firstQuestion = firstQuestion();

        mockMvc.perform(get("/api/quiz/questions"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.count").value(5))
                .andExpect(jsonPath("$.data.length()").value(5))
                .andExpect(jsonPath("$.data[0].correctChoiceId").doesNotExist())
                .andExpect(jsonPath("$.data[0].explanation").doesNotExist());

        mockMvc.perform(get("/api/quiz/questions/{id}", firstQuestion.getId()))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.id").value(firstQuestion.getId()))
                .andExpect(jsonPath("$.data.question").value(firstQuestion.getQuestionText()))
                .andExpect(jsonPath("$.data.choices.length()").value(4))
                .andExpect(jsonPath("$.data.correctChoiceId").doesNotExist());
    }

    @Test
    void gradesAndStoresAnswersThenReturnsStats() throws Exception {
        Question question = firstQuestion();

        mockMvc.perform(post("/api/quiz/answers")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {"questionId":%d,"choiceId":%d}
                                """.formatted(question.getId(), question.getCorrectChoiceId())))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.questionId").value(question.getId()))
                .andExpect(jsonPath("$.data.correct").value(true))
                .andExpect(jsonPath("$.data.correctChoiceId").value(question.getCorrectChoiceId()))
                .andExpect(jsonPath("$.data.explanation").value(question.getExplanation()));

        mockMvc.perform(post("/api/quiz/answers")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {"questionId":%d,"choiceId":%d}
                                """.formatted(question.getId(), wrongChoiceFor(question))))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.correct").value(false));

        mockMvc.perform(get("/api/quiz/stats"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.answeredCount").value(2))
                .andExpect(jsonPath("$.data.correctCount").value(1))
                .andExpect(jsonPath("$.data.correctRate").value(50));
    }

    @Test
    void rejectsInvalidOrMissingQuestions() throws Exception {
        Question question = firstQuestion();

        mockMvc.perform(post("/api/quiz/answers")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {"questionId":%d,"choiceId":5}
                                """.formatted(question.getId())))
                .andExpect(status().isUnprocessableEntity())
                .andExpect(jsonPath("$.error.code").value("INVALID_ANSWER"));

        mockMvc.perform(post("/api/quiz/answers")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {"questionId":999999,"choiceId":1}
                                """))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.error.code").value("QUESTION_NOT_FOUND"));

        mockMvc.perform(post("/api/quiz/answers")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {"questionId":"first","choiceId":1}
                                """))
                .andExpect(status().isUnprocessableEntity())
                .andExpect(jsonPath("$.error.code").value("INVALID_ANSWER"));
    }

    private Question firstQuestion() {
        return questionRepository.findAllByOrderByIdAsc().get(0);
    }

    private int wrongChoiceFor(Question question) {
        return question.getCorrectChoiceId() == 1 ? 2 : 1;
    }
}
