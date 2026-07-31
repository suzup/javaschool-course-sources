// QuizBoard가 실제로 밟는 순서대로 상태만 따라가며, 5문제를 풀고 없는 번호까지 요청합니다.
import { fetchQuestion, sendAnswer } from './src/api.js';
import { loadingView, nextView } from './src/screen-state.js';
import { emptyScore, applyResult } from './src/score.js';

let view = loadingView(1);
let result = null;
let score = emptyScore;

const print = (label) => {
    console.log(`${label}
  화면 상태 : ${view.status}
  안내 문구 : ${view.message}
  문제 번호 : ${view.question?.id ?? '없음'}
  채점 해설 : ${result === null ? '없음' : result.explanation.slice(0, 20) + '...'}
  점수      : ${score.correctCount} / ${score.answeredCount}`);
};

const goTo = async (questionId) => {
    view = loadingView(questionId);
    result = null;
    view = nextView(await fetchQuestion(questionId));
};

const answer = async (choiceId) => {
    const response = await sendAnswer(view.question.id, choiceId);
    result = response.data;
    score = applyResult(score, response.data);
};

for (const questionId of [1, 2, 3, 4, 5]) {
    await goTo(questionId);
    await answer(3);
}
print('5번 문제까지 3번으로 답한 뒤');

await goTo(6);
print('없는 6번 문제를 요청한 뒤');
