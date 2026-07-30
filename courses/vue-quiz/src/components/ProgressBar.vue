<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  current: number
  total: number
}>()

const percentage = computed(() => {
  if (props.total === 0) return 0
  return Math.round((props.current / props.total) * 100)
})
</script>

<template>
  <div class="progress-bar" role="progressbar" :aria-valuenow="percentage" aria-valuemin="0" aria-valuemax="100">
    <div class="progress-info">
      <span>{{ props.current }} / {{ props.total }}</span>
      <span>{{ percentage }}%</span>
    </div>
    <div class="progress-track">
      <div class="progress-fill" :style="{ width: `${percentage}%` }"></div>
    </div>
  </div>
</template>

<style scoped>
.progress-bar {
  margin-bottom: 1.5rem;
}

.progress-info {
  display: flex;
  justify-content: space-between;
  font-size: 0.85rem;
  color: #666;
  margin-bottom: 0.5rem;
}

.progress-track {
  height: 8px;
  background: #e2e8f0;
  border-radius: 4px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: #42b883;
  border-radius: 4px;
  transition: width 0.3s ease;
}
</style>
