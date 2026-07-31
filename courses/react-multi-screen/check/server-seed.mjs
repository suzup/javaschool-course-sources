// 화면 실습에 필요한 서버 상태를 만든다. spring-boot-login 서버가 8080에서 떠 있어야 한다.
// 민수 씨가 1번을 맞히고 3번을 틀린 상태를 만들어 기록 화면의 예시를 고정한다.
const BASE = process.env.QUIZ_BASE_URL ?? 'http://localhost:8080/api/quiz';

const call = async (method, path, { body, cookie } = {}) => {
    const headers = {};
    if (body !== undefined) headers['Content-Type'] = 'application/json';
    if (cookie) headers.Cookie = cookie;
    const response = await fetch(`${BASE}${path}`, {
        method,
        headers,
        body: body === undefined ? undefined : JSON.stringify(body)
    });
    const text = await response.text();
    return { status: response.status, text, setCookie: response.headers.get('set-cookie') };
};

const show = (label, result) => console.log(`${label.padEnd(28)} ${result.status}  ${result.text.slice(0, 140)}`);

const signup = await call('POST', '/signup', { body: { name: '민수', password: 'quiz-study-1' } });
show('민수 가입', signup);

const login = await call('POST', '/login', { body: { name: '민수', password: 'quiz-study-1' } });
show('로그인', login);
const cookie = login.setCookie?.split(';')[0];
console.log('받은 쿠키'.padEnd(28), cookie);

show('1번에 2 제출', await call('POST', '/answers', { body: { questionId: 1, choiceId: 2 }, cookie }));
show('3번에 1 제출', await call('POST', '/answers', { body: { questionId: 3, choiceId: 1 }, cookie }));
show('내 기록', await call('GET', '/me/stats', { cookie }));
show('로그인 없이 내 기록', await call('GET', '/me/stats'));
