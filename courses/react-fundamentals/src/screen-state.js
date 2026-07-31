export const loadingView = (questionId) => ({
    status: 'loading',
    question: null,
    message: `${questionId}번 문제를 불러오는 중입니다.`
});

export const readyView = (question) => ({
    status: 'ready',
    question,
    message: `${question.id}번 문제입니다.`
});

export const failedView = (error) => ({
    status: 'error',
    question: null,
    message: error.message
});

export const nextView = (result) => ('error' in result ? failedView(result.error) : readyView(result.data));
