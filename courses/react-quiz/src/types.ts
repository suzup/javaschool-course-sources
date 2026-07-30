export interface Choice {
  id: string;
  text: string;
}

export interface Question {
  id: string;
  text: string;
  choices: Choice[];
  correctChoiceId: string;
}

export interface Quiz {
  id: string;
  title: string;
  questions: Question[];
}

export interface AnswerRecord {
  questionId: string;
  selectedChoiceId: string;
}

export interface SubmissionResult {
  totalQuestions: number;
  correctCount: number;
  results: QuestionResult[];
}

export interface QuestionResult {
  questionId: string;
  selectedChoiceId: string;
  correctChoiceId: string;
  isCorrect: boolean;
}

export type QuizPhase = 'loading' | 'answering' | 'submitting' | 'result' | 'error';
