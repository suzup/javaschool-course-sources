// 주소에서 받은 번호로 문제를 가져왔을 때 화면이 어떤 상태가 되는지 확인합니다.
// 화면 조각을 만들지 않고 요청과 상태 계산만 실행합니다.
import { fetchQuestion } from '../src/api.js';
import { nextView } from '../src/screen-state.js';

const show = async (label, questionId) => {
    const response = await fetchQuestion(questionId);
    const view = nextView(response);
    console.log(`${label.padEnd(22)} status=${view.status.padEnd(7)} message=${view.message}`);
    if (view.question) {
        console.log(`${''.padEnd(22)} question=${view.question.question}`);
        console.log(`${''.padEnd(22)} choices=${view.question.choices.map((choice) => `${choice.id}.${choice.text}`).join(' ')}`);
    }
};

await show('/records/3', '3');
await show('/records/1', '1');
await show('/records/9', '9');
await show('/records/abc', 'abc');
