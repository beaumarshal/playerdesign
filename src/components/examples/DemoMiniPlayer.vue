<script setup>
import { useSlots, computed } from 'vue'

const props = defineProps({
  isPlaying: {
    type: Boolean,
    default: false
  },
  showProgress: {
    type: Boolean,
    default: false
  },
  progress: {
    type: Number,
    default: 0
  },
  size: {
    type: Number,
    default: 48
  },
  disabled: {
    type: Boolean,
    default: false
  },
  loading: {
    type: Boolean,
    default: false
  },
  error: {
    type: Boolean,
    default: false
  },
  showRipple: {
    type: Boolean,
    default: false
  },
  showBadge: {
    type: Boolean,
    default: false
  },
  showTooltip: {
    type: Boolean,
    default: false
  },
  // Style overrides for documentation demos
  bgColor: {
    type: String,
    default: null
  },
  iconColor: {
    type: String,
    default: null
  },
  borderRadius: {
    type: String,
    default: null
  },
  border: {
    type: String,
    default: null
  },
  // Hover effect: 'none', 'scale', 'glow', 'lift'
  hover: {
    type: String,
    default: 'none' // Default to none for docs demos
  }
})

const slots = useSlots()

const buttonStyle = computed(() => ({
  width: `${props.size}px`,
  height: `${props.size}px`,
  ...(props.bgColor && { background: props.bgColor }),
  ...(props.borderRadius && { borderRadius: props.borderRadius }),
  ...(props.border && { border: props.border }),
}))

const iconSize = computed(() => Math.round(props.size * 0.375))

const iconStyle = computed(() => ({
  width: `${iconSize.value}px`,
  height: `${iconSize.value}px`,
  ...(props.iconColor && { color: props.iconColor }),
}))
</script>

<template>
  <div class="demo-mini-wrapper">
    <button
      class="demo-mini"
      :class="{
        'is-playing': isPlaying,
        'is-disabled': disabled,
        'is-loading': loading,
        'is-error': error,
        'hover-none': hover === 'none',
        'hover-scale': hover === 'scale',
        'hover-glow': hover === 'glow',
        'hover-lift': hover === 'lift'
      }"
      :style="buttonStyle"
      :disabled="disabled"
    >
      <!-- Ripple Effect -->
      <span v-if="showRipple" class="demo-mini__ripple" part="ripple"></span>

      <!-- Progress Ring -->
      <svg v-if="showProgress" class="demo-mini__progress" viewBox="0 0 48 48">
        <circle
          class="demo-mini__progress-track"
          part="progress-track"
          cx="24" cy="24" r="22"
          fill="none"
          stroke="currentColor"
          stroke-width="3"
          opacity="0.2"
        />
        <circle
          class="demo-mini__progress-fill"
          part="progress"
          cx="24" cy="24" r="22"
          fill="none"
          stroke="#c4956a"
          stroke-width="3"
          :stroke-dasharray="138.2"
          :stroke-dashoffset="138.2 - (138.2 * progress)"
          stroke-linecap="round"
          transform="rotate(-90 24 24)"
        />
      </svg>

      <!-- Loading State -->
      <span v-if="loading" class="demo-mini__icon demo-mini__icon--loading" :style="iconStyle">
        <slot name="loading">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="demo-mini__spinner">
            <circle cx="12" cy="12" r="10" opacity="0.25" />
            <path d="M12 2a10 10 0 0 1 10 10" stroke-linecap="round" />
          </svg>
        </slot>
      </span>

      <!-- Error State -->
      <span v-else-if="error" class="demo-mini__icon demo-mini__icon--error" :style="iconStyle">
        <slot name="error">
          <svg viewBox="0 0 24 24" fill="currentColor" :width="iconSize" :height="iconSize">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
          </svg>
        </slot>
      </span>

      <!-- Play Icon -->
      <span v-else-if="!isPlaying" class="demo-mini__icon" part="icon" :style="iconStyle">
        <slot name="play-icon">
          <svg viewBox="0 0 24 24" fill="currentColor" :width="iconSize" :height="iconSize">
            <path d="M8 5v14l11-7z"/>
          </svg>
        </slot>
      </span>

      <!-- Pause Icon -->
      <span v-else class="demo-mini__icon" part="icon" :style="iconStyle">
        <slot name="pause-icon">
          <svg viewBox="0 0 24 24" fill="currentColor" :width="iconSize" :height="iconSize">
            <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
          </svg>
        </slot>
      </span>

      <!-- Badge Slot -->
      <span v-if="showBadge || $slots.badge" class="demo-mini__badge">
        <slot name="badge">
          <span class="demo-mini__badge-default">NEW</span>
        </slot>
      </span>
    </button>

    <!-- Tooltip Slot -->
    <div v-if="showTooltip || $slots.tooltip" class="demo-mini__tooltip">
      <slot name="tooltip">
        <span>0:45</span>
      </slot>
    </div>
  </div>
</template>

<style scoped>
.demo-mini-wrapper {
  position: relative;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
}

.demo-mini {
  position: relative;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  /* Fixed color - independent from playground */
  background: #c4956a;
  transition: transform 0.15s ease, box-shadow 0.15s ease, opacity 0.15s ease;
}

/* Hover effects based on prop */
.demo-mini.hover-none:hover,
.demo-mini.hover-none:active {
  transform: none;
  box-shadow: none;
}

.demo-mini.hover-scale:hover:not(.is-disabled) {
  transform: scale(1.08);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.demo-mini.hover-scale:active:not(.is-disabled) {
  transform: scale(0.98);
}

.demo-mini.hover-glow:hover:not(.is-disabled) {
  transform: scale(1.02);
  box-shadow: 0 0 20px rgba(196, 149, 106, 0.5);
}

.demo-mini.hover-glow:active:not(.is-disabled) {
  transform: scale(0.98);
}

.demo-mini.hover-lift:hover:not(.is-disabled) {
  transform: translateY(-3px) scale(1.02);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
}

.demo-mini.hover-lift:active:not(.is-disabled) {
  transform: translateY(-1px) scale(0.99);
}

.demo-mini.is-disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.demo-mini.is-error {
  background: #ef4444;
}

.demo-mini__progress {
  position: absolute;
  inset: -3px;
  width: calc(100% + 6px);
  height: calc(100% + 6px);
  pointer-events: none;
}

.demo-mini__icon {
  display: flex;
  align-items: center;
  justify-content: center;
  /* Fixed color - independent from playground */
  color: #ffffff;
}

.demo-mini__icon svg {
  width: 18px;
  height: 18px;
  fill: currentColor;
}

.demo-mini__icon--loading svg {
  fill: none;
  stroke: currentColor;
}

.demo-mini__spinner {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

/* Make slotted SVGs inherit color */
.demo-mini__icon :slotted(svg) {
  fill: currentColor;
  color: inherit;
}

/* Make slotted Font Awesome icons inherit color and size */
.demo-mini__icon :slotted(i) {
  font-size: 18px;
  color: inherit;
}

/* Ripple effect */
.demo-mini__ripple {
  position: absolute;
  inset: 0;
  border-radius: 50%;
  background: currentColor;
  opacity: 0;
  animation: ripple 0.6s ease-out;
}

@keyframes ripple {
  0% {
    transform: scale(0.8);
    opacity: 0.4;
  }
  100% {
    transform: scale(1.4);
    opacity: 0;
  }
}

/* Badge */
.demo-mini__badge {
  position: absolute;
  top: -4px;
  right: -4px;
  z-index: 1;
}

.demo-mini__badge-default {
  display: block;
  font-size: 0.5rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.02em;
  padding: 2px 5px;
  background: #ef4444;
  color: white;
  border-radius: 4px;
  line-height: 1;
}

/* Tooltip */
.demo-mini__tooltip {
  font-size: 0.6875rem;
  color: var(--ff-muted, #666);
  background: var(--ff-bg, #fff);
  padding: 4px 8px;
  border-radius: 4px;
  border: 1px solid var(--ff-border, #e5e5e5);
  white-space: nowrap;
}
</style>
