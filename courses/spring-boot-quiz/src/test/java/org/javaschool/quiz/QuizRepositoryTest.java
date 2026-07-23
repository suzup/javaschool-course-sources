package org.javaschool.quiz;

import static org.assertj.core.api.Assertions.assertThat;

import org.javaschool.quiz.answer.AnswerAttempt;
import org.javaschool.quiz.answer.AnswerAttemptRepository;
import org.javaschool.quiz.question.Question;
import org.javaschool.quiz.question.QuestionRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.ActiveProfiles;

@DataJpaTest
@ActiveProfiles("test")
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
// JPA 저장소가 실제 MySQL에 한글 문제와 풀이 기록을 저장하는지 검증합니다.
class QuizRepositoryTest {

    @Autowired
    private QuestionRepository questionRepository;

    @Autowired
    private AnswerAttemptRepository answerAttemptRepository;

    @Test
    void storesKoreanQuestionAndAnswerAttemptInMySql() {
        Question question = questionRepository.saveAndFlush(Question.create(
                "한글 문제를 저장할 수 있을까요?",
                "예", "아니요", "모름", "건너뛰기", 1,
                "utf8mb4 문자 집합으로 한글을 저장합니다."
        ));

        AnswerAttempt attempt = answerAttemptRepository.saveAndFlush(AnswerAttempt.record(question, 1));

        assertThat(questionRepository.findById(question.getId()).orElseThrow().getQuestionText())
                .isEqualTo("한글 문제를 저장할 수 있을까요?");
        assertThat(attempt.isCorrect()).isTrue();
        assertThat(answerAttemptRepository.countByCorrectTrue()).isEqualTo(1);
    }
}
