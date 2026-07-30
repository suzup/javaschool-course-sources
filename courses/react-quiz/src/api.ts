import type { Quiz, AnswerRecord, SubmissionResult, Question } from './types';

const MOCK_QUESTIONS: Question[] = [
  {
    id: 'q1',
    text: 'React에서 컴포넌트의 상태를 관리하는 훅은?',
    choices: [
      { id: 'q1c1', text: 'useEffect' },
      { id: 'q1c2', text: 'useState' },
      { id: 'q1c3', text: 'useRef' },
      { id: 'q1c4', text: 'useMemo' },
    ],
    correctChoiceId: 'q1c2',
  },
  {
    id: 'q2',
    text: 'JSX에서 JavaScript 표현식을 삽입할 때 사용하는 문법은?',
    choices: [
      { id: 'q2c1', text: '{{ }}' },
      { id: 'q2c2', text: '{ }' },
      { id: 'q2c3', text: '<% %>' },
      { id: 'q2c4', text: '${ }' },
    ],
    correctChoiceId: 'q2c2',
  },
  {
    id: 'q3',
    text: 'React 컴포넌트의 렌더링을 최적화할 때 사용하는 훅은?',
    choices: [
      { id: 'q3c1', text: 'useState' },
      { id: 'q3c2', text: 'useCallback' },
      { id: 'q3c3', text: 'useMemo' },
      { id: 'q3c4', text: 'useCallback과 useMemo 모두' },
    ],
    correctChoiceId: 'q3c4',
  },
  {
    id: 'q4',
    text: '컴포넌트가 마운트된 후 데이터를 가져올 때 사용하는 훅은?',
    choices: [
      { id: 'q4c1', text: 'useState' },
      { id: 'q4c2', text: 'useEffect' },
      { id: 'q4c3', text: 'useContext' },
      { id: 'q4c4', text: 'useReducer' },
    ],
    correctChoiceId: 'q4c2',
  },
  {
    id: 'q5',
    text: 'React에서 부모 컴포넌트가 자식에게 데이터를 전달하는 방식은?',
    choices: [
      { id: 'q5c1', text: 'state' },
      { id: 'q5c2', text: 'props' },
      { id: 'q5c3', text: 'context' },
      { id: 'q5c4', text: 'ref' },
    ],
    correctChoiceId: 'q5c2',
  },
  {
    id: 'q6',
    text: '리스트를 렌더링할 때 각 요소에 반드시 지정해야 하는 속성은?',
    choices: [
      { id: 'q6c1', text: 'id' },
      { id: 'q6c2', text: 'key' },
      { id: 'q6c3', text: 'index' },
      { id: 'q6c4', text: 'name' },
    ],
    correctChoiceId: 'q6c2',
  },
  {
    id: 'q7',
    text: 'React에서 이벤트 핸들러의 네이밍 컨벤션은?',
    choices: [
      { id: 'q7c1', text: 'onclick' },
      { id: 'q7c2', text: 'on-click' },
      { id: 'q7c3', text: 'onClick' },
      { id: 'q7c4', text: 'OnClick' },
    ],
    correctChoiceId: 'q7c3',
  },
  {
    id: 'q8',
    text: '조건부 렌더링에서 falsy 값을 반환하면 React는 어떻게 처리하는가?',
    choices: [
      { id: 'q8c1', text: '에러를 발생시킨다' },
      { id: 'q8c2', text: 'undefined를 렌더링한다' },
      { id: 'q8c3', text: '아무것도 렌더링하지 않는다' },
      { id: 'q8c4', text: '빈 문자열을 렌더링한다' },
    ],
    correctChoiceId: 'q8c3',
  },
  {
    id: 'q9',
    text: 'useEffect의 의존성 배열이 빈 배열([])이면 언제 실행되는가?',
    choices: [
      { id: 'q9c1', text: '매 렌더링마다' },
      { id: 'q9c2', text: '마운트 시 한 번만' },
      { id: 'q9c3', text: '언마운트 시' },
      { id: 'q9c4', text: '실행되지 않는다' },
    ],
    correctChoiceId: 'q9c2',
  },
  {
    id: 'q10',
    text: 'React 19에서 새로 도입된 기능은?',
    choices: [
      { id: 'q10c1', text: 'Server Components' },
      { id: 'q10c2', text: 'Hooks' },
      { id: 'q10c3', text: 'Context API' },
      { id: 'q10c4', text: 'Virtual DOM' },
    ],
    correctChoiceId: 'q10c1',
  },
];

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function fetchQuiz(): Promise<Quiz> {
  await delay(800);

  return {
    id: 'react-basics-quiz',
    title: 'React 기초 퀴즈',
    questions: MOCK_QUESTIONS,
  };
}

export async function submitAnswers(answers: AnswerRecord[]): Promise<SubmissionResult> {
  await delay(600);

  const results = answers.map((answer) => {
    const question = MOCK_QUESTIONS.find((q) => q.id === answer.questionId);
    const correctChoiceId = question?.correctChoiceId ?? '';
    return {
      questionId: answer.questionId,
      selectedChoiceId: answer.selectedChoiceId,
      correctChoiceId,
      isCorrect: answer.selectedChoiceId === correctChoiceId,
    };
  });

  const correctCount = results.filter((r) => r.isCorrect).length;

  return {
    totalQuestions: MOCK_QUESTIONS.length,
    correctCount,
    results,
  };
}
