<script setup>
import { useBuilderStore } from '@/stores/builderStore'
import { useRoute } from 'vue-router'
import { computed } from 'vue'

const builderStore = useBuilderStore()
const route = useRoute()

const isDocsPage = computed(() => route.name === 'mini-player-docs')

const toggleTheme = () => {
  builderStore.toggleTheme()
}
</script>

<template>
  <nav class="ff-nav">
    <div class="ff-nav-inner">
      <div class="ff-nav-left">
        <router-link to="/" class="ff-nav-brand">
          <span class="builder-title">44.audio Player Builder</span>
        </router-link>

        <!-- Navigation Links -->
        <div class="ff-nav-links">
          <router-link
            to="/"
            class="ff-nav-link"
            :class="{ 'is-active': route.name === 'builder' }"
          >
            Builder
          </router-link>
          <router-link
            to="/docs/mini-player"
            class="ff-nav-link"
            :class="{ 'is-active': isDocsPage }"
          >
            Mini Player Docs
          </router-link>
        </div>
      </div>

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

.ff-nav-left {
  display: flex;
  align-items: center;
  gap: var(--ff-space-xl);
}

.builder-title {
  font-size: 1rem;
  font-weight: 600;
  color: var(--ff-text);
}

.ff-nav-links {
  display: flex;
  align-items: center;
  gap: var(--ff-space-sm);
}

.ff-nav-link {
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--ff-muted);
  text-decoration: none;
  padding: 0.5rem 0.75rem;
  border-radius: 6px;
  transition: all 0.15s ease;
}

.ff-nav-link:hover {
  color: var(--ff-text);
  background: var(--ff-bg-subtle);
}

.ff-nav-link.is-active {
  color: var(--ff-text);
  background: var(--ff-bg-subtle);
}

@media (max-width: 640px) {
  .ff-nav-left {
    flex-direction: column;
    align-items: flex-start;
    gap: var(--ff-space-sm);
  }

  .ff-nav-links {
    flex-wrap: wrap;
  }
}
</style>
