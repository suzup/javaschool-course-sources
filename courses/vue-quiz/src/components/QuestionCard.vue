<script setup lang="ts">
import type { Question } from '@/types'

const props = defineProps<{
  question: Question
  selectedChoiceId?: string
}>()

const emit = defineEmits<{
  select: [choiceId: string]
}>()

function handleSelect(choiceId: string) {
  emit('select', choiceId)
}
</script>

<template>
  <div class="question-card">
    <h3 class="question-text">{{ props.question.text }}</h3>
    <ul class="choices">
      <li
        v-for="choice in props.question.choices"
        :key="choice.id"
        class="choice"
        :class="{ selected: choice.id === selectedChoiceId }"
      >
        <button class="choice-btn" @click="handleSelect(choice.id)">
          {{ choice.text }}
        </button>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.question-card {
  background: #fff;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 1.5rem;
}

.question-text {
  margin-bottom: 1.25rem;
  font-size: 1.1rem;
}

.choices {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.choice-btn {
  width: 100%;
  padding: 0.75rem 1rem;
  border: 2px solid #e2e8f0;
  border-radius: 6px;
  background: #fff;
  cursor: pointer;
  text-align: left;
  font-size: 0.95rem;
  transition: border-color 0.2s, background 0.2s;
}

.choice-btn:hover {
  border-color: #42b883;
}

.choice.selected .choice-btn {
  border-color: #42b883;
  background: #f0faf5;
}
</style>
