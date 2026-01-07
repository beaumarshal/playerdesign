<script setup>
const props = defineProps({
  modelValue: {
    type: String,
    required: true
  },
  label: {
    type: String,
    default: ''
  },
  options: {
    type: Array,
    required: true
    // Array of { value: string, label: string }
  }
})

const emit = defineEmits(['update:modelValue'])

const updateValue = (event) => {
  emit('update:modelValue', event.target.value)
}
</script>

<template>
  <div class="control-group">
    <label v-if="label" class="ff-label">{{ label }}</label>
    <select
      class="ff-select"
      :value="modelValue"
      @change="updateValue"
    >
      <option
        v-for="option in options"
        :key="option.value"
        :value="option.value"
      >
        {{ option.label }}
      </option>
    </select>
  </div>
</template>

<style scoped>
.control-group {
  display: flex;
  flex-direction: column;
  gap: var(--ff-space-xs);
}
</style>
