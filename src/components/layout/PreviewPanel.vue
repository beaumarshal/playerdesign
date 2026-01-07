<script setup>
import { computed } from 'vue'
import { useBuilderStore } from '@/stores/builderStore'
import ResponsivePreview from '@/components/preview/ResponsivePreview.vue'
import FullPlayer from '@/components/players/FullPlayer.vue'
import MiniPlayer from '@/components/players/MiniPlayer.vue'
import PillPlayer from '@/components/players/PillPlayer.vue'
import ExamplesSection from '@/components/examples/ExamplesSection.vue'

const builderStore = useBuilderStore()

const activePlayerType = computed(() => builderStore.activePlayerType)
</script>

<template>
  <div class="preview">
    <div class="preview__header">
      <h2 class="preview__title">Preview</h2>
    </div>

    <!-- Full Player uses responsive preview -->
    <ResponsivePreview v-if="activePlayerType === 'full'">
      <FullPlayer />
    </ResponsivePreview>

    <!-- Mini Player Preview -->
    <div v-else-if="activePlayerType === 'mini'" class="preview__container preview__container--mini">
      <div class="preview__mini-wrapper">
        <MiniPlayer />
      </div>
    </div>

    <!-- Pill Player Preview -->
    <div v-else-if="activePlayerType === 'pill'" class="preview__container preview__container--pill">
      <PillPlayer />
    </div>

    <!-- Examples Section -->
    <ExamplesSection />
  </div>
</template>

<style scoped>
.preview {
  position: sticky;
  top: var(--ff-space-xl);
}

.preview__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: var(--ff-space-md);
}

.preview__title {
  font-size: 0.6875rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--ff-muted);
  margin: 0;
}

.preview__container {
  background: var(--ff-bg-subtle);
  border: 1px solid var(--ff-border);
  border-radius: 6px;
  padding: var(--ff-space-lg);
  margin-bottom: var(--ff-space-xl);
}

.preview__container--mini {
  min-height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.preview__mini-wrapper {
  position: relative;
  width: 200px;
  height: 200px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 8px;
}

.preview__container--pill {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 120px;
}
</style>
