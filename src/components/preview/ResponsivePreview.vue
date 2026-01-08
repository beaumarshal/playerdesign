<script setup>
import { ref, computed } from 'vue'
import { useBuilderStore } from '@/stores/builderStore'
import BreakpointRuler from './BreakpointRuler.vue'

const props = defineProps({
  darkMode: {
    type: Boolean,
    default: false
  }
})

const builderStore = useBuilderStore()

const isDragging = ref(false)

const containerStyle = computed(() => ({
  width: `${builderStore.previewWidth}px`,
  background: props.darkMode ? '#121212' : '#f5f5f5',
  borderColor: props.darkMode ? '#2a2a2a' : 'var(--ff-border)'
}))

const startDrag = (e) => {
  isDragging.value = true
  const startX = e.clientX
  const startWidth = builderStore.previewWidth

  const onMove = (e) => {
    const diff = e.clientX - startX
    builderStore.setPreviewWidth(startWidth + diff)
  }

  const onUp = () => {
    isDragging.value = false
    document.removeEventListener('mousemove', onMove)
    document.removeEventListener('mouseup', onUp)
  }

  document.addEventListener('mousemove', onMove)
  document.addEventListener('mouseup', onUp)
}

// Breakpoint click handler
const setBreakpoint = (width) => {
  builderStore.setPreviewWidth(width)
}
</script>

<template>
  <div class="responsive-preview">
    <BreakpointRuler @set-breakpoint="setBreakpoint" />

    <div class="responsive-preview__wrapper">
      <div class="responsive-preview__container" :style="containerStyle">
        <div class="responsive-preview__content">
          <slot></slot>
        </div>
        <div
          class="responsive-preview__width-display"
          :style="{
            background: darkMode ? '#2a2a2a' : 'var(--ff-bg)',
            color: darkMode ? '#999' : 'var(--ff-muted)'
          }"
        >
          {{ builderStore.previewWidth }}px
        </div>
      </div>

      <div
        class="responsive-preview__handle"
        :class="{ 'is-dragging': isDragging }"
        @mousedown="startDrag"
      >
        <div class="responsive-preview__handle-bar"></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.responsive-preview {
  margin-bottom: var(--ff-space-xl);
}

.responsive-preview__wrapper {
  display: flex;
  align-items: stretch;
}

.responsive-preview__container {
  position: relative;
  background: var(--ff-bg-subtle);
  border: 1px solid var(--ff-border);
  border-radius: 6px;
  overflow: hidden;
  min-height: 6rem;
  transition: width 0.1s ease;
  max-width: 100%;
}

.responsive-preview__content {
  padding: var(--ff-space-lg);
}

.responsive-preview__width-display {
  position: absolute;
  bottom: var(--ff-space-xs);
  right: var(--ff-space-sm);
  font-size: 0.6875rem;
  font-family: var(--ff-font-mono);
  color: var(--ff-muted);
  background: var(--ff-bg);
  padding: 2px 6px;
  border-radius: 3px;
}

.responsive-preview__handle {
  width: 12px;
  background: var(--ff-border);
  cursor: ew-resize;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: -1px;
  border-radius: 0 4px 4px 0;
  transition: background 0.15s ease;
}

.responsive-preview__handle:hover,
.responsive-preview__handle.is-dragging {
  background: var(--ff-accent);
}

.responsive-preview__handle-bar {
  width: 3px;
  height: 24px;
  background: var(--ff-bg);
  border-radius: 2px;
  opacity: 0.6;
}
</style>
