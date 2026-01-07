<script setup>
import { ref, onMounted } from 'vue'
import { useBuilderStore } from './stores/builderStore'
import BuilderHeader from './components/layout/BuilderHeader.vue'
import ControlsPanel from './components/layout/ControlsPanel.vue'
import PreviewPanel from './components/layout/PreviewPanel.vue'

const builderStore = useBuilderStore()

onMounted(() => {
  // Apply initial theme
  document.documentElement.setAttribute('data-theme', builderStore.theme)
})
</script>

<template>
  <div class="ff-page">
    <div class="ff-gradient-bar"></div>
    <BuilderHeader />
    <div class="builder">
      <div class="builder__content">
        <ControlsPanel />
        <PreviewPanel />
      </div>
    </div>
  </div>
</template>

<style scoped>
.builder {
  max-width: 1400px;
  margin: 0 auto;
  padding: var(--ff-space-xl) var(--ff-space-lg);
}

.builder__content {
  display: grid;
  grid-template-columns: 400px 1fr;
  gap: var(--ff-space-xl);
  align-items: start;
}

@media (max-width: 1024px) {
  .builder__content {
    grid-template-columns: 1fr;
  }
}
</style>
