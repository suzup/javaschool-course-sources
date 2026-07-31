import { newJar, call } from './http.mjs';

const jar = newJar();
const login = await call(jar, 'POST', '/login', { body: { name: '민수', password: 'quiz-study-1' } });

console.log('로그인 응답 머리글의 쿠키   ', login.setCookie);
console.log('로그인 응답 본문의 토큰     ', JSON.parse(login.text).data.token.slice(0, 24) + '...');
console.log();
console.log('같은 주소를 두 방식으로 부를 때 보내는 머리글');
console.log('  세션 방식  Cookie: ' + jar.cookie);
console.log('  토큰 방식  Authorization: Bearer ' + jar.token.slice(0, 24) + '...');
console.log();
const withCookie = await call(jar, 'GET', '/me/stats');
const withToken = await call(jar, 'GET', '/me/stats', { useToken: true });
console.log('세션 방식 응답 ', withCookie.status, withCookie.text);
console.log('토큰 방식 응답 ', withToken.status, withToken.text);
console.log('두 응답이 같은가:', withCookie.text === withToken.text);
