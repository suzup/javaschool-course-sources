import { useQuiz } from './hooks/useQuiz';
import { QuizHeader } from './components/QuizHeader';
import { QuestionCard } from './components/QuestionCard';
import { ResultScreen } from './components/ResultScreen';

export function App() {
  const {
    phase,
    quiz,
    currentIndex,
    answers,
    result,
    errorMessage,
    selectAnswer,
    goNext,
    goPrev,
    submit,
    restart,
  } = useQuiz();

  if (phase === 'loading') {
    return (
      <main className="app">
        <p className="app__loading">퀴즈를 불러오는 중...</p>
      </main>
    );
  }

  if (phase === 'error') {
    return (
      <main className="app">
        <p className="app__error" role="alert">{errorMessage}</p>
      </main>
    );
  }

  if (phase === 'submitting') {
    return (
      <main className="app">
        <p className="app__loading">답안을 제출하는 중...</p>
      </main>
    );
  }

  if (phase === 'result' && result && quiz) {
    return (
      <main className="app">
        <ResultScreen result={result} questions={quiz.questions} onRestart={restart} />
      </main>
    );
  }

  if (phase === 'answering' && quiz) {
    const currentQuestion = quiz.questions[currentIndex];
    if (!currentQuestion) return null;

    const currentAnswer = answers.find((a) => a.questionId === currentQuestion.id);
    const isLastQuestion = currentIndex === quiz.questions.length - 1;
    const allAnswered = answers.length === quiz.questions.length;

    return (
      <main className="app">
        <QuizHeader
          title={quiz.title}
          currentIndex={currentIndex}
          totalQuestions={quiz.questions.length}
        />
        <QuestionCard
          question={currentQuestion}
          selectedChoiceId={currentAnswer?.selectedChoiceId}
          onSelectChoice={(choiceId) => selectAnswer(currentQuestion.id, choiceId)}
        />
        <nav className="app__nav" aria-label="문제 탐색">
          <button
            type="button"
            className="app__nav-btn"
            onClick={goPrev}
            disabled={currentIndex === 0}
          >
            이전
          </button>
          {isLastQuestion ? (
            <button
              type="button"
              className="app__nav-btn app__nav-btn--submit"
              onClick={() => void submit()}
              disabled={!allAnswered}
            >
              제출
            </button>
          ) : (
            <button
              type="button"
              className="app__nav-btn"
              onClick={goNext}
            >
              다음
            </button>
          )}
        </nav>
      </main>
    );
  }

  return null;
}
