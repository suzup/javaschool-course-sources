import { useEffect, useState } from 'react';
import { fetchQuestion, sendAnswer } from './api.js';
import { useSession } from './session-context.js';
import { loadingView, nextView } from './screen-state.js';
import { emptyScore, applyResult } from './score.js';
import QuizScreen from './QuizScreen.jsx';
import QuestionCard from './QuestionCard.jsx';
import AnswerForm from './AnswerForm.jsx';
import ResultMessage from './ResultMessage.jsx';
import ScoreBoard from './ScoreBoard.jsx';

const QUESTION_COUNT = 5;

function QuizBoard() {
    // 채점 결과를 기록 화면과 함께 보는 자리에 넣습니다.
    const { rememberAnswer } = useSession();
    const [questionId, setQuestionId] = useState(1);
    const [view, setView] = useState(() => loadingView(1));
    const [typed, setTyped] = useState('');
    const [result, setResult] = useState(null);
    const [submitting, setSubmitting] = useState(false);
    const [score, setScore] = useState(emptyScore);

    useEffect(() => {
        let cancelled = false;
        setView(loadingView(questionId));
        setTyped('');
        setResult(null);
        fetchQuestion(questionId).then((response) => {
            if (!cancelled) {
                setView(nextView(response));
            }
        });
        return () => {
            cancelled = true;
        };
    }, [questionId]);

    const submit = async (choiceId) => {
        setSubmitting(true);
        const response = await sendAnswer(questionId, choiceId);
        setSubmitting(false);
        if ('error' in response) {
            return;
        }
        setResult(response.data);
        setScore((previous) => applyResult(previous, response.data));
        rememberAnswer(String(questionId), response.data);
    };

    return (
        <>
            <QuizScreen view={view}>
                <QuestionCard question={view.question} />
                <AnswerForm
                    typed={typed}
                    onTypedChange={setTyped}
                    onSubmit={submit}
                    submitting={submitting}
                    locked={result !== null}
                />
                <ResultMessage result={result} />
            </QuizScreen>
            <ScoreBoard correctCount={score.correctCount} answeredCount={score.answeredCount} />
            <button type="button" onClick={() => setQuestionId((previous) => (previous % QUESTION_COUNT) + 1)}>
                다음 문제
            </button>
        </>
    );
}

export default QuizBoard;
