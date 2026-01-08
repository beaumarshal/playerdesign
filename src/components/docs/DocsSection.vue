<script setup>
defineProps({
  id: {
    type: String,
    required: true
  },
  title: {
    type: String,
    default: ''
  },
  description: {
    type: String,
    default: ''
  }
})
</script>

<template>
  <section :id="id" class="docs-section">
    <div v-if="title" class="docs-section__header">
      <h2 class="docs-section__title">{{ title }}</h2>
      <p v-if="description" class="docs-section__description">{{ description }}</p>
    </div>
    <div class="docs-section__content">
      <slot />
    </div>
  </section>
</template>

<style scoped>
.docs-section {
  scroll-margin-top: 100px;
  padding-bottom: var(--ff-space-2xl);
  margin-bottom: var(--ff-space-xl);
  border-bottom: 1px solid var(--ff-border);
}

.docs-section:last-child {
  border-bottom: none;
  margin-bottom: 0;
}

.docs-section__header {
  margin-bottom: var(--ff-space-lg);
}

.docs-section__title {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--ff-text);
  margin: 0 0 var(--ff-space-sm);
}

.docs-section__description {
  font-size: 0.9375rem;
  color: var(--ff-muted);
  margin: 0;
  line-height: 1.6;
}

.docs-section__content {
  /* Container for section content */
}
</style>
