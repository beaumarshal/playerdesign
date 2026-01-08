<script setup>
defineProps({
  title: {
    type: String,
    required: true
  },
  badge: {
    type: String,
    default: ''
  }
})
</script>

<template>
  <div class="options-group">
    <h4 class="options-group__title">
      {{ title }}
      <span v-if="badge" class="options-group__badge">{{ badge }}</span>
    </h4>
    <slot></slot>
  </div>
</template>

<style scoped>
.options-group {
  margin-bottom: var(--ff-space-lg);
  padding-bottom: var(--ff-space-md);
  border-bottom: 1px solid var(--ff-border);
}

.options-group:last-child {
  margin-bottom: 0;
  padding-bottom: 0;
  border-bottom: none;
}

.options-group__title {
  font-size: 0.6875rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--ff-muted);
  margin: 0 0 var(--ff-space-md);
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.options-group__badge {
  font-size: 0.625rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: white;
  background: var(--ff-accent);
  padding: 0.125rem 0.375rem;
  border-radius: 4px;
}
</style>
