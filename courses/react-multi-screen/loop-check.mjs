// React가 "상태가 이전과 다른 값이면 다시 렌더한다"고 판단하는 규칙만 그대로 적어,
// 렌더 안에서 바로 요청을 보내면 몇 번 요청이 나가는지 셉니다. 10번째 렌더에서 일부러 멈춥니다.
import { fetchQuestion } from './src/api.js';

let renderCount = 0;
let requestCount = 0;
let question = null;

const render = async () => {
    renderCount += 1;
    requestCount += 1;
    const result = await fetchQuestion(1);
    const next = result.data;
    const changed = !Object.is(question, next);
    question = next;
    console.log(`렌더 ${renderCount}회 · 요청 ${requestCount}회 · 이전 상태와 다른 값인가: ${changed}`);
    if (changed && renderCount < 10) {
        await render();
    }
};

await render();
console.log(`멈춘 시점: 렌더 ${renderCount}회, 요청 ${requestCount}회`);

const first = await fetchQuestion(1);
const second = await fetchQuestion(1);
console.log(`두 응답이 같은 객체인가: ${Object.is(first.data, second.data)}`);
console.log(`두 응답의 내용이 같은가: ${JSON.stringify(first.data) === JSON.stringify(second.data)}`);
