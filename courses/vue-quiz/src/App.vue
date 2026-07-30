<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="app">
    <header class="app-header">
      <nav>
        <RouterLink to="/">홈</RouterLink>
      </nav>
      <h1>Vue Quiz</h1>
    </header>
    <main class="app-main">
      <RouterView />
    </main>
  </div>
</template>

<style scoped>
.app-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem 2rem;
  background: #42b883;
  color: #fff;
}

.app-header nav a {
  color: #fff;
  text-decoration: none;
  font-weight: 600;
}

.app-header h1 {
  margin: 0;
  font-size: 1.25rem;
}

.app-main {
  max-width: 640px;
  margin: 2rem auto;
  padding: 0 1rem;
}
</style>
