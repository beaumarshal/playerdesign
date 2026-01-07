<script setup>
import { computed } from 'vue'
import { useBuilderStore } from '@/stores/builderStore'

const props = defineProps({
  step: {
    type: Number,
    required: true
  },
  title: {
    type: String,
    required: true
  }
})

const builderStore = useBuilderStore()

const isCollapsed = computed(() => builderStore.isStepCollapsed(props.step))

const toggle = () => {
  builderStore.toggleStep(props.step)
}
</script>

<template>
  <div class="control-step" :class="{ 'is-collapsed': isCollapsed }">
    <button class="control-step__header" @click="toggle">
      <span class="control-step__number">{{ step }}</span>
      <span class="control-step__title">{{ title }}</span>
      <i class="fa-solid fa-chevron-down control-step__toggle"></i>
    </button>
    <div class="control-step__content" v-show="!isCollapsed">
      <slot></slot>
    </div>
  </div>
</template>

<style scoped>
.control-step {
  border-bottom: 1px solid var(--ff-border);
}

.control-step:last-child {
  border-bottom: none;
}

.control-step__header {
  display: flex;
  align-items: center;
  gap: var(--ff-space-sm);
  padding: var(--ff-space-md) var(--ff-space-lg);
  background: var(--ff-bg-subtle);
  border: none;
  cursor: pointer;
  user-select: none;
  transition: background 0.15s ease;
  width: 100%;
  text-align: left;
  font-family: inherit;
}

.control-step__header:hover {
  background: var(--ff-bg);
}

.control-step__number {
  width: 1.75rem;
  height: 1.75rem;
  border-radius: 50%;
  background: var(--ff-accent);
  color: white;
  font-size: 0.75rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.control-step__title {
  flex: 1;
  font-size: 0.9375rem;
  font-weight: 600;
  color: var(--ff-text);
}

.control-step__toggle {
  color: var(--ff-muted);
  transition: transform 0.15s ease;
  font-size: 0.75rem;
}

.control-step.is-collapsed .control-step__toggle {
  transform: rotate(-90deg);
}

.control-step__content {
  padding: var(--ff-space-md) var(--ff-space-lg) var(--ff-space-lg);
}
</style>
