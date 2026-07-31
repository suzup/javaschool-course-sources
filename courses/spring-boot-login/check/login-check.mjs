import { newJar, call, show } from './http.mjs';

const minsu = newJar();
const login = await call(minsu, 'POST', '/login', { body: { name: '민수', password: 'quiz-study-1' } });
show('로그인', login);
console.log('받은 쿠키 머리글'.padEnd(34), login.setCookie);

show('쿠키로 내 정보 보기', await call(minsu, 'GET', '/me'));
show('쿠키 없이 내 정보 보기', await call(newJar(), 'GET', '/me'));
show('비밀번호를 틀린 로그인', await call(newJar(), 'POST', '/login', { body: { name: '민수', password: 'wrong-password' } }));
show('없는 이름으로 로그인', await call(newJar(), 'POST', '/login', { body: { name: '없는사람', password: 'quiz-study-1' } }));
