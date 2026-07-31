// 느린 응답과 빠른 응답이 겹칠 때, 정리 함수가 있을 때와 없을 때 화면에 남는 문제 번호를 비교합니다.
import { fetchQuestion } from './src/api.js';

const delayed = async (questionId, delayMs) => {
    const result = await fetchQuestion(questionId);
    await new Promise((resolve) => setTimeout(resolve, delayMs));
    return result;
};

let shownWithout = null;
const loadWithout = async (questionId, delayMs) => {
    const result = await delayed(questionId, delayMs);
    shownWithout = result.data;
    console.log(`  정리 없음 · ${questionId}번 응답 도착 → 화면 ${result.data.id}번`);
};

console.log('정리 함수 없이 1번(느림)과 2번(빠름)을 이어서 요청');
await Promise.all([loadWithout(1, 400), loadWithout(2, 0)]);
console.log(`  마지막에 화면에 남은 문제: ${shownWithout.id}번`);

let shownWith = null;
let cancelPrevious = () => {};
const loadWith = async (questionId, delayMs) => {
    let cancelled = false;
    cancelPrevious();
    cancelPrevious = () => {
        cancelled = true;
    };
    const result = await delayed(questionId, delayMs);
    if (cancelled) {
        console.log(`  정리 있음 · ${questionId}번 응답 도착했지만 버림`);
        return;
    }
    shownWith = result.data;
    console.log(`  정리 있음 · ${questionId}번 응답 도착 → 화면 ${result.data.id}번`);
};

console.log('정리 함수가 이전 요청을 버리게 한 뒤 같은 순서로 요청');
await Promise.all([loadWith(1, 400), loadWith(2, 0)]);
console.log(`  마지막에 화면에 남은 문제: ${shownWith.id}번`);
