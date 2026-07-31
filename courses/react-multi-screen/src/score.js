export const emptyScore = { correctCount: 0, answeredCount: 0 };

export const applyResult = (score, result) => ({
    correctCount: score.correctCount + (result.correct ? 1 : 0),
    answeredCount: score.answeredCount + 1
});
