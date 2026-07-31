import { newJar, call, show } from './http.mjs';

const jar = newJar();
const login = await call(jar, 'POST', '/login', { body: { name: '민수', password: 'quiz-study-1' } });
console.log('로그인 응답'.padEnd(30), login.status, login.text.slice(0, 150));
console.log('받은 토큰'.padEnd(30), jar.token);

const tokenOnly = { cookie: null, token: jar.token };
show('토큰으로 내 정보', await call(tokenOnly, 'GET', '/me', { useToken: true }));
show('토큰으로 답 제출', await call(tokenOnly, 'POST', '/answers', { body: { questionId: 3, choiceId: 2 }, useToken: true }));
show('토큰으로 내 기록', await call(tokenOnly, 'GET', '/me/stats', { useToken: true }));

const broken = { cookie: null, token: jar.token.slice(0, -1) + (jar.token.endsWith('A') ? 'B' : 'A') };
show('글자 하나 바꾼 토큰', await call(broken, 'GET', '/me', { useToken: true }));
show('머리글도 쿠키도 없이', await call(newJar(), 'GET', '/me'));
show('Bearer 없이 토큰만', await call(newJar(), 'GET', '/me', { extraHeaders: { Authorization: jar.token } }));
