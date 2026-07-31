import { call, show } from './http.mjs';
import { readFileSync } from 'node:fs';

const jar = JSON.parse(readFileSync('/tmp/login-jar.json', 'utf8'));
show('재시작 뒤 같은 쿠키로', await call(jar, 'GET', '/me'));
show('재시작 뒤 같은 토큰으로', await call(jar, 'GET', '/me', { useToken: true }));
