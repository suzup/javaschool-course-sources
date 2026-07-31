import type { ApiResult } from './api-types.js';

const API_BASE_URL = 'https://api.javaschool.org/api/learning/v1/quiz';

// 어떤 값을 받을지는 부르는 쪽이 정합니다.
// requestJson<QuizQuestion>과 requestJson<AnswerResult>가
// 서로 다른 결과 타입을 돌려줍니다.
export const requestJson = async <T>(path: string, init?: RequestInit): Promise<ApiResult<T>> => {
    const response = await fetch(`${API_BASE_URL}${path}`, init);
    return (await response.json()) as ApiResult<T>;
};

export const describeError = (code: string): string => {
    if (code === 'QUESTION_NOT_FOUND') {
        return '그 번호의 문제는 없습니다.';
    }
    return '요청을 처리하지 못했습니다.';
};
