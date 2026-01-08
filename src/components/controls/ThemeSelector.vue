<script setup>
import { useBrandStore } from '@/stores/brandStore'
import { usePlayerStore } from '@/stores/playerStore'

const brandStore = useBrandStore()
const playerStore = usePlayerStore()

const handleThemeChange = (event) => {
  brandStore.applyTheme(event.target.value, playerStore)
}
</script>

<template>
  <div class="theme-selector">
    <label class="theme-selector__label">Theme Preset</label>
    <select
      class="theme-selector__select ff-select"
      :value="brandStore.currentTheme"
      @change="handleThemeChange"
    >
      <option
        v-for="theme in brandStore.availableThemes"
        :key="theme.value"
        :value="theme.value"
      >
        {{ theme.label }}
      </option>
    </select>
    <p class="theme-selector__hint">Choose a preset, then customize colors below</p>
  </div>
</template>

<style scoped>
.theme-selector {
  padding: 1rem;
  background: var(--ff-bg-subtle);
  border-radius: var(--ff-radius);
  margin-bottom: 1rem;
}

.theme-selector__label {
  display: block;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: var(--ff-muted);
  margin-bottom: 0.5rem;
}

.theme-selector__select {
  width: 100%;
  padding: 0.625rem 0.75rem;
  font-size: 0.9375rem;
  font-weight: 500;
}

.theme-selector__hint {
  margin-top: 0.5rem;
  font-size: 0.75rem;
  color: var(--ff-muted);
}
</style>
