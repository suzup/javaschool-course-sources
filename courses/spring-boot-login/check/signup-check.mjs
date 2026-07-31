import { newJar, call, show } from './http.mjs';

const jar = newJar();
show('민수 가입', await call(jar, 'POST', '/signup', { body: { name: '민수', password: 'quiz-study-1' } }));
show('가온 가입', await call(jar, 'POST', '/signup', { body: { name: '가온', password: 'quiz-study-2' } }));
show('민수 이름으로 다시 가입', await call(jar, 'POST', '/signup', { body: { name: '민수', password: 'quiz-study-9' } }));
show('짧은 비밀번호로 가입', await call(jar, 'POST', '/signup', { body: { name: '하늘', password: 'short' } }));
show('이름 없이 가입', await call(jar, 'POST', '/signup', { body: { password: 'quiz-study-1' } }));
