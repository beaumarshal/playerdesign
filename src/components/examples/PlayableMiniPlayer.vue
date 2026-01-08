<script setup>
import { computed, onMounted, watch } from 'vue'
import { useAudioPlayback } from '@/composables/useAudioPlayback'

const props = defineProps({
  recordingId: {
    type: String,
    required: true
  },
  size: {
    type: Number,
    default: 48
  },
  showProgress: {
    type: Boolean,
    default: true
  },
  // Style overrides
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
  hover: {
    type: String,
    default: 'scale'
  }
})

const {
  isPlaying,
  isLoading,
  hasError,
  progress,
  toggle,
  initAudio
} = useAudioPlayback()

onMounted(() => {
  if (props.recordingId) {
    initAudio(props.recordingId)
  }
})

watch(() => props.recordingId, (newId) => {
  if (newId) {
    initAudio(newId)
  }
})

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
  <div class="playable-mini-wrapper">
    <button
      class="playable-mini"
      :class="{
        'is-playing': isPlaying,
        'is-loading': isLoading,
        'is-error': hasError,
        [`hover-${hover}`]: true
      }"
      :style="buttonStyle"
      :disabled="isLoading || hasError"
      @click="toggle"
    >
      <!-- Progress Ring -->
      <svg v-if="showProgress" class="playable-mini__progress" viewBox="0 0 48 48">
        <circle
          class="playable-mini__progress-track"
          cx="24" cy="24" r="22"
          fill="none"
          stroke="currentColor"
          stroke-width="3"
          opacity="0.2"
        />
        <circle
          class="playable-mini__progress-fill"
          cx="24" cy="24" r="22"
          fill="none"
          stroke="currentColor"
          stroke-width="3"
          :stroke-dasharray="138.2"
          :stroke-dashoffset="138.2 - (138.2 * progress)"
          stroke-linecap="round"
          transform="rotate(-90 24 24)"
        />
      </svg>

      <!-- Loading State -->
      <span v-if="isLoading" class="playable-mini__icon" :style="iconStyle">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="playable-mini__spinner">
          <circle cx="12" cy="12" r="10" opacity="0.25" />
          <path d="M12 2a10 10 0 0 1 10 10" stroke-linecap="round" />
        </svg>
      </span>

      <!-- Error State -->
      <span v-else-if="hasError" class="playable-mini__icon" :style="iconStyle">
        <svg viewBox="0 0 24 24" fill="currentColor" :width="iconSize" :height="iconSize">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
        </svg>
      </span>

      <!-- Play Icon -->
      <span v-else-if="!isPlaying" class="playable-mini__icon" :style="iconStyle">
        <svg viewBox="0 0 24 24" fill="currentColor" :width="iconSize" :height="iconSize">
          <path d="M8 5v14l11-7z"/>
        </svg>
      </span>

      <!-- Pause Icon -->
      <span v-else class="playable-mini__icon" :style="iconStyle">
        <svg viewBox="0 0 24 24" fill="currentColor" :width="iconSize" :height="iconSize">
          <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
        </svg>
      </span>
    </button>
  </div>
</template>

<style scoped>
.playable-mini-wrapper {
  position: relative;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
}

.playable-mini {
  position: relative;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #c4956a;
  transition: transform 0.15s ease, box-shadow 0.15s ease, opacity 0.15s ease;
}

.playable-mini:disabled {
  cursor: not-allowed;
}

.playable-mini.is-error {
  background: #ef4444;
}

/* Hover effects */
.playable-mini.hover-none:hover,
.playable-mini.hover-none:active {
  transform: none;
  box-shadow: none;
}

.playable-mini.hover-scale:hover:not(:disabled) {
  transform: scale(1.08);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.playable-mini.hover-scale:active:not(:disabled) {
  transform: scale(0.98);
}

.playable-mini.hover-glow:hover:not(:disabled) {
  transform: scale(1.02);
  box-shadow: 0 0 20px rgba(196, 149, 106, 0.5);
}

.playable-mini.hover-glow:active:not(:disabled) {
  transform: scale(0.98);
}

.playable-mini.hover-lift:hover:not(:disabled) {
  transform: translateY(-3px) scale(1.02);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
}

.playable-mini.hover-lift:active:not(:disabled) {
  transform: translateY(-1px) scale(0.99);
}

.playable-mini__progress {
  position: absolute;
  inset: -3px;
  width: calc(100% + 6px);
  height: calc(100% + 6px);
  pointer-events: none;
}

.playable-mini__progress-fill {
  transition: stroke-dashoffset 0.1s ease;
}

.playable-mini__icon {
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
}

.playable-mini__icon svg {
  width: 18px;
  height: 18px;
  fill: currentColor;
}

.playable-mini__spinner {
  animation: spin 1s linear infinite;
  fill: none;
  stroke: currentColor;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
</style>
