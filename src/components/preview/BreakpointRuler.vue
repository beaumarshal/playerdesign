<script setup>
import { computed } from 'vue'
import { useBuilderStore } from '@/stores/builderStore'

const builderStore = useBuilderStore()

const emit = defineEmits(['set-breakpoint'])

const breakpoints = [
  { name: 'Mobile', width: 375, icon: 'fa-mobile-screen' },
  { name: 'SM', width: 640, icon: 'fa-mobile' },
  { name: 'MD', width: 768, icon: 'fa-tablet' },
  { name: 'LG', width: 1024, icon: 'fa-laptop' },
  { name: 'XL', width: 1200, icon: 'fa-desktop' },
]

const activeBreakpoint = computed(() => {
  const width = builderStore.previewWidth
  for (let i = breakpoints.length - 1; i >= 0; i--) {
    if (width >= breakpoints[i].width) {
      return breakpoints[i].name
    }
  }
  return 'Mobile'
})

const setBreakpoint = (width) => {
  emit('set-breakpoint', width)
}
</script>

<template>
  <div class="breakpoint-ruler">
    <button
      v-for="bp in breakpoints"
      :key="bp.name"
      class="breakpoint-btn"
      :class="{ 'is-active': activeBreakpoint === bp.name }"
      @click="setBreakpoint(bp.width)"
      :title="`${bp.name} (${bp.width}px)`"
    >
      <i :class="['fa-solid', bp.icon]"></i>
      <span class="breakpoint-label">{{ bp.name }}</span>
    </button>
  </div>
</template>

<style scoped>
.breakpoint-ruler {
  display: flex;
  gap: var(--ff-space-xs);
  margin-bottom: var(--ff-space-sm);
}

.breakpoint-btn {
  display: flex;
  align-items: center;
  gap: var(--ff-space-xs);
  padding: var(--ff-space-xs) var(--ff-space-sm);
  border: 1px solid var(--ff-border);
  border-radius: 4px;
  background: var(--ff-bg);
  color: var(--ff-muted);
  font-size: 0.75rem;
  cursor: pointer;
  transition: all 0.15s ease;
  font-family: inherit;
}

.breakpoint-btn:hover {
  border-color: var(--ff-accent);
  color: var(--ff-text);
}

.breakpoint-btn.is-active {
  background: var(--ff-accent);
  border-color: var(--ff-accent);
  color: white;
}

.breakpoint-btn i {
  font-size: 0.875rem;
}

.breakpoint-label {
  font-weight: 500;
}
</style>
