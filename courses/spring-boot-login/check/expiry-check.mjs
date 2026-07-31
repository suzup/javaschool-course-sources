import { newJar, call, show } from './http.mjs';

const jar = newJar();
await call(jar, 'POST', '/login', { body: { name: '민수', password: 'quiz-study-1' } });
show('발급 직후 토큰으로', await call(jar, 'GET', '/me', { useToken: true }));
console.log('6초 기다립니다.');
await new Promise((resolve) => setTimeout(resolve, 6000));
show('6초 뒤 같은 토큰으로', await call(jar, 'GET', '/me', { useToken: true }));
show('6초 뒤 같은 쿠키로', await call(jar, 'GET', '/me'));
