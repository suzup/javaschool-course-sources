import { ref, computed } from 'vue'
import { fetchQuiz } from '@/api'
import { useFetch } from './useFetch'
import type { Quiz } from '@/types'

export function useQuiz() {
  const { data: quiz, error, loading, execute: loadQuiz } = useFetch<Quiz>(fetchQuiz)

  const currentIndex = ref(0)
  const answers = ref<Map<string, string>>(new Map())

  const currentQuestion = computed(() => {
    if (!quiz.value) return null
    return quiz.value.questions[currentIndex.value] ?? null
  })

  const totalQuestions = computed(() => quiz.value?.questions.length ?? 0)

  const isLastQuestion = computed(() => currentIndex.value >= totalQuestions.value - 1)

  const score = computed(() => {
    if (!quiz.value) return 0
    let correct = 0
    for (const question of quiz.value.questions) {
      if (answers.value.get(question.id) === question.correctChoiceId) {
        correct++
      }
    }
    return correct
  })

  function selectAnswer(questionId: string, choiceId: string) {
    answers.value.set(questionId, choiceId)
  }

  function nextQuestion() {
    if (!isLastQuestion.value) {
      currentIndex.value++
    }
  }

  function reset() {
    currentIndex.value = 0
    answers.value = new Map()
  }

  return {
    quiz,
    error,
    loading,
    loadQuiz,
    currentIndex,
    currentQuestion,
    totalQuestions,
    isLastQuestion,
    score,
    answers,
    selectAnswer,
    nextQuestion,
    reset,
  }
}
