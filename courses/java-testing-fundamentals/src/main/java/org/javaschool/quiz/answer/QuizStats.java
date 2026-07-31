package org.javaschool.quiz.answer;

// MySQL에 남은 전체 제출 수와 정답 수를 전달합니다.
public record QuizStats(long answeredCount, long correctCount, int correctRate) {

    public static QuizStats of(long answeredCount, long correctCount) {
        // 정수 나눗셈으로 소수점 아래를 버리지 않고, 가장 가까운 정수 퍼센트로 맞춥니다.
        int correctRate = answeredCount == 0 ? 0 : (int) Math.round(correctCount * 100.0 / answeredCount);
        return new QuizStats(answeredCount, correctCount, correctRate);
    }
}
