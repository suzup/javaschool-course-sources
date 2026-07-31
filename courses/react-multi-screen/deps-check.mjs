// React가 효과를 다시 실행할지 정하는 규칙만 그대로 적었습니다.
// 의존성 배열의 값을 이전 렌더의 값과 하나씩 비교해, 하나라도 다르면 다시 실행합니다.
import { fetchQuestion } from './src/api.js';

const shouldRun = (previous, next) =>
    previous === null || next.some((value, index) => !Object.is(value, previous[index]));

const run = async (label, makeDeps) => {
    let previous = null;
    let requestCount = 0;
    for (const questionId of [1, 2, 3]) {
        const deps = makeDeps(questionId);
        if (shouldRun(previous, deps)) {
            const result = await fetchQuestion(questionId);
            requestCount += 1;
            console.log(`  ${label} · 문제 ${questionId}번으로 바뀜 → 요청함 · 화면 문제 ${result.data.id}번`);
        } else {
            console.log(`  ${label} · 문제 ${questionId}번으로 바뀜 → 요청 안 함`);
        }
        previous = deps;
    }
    console.log(`  ${label} · 보낸 요청 ${requestCount}회`);
};

console.log('의존성 배열이 빈 배열일 때');
await run('[]         ', () => []);
console.log('의존성 배열에 문제 번호를 넣었을 때');
await run('[questionId]', (questionId) => [questionId]);
