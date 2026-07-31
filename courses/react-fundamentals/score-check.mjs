// 실제 API에 다섯 문제를 제출해 점수 상태가 어떻게 바뀌는지 확인하고,
// 이전 점수를 그대로 붙잡고 두 번 더할 때와 갱신 함수로 더할 때를 비교합니다.
import { sendAnswer } from './src/api.js';
import { emptyScore, applyResult } from './src/score.js';

let score = emptyScore;
for (const questionId of [1, 2, 3, 4, 5]) {
    const result = await sendAnswer(questionId, 3);
    score = applyResult(score, result.data);
    console.log(`${questionId}번 3번 선택 · 정답 여부 ${result.data.correct} · 점수 ${score.correctCount} / ${score.answeredCount}`);
}

const twoCorrect = [{ correct: true }, { correct: true }];
const held = twoCorrect.reduce((_, result) => applyResult(emptyScore, result), emptyScore);
const chained = twoCorrect.reduce((previous, result) => applyResult(previous, result), emptyScore);
console.log(`이전 점수를 붙잡고 두 번: ${held.correctCount} / ${held.answeredCount}`);
console.log(`직전 점수를 이어받아 두 번: ${chained.correctCount} / ${chained.answeredCount}`);
