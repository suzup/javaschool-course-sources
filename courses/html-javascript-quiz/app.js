const API_BASE_URL = 'https://api.javaschool.org/api/learning/v1/quiz';

const quizForm = document.querySelector('#quiz-form');
const answerInput = document.querySelector('#answer-input');
const answerButton = document.querySelector('#answer-button');
const reloadButton = document.querySelector('#reload-button');
const questionTitle = document.querySelector('#question-title');
const questionMessage = document.querySelector('#question-message');
const answerMessage = document.querySelector('#answer-message');
const scoreMessage = document.querySelector('#score-message');
const choiceList = document.querySelector('#choice-list');

let currentQuestion = null;
let nextQuestionId = 1;
let correctCount = 0;
let answeredCount = 0;

const readErrorMessage = async (response, fallback) => {
    try {
        const body = await response.json();
        return body.error?.message || fallback;
    } catch {
        return fallback;
    }
};

const renderQuestion = (question) => {
    currentQuestion = question;
    questionTitle.textContent = question.question;
    choiceList.replaceChildren();

    for (const choice of question.choices) {
        const item = document.createElement('li');
        item.textContent = `${choice.id}. ${choice.text}`;
        choiceList.append(item);
    }

    answerInput.value = '';
    answerInput.disabled = false;
    answerButton.disabled = false;
    answerMessage.textContent = '';
    questionMessage.textContent = `${question.id}번 문제를 API에서 받았습니다.`;
};

const loadQuestion = async () => {
    reloadButton.disabled = true;
    answerButton.disabled = true;
    questionMessage.textContent = '학습용 공개 API에 요청하는 중...';

    try {
        const response = await fetch(`${API_BASE_URL}/questions/${nextQuestionId}`);
        if (!response.ok) {
            throw new Error(await readErrorMessage(response, '문제를 불러오지 못했습니다.'));
        }

        const body = await response.json();
        renderQuestion(body.data);
        nextQuestionId = body.data.id % 5 + 1;
    } catch (error) {
        currentQuestion = null;
        choiceList.replaceChildren();
        questionTitle.textContent = '문제를 표시할 수 없습니다.';
        questionMessage.textContent = error.message || '공개 API에 연결할 수 없습니다.';
    } finally {
        reloadButton.disabled = false;
    }
};

const submitAnswer = async (event) => {
    event.preventDefault();
    const choiceId = Number(answerInput.value);
    answerMessage.textContent = '';

    if (!currentQuestion || !Number.isInteger(choiceId) || choiceId < 1 || choiceId > 4) {
        answerMessage.textContent = '화면에 있는 1부터 4까지의 번호를 입력해 주세요.';
        answerInput.focus();
        return;
    }

    answerButton.disabled = true;
    answerMessage.textContent = '정답을 API에 보내는 중...';

    try {
        const response = await fetch(`${API_BASE_URL}/answers`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ questionId: currentQuestion.id, choiceId })
        });
        if (!response.ok) {
            throw new Error(await readErrorMessage(response, '정답을 확인하지 못했습니다.'));
        }

        const result = (await response.json()).data;
        answeredCount += 1;
        if (result.correct) correctCount += 1;

        answerMessage.textContent = result.correct
            ? `정답입니다. ${result.explanation}`
            : `오답입니다. 정답은 ${result.correctChoiceId}번입니다. ${result.explanation}`;
        scoreMessage.textContent = `현재 점수: ${correctCount} / ${answeredCount}`;
        answerInput.disabled = true;
    } catch (error) {
        answerMessage.textContent = error.message || '공개 API에 연결할 수 없습니다.';
        answerButton.disabled = false;
    }
};

quizForm.addEventListener('submit', submitAnswer);
reloadButton.addEventListener('click', loadQuestion);
loadQuestion();
