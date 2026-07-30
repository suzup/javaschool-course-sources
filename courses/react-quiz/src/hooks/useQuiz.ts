import { useState, useEffect, useCallback } from 'react';
import type { Quiz, AnswerRecord, SubmissionResult, QuizPhase } from '../types';
import { fetchQuiz, submitAnswers } from '../api';

interface UseQuizReturn {
  phase: QuizPhase;
  quiz: Quiz | null;
  currentIndex: number;
  answers: AnswerRecord[];
  result: SubmissionResult | null;
  errorMessage: string;
  selectAnswer: (questionId: string, choiceId: string) => void;
  goNext: () => void;
  goPrev: () => void;
  submit: () => void;
  restart: () => void;
}

export function useQuiz(): UseQuizReturn {
  const [phase, setPhase] = useState<QuizPhase>('loading');
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<AnswerRecord[]>([]);
  const [result, setResult] = useState<SubmissionResult | null>(null);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const data = await fetchQuiz();
        if (!cancelled) {
          setQuiz(data);
          setPhase('answering');
        }
      } catch (err) {
        if (!cancelled) {
          setErrorMessage(err instanceof Error ? err.message : '퀴즈를 불러오지 못했습니다.');
          setPhase('error');
        }
      }
    }

    void load();
    return () => { cancelled = true; };
  }, []);

  const selectAnswer = useCallback((questionId: string, choiceId: string) => {
    setAnswers((prev) => {
      const filtered = prev.filter((a) => a.questionId !== questionId);
      return [...filtered, { questionId, selectedChoiceId: choiceId }];
    });
  }, []);

  const goNext = useCallback(() => {
    if (quiz && currentIndex < quiz.questions.length - 1) {
      setCurrentIndex((i) => i + 1);
    }
  }, [quiz, currentIndex]);

  const goPrev = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex((i) => i - 1);
    }
  }, [currentIndex]);

  const submit = useCallback(async () => {
    setPhase('submitting');
    try {
      const submission = await submitAnswers(answers);
      setResult(submission);
      setPhase('result');
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : '답안 제출에 실패했습니다.');
      setPhase('error');
    }
  }, [answers]);

  const restart = useCallback(() => {
    setCurrentIndex(0);
    setAnswers([]);
    setResult(null);
    setPhase('answering');
  }, []);

  return {
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
  };
}
