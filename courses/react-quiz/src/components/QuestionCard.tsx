import type { Question } from '../types';
import { ChoiceList } from './ChoiceList';

interface QuestionCardProps {
  question: Question;
  selectedChoiceId: string | undefined;
  onSelectChoice: (choiceId: string) => void;
}

export function QuestionCard({ question, selectedChoiceId, onSelectChoice }: QuestionCardProps) {
  return (
    <section className="question-card" aria-labelledby={`question-${question.id}`}>
      <h2 id={`question-${question.id}`} className="question-card__text">
        {question.text}
      </h2>
      <ChoiceList
        choices={question.choices}
        selectedChoiceId={selectedChoiceId}
        onSelect={onSelectChoice}
      />
    </section>
  );
}
