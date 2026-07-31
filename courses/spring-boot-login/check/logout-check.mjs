import { newJar, call, show } from './http.mjs';

const jar = newJar();
await call(jar, 'POST', '/login', { body: { name: '민수', password: 'quiz-study-1' } });
show('로그아웃 전 쿠키로 내 정보', await call(jar, 'GET', '/me'));
show('로그아웃', await call(jar, 'POST', '/logout'));
show('로그아웃 뒤 같은 쿠키로', await call(jar, 'GET', '/me'));
show('로그아웃 뒤 같은 토큰으로', await call(jar, 'GET', '/me', { useToken: true }));
