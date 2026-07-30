<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useQuiz } from '@/composables/useQuiz'
import QuestionCard from '@/components/QuestionCard.vue'
import ProgressBar from '@/components/ProgressBar.vue'

const router = useRouter()
const {
  quiz,
  loading,
  error,
  loadQuiz,
  currentIndex,
  currentQuestion,
  totalQuestions,
  isLastQuestion,
  answers,
  selectAnswer,
  nextQuestion,
} = useQuiz()

onMounted(() => {
  loadQuiz()
})

function handleSelect(choiceId: string) {
  if (currentQuestion.value) {
    selectAnswer(currentQuestion.value.id, choiceId)
  }
}

function handleNext() {
  if (isLastQuestion.value) {
    router.push({ name: 'result', query: { score: computeScore().toString(), total: totalQuestions.value.toString() } })
  } else {
    nextQuestion()
  }
}

function computeScore(): number {
  if (!quiz.value) return 0
  let correct = 0
  for (const question of quiz.value.questions) {
    if (answers.value.get(question.id) === question.correctChoiceId) {
      correct++
    }
  }
  return correct
}
</script>

<template>
  <div class="quiz-view">
    <div v-if="loading" class="loading">로딩 중...</div>
    <div v-else-if="error" class="error">{{ error }}</div>
    <template v-else-if="currentQuestion">
      <ProgressBar :current="currentIndex + 1" :total="totalQuestions" />
      <QuestionCard
        :question="currentQuestion"
        :selected-choice-id="answers.get(currentQuestion.id)"
        @select="handleSelect"
      />
      <div class="actions">
        <button
          class="btn btn-primary"
          :disabled="!answers.get(currentQuestion.id)"
          @click="handleNext"
        >
          {{ isLastQuestion ? '결과 보기' : '다음' }}
        </button>
      </div>
    </template>
  </div>
</template>

<style scoped>
.quiz-view {
  padding: 1rem 0;
}

.loading,
.error {
  text-align: center;
  padding: 2rem;
}

.error {
  color: #e53e3e;
}

.actions {
  display: flex;
  justify-content: flex-end;
  margin-top: 1.5rem;
}
</style>
