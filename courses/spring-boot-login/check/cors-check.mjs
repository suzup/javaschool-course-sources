import { newJar, call } from './http.mjs';

const SCREEN = 'http://localhost:5173';

const headerLine = (result, name) => `${name}: ${result.headers.get(name) ?? '(없음)'}`;

const preflight = await fetch('http://localhost:8081/api/quiz/answers', {
    method: 'OPTIONS',
    headers: {
        Origin: SCREEN,
        'Access-Control-Request-Method': 'POST',
        'Access-Control-Request-Headers': 'content-type'
    }
});
console.log('먼저 보내는 확인 요청  ', preflight.status);
for (const name of ['access-control-allow-origin', 'access-control-allow-credentials']) {
    console.log('  ' + `${name}: ${preflight.headers.get(name) ?? '(없음)'}`);
}

const jar = newJar();
await call(jar, 'POST', '/login', { body: { name: '민수', password: 'quiz-study-1' }, origin: SCREEN });
const withOrigin = await call(jar, 'GET', '/me', { origin: SCREEN });
console.log('화면 주소를 알리고 내 정보  ', withOrigin.status, withOrigin.text.slice(0, 60));
console.log('  ' + headerLine(withOrigin, 'access-control-allow-origin'));
console.log('  ' + headerLine(withOrigin, 'access-control-allow-credentials'));
