<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

function startQuiz() {
  router.push({ name: 'quiz' })
}
</script>

<template>
  <div class="home">
    <h2>Vue.js 기초 퀴즈</h2>
    <p>Vue 3 Composition API에 대한 이해도를 테스트해 보세요.</p>
    <p>총 10문제, 선택형 퀴즈입니다.</p>
    <button class="btn btn-primary" @click="startQuiz">퀴즈 시작</button>
  </div>
</template>

<style scoped>
.home {
  text-align: center;
  padding: 2rem 0;
}

.home h2 {
  margin-bottom: 1rem;
}

.home p {
  color: #666;
  margin-bottom: 0.5rem;
}
</style>
