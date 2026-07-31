import { newJar, call, show } from './http.mjs';
import { readFileSync, writeFileSync } from 'node:fs';

const jar = newJar();
await call(jar, 'POST', '/login', { body: { name: '민수', password: 'quiz-study-1' } });
show('재시작 전 쿠키로', await call(jar, 'GET', '/me'));
show('재시작 전 토큰으로', await call(jar, 'GET', '/me', { useToken: true }));
writeFileSync('/tmp/login-jar.json', JSON.stringify(jar));
