<script setup>
defineProps({
  playerType: {
    type: String,
    default: 'Player'
  }
})
</script>

<template>
  <div class="coming-soon">
    <div class="coming-soon__icon">
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
        <circle cx="12" cy="12" r="10"></circle>
        <path d="M12 6v6l4 2"></path>
      </svg>
    </div>
    <h3 class="coming-soon__title">{{ playerType }} Documentation</h3>
    <p class="coming-soon__text">
      Detailed documentation for the {{ playerType }} is coming soon.
      In the meantime, check out the Mini Player docs for examples of how to customize players.
    </p>
    <div class="coming-soon__badge">Coming Soon</div>
  </div>
</template>

<style scoped>
.coming-soon {
  text-align: center;
  padding: var(--ff-space-2xl) var(--ff-space-xl);
  background: var(--ff-bg-subtle);
  border: 1px dashed var(--ff-border);
  border-radius: 12px;
}

.coming-soon__icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 80px;
  background: var(--ff-bg);
  border: 1px solid var(--ff-border);
  border-radius: 50%;
  margin-bottom: var(--ff-space-lg);
  color: var(--ff-muted);
}

.coming-soon__title {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--ff-text);
  margin: 0 0 var(--ff-space-sm);
}

.coming-soon__text {
  font-size: 0.9375rem;
  color: var(--ff-muted);
  line-height: 1.6;
  max-width: 400px;
  margin: 0 auto var(--ff-space-lg);
}

.coming-soon__badge {
  display: inline-block;
  font-size: 0.6875rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--ff-muted);
  background: var(--ff-bg);
  border: 1px solid var(--ff-border);
  padding: 0.375rem 0.75rem;
  border-radius: 20px;
}
</style>
