// 로그인 성공과 실패를 실제 서버 응답으로 확인하고, 그 응답이 어떤 안내가 되는지 봅니다.
import { sendLogin } from '../src/api.js';
import { loginFeedback } from '../src/login-state.js';

const show = (label, response) => {
    console.log(`${label.padEnd(24)} ${JSON.stringify(response)}`);
    console.log(`${''.padEnd(24)} → ${JSON.stringify(loginFeedback(response))}`);
};

show('비밀번호를 틀렸을 때', await sendLogin('민수', 'wrong-password'));
show('없는 이름일 때', await sendLogin('없는사람', 'quiz-study-1'));
show('맞게 넣었을 때', await sendLogin('민수', 'quiz-study-1'));
