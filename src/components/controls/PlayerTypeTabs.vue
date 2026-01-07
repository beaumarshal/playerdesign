<script setup>
import { computed } from 'vue'
import { useBuilderStore } from '@/stores/builderStore'

const builderStore = useBuilderStore()

const activeType = computed(() => builderStore.activePlayerType)

const tabs = [
  { id: 'full', label: 'Full' },
  { id: 'mini', label: 'Mini' },
  { id: 'pill', label: 'Pill' },
]

const setPlayerType = (type) => {
  builderStore.setPlayerType(type)
}
</script>

<template>
  <div class="player-tabs">
    <button
      v-for="tab in tabs"
      :key="tab.id"
      class="player-tab"
      :class="{ 'is-active': activeType === tab.id }"
      @click="setPlayerType(tab.id)"
    >
      {{ tab.label }}
    </button>
  </div>
</template>

<style scoped>
.player-tabs {
  display: flex;
  gap: var(--ff-space-sm);
}

.player-tab {
  flex: 1;
  padding: var(--ff-space-sm) var(--ff-space-md);
  border: 1px solid var(--ff-border);
  border-radius: 4px;
  background: var(--ff-bg);
  color: var(--ff-muted);
  font-size: 0.8125rem;
  font-weight: 500;
  font-family: inherit;
  cursor: pointer;
  transition: all 0.15s ease;
  text-align: center;
}

.player-tab:hover {
  border-color: var(--ff-accent);
  color: var(--ff-text);
}

.player-tab.is-active {
  background: var(--ff-text);
  border-color: var(--ff-text);
  color: var(--ff-bg);
}
</style>
