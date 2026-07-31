// 로딩·오류·문제를 각각 따로 담아 두었을 때와 한 값으로 담았을 때를 같은 순서로 실행해 비교합니다.
import { fetchQuestion } from './src/api.js';
import { loadingView, nextView } from './src/screen-state.js';

const flags = { isLoading: false, errorMessage: '', question: null };

const loadWithFlags = async (questionId) => {
    flags.isLoading = true;
    const result = await fetchQuestion(questionId);
    if ('error' in result) {
        flags.errorMessage = result.error.message;
    } else {
        flags.question = result.data;
    }
    flags.isLoading = false;
};

const showFlags = (label) => {
    console.log(label, JSON.stringify({ ...flags, question: flags.question?.id ?? null }));
};

await loadWithFlags(5);
showFlags('따로 담기 · 5번 뒤');
await loadWithFlags(6);
showFlags('따로 담기 · 6번 뒤');

let view = loadingView(5);
const showView = (label) => {
    console.log(label, JSON.stringify({ status: view.status, message: view.message, question: view.question?.id ?? null }));
};

showView('한 값으로 · 시작   ');
view = nextView(await fetchQuestion(5));
showView('한 값으로 · 5번 뒤 ');
view = loadingView(6);
view = nextView(await fetchQuestion(6));
showView('한 값으로 · 6번 뒤 ');
