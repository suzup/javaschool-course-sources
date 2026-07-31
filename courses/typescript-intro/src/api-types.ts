// 공개 학습 API가 주는 값의 모양을 한곳에 적어 둡니다.
// 화면 코드와 요청 코드가 같은 정의를 가져다 쓰므로,
// 서버 응답의 모양이 바뀌면 두 곳에서 함께 오류가 납니다.

export interface Choice {
    id: number;
    text: string;
}

export interface QuizQuestion {
    id: number;
    question: string;
    choices: Choice[];
}

export interface AnswerResult {
    questionId: number;
    selectedChoiceId: number;
    correct: boolean;
    correctChoiceId: number;
    explanation: string;
}

export interface ApiError {
    code: string;
    message: string;
}

// 응답은 data가 있거나 error가 있습니다. 둘이 함께 오지는 않습니다.
// 이렇게 정의하면 'error' in result를 확인하기 전에는
// result.data를 읽을 수 없습니다.
export type ApiResult<T> = { data: T } | { error: ApiError };
