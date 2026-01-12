<script setup>
import { computed, onMounted, watch, ref } from 'vue'
import { useAudioPlayback } from '@/composables/useAudioPlayback'

const emit = defineEmits(['play', 'pause', 'ended', 'timeupdate'])

let wasPlaying = false

const props = defineProps({
  recordingId: {
    type: String,
    required: true
  },
  // Size preset: 'sm', 'md', 'lg'
  size: {
    type: String,
    default: 'md'
  },
  // Waveform type: 'bars', 'dots', 'smooth', 'line', 'progress', 'none'
  waveform: {
    type: String,
    default: 'bars'
  },
  // Show timer
  showTimer: {
    type: Boolean,
    default: true
  },
  // Style overrides
  bgColor: {
    type: String,
    default: null
  },
  buttonColor: {
    type: String,
    default: null
  },
  iconColor: {
    type: String,
    default: null
  },
  waveColor: {
    type: String,
    default: null
  },
  waveActiveColor: {
    type: String,
    default: null
  },
  textColor: {
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
  // Disable all container styling (for blob background)
  noContainerStyle: {
    type: Boolean,
    default: false
  },
  // Custom waveform width (e.g. '40px', '60px')
  waveformWidth: {
    type: String,
    default: null
  },
  // Expand from button-only to full pill on play
  expandOnPlay: {
    type: Boolean,
    default: false
  }
})

const {
  isPlaying,
  hasError,
  progress,
  duration,
  currentTime,
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

// Emit events
watch(isPlaying, (newVal) => {
  if (newVal && !wasPlaying) {
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

watch(currentTime, (time) => {
  emit('timeupdate', {
    currentTime: time,
    duration: duration.value,
    remaining: duration.value - time
  })
})

// Size presets
const sizeStyles = computed(() => {
  const sizes = {
    sm: { height: '36px', padding: '4px 12px 4px 4px', btnSize: '28px', fontSize: '11px', gap: '8px' },
    md: { height: '44px', padding: '6px 14px 6px 6px', btnSize: '32px', fontSize: '12px', gap: '10px' },
    lg: { height: '52px', padding: '8px 16px 8px 8px', btnSize: '36px', fontSize: '13px', gap: '12px' }
  }
  return sizes[props.size] || sizes.md
})

// Generate waveform bars
const bars = ref([])
const generateBars = () => {
  bars.value = Array.from({ length: 20 }, () => Math.random() * 12 + 4)
}
onMounted(generateBars)

// Format time
const formatTime = (seconds) => {
  if (!seconds || isNaN(seconds)) return '0:00'
  const m = Math.floor(seconds / 60)
  const s = Math.floor(seconds % 60)
  return `${m}:${s.toString().padStart(2, '0')}`
}

const displayCurrentTime = computed(() => formatTime(currentTime.value))
const displayDuration = computed(() => formatTime(duration.value))
const progressPercent = computed(() => progress.value * 100)

// Smooth waveform SVG path
const smoothPath = computed(() => {
  if (bars.value.length === 0) return ''
  const width = 200
  const height = 32
  const points = bars.value.map((h, i) => ({
    x: (i / (bars.value.length - 1)) * width,
    y: height / 2 + (h - 8) * 1.2
  }))

  let path = `M ${points[0].x},${points[0].y}`
  points.forEach((p, i) => {
    if (i > 0) {
      const prev = points[i - 1]
      const cpX = (prev.x + p.x) / 2
      path += ` Q ${cpX},${prev.y} ${p.x},${p.y}`
    }
  })
  return path
})

// Line waveform SVG path
const linePath = computed(() => {
  if (bars.value.length === 0) return ''
  const width = 200
  const height = 32
  const points = bars.value.map((h, i) => ({
    x: (i / (bars.value.length - 1)) * width,
    y: height / 2 + (i % 2 === 0 ? -1 : 1) * (h * 0.8)
  }))
  return `M ${points.map(p => `${p.x},${p.y}`).join(' L ')}`
})

// Styles
const pillStyle = computed(() => ({
  height: sizeStyles.value.height,
  padding: sizeStyles.value.padding,
  gap: sizeStyles.value.gap,
  ...(props.bgColor && { background: props.bgColor }),
  ...(props.borderRadius && { borderRadius: props.borderRadius }),
  ...(props.border && { border: props.border }),
}))

const buttonStyle = computed(() => ({
  width: sizeStyles.value.btnSize,
  height: sizeStyles.value.btnSize,
  ...(props.buttonColor && { background: props.buttonColor }),
}))

const iconStyle = computed(() => ({
  ...(props.iconColor && { color: props.iconColor }),
}))

const timerStyle = computed(() => ({
  fontSize: sizeStyles.value.fontSize,
  ...(props.textColor && { color: props.textColor }),
}))

const waveformStyle = computed(() => ({
  ...(props.waveformWidth && { width: props.waveformWidth, minWidth: props.waveformWidth, flex: 'none' }),
}))

// For expandable pill - expand while playing, collapse when done
const isExpanded = computed(() => {
  if (!props.expandOnPlay) return true
  return isPlaying.value
})
</script>

<template>
  <div
    class="playable-pill"
    :class="{
      'is-playing': isPlaying,
      'is-error': hasError,
      'no-container-style': noContainerStyle,
      'is-expandable': expandOnPlay,
      'is-expanded': isExpanded
    }"
    :style="pillStyle"
  >
    <button
      class="playable-pill__button"
      :style="buttonStyle"
      :disabled="hasError"
      @click="toggle"
    >
      <!-- Error icon -->
      <i v-if="hasError" class="fa-solid fa-exclamation" :style="iconStyle"></i>
      <!-- Play icon -->
      <i v-else-if="!isPlaying" class="fa-solid fa-play" :style="iconStyle"></i>
      <!-- Pause icon -->
      <i v-else class="fa-solid fa-pause" :style="iconStyle"></i>
    </button>

    <!-- Waveform -->
    <div v-if="waveform !== 'none'" class="playable-pill__waveform" :style="waveformStyle">
      <!-- Bars -->
      <template v-if="waveform === 'bars'">
        <div
          v-for="(height, index) in bars"
          :key="index"
          class="playable-pill__bar"
          :class="{ 'is-active': (index / bars.length) * 100 < progressPercent }"
          :style="{
            height: height + 'px',
            '--wave-color': waveColor,
            '--wave-active-color': waveActiveColor
          }"
        ></div>
      </template>

      <!-- Dots -->
      <template v-else-if="waveform === 'dots'">
        <div
          v-for="(height, index) in bars"
          :key="index"
          class="playable-pill__dot"
          :class="{ 'is-active': (index / bars.length) * 100 < progressPercent }"
          :style="{
            '--wave-color': waveColor,
            '--wave-active-color': waveActiveColor
          }"
        ></div>
      </template>

      <!-- Smooth SVG -->
      <template v-else-if="waveform === 'smooth'">
        <svg viewBox="0 0 200 32" preserveAspectRatio="none" class="playable-pill__svg">
          <path
            class="playable-pill__svg-bg"
            :d="smoothPath"
            :style="{ stroke: waveColor }"
          />
          <path
            class="playable-pill__svg-fill"
            :d="smoothPath"
            :style="{
              stroke: waveActiveColor,
              strokeDasharray: '1000',
              strokeDashoffset: 1000 - (progressPercent * 10)
            }"
          />
        </svg>
      </template>

      <!-- Line SVG -->
      <template v-else-if="waveform === 'line'">
        <svg viewBox="0 0 200 32" preserveAspectRatio="none" class="playable-pill__svg">
          <path
            class="playable-pill__svg-bg"
            :d="linePath"
            :style="{ stroke: waveColor }"
          />
          <path
            class="playable-pill__svg-fill"
            :d="linePath"
            :style="{
              stroke: waveActiveColor,
              strokeDasharray: '1000',
              strokeDashoffset: 1000 - (progressPercent * 10)
            }"
          />
        </svg>
      </template>

      <!-- Progress bar -->
      <template v-else-if="waveform === 'progress'">
        <div class="playable-pill__progress-track" :style="{ background: waveColor }">
          <div
            class="playable-pill__progress-fill"
            :style="{ width: progressPercent + '%', background: waveActiveColor }"
          ></div>
        </div>
      </template>
    </div>

    <!-- Timer -->
    <span v-if="showTimer" class="playable-pill__timer" :style="timerStyle">
      {{ displayCurrentTime }} / {{ displayDuration }}
    </span>
  </div>
</template>

<style scoped>
.playable-pill {
  display: inline-flex;
  align-items: center;
  background: #f5f5f5;
  border-radius: 999px;
  height: 44px;
  padding: 6px 14px 6px 6px;
  gap: 10px;
  transition: box-shadow 0.2s ease;
}

.playable-pill:hover {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.playable-pill.no-container-style {
  background: transparent !important;
  box-shadow: none !important;
}

.playable-pill.no-container-style:hover {
  box-shadow: none !important;
}

.playable-pill.no-container-style .playable-pill__button {
  background: transparent !important;
}

.playable-pill.no-container-style .playable-pill__button:hover {
  transform: none !important;
}

/* Expandable pill - slides open from button to full pill */
.playable-pill.is-expandable {
  width: 44px;
  padding: 6px;
  overflow: hidden;
  transition: width 0.5s cubic-bezier(0.4, 0, 0.2, 1), padding 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.playable-pill.is-expandable.is-expanded {
  width: 220px;
  padding: 6px 14px 6px 6px;
}

.playable-pill.is-expandable .playable-pill__waveform,
.playable-pill.is-expandable .playable-pill__timer {
  opacity: 0;
  transition: opacity 0.3s ease 0.1s;
}

.playable-pill.is-expandable.is-expanded .playable-pill__waveform,
.playable-pill.is-expandable.is-expanded .playable-pill__timer {
  opacity: 1;
}

.playable-pill.is-error {
  opacity: 0.7;
}

.playable-pill__button {
  flex-shrink: 0;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: none;
  background: #c4956a;
  color: #fff;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.15s ease, background 0.15s ease;
}

.playable-pill__button:hover:not(:disabled) {
  transform: scale(1.05);
}

.playable-pill__button:active:not(:disabled) {
  transform: scale(0.95);
}

.playable-pill__button:disabled {
  cursor: not-allowed;
  background: #ef4444;
}

.playable-pill__button i {
  font-size: 12px;
}

.playable-pill__button i.fa-play {
  margin-left: 2px;
}

/* Waveform container */
.playable-pill__waveform {
  flex: 1;
  min-width: 80px;
  height: 24px;
  display: flex;
  align-items: center;
  gap: 2px;
}

/* Bars */
.playable-pill__bar {
  flex: 1;
  max-width: 4px;
  background: var(--wave-color, #d1d5db);
  border-radius: 2px;
  transition: background 0.15s ease;
}

.playable-pill__bar.is-active {
  background: var(--wave-active-color, #c4956a);
}

/* Dots */
.playable-pill__dot {
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: var(--wave-color, #d1d5db);
  transition: background 0.15s ease;
}

.playable-pill__dot.is-active {
  background: var(--wave-active-color, #c4956a);
}

/* SVG waveforms */
.playable-pill__svg {
  width: 100%;
  height: 100%;
}

.playable-pill__svg-bg {
  fill: none;
  stroke: #d1d5db;
  stroke-width: 2;
  stroke-linecap: round;
}

.playable-pill__svg-fill {
  fill: none;
  stroke: #c4956a;
  stroke-width: 2;
  stroke-linecap: round;
  transition: stroke-dashoffset 0.3s ease;
}

/* Progress bar */
.playable-pill__progress-track {
  flex: 1;
  height: 4px;
  background: #d1d5db;
  border-radius: 2px;
  overflow: hidden;
}

.playable-pill__progress-fill {
  height: 100%;
  background: #c4956a;
  border-radius: 2px;
  transition: width 0.3s ease;
}

/* Timer */
.playable-pill__timer {
  flex-shrink: 0;
  font-size: 12px;
  font-weight: 500;
  color: #6b7280;
  font-variant-numeric: tabular-nums;
  min-width: 65px;
  text-align: right;
}
</style>
