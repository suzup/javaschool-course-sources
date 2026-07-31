package org.javaschool.quiz;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;

import org.javaschool.quiz.question.Question;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.CsvSource;
import org.junit.jupiter.params.provider.ValueSource;

// 3번 문제의 선택지 네 개를 한 번씩 보내 판정 결과를 확인합니다.
class ChoiceGradingTest {

    private Question question;

    @BeforeEach
    void prepareLoopQuestion() {
        question = Question.create(
                "같은 코드를 정해진 횟수만큼 반복할 때 알맞은 문장은 무엇일까요?",
                "if 문", "for 문", "switch 문", "return 문", 2,
                "for 문은 반복 횟수를 정해 같은 코드를 여러 번 실행할 때 사용합니다."
        );
    }

    // 정답 번호 2를 뺀 나머지는 모두 오답이어야 합니다.
    @ParameterizedTest
    @ValueSource(ints = { 1, 3, 4 })
    void marksOtherChoicesWrong(int choiceId) {
        assertFalse(question.isCorrect(choiceId));
    }

    // 선택 번호와 그때 기대하는 판정을 한 줄에 짝지어 적습니다.
    @ParameterizedTest
    @CsvSource({
            "1, false",
            "2, true",
            "3, false",
            "4, false"
    })
    void gradesEveryChoice(int choiceId, boolean expected) {
        assertEquals(expected, question.isCorrect(choiceId));
    }
}
