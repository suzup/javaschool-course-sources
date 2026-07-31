// 로그인 뒤 쿠키를 저장해 다음 요청에 다시 보내며, 응답 머리글과 본문을 함께 확인합니다.
// 브라우저 없이 두 사람의 요청을 따로 만들기 위해 쿠키 저장 상자를 사람마다 따로 둡니다.
const BASE = process.env.QUIZ_BASE_URL ?? 'http://localhost:8080/api/quiz';

export const newJar = () => ({ cookie: null, token: null });

export const call = async (jar, method, path, { body, origin, useToken = false, extraHeaders = {} } = {}) => {
    const headers = { ...extraHeaders };
    if (body !== undefined) headers['Content-Type'] = 'application/json';
    if (origin) headers.Origin = origin;
    if (useToken && jar.token) headers.Authorization = `Bearer ${jar.token}`;
    if (!useToken && jar.cookie) headers.Cookie = jar.cookie;

    const response = await fetch(`${BASE}${path}`, {
        method,
        headers,
        body: body === undefined ? undefined : JSON.stringify(body)
    });

    const setCookie = response.headers.get('set-cookie');
    if (setCookie) jar.cookie = setCookie.split(';')[0];
    const text = await response.text();
    let parsed = null;
    try {
        parsed = JSON.parse(text);
    } catch {
        parsed = null;
    }
    if (parsed?.data?.token) jar.token = parsed.data.token;
    return { status: response.status, setCookie, text, body: parsed, headers: response.headers };
};

export const show = (label, result) => {
    console.log(`${label.padEnd(34)} ${result.status}  ${result.text.slice(0, 120)}`);
};
