<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import ScoreDisplay from '@/components/ScoreDisplay.vue'

const route = useRoute()
const router = useRouter()

const score = Number(route.query.score ?? 0)
const total = Number(route.query.total ?? 10)

function goHome() {
  router.push({ name: 'home' })
}

function retry() {
  router.push({ name: 'quiz' })
}
</script>

<template>
  <div class="result-view">
    <h2>퀴즈 결과</h2>
    <ScoreDisplay :score="score" :total="total" />
    <div class="actions">
      <button class="btn" @click="goHome">홈으로</button>
      <button class="btn btn-primary" @click="retry">다시 풀기</button>
    </div>
  </div>
</template>

<style scoped>
.result-view {
  text-align: center;
  padding: 2rem 0;
}

.result-view h2 {
  margin-bottom: 1.5rem;
}

.actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-top: 2rem;
}
</style>
