<script setup>
const props = defineProps({
  modelValue: {
    type: Number,
    required: true
  },
  label: {
    type: String,
    default: ''
  },
  min: {
    type: Number,
    default: 0
  },
  max: {
    type: Number,
    default: 100
  },
  step: {
    type: Number,
    default: 1
  },
  unit: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['update:modelValue'])

const updateValue = (event) => {
  emit('update:modelValue', Number(event.target.value))
}
</script>

<template>
  <div class="control-group">
    <div class="range-header">
      <label v-if="label" class="ff-label">{{ label }}</label>
      <span class="range-value">{{ modelValue }}{{ unit }}</span>
    </div>
    <input
      type="range"
      class="range-input"
      :value="modelValue"
      :min="min"
      :max="max"
      :step="step"
      @input="updateValue"
    />
  </div>
</template>

<style scoped>
.control-group {
  display: flex;
  flex-direction: column;
  gap: var(--ff-space-xs);
}

.range-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.range-value {
  font-size: 0.75rem;
  font-family: var(--ff-font-mono);
  color: var(--ff-muted);
}

.range-input {
  width: 100%;
  height: 6px;
  border-radius: 3px;
  background: var(--ff-border);
  appearance: none;
  cursor: pointer;
}

.range-input::-webkit-slider-thumb {
  appearance: none;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: var(--ff-accent);
  cursor: pointer;
  transition: transform 0.15s ease;
}

.range-input::-webkit-slider-thumb:hover {
  transform: scale(1.1);
}

.range-input::-moz-range-thumb {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: var(--ff-accent);
  cursor: pointer;
  border: none;
}
</style>
