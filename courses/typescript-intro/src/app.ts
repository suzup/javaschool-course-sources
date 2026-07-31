import { describeError, requestJson } from './api-client.js';
import { requireElement } from './elements.js';
import type { AnswerResult, QuizQuestion } from './api-types.js';

// 요소마다 어떤 종류인지 함께 적습니다.
// 입력칸은 value를, 버튼은 disabled를 읽어야 하므로 종류가 달라야 합니다.
const quizForm = requireElement<HTMLFormElement>('#quiz-form');
const answerInput = requireElement<HTMLInputElement>('#answer-input');
const answerButton = requireElement<HTMLButtonElement>('#answer-button');
const reloadButton = requireElement<HTMLButtonElement>('#reload-button');
const questionTitle = requireElement<HTMLHeadingElement>('#question-title');
const questionMessage = requireElement<HTMLParagraphElement>('#question-message');
const answerMessage = requireElement<HTMLParagraphElement>('#answer-message');
const scoreMessage = requireElement<HTMLParagraphElement>('#score-message');
const choiceList = requireElement<HTMLOListElement>('#choice-list');

// 처음에는 받은 문제가 없습니다. null이 들어갈 수 있다고 적어 두면
// 확인 없이 currentQuestion.id를 읽는 코드가 검사에서 걸립니다.
let currentQuestion: QuizQuestion | null = null;
let nextQuestionId = 1;
let correctCount = 0;
let answeredCount = 0;

const formatAnswerMessage = (result: AnswerResult): string => {
    if (result.correct) {
        return `정답입니다. ${result.explanation}`;
    }
    return `오답입니다. 정답은 ${result.correctChoiceId}번입니다. ${result.explanation}`;
};

const renderQuestion = (question: QuizQuestion): void => {
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

const loadQuestion = async (): Promise<void> => {
    reloadButton.disabled = true;
    answerButton.disabled = true;
    questionMessage.textContent = '학습용 공개 API에 요청하는 중...';

    const result = await requestJson<QuizQuestion>(`/questions/${nextQuestionId}`);
    if ('error' in result) {
        currentQuestion = null;
        choiceList.replaceChildren();
        questionTitle.textContent = '문제를 표시할 수 없습니다.';
        questionMessage.textContent = describeError(result.error.code);
    } else {
        renderQuestion(result.data);
        nextQuestionId = (result.data.id % 5) + 1;
    }
    reloadButton.disabled = false;
};

const submitAnswer = async (event: SubmitEvent): Promise<void> => {
    event.preventDefault();
    const choiceId = Number(answerInput.value);
    answerMessage.textContent = '';

    if (currentQuestion === null || !Number.isInteger(choiceId) || choiceId < 1 || choiceId > 4) {
        answerMessage.textContent = '화면에 있는 1부터 4까지의 번호를 입력해 주세요.';
        answerInput.focus();
        return;
    }

    answerButton.disabled = true;
    answerMessage.textContent = '정답을 API에 보내는 중...';

    const result = await requestJson<AnswerResult>('/answers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ questionId: currentQuestion.id, choiceId })
    });

    if ('error' in result) {
        answerMessage.textContent = describeError(result.error.code);
        answerButton.disabled = false;
        return;
    }

    answeredCount += 1;
    if (result.data.correct) {
        correctCount += 1;
    }
    answerMessage.textContent = formatAnswerMessage(result.data);
    scoreMessage.textContent = `현재 점수: ${correctCount} / ${answeredCount}`;
    answerInput.disabled = true;
};

quizForm.addEventListener('submit', submitAnswer);
reloadButton.addEventListener('click', loadQuestion);
void loadQuestion();
