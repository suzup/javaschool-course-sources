// 1강의 시작 상태를 그대로 재현합니다.
// 태윤 씨가 화면 세 개를 상태 값 하나로 전환했을 때 주소가 어떻게 되는지 확인합니다.
// 이 파일에는 주소를 바꾸는 코드가 한 줄도 없습니다. 앞 화면에도 없었습니다.
const 주소 = '/';

const 화면이름 = (view) => {
    if (view === 'login') return '로그인';
    if (view === 'records') return '내 기록';
    return '퀴즈';
};

// 브라우저를 새로 고치면 화면 코드가 처음부터 다시 실행되므로 상태 값도 초기값으로 돌아갑니다.
const 새로열기 = () => ({ view: 'quiz' });

const show = (label, state) =>
    console.log(`${label.padEnd(22)} 화면=${화면이름(state.view).padEnd(8)} 주소=${주소}`);

let state = 새로열기();
show('처음 열었을 때', state);

state = { view: 'records' };
show('내 기록을 눌렀을 때', state);

state = 새로열기();
show('새로 고쳤을 때', state);

const 받는사람 = 새로열기();
show('주소를 공유했을 때', 받는사람);
