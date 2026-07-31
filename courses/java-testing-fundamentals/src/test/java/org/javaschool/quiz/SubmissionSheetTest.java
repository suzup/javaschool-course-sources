package org.javaschool.quiz;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.util.ArrayList;
import java.util.List;

import org.javaschool.quiz.answer.AnswerAttempt;
import org.javaschool.quiz.question.Question;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

// 제출 한 건이 채점표에 한 행으로 남는지, 각 검사가 빈 채점표에서 시작하는지 확인합니다.
class SubmissionSheetTest {

    private List<AnswerAttempt> sheet;
    private Question question;

    @BeforeEach
    void prepareEmptySheet() {
        sheet = new ArrayList<>();
        question = Question.create(
                "같은 코드를 정해진 횟수만큼 반복할 때 알맞은 문장은 무엇일까요?",
                "if 문", "for 문", "switch 문", "return 문", 2,
                "for 문은 반복 횟수를 정해 같은 코드를 여러 번 실행할 때 사용합니다."
        );
        System.out.println("준비: 채점표 " + sheet.size() + "행");
    }

    @AfterEach
    void reportAndClearSheet() {
        System.out.println("정리: 채점표 " + sheet.size() + "행을 비웁니다");
        sheet.clear();
    }

    @Test
    void recordsOneCorrectSubmission() {
        sheet.add(AnswerAttempt.record(question, 2));

        assertEquals(1, sheet.size());
        assertTrue(sheet.get(0).isCorrect());
    }

    @Test
    void recordsOneWrongSubmission() {
        sheet.add(AnswerAttempt.record(question, 1));

        assertEquals(1, sheet.size());
    }
}
