// 앞 과정 화면(app.js)의 상태 변수와 화면 조각 갱신을 그대로 옮겨, 브라우저 없이 순서대로 재생합니다.
const API_BASE_URL = 'http://localhost:8788/api/learning/v1/quiz';

const screen = {
    questionTitle: '문제를 불러오는 중...',
    questionMessage: '공개 API에 요청하는 중...',
    choiceList: [],
    answerInput: '',
    answerInputDisabled: false,
    answerButtonDisabled: false,
    answerMessage: '',
    scoreMessage: '현재 점수: 0 / 0'
};

let currentQuestion = null;
let nextQuestionId = 1;
let correctCount = 0;
let answeredCount = 0;
let questionCount = 5;

const renderQuestion = (question) => {
    currentQuestion = question;
    screen.questionTitle = question.question;
    screen.choiceList = question.choices.map((choice) => `${choice.id}. ${choice.text}`);
    screen.answerInput = '';
    screen.answerInputDisabled = false;
    screen.answerButtonDisabled = false;
    screen.answerMessage = '';
    screen.questionMessage = `${question.id}번 문제를 API에서 받았습니다.`;
};

const loadQuestion = async () => {
    screen.answerButtonDisabled = true;
    screen.questionMessage = '학습용 공개 API에 요청하는 중...';
    const response = await fetch(`${API_BASE_URL}/questions/${nextQuestionId}`);
    if (!response.ok) {
        currentQuestion = null;
        screen.choiceList = [];
        screen.questionTitle = '문제를 표시할 수 없습니다.';
        screen.questionMessage = (await response.json()).error.message;
        return;
    }
    const body = await response.json();
    renderQuestion(body.data);
    nextQuestionId = (body.data.id % questionCount) + 1;
};

const submitAnswer = async (typed) => {
    const choiceId = Number(typed);
    screen.answerInput = typed;
    screen.answerButtonDisabled = true;
    screen.answerMessage = '정답을 API에 보내는 중...';
    const response = await fetch(`${API_BASE_URL}/answers`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ questionId: currentQuestion.id, choiceId })
    });
    const result = (await response.json()).data;
    answeredCount += 1;
    if (result.correct) correctCount += 1;
    screen.answerMessage = result.correct
        ? `정답입니다. ${result.explanation}`
        : `오답입니다. 정답은 ${result.correctChoiceId}번입니다. ${result.explanation}`;
    screen.scoreMessage = `현재 점수: ${correctCount} / ${answeredCount}`;
    screen.answerInputDisabled = true;
};

const printScreen = (label) => {
    console.log(`[${label}]`);
    console.log(`  제목      : ${screen.questionTitle}`);
    console.log(`  안내       : ${screen.questionMessage}`);
    console.log(`  선택지     : ${screen.choiceList.length}줄`);
    console.log(`  해설       : ${screen.answerMessage || '(비어 있음)'}`);
    console.log(`  점수       : ${screen.scoreMessage}`);
    console.log(`  입력칸 잠김 : ${screen.answerInputDisabled}`);
};

nextQuestionId = 5;
await loadQuestion();
await submitAnswer('3');
printScreen('5번 문제를 풀고 난 화면');

questionCount = 8;
nextQuestionId = (5 % questionCount) + 1;
await loadQuestion();
printScreen('다음 문제를 눌러 6번을 요청한 뒤');
