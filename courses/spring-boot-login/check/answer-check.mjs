import { newJar, call, show } from './http.mjs';

const login = async (name, password) => {
    const jar = newJar();
    await call(jar, 'POST', '/login', { body: { name, password } });
    return jar;
};

const minsu = await login('민수', 'quiz-study-1');
const gaon = await login('가온', 'quiz-study-2');

show('민수 1번에 2 제출', await call(minsu, 'POST', '/answers', { body: { questionId: 1, choiceId: 2 } }));
show('민수 2번에 1 제출', await call(minsu, 'POST', '/answers', { body: { questionId: 2, choiceId: 1 } }));
show('가온 1번에 1 제출', await call(gaon, 'POST', '/answers', { body: { questionId: 1, choiceId: 1 } }));
show('로그인 없이 제출', await call(newJar(), 'POST', '/answers', { body: { questionId: 1, choiceId: 2 } }));
