package org.javaschool.quiz.answer;

// MySQL에 남은 전체 제출 수와 정답 수를 전달합니다.
public record QuizStats(long answeredCount, long correctCount, int correctRate) {

    public static QuizStats of(long answeredCount, long correctCount) {
        int correctRate = answeredCount == 0 ? 0 : (int) (correctCount * 100 / answeredCount);
        return new QuizStats(answeredCount, correctCount, correctRate);
    }
}
