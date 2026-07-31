const API_BASE_URL = import.meta.env?.VITE_API_BASE_URL ?? 'http://localhost:8788/api/learning/v1/quiz';

const readBody = async (response) => {
    const body = await response.json();
    return response.ok ? { data: body.data } : { error: body.error };
};

export const fetchQuestion = async (questionId) => {
    const response = await fetch(`${API_BASE_URL}/questions/${questionId}`);
    return readBody(response);
};

export const sendAnswer = async (questionId, choiceId) => {
    const response = await fetch(`${API_BASE_URL}/answers`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ questionId, choiceId })
    });
    return readBody(response);
};
