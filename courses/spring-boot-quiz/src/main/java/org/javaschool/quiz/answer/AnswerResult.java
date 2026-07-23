package org.javaschool.quiz.answer;

import org.javaschool.quiz.question.Question;

// 정답 제출 뒤 화면에 공개할 판정 결과를 전달합니다.
public record AnswerResult(
        Long questionId,
        int selectedChoiceId,
        boolean correct,
        int correctChoiceId,
        String explanation
) {
    public static AnswerResult from(Question question, AnswerAttempt attempt, int selectedChoiceId) {
        return new AnswerResult(
                question.getId(),
                selectedChoiceId,
                attempt.isCorrect(),
                question.getCorrectChoiceId(),
                question.getExplanation()
        );
    }
}
