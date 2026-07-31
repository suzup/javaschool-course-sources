// 이번 접속에서 푼 문제의 결과를 문제 번호로 찾을 수 있게 모아 둡니다.
// 서버는 누적 개수만 돌려주므로 문제별 내 선택은 화면이 들고 있습니다.
export const emptyRecords = {};

export const addRecord = (records, questionId, result) => ({
    ...records,
    [questionId]: {
        questionId,
        selectedChoiceId: result.selectedChoiceId,
        correct: result.correct,
        correctChoiceId: result.correctChoiceId
    }
});

export const findRecord = (records, questionId) => records[questionId] ?? null;

export const recordSummary = (record) =>
    `${record.questionId}번 문제 ${record.correct ? '정답' : '오답'} · 정답 ${record.correctChoiceId}`;
