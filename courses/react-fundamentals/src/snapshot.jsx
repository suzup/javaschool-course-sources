import { renderToStaticMarkup } from 'react-dom/server';
import { correctResult, wrongResult } from './sample-results.js';
import AnswerForm from './AnswerForm.jsx';
import ResultMessage from './ResultMessage.jsx';
import ScoreBoard from './ScoreBoard.jsx';

const belowQuestion = (typed, result, score) => (
    <>
        <AnswerForm typed={typed} onTypedChange={() => {}} onSubmit={() => {}} submitting={false} locked={result !== null} />
        <ResultMessage result={result} />
        <ScoreBoard correctCount={score.correctCount} answeredCount={score.answeredCount} />
    </>
);

const show = (label, element) => console.log(label, renderToStaticMarkup(element).replace(/<label.*?<\/label>/, ''));

show('보내기 전', belowQuestion('2', null, { correctCount: 0, answeredCount: 0 }));
show('정답 뒤  ', belowQuestion('2', correctResult, { correctCount: 1, answeredCount: 1 }));
show('오답 뒤  ', belowQuestion('1', wrongResult, { correctCount: 1, answeredCount: 2 }));
