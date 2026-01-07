<script setup>
import { computed } from 'vue'
import { useBuilderStore } from '@/stores/builderStore'
import ExampleCard from './ExampleCard.vue'

const builderStore = useBuilderStore()

const activePlayerType = computed(() => builderStore.activePlayerType)

// Example data for each player type
const fullExamples = [
  { label: 'Article Embed', description: 'Audio embedded in blog post' },
  { label: 'Podcast Episode', description: 'Full episode player' },
  { label: 'Course Lesson', description: 'E-learning audio player' },
  { label: 'Landing Page', description: 'Marketing page audio' },
]

const miniExamples = [
  { label: 'Artwork Overlay', description: 'Audio guide for artwork' },
  { label: 'Product Card', description: 'Product demo audio' },
  { label: 'Profile Card', description: 'Voice introduction' },
  { label: 'Audio Guide', description: 'Museum/gallery guide' },
]

const pillExamples = [
  { label: 'Chat Message', description: 'Voice message in chat' },
  { label: 'Social Bio', description: 'Profile audio intro' },
  { label: 'Voice Note', description: 'Inline voice memo' },
  { label: 'Testimonial', description: 'Customer audio review' },
]

const currentExamples = computed(() => {
  switch (activePlayerType.value) {
    case 'full': return fullExamples
    case 'mini': return miniExamples
    case 'pill': return pillExamples
    default: return fullExamples
  }
})
</script>

<template>
  <div class="examples-section">
    <h3 class="examples-title">Use Case Examples</h3>
    <div class="examples-grid">
      <ExampleCard
        v-for="example in currentExamples"
        :key="example.label"
        :label="example.label"
        :description="example.description"
        :player-type="activePlayerType"
      />
    </div>
  </div>
</template>

<style scoped>
.examples-section {
  margin-top: var(--ff-space-xl);
}

.examples-title {
  font-size: 0.6875rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--ff-muted);
  margin: 0 0 var(--ff-space-md);
}

.examples-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--ff-space-md);
}

@media (max-width: 768px) {
  .examples-grid {
    grid-template-columns: 1fr;
  }
}
</style>
