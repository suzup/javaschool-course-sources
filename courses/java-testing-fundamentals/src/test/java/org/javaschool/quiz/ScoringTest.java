package org.javaschool.quiz;

import static org.junit.jupiter.api.Assertions.assertTrue;

import org.javaschool.quiz.question.Question;
import org.junit.jupiter.api.Test;

// 3번 문제의 정답 번호 2를 보냈을 때 서버가 정답으로 판정하는지 확인합니다.
class ScoringTest {

    @Test
    void marksCorrectChoiceAsCorrect() {
        Question question = Question.create(
                "같은 코드를 정해진 횟수만큼 반복할 때 알맞은 문장은 무엇일까요?",
                "if 문", "for 문", "switch 문", "return 문", 2,
                "for 문은 반복 횟수를 정해 같은 코드를 여러 번 실행할 때 사용합니다."
        );

        assertTrue(question.isCorrect(2));
    }
}
