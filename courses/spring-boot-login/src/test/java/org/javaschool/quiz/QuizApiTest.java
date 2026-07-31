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
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.webmvc.test.autoconfigure.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.mock.web.MockHttpSession;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
// 브라우저가 사용하는 문제 조회, 정답 제출과 MySQL 통계 흐름을 테스트 DB에서 확인합니다.
class QuizApiTest {

    // 실제 브라우저 대신 Spring 요청을 보낼 도구입니다.
    @Autowired
    private MockMvc mockMvc;

    // 테스트에서 사용할 실제 문제 행을 찾기 위해 연결합니다.
    @Autowired
    private QuestionRepository questionRepository;

    // 각 테스트가 서로의 풀이 기록에 영향을 주지 않게 정리하기 위해 연결합니다.
    @Autowired
    private AnswerAttemptRepository answerAttemptRepository;

    // @BeforeEach가 붙은 메서드는 각 테스트 케이스를 시작하기 전에 한 번 실행됩니다.
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
        // 답 제출은 로그인한 사람만 할 수 있으므로 먼저 로그인해 세션을 받습니다.
        MockHttpSession session = loginSession();

        // 테스트 DB에 실제로 들어 있는 문제 id와 정답 번호로 정답 요청을 만듭니다.
        mockMvc.perform(post("/api/quiz/answers")
                        .session(session)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {"questionId":%d,"choiceId":%d}
                                """.formatted(question.getId(), question.getCorrectChoiceId())))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.questionId").value(question.getId()))
                .andExpect(jsonPath("$.data.correct").value(true))
                .andExpect(jsonPath("$.data.correctChoiceId").value(question.getCorrectChoiceId()))
                .andExpect(jsonPath("$.data.explanation").value(question.getExplanation()));

        // 같은 문제에 다른 번호를 보내 오답도 한 행으로 저장되는지 확인합니다.
        mockMvc.perform(post("/api/quiz/answers")
                        .session(session)
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
        MockHttpSession session = loginSession();

        mockMvc.perform(post("/api/quiz/answers")
                        .session(session)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {"questionId":%d,"choiceId":5}
                                """.formatted(question.getId())))
                .andExpect(status().isUnprocessableContent())
                .andExpect(jsonPath("$.error.code").value("INVALID_ANSWER"));

        mockMvc.perform(post("/api/quiz/answers")
                        .session(session)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {"questionId":999999,"choiceId":1}
                                """))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.error.code").value("QUESTION_NOT_FOUND"));

        mockMvc.perform(post("/api/quiz/answers")
                        .session(session)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {"questionId":"first","choiceId":1}
                                """))
                .andExpect(status().isUnprocessableContent())
                .andExpect(jsonPath("$.error.code").value("INVALID_ANSWER"));
    }

    // 답 제출은 로그인한 사람만 할 수 있으므로 가입과 로그인을 먼저 실행하고 세션을 돌려줍니다.
    private MockHttpSession loginSession() throws Exception {
        mockMvc.perform(post("/api/quiz/signup")
                .contentType(MediaType.APPLICATION_JSON)
                .content("""
                        {"name":"민수","password":"quiz-study-1"}
                        """));

        MvcResult result = mockMvc.perform(post("/api/quiz/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {"name":"민수","password":"quiz-study-1"}
                                """))
                .andExpect(status().isOk())
                .andReturn();

        return (MockHttpSession) result.getRequest().getSession(false);
    }

    // 초기 데이터에서 id가 가장 작은 문제를 테스트 대상으로 고릅니다.
    private Question firstQuestion() {
        return questionRepository.findAllByOrderByIdAsc().get(0);
    }

    // 실제 정답이 1번이면 2번을, 아니면 1번을 골라 항상 오답 번호를 만듭니다.
    private int wrongChoiceFor(Question question) {
        return question.getCorrectChoiceId() == 1 ? 2 : 1;
    }
}
