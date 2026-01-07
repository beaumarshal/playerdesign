<script setup>
import { useBuilderStore } from '@/stores/builderStore'

const builderStore = useBuilderStore()

const toggleTheme = () => {
  builderStore.toggleTheme()
}
</script>

<template>
  <nav class="ff-nav">
    <div class="ff-nav-inner">
      <a href="/" class="ff-nav-brand">
        <span class="builder-title">44.audio Player Builder</span>
      </a>

      <div class="ff-nav-right">
        <button
          class="ff-theme-toggle"
          @click="toggleTheme"
          :aria-label="builderStore.theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'"
        >
          <i class="fa-solid fa-sun ff-theme-icon-light"></i>
          <i class="fa-solid fa-moon ff-theme-icon-dark"></i>
        </button>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.ff-nav-inner {
  max-width: 1400px;
}

.builder-title {
  font-size: 1rem;
  font-weight: 600;
  color: var(--ff-text);
}
</style>
