import type { Choice } from '../types';

interface ChoiceListProps {
  choices: Choice[];
  selectedChoiceId: string | undefined;
  onSelect: (choiceId: string) => void;
}

export function ChoiceList({ choices, selectedChoiceId, onSelect }: ChoiceListProps) {
  return (
    <ul className="choice-list" role="listbox" aria-label="선택지 목록">
      {choices.map((choice) => {
        const isSelected = choice.id === selectedChoiceId;
        return (
          <li key={choice.id} role="option" aria-selected={isSelected}>
            <button
              type="button"
              className={`choice-list__item ${isSelected ? 'choice-list__item--selected' : ''}`}
              onClick={() => onSelect(choice.id)}
            >
              {choice.text}
            </button>
          </li>
        );
      })}
    </ul>
  );
}
