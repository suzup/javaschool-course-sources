import { ProgressBar } from './ProgressBar';

interface QuizHeaderProps {
  title: string;
  currentIndex: number;
  totalQuestions: number;
}

export function QuizHeader({ title, currentIndex, totalQuestions }: QuizHeaderProps) {
  return (
    <header className="quiz-header">
      <h1 className="quiz-header__title">{title}</h1>
      <p className="quiz-header__counter">
        문제 {currentIndex + 1} / {totalQuestions}
      </p>
      <ProgressBar current={currentIndex} total={totalQuestions} />
    </header>
  );
}
