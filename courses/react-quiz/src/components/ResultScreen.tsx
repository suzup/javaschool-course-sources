import type { SubmissionResult, Question } from '../types';

interface ResultScreenProps {
  result: SubmissionResult;
  questions: Question[];
  onRestart: () => void;
}

export function ResultScreen({ result, questions, onRestart }: ResultScreenProps) {
  const scorePercent = Math.round((result.correctCount / result.totalQuestions) * 100);

  return (
    <section className="result-screen" aria-label="퀴즈 결과">
      <h2 className="result-screen__title">퀴즈 결과</h2>
      <p className="result-screen__score">
        {result.correctCount} / {result.totalQuestions} 정답 ({scorePercent}%)
      </p>

      <ul className="result-screen__list">
        {result.results.map((r) => {
          const question = questions.find((q) => q.id === r.questionId);
          const selectedChoice = question?.choices.find((c) => c.id === r.selectedChoiceId);
          const correctChoice = question?.choices.find((c) => c.id === r.correctChoiceId);

          return (
            <li
              key={r.questionId}
              className={`result-screen__item ${r.isCorrect ? 'result-screen__item--correct' : 'result-screen__item--wrong'}`}
            >
              <p className="result-screen__question-text">{question?.text}</p>
              <p className="result-screen__answer">
                내 답: {selectedChoice?.text ?? '미선택'}
                {!r.isCorrect && (
                  <span className="result-screen__correct"> (정답: {correctChoice?.text})</span>
                )}
              </p>
              <span className="result-screen__badge">
                {r.isCorrect ? '✓' : '✗'}
              </span>
            </li>
          );
        })}
      </ul>

      <button type="button" className="result-screen__restart" onClick={onRestart}>
        다시 풀기
      </button>
    </section>
  );
}
