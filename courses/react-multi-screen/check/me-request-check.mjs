// 사용자 정보 요청이 몇 번 나가는지 셉니다.
// 브라우저 대신 확인 파일이 화면과 같은 요청 함수를 부릅니다.
// 브라우저가 자동으로 하는 쿠키 저장과 다시 보내기는 여기서 직접 합니다.
import { fetchMe, sendLogin } from '../src/api.js';

const 요청 = [];
let 쿠키 = null;
const 원래fetch = globalThis.fetch;
globalThis.fetch = async (url, options = {}) => {
    요청.push(String(url));
    const headers = { ...(options.headers ?? {}) };
    if (쿠키) headers.Cookie = 쿠키;
    const response = await 원래fetch(url, { ...options, headers });
    const 받은쿠키 = response.headers.get('set-cookie');
    if (받은쿠키) 쿠키 = 받은쿠키.split(';')[0];
    return response;
};

const me요청수 = () => 요청.filter((url) => url.endsWith('/me')).length;

await sendLogin('민수', 'quiz-study-1');

// 이전 구조: 퀴즈 화면과 기록 화면이 각각 자기 몫으로 사용자 정보를 묻는다.
요청.length = 0;
const [퀴즈화면이받은값, 기록화면이받은값] = await Promise.all([fetchMe(), fetchMe()]);
console.log('화면마다 따로 물을 때  /me 요청'.padEnd(36), me요청수() + '회');
console.log('  퀴즈 화면이 받은 값'.padEnd(36), JSON.stringify(퀴즈화면이받은값));
console.log('  기록 화면이 받은 값'.padEnd(36), JSON.stringify(기록화면이받은값));
console.log('  두 값이 같은 객체인가'.padEnd(36), 퀴즈화면이받은값 === 기록화면이받은값);

// 새 구조: 함께 보는 자리가 한 번 묻고 두 화면이 그 값을 읽는다.
요청.length = 0;
const 함께보는값 = await fetchMe();
console.log('함께 보는 자리에서 물을 때  /me 요청'.padEnd(36), me요청수() + '회');
console.log('  두 화면이 읽는 값'.padEnd(36), JSON.stringify(함께보는값));
console.log('  두 값이 같은 객체인가'.padEnd(36), 함께보는값 === 함께보는값);
