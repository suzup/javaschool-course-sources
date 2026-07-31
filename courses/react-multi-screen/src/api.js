const API_BASE_URL = import.meta.env?.VITE_API_BASE_URL ?? 'http://localhost:8080/api/quiz';

const readBody = async (response) => {
    const body = await response.json();
    if (response.ok) {
        return { data: body.data };
    }
    // 주소에 아무 값이나 올 수 있으므로, 우리 서버가 정한 모양이 아닌 실패 응답도 받습니다.
    const hasMessage = typeof body.error === 'object' && body.error !== null && body.error.message;
    return hasMessage
        ? { error: body.error }
        : { error: { code: 'REQUEST_FAILED', message: `요청이 실패했습니다. (${response.status})` } };
};

// 로그인 상태를 이어 가려면 다른 주소로 가는 요청에도 쿠키를 함께 보내야 합니다.
const withSession = (options = {}) => ({ credentials: 'include', ...options });

export const fetchQuestion = async (questionId) => {
    const response = await fetch(`${API_BASE_URL}/questions/${questionId}`, withSession());
    return readBody(response);
};

export const sendAnswer = async (questionId, choiceId) => {
    const response = await fetch(`${API_BASE_URL}/answers`, withSession({
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ questionId, choiceId })
    }));
    return readBody(response);
};

// 이름과 비밀번호를 보내고 로그인한 회원 정보를 받습니다.
export const sendLogin = async (name, password) => {
    const response = await fetch(`${API_BASE_URL}/login`, withSession({
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, password })
    }));
    return readBody(response);
};

export const sendLogout = async () => {
    const response = await fetch(`${API_BASE_URL}/logout`, withSession({ method: 'POST' }));
    return response.ok ? { data: null } : { error: { code: 'LOGOUT_FAILED', message: '로그아웃하지 못했습니다.' } };
};

// 지금 로그인한 사람이 누구인지 서버에 묻습니다. 쿠키가 없으면 401이 옵니다.
export const fetchMe = async () => {
    const response = await fetch(`${API_BASE_URL}/me`, withSession());
    return readBody(response);
};

export const fetchMyStats = async () => {
    const response = await fetch(`${API_BASE_URL}/me/stats`, withSession());
    return readBody(response);
};
