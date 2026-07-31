package org.javaschool.quiz;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.javaschool.quiz.answer.QuizStats;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.CsvSource;

// 누적 통계의 정답률이 가장 가까운 정수 퍼센트로 나오는지 확인합니다.
class QuizStatsTest {

    @ParameterizedTest
    @CsvSource({
            "2, 1, 50",
            "3, 2, 67",
            "8, 1, 13",
            "0, 0, 0"
    })
    void reportsNearestPercent(long answeredCount, long correctCount, int expectedRate) {
        assertEquals(expectedRate, QuizStats.of(answeredCount, correctCount).correctRate());
    }
}
