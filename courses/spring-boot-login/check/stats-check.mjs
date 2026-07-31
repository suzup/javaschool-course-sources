import { newJar, call, show } from './http.mjs';

const login = async (name, password) => {
    const jar = newJar();
    await call(jar, 'POST', '/login', { body: { name, password } });
    return jar;
};

const minsu = await login('민수', 'quiz-study-1');
const gaon = await login('가온', 'quiz-study-2');

show('민수의 내 기록', await call(minsu, 'GET', '/me/stats'));
show('가온의 내 기록', await call(gaon, 'GET', '/me/stats'));
show('전체 누적', await call(newJar(), 'GET', '/stats'));
show('민수가 자기 번호로 조회', await call(minsu, 'GET', '/members/1/stats'));
show('민수가 가온 번호로 조회', await call(minsu, 'GET', '/members/2/stats'));
show('로그인 없이 번호로 조회', await call(newJar(), 'GET', '/members/1/stats'));
