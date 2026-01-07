<script setup>
import { computed } from 'vue'

const props = defineProps({
  modelValue: {
    type: String,
    required: true
  },
  label: {
    type: String,
    default: ''
  },
  transparentOption: {
    type: Boolean,
    default: false
  },
  isTransparent: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:modelValue', 'update:isTransparent'])

const hexValue = computed(() => props.modelValue.toUpperCase())

const updateColor = (event) => {
  emit('update:modelValue', event.target.value)
}

const updateTransparent = (event) => {
  emit('update:isTransparent', event.target.checked)
}
</script>

<template>
  <div class="control-group">
    <label v-if="label" class="ff-label">{{ label }}</label>
    <div class="color-input" :class="{ 'is-disabled': isTransparent }">
      <input
        type="color"
        :value="modelValue"
        @input="updateColor"
        :disabled="isTransparent"
      />
      <span class="color-value">{{ hexValue }}</span>
    </div>
    <label v-if="transparentOption" class="checkbox-label">
      <input
        type="checkbox"
        :checked="isTransparent"
        @change="updateTransparent"
      />
      Transparent
    </label>
  </div>
</template>

<style scoped>
.control-group {
  display: flex;
  flex-direction: column;
  gap: var(--ff-space-xs);
}

.color-input {
  display: flex;
  align-items: center;
  gap: var(--ff-space-sm);
  padding: var(--ff-space-xs) var(--ff-space-sm);
  background: var(--ff-bg);
  border: 1px solid var(--ff-border);
  border-radius: 4px;
  transition: border-color 0.15s ease;
}

.color-input:hover,
.color-input:focus-within {
  border-color: var(--ff-accent);
}

.color-input.is-disabled {
  opacity: 0.5;
  pointer-events: none;
}

.color-input input[type="color"] {
  width: 1.5rem;
  height: 1.5rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  padding: 0;
  background: none;
}

.color-input input[type="color"]::-webkit-color-swatch-wrapper {
  padding: 0;
}

.color-input input[type="color"]::-webkit-color-swatch {
  border: 1px solid var(--ff-border);
  border-radius: 4px;
}

.color-value {
  font-size: 0.75rem;
  font-family: var(--ff-font-mono);
  color: var(--ff-muted);
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: var(--ff-space-xs);
  font-size: 0.8125rem;
  color: var(--ff-text);
  cursor: pointer;
}

.checkbox-label input[type="checkbox"] {
  width: 1rem;
  height: 1rem;
  accent-color: var(--ff-accent);
  cursor: pointer;
}
</style>
