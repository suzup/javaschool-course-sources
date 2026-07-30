<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  score: number
  total: number
}>()

const percentage = computed(() => {
  if (props.total === 0) return 0
  return Math.round((props.score / props.total) * 100)
})

const message = computed(() => {
  if (percentage.value >= 80) return '훌륭합니다! 🎉'
  if (percentage.value >= 60) return '좋은 결과입니다! 👍'
  return '다시 한번 도전해 보세요! 💪'
})
</script>

<template>
  <div class="score-display">
    <div class="score-circle">
      <span class="score-value">{{ props.score }}</span>
      <span class="score-divider">/</span>
      <span class="score-total">{{ props.total }}</span>
    </div>
    <p class="score-percentage">{{ percentage }}% 정답</p>
    <p class="score-message">{{ message }}</p>
  </div>
</template>

<style scoped>
.score-display {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
}

.score-circle {
  display: flex;
  align-items: baseline;
  gap: 0.25rem;
  padding: 1.5rem 2rem;
  border: 4px solid #42b883;
  border-radius: 50%;
  aspect-ratio: 1;
  justify-content: center;
}

.score-value {
  font-size: 2.5rem;
  font-weight: 700;
  color: #42b883;
}

.score-divider {
  font-size: 1.5rem;
  color: #999;
}

.score-total {
  font-size: 1.5rem;
  color: #666;
}

.score-percentage {
  font-size: 1.1rem;
  color: #333;
}

.score-message {
  font-size: 1.25rem;
  font-weight: 600;
}
</style>
