package org.javaschool.quiz;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.javaschool.quiz.answer.AnswerAttemptRepository;
import org.javaschool.quiz.member.StudyMemberRepository;
import org.javaschool.quiz.question.Question;
import org.javaschool.quiz.question.QuestionRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.webmvc.test.autoconfigure.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockHttpSession;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

import com.jayway.jsonpath.JsonPath;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
// 로그인한 사람만 제출하고 자기 기록만 볼 수 있다는 약속을 세션과 토큰 두 방식으로 확인합니다.
class LoginApiTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private QuestionRepository questionRepository;

    @Autowired
    private AnswerAttemptRepository answerAttemptRepository;

    @Autowired
    private StudyMemberRepository studyMemberRepository;

    // 각 확인이 서로의 기록과 회원에 영향을 주지 않게 정리합니다. 기록을 먼저 지워야 회원을 지울 수 있습니다.
    @BeforeEach
    void clearMembersAndAttempts() {
        answerAttemptRepository.deleteAll();
        studyMemberRepository.deleteAll();
    }

    @Test
    void rejectsSubmitWithoutLogin() throws Exception {
        Question question = firstQuestion();

        mockMvc.perform(post("/api/quiz/answers")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(body(question.getId(), question.getCorrectChoiceId())))
                .andExpect(status().isUnauthorized())
                .andExpect(jsonPath("$.error.code").value("LOGIN_REQUIRED"));

        mockMvc.perform(get("/api/quiz/me/stats"))
                .andExpect(status().isUnauthorized())
                .andExpect(jsonPath("$.error.code").value("LOGIN_REQUIRED"));

        assertThat(answerAttemptRepository.count()).isZero();
    }

    @Test
    void storesAttemptForLoggedInMemberWithSession() throws Exception {
        Question question = firstQuestion();
        MvcResult login = signupAndLogin("민수", "quiz-study-1");
        MockHttpSession session = (MockHttpSession) login.getRequest().getSession(false);

        mockMvc.perform(post("/api/quiz/answers")
                        .session(session)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(body(question.getId(), question.getCorrectChoiceId())))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.correct").value(true));

        mockMvc.perform(get("/api/quiz/me/stats").session(session))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.answeredCount").value(1))
                .andExpect(jsonPath("$.data.correctCount").value(1));
    }

    @Test
    void storesAttemptForLoggedInMemberWithToken() throws Exception {
        Question question = firstQuestion();
        String token = tokenOf(signupAndLogin("민수", "quiz-study-1"));

        mockMvc.perform(post("/api/quiz/answers")
                        .header("Authorization", "Bearer " + token)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(body(question.getId(), question.getCorrectChoiceId())))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.correct").value(true));

        mockMvc.perform(get("/api/quiz/me/stats").header("Authorization", "Bearer " + token))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.answeredCount").value(1));
    }

    @Test
    void rejectsForgedToken() throws Exception {
        String token = tokenOf(signupAndLogin("민수", "quiz-study-1"));
        String forged = token.substring(0, token.length() - 1) + (token.endsWith("A") ? "B" : "A");

        mockMvc.perform(get("/api/quiz/me").header("Authorization", "Bearer " + forged))
                .andExpect(status().isUnauthorized())
                .andExpect(jsonPath("$.error.code").value("LOGIN_REQUIRED"));
    }

    @Test
    void keepsRecordsSeparatePerMemberAndBlocksOthers() throws Exception {
        Question question = firstQuestion();

        MvcResult minsuLogin = signupAndLogin("민수", "quiz-study-1");
        String minsuToken = tokenOf(minsuLogin);
        long minsuId = memberIdOf(minsuLogin);

        MvcResult gaonLogin = signupAndLogin("가온", "quiz-study-2");
        String gaonToken = tokenOf(gaonLogin);
        long gaonId = memberIdOf(gaonLogin);

        submitWithToken(minsuToken, question.getId(), question.getCorrectChoiceId());
        submitWithToken(minsuToken, question.getId(), wrongChoiceFor(question));
        submitWithToken(gaonToken, question.getId(), wrongChoiceFor(question));

        mockMvc.perform(get("/api/quiz/me/stats").header("Authorization", "Bearer " + minsuToken))
                .andExpect(jsonPath("$.data.answeredCount").value(2))
                .andExpect(jsonPath("$.data.correctCount").value(1));

        mockMvc.perform(get("/api/quiz/me/stats").header("Authorization", "Bearer " + gaonToken))
                .andExpect(jsonPath("$.data.answeredCount").value(1))
                .andExpect(jsonPath("$.data.correctCount").value(0));

        // 자기 번호는 볼 수 있습니다.
        mockMvc.perform(get("/api/quiz/members/" + minsuId + "/stats")
                        .header("Authorization", "Bearer " + minsuToken))
                .andExpect(status().isOk());

        // 남의 번호는 로그인했더라도 막습니다.
        mockMvc.perform(get("/api/quiz/members/" + gaonId + "/stats")
                        .header("Authorization", "Bearer " + minsuToken))
                .andExpect(status().isForbidden())
                .andExpect(jsonPath("$.error.code").value("FORBIDDEN"))
                .andExpect(jsonPath("$.data").doesNotExist());
    }

    private void submitWithToken(String token, long questionId, int choiceId) throws Exception {
        mockMvc.perform(post("/api/quiz/answers")
                        .header("Authorization", "Bearer " + token)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(body(questionId, choiceId)))
                .andExpect(status().isOk());
    }

    private MvcResult signupAndLogin(String name, String password) throws Exception {
        String credentials = """
                {"name":"%s","password":"%s"}
                """.formatted(name, password);

        mockMvc.perform(post("/api/quiz/signup")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(credentials))
                .andExpect(status().isOk());

        return mockMvc.perform(post("/api/quiz/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(credentials))
                .andExpect(status().isOk())
                .andReturn();
    }

    // 로그인 응답 본문에서 토큰 글자를 꺼냅니다.
    private String tokenOf(MvcResult login) throws Exception {
        return JsonPath.read(login.getResponse().getContentAsString(), "$.data.token");
    }

    // 로그인 응답 본문에서 회원 번호를 꺼냅니다.
    private long memberIdOf(MvcResult login) throws Exception {
        int id = JsonPath.read(login.getResponse().getContentAsString(), "$.data.member.id");
        return id;
    }

    private String body(long questionId, int choiceId) {
        return """
                {"questionId":%d,"choiceId":%d}
                """.formatted(questionId, choiceId);
    }

    private Question firstQuestion() {
        return questionRepository.findAllByOrderByIdAsc().get(0);
    }

    private int wrongChoiceFor(Question question) {
        return question.getCorrectChoiceId() == 1 ? 2 : 1;
    }
}
