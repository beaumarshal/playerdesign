<script setup>
import { computed } from 'vue'
import { useBrandStore } from '@/stores/brandStore'

const props = defineProps({
  label: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: ''
  },
  playerType: {
    type: String,
    default: 'full'
  }
})

const brandStore = useBrandStore()

// Mini player style for examples
const miniStyle = computed(() => ({
  background: brandStore.buttonColor,
  borderRadius: brandStore.buttonRadius,
}))
</script>

<template>
  <div class="example-card ff-card">
    <div class="example-card__label">{{ label }}</div>
    <div class="example-card__preview" :class="`example-card__preview--${playerType}`">
      <!-- Full Player Example -->
      <template v-if="playerType === 'full'">
        <div class="example-full">
          <div class="example-full__line example-full__line--short"></div>
          <div class="example-full__player">
            <div class="example-full__play"></div>
            <div class="example-full__wave"></div>
            <div class="example-full__time"></div>
          </div>
          <div class="example-full__line"></div>
        </div>
      </template>

      <!-- Mini Player Example -->
      <template v-else-if="playerType === 'mini'">
        <div class="example-mini">
          <div class="example-mini__image"></div>
          <div class="example-mini__player" :style="miniStyle">
            <i class="fa-solid fa-play example-mini__icon"></i>
          </div>
        </div>
      </template>

      <!-- Pill Player Example -->
      <template v-else-if="playerType === 'pill'">
        <div class="example-pill">
          <div class="example-pill__avatar"></div>
          <div class="example-pill__content">
            <div class="example-pill__name"></div>
            <div class="example-pill__player">
              <div class="example-pill__play"></div>
              <div class="example-pill__wave"></div>
              <div class="example-pill__time"></div>
            </div>
          </div>
        </div>
      </template>
    </div>
    <div class="example-card__description" v-if="description">{{ description }}</div>
  </div>
</template>

<style scoped>
.example-card {
  padding: var(--ff-space-md);
}

.example-card__label {
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--ff-text);
  margin-bottom: var(--ff-space-sm);
}

.example-card__preview {
  background: var(--ff-bg-subtle);
  border-radius: 4px;
  padding: var(--ff-space-md);
  min-height: 80px;
}

.example-card__description {
  font-size: 0.75rem;
  color: var(--ff-muted);
  margin-top: var(--ff-space-sm);
}

/* Full Player Example */
.example-full__line {
  height: 8px;
  background: var(--ff-border);
  border-radius: 4px;
  margin-bottom: var(--ff-space-sm);
}

.example-full__line--short {
  width: 60%;
}

.example-full__player {
  display: flex;
  align-items: center;
  gap: var(--ff-space-sm);
  padding: var(--ff-space-sm);
  background: var(--ff-bg);
  border: 1px solid var(--ff-border);
  border-radius: 6px;
  margin-bottom: var(--ff-space-sm);
}

.example-full__play {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: var(--ff-accent);
}

.example-full__wave {
  flex: 1;
  height: 12px;
  background: linear-gradient(90deg, var(--ff-accent) 30%, var(--ff-border) 30%);
  border-radius: 2px;
}

.example-full__time {
  width: 40px;
  height: 8px;
  background: var(--ff-border);
  border-radius: 2px;
}

/* Mini Player Example */
.example-mini {
  position: relative;
  width: 100%;
  height: 80px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 6px;
  overflow: hidden;
}

.example-mini__image {
  position: absolute;
  inset: 0;
  opacity: 0.3;
}

.example-mini__player {
  position: absolute;
  bottom: var(--ff-space-sm);
  right: var(--ff-space-sm);
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 8px rgba(0,0,0,0.2);
}

.example-mini__icon {
  color: white;
  font-size: 0.75rem;
  margin-left: 2px;
}

/* Pill Player Example */
.example-pill {
  display: flex;
  align-items: center;
  gap: var(--ff-space-sm);
}

.example-pill__avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  flex-shrink: 0;
}

.example-pill__content {
  flex: 1;
}

.example-pill__name {
  width: 60%;
  height: 8px;
  background: var(--ff-border);
  border-radius: 2px;
  margin-bottom: var(--ff-space-xs);
}

.example-pill__player {
  display: inline-flex;
  align-items: center;
  gap: var(--ff-space-xs);
  padding: 4px 8px 4px 4px;
  background: var(--ff-bg);
  border: 1px solid var(--ff-border);
  border-radius: 999px;
}

.example-pill__play {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: var(--ff-accent);
}

.example-pill__wave {
  width: 40px;
  height: 8px;
  background: linear-gradient(90deg, var(--ff-accent) 30%, var(--ff-border) 30%);
  border-radius: 2px;
}

.example-pill__time {
  width: 24px;
  height: 6px;
  background: var(--ff-border);
  border-radius: 2px;
}
</style>
