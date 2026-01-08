<script setup>
import { computed, onMounted, watch, ref } from 'vue'
import { useAudioPlayback } from '@/composables/useAudioPlayback'

const emit = defineEmits(['play', 'pause', 'ended', 'audioLevel', 'timeupdate'])

// Track previous isPlaying value to detect transitions
let wasPlaying = false

const props = defineProps({
  recordingId: {
    type: String,
    required: true
  },
  size: {
    type: Number,
    default: 48
  },
  // Visualization type: 'ring', 'pulse', 'rings', 'none'
  visualization: {
    type: String,
    default: 'ring'
  },
  // Progress ring shape: 'circle', 'rounded', 'square', or CSS value like '8px'
  progressShape: {
    type: String,
    default: 'circle'
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
  progressColor: {
    type: String,
    default: null
  },
  // Track color (the background ring before progress fills)
  trackColor: {
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
  },
  // Legacy prop - maps to visualization='ring' when true
  showProgress: {
    type: Boolean,
    default: null
  }
})

const {
  isPlaying,
  hasError,
  progress,
  duration,
  currentTime,
  toggle,
  initAudio,
  audioLevel
} = useAudioPlayback()

// Track when progress ring should fade out (on playback end)
const isFadingOut = ref(false)
// Store the final progress value to hold during fade
const displayProgress = ref(0)

// Expose audioLevel for voice-reactive animations
watch(audioLevel, (level) => {
  if (isPlaying.value) {
    emit('audioLevel', level)
  }
})

// Emit timeupdate for countdown displays
watch(currentTime, (time) => {
  emit('timeupdate', {
    currentTime: time,
    duration: duration.value,
    remaining: duration.value - time
  })
})

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

// Sync displayProgress with actual progress during playback
// Detect when progress jumps to 0 (audio ended) and trigger fade instead
watch(progress, (newVal, oldVal) => {
  if (isFadingOut.value) return

  // If progress jumps from high value to 0, audio ended - trigger fade
  if (newVal === 0 && oldVal > 0.5) {
    isFadingOut.value = true
    // After fade completes, reset displayProgress but stay hidden
    setTimeout(() => {
      displayProgress.value = 0
      // Keep isFadingOut = true, will be reset when playback starts
    }, 300)
  } else {
    displayProgress.value = newVal
  }
})

// Watch isPlaying to emit play/pause/ended events
watch(isPlaying, (newVal) => {
  if (newVal && !wasPlaying) {
    // Starting playback
    if (isFadingOut.value) {
      // Starting fresh after audio ended - reset and show
      displayProgress.value = 0
      setTimeout(() => {
        isFadingOut.value = false
      }, 10)
    }
    // If resuming from pause, don't reset displayProgress
    // Emit play with duration info for countdown displays
    emit('play', { duration: duration.value, currentTime: currentTime.value })
  } else if (!newVal && wasPlaying) {
    if (progress.value === 0) {
      emit('ended')
    } else {
      emit('pause')
    }
  }
  wasPlaying = newVal
})

// Determine effective visualization (handle legacy showProgress prop)
const effectiveVisualization = computed(() => {
  if (props.showProgress === false) return 'none'
  if (props.showProgress === true) return 'ring'
  return props.visualization
})

// Calculate progress ring radius based on shape
const progressRx = computed(() => {
  const shape = props.progressShape
  if (shape === 'circle') return '50%'
  if (shape === 'square') return '0'
  if (shape === 'rounded') return '6'
  // Custom value (like '8px' or '12')
  return shape.replace('px', '')
})

// Rounded rect progress path perimeter
const rectPerimeter = computed(() => {
  // For a 48x48 viewBox with 3px offset = 42x42 rect
  // Perimeter = 2*(w + h) - 8*r + 2*π*r for rounded corners
  const rx = parseFloat(progressRx.value) || 0
  if (progressRx.value === '50%') {
    return 138.2 // Circle circumference
  }
  const w = 42, h = 42
  // Simplified: perimeter of rounded rect
  return 2 * (w + h) - 8 * rx + 2 * Math.PI * rx
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

// Pulse/rings color
const pulseColor = computed(() => props.progressColor || props.bgColor || '#c4956a')
</script>

<template>
  <div class="playable-mini-wrapper">
    <button
      class="playable-mini"
      :class="{
        'is-playing': isPlaying,
        'is-error': hasError,
        [`hover-${hover}`]: true,
        'viz-pulse': effectiveVisualization === 'pulse',
        'viz-rings': effectiveVisualization === 'rings'
      }"
      :style="[buttonStyle, { '--pulse-color': pulseColor }]"
      :disabled="hasError"
      @click="toggle"
    >
      <!-- Progress Ring (Circle) -->
      <svg
        v-if="effectiveVisualization === 'ring' && progressRx === '50%'"
        class="playable-mini__progress"
        viewBox="0 0 48 48"
      >
        <circle
          class="playable-mini__progress-track"
          cx="24" cy="24" r="22"
          fill="none"
          :stroke="trackColor || progressColor || 'currentColor'"
          stroke-width="3"
          :opacity="trackColor ? 1 : 0.2"
        />
        <circle
          class="playable-mini__progress-fill"
          :class="{ 'is-fading-out': isFadingOut }"
          cx="24" cy="24" r="22"
          fill="none"
          :stroke="progressColor || 'currentColor'"
          stroke-width="3"
          :stroke-dasharray="138.2"
          :stroke-dashoffset="138.2 - (138.2 * displayProgress)"
          stroke-linecap="round"
          transform="rotate(-90 24 24)"
        />
      </svg>

      <!-- Progress Ring (Rounded Rect / Square) -->
      <svg
        v-else-if="effectiveVisualization === 'ring'"
        class="playable-mini__progress"
        viewBox="0 0 48 48"
      >
        <rect
          class="playable-mini__progress-track"
          x="3" y="3" width="42" height="42"
          :rx="progressRx"
          fill="none"
          :stroke="trackColor || progressColor || 'currentColor'"
          stroke-width="3"
          :opacity="trackColor ? 1 : 0.2"
        />
        <rect
          class="playable-mini__progress-fill playable-mini__progress-fill--rect"
          :class="{ 'is-fading-out': isFadingOut }"
          x="3" y="3" width="42" height="42"
          :rx="progressRx"
          fill="none"
          :stroke="progressColor || 'currentColor'"
          stroke-width="3"
          :stroke-dasharray="rectPerimeter"
          :stroke-dashoffset="rectPerimeter - (rectPerimeter * displayProgress)"
          stroke-linecap="square"
        />
      </svg>

      <!-- Pulse rings (shown when playing with pulse visualization) -->
      <span v-if="effectiveVisualization === 'pulse'" class="playable-mini__pulse-ring"></span>

      <!-- Expanding rings (shown when playing with rings visualization) -->
      <template v-if="effectiveVisualization === 'rings'">
        <span class="playable-mini__ring playable-mini__ring--1"></span>
        <span class="playable-mini__ring playable-mini__ring--2"></span>
      </template>

      <!-- Error State -->
      <span v-if="hasError" class="playable-mini__icon" :style="iconStyle">
        <svg viewBox="0 0 24 24" fill="currentColor" :width="iconSize" :height="iconSize">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
        </svg>
      </span>

      <!-- Play Icon -->
      <span v-else-if="!isPlaying" class="playable-mini__icon" :style="iconStyle">
        <slot name="play-icon">
          <svg viewBox="0 0 24 24" fill="currentColor" :width="iconSize" :height="iconSize">
            <path d="M8 5v14l11-7z"/>
          </svg>
        </slot>
      </span>

      <!-- Pause Icon -->
      <span v-else class="playable-mini__icon" :style="iconStyle">
        <slot name="pause-icon">
          <svg viewBox="0 0 24 24" fill="currentColor" :width="iconSize" :height="iconSize">
            <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
          </svg>
        </slot>
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
  --pulse-color: #c4956a;
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

/* Progress Ring */
.playable-mini__progress {
  position: absolute;
  inset: -3px;
  width: calc(100% + 6px);
  height: calc(100% + 6px);
  pointer-events: none;
}

.playable-mini__progress-fill {
  /* Smooth, interpolated progress animation */
  transition: stroke-dashoffset 0.5s cubic-bezier(0.25, 0.1, 0.25, 1), opacity 0.3s ease-out;
  opacity: 1;
}

/* Fade out only the progress fill when playback ends */
.playable-mini__progress-fill.is-fading-out {
  opacity: 0;
}

/* Rect progress starts from top */
.playable-mini__progress-fill--rect {
  transform: rotate(-90deg);
  transform-origin: center;
}

/* Pulse Animation */
.playable-mini__pulse-ring {
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: var(--pulse-color);
  opacity: 0;
  z-index: -1;
  pointer-events: none;
}

.playable-mini.viz-pulse.is-playing .playable-mini__pulse-ring {
  animation: pulse-ring 1.5s ease-out infinite;
}

@keyframes pulse-ring {
  0% {
    transform: scale(1);
    opacity: 0.6;
  }
  100% {
    transform: scale(1.8);
    opacity: 0;
  }
}

/* Rings Animation */
.playable-mini__ring {
  position: absolute;
  inset: 0;
  border-radius: inherit;
  border: 2px solid var(--pulse-color);
  opacity: 0;
  z-index: -1;
  pointer-events: none;
}

.playable-mini.viz-rings.is-playing .playable-mini__ring--1 {
  animation: expanding-ring 2s ease-out infinite;
}

.playable-mini.viz-rings.is-playing .playable-mini__ring--2 {
  animation: expanding-ring 2s ease-out infinite 0.6s;
}

@keyframes expanding-ring {
  0% {
    transform: scale(1);
    opacity: 0.8;
  }
  100% {
    transform: scale(2);
    opacity: 0;
  }
}

/* Icon */
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

.playable-mini__icon i {
  font-size: 18px;
}
</style>
