package org.javaschool.quiz;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;

import org.javaschool.quiz.question.Question;
import org.junit.jupiter.api.Test;

// 3번 문제의 판정 결과, 정답 번호와 잘못된 문제 등록을 각각 확인합니다.
class QuestionRuleTest {

    private Question loopQuestion() {
        return Question.create(
                "같은 코드를 정해진 횟수만큼 반복할 때 알맞은 문장은 무엇일까요?",
                "if 문", "for 문", "switch 문", "return 문", 2,
                "for 문은 반복 횟수를 정해 같은 코드를 여러 번 실행할 때 사용합니다."
        );
    }

    @Test
    void keepsCorrectChoiceNumber() {
        assertEquals(2, loopQuestion().getCorrectChoiceId());
    }

    @Test
    void gradesChoiceTwoAsCorrectAndChoiceThreeAsWrong() {
        Question question = loopQuestion();

        assertTrue(question.isCorrect(2));
        assertFalse(question.isCorrect(3));
    }

    @Test
    void refusesChoiceNumberOutsideOneToFour() {
        IllegalArgumentException thrown = assertThrows(IllegalArgumentException.class, () -> Question.create(
                "정답 번호가 5인 문제를 만들 수 있을까요?",
                "예", "아니요", "모름", "건너뛰기", 5,
                "정답 번호는 선택지 개수를 넘을 수 없습니다."
        ));

        assertEquals("정답 번호는 1부터 4까지여야 합니다.", thrown.getMessage());
    }
}
