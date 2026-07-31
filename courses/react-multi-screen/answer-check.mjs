// 채점 요청이 실제로 무엇을 돌려주는지 확인합니다.
const ANSWERS_URL = 'http://localhost:8788/api/learning/v1/quiz/answers';

const send = async (questionId, choiceId) => {
    const response = await fetch(ANSWERS_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ questionId, choiceId })
    });
    console.log(`${questionId}번에 ${choiceId}번 → ${response.status}`);
    console.log(JSON.stringify(await response.json()));
};

await send(1, 2);
await send(1, 1);
