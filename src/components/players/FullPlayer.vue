<script setup>
import { computed, onMounted, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useBrandStore } from '@/stores/brandStore'
import { usePlayerStore } from '@/stores/playerStore'
import { useWaveform } from '@/composables/useWaveform'
import { usePlayback } from '@/composables/usePlayback'

const brandStore = useBrandStore()
const playerStore = usePlayerStore()
const { togglePlayback, duration } = usePlayback()

// Extract reactive refs from store for better reactivity
const {
  buttonColor,
  iconColor,
  buttonRadius,
  buttonTransparent,
  waveThickness,
  previewMode,
  waveformType,
  showWaveform,
  showTimer,
  playerRadius
} = storeToRefs(brandStore)

// Use waveform composable for bar/dot generation
const { waveformRef, bars } = useWaveform({
  barWidth: waveThickness.value || 4,
  gap: 2,
  minBars: 20,
  minHeight: 4,
  maxHeight: 24
})

onMounted(() => {
  brandStore.applyCssVariables()
})

// Re-apply CSS variables when preview mode changes
watch(previewMode, () => {
  brandStore.applyCssVariables()
})

// Computed styles using reactive refs
const buttonStyle = computed(() => ({
  borderRadius: buttonRadius.value,
  background: buttonTransparent.value ? 'transparent' : buttonColor.value,
}))

const iconStyle = computed(() => ({
  color: iconColor.value,
}))

// Waveform class based on type
const waveformClass = computed(() => [
  'player-full__waveform',
  `player-full__waveform--${waveformType.value}`
])

// SVG path for smooth waveform (using quadratic curves for smoothness)
const smoothPath = computed(() => {
  if (bars.value.length === 0) return ''
  const width = 200
  const height = 32
  const points = bars.value.map((h, i) => ({
    x: (i / (bars.value.length - 1)) * width,
    y: height / 2 + (h - 14) * 0.8
  }))

  let path = `M 0,${height / 2}`
  points.forEach((p, i) => {
    if (i === 0) {
      path = `M ${p.x},${p.y}`
    } else {
      const prev = points[i - 1]
      const cpX = (prev.x + p.x) / 2
      path += ` Q ${cpX},${prev.y} ${p.x},${p.y}`
    }
  })
  return path
})

// SVG path for line waveform (zigzag)
const linePath = computed(() => {
  if (bars.value.length === 0) return ''
  const width = 200
  const height = 32
  const points = bars.value.map((h, i) => ({
    x: (i / (bars.value.length - 1)) * width,
    y: height / 2 + (i % 2 === 0 ? -1 : 1) * (h * 0.6)
  }))

  return `M ${points.map(p => `${p.x},${p.y}`).join(' L ')}`
})

// SVG path for blob waveform (filled organic shape with smooth curves)
const blobPath = computed(() => {
  if (bars.value.length === 0) return ''
  const width = 200
  const height = 32
  const centerY = height / 2

  // Sample fewer points for smoother curves (every 3rd bar, minimum 8 points)
  const step = Math.max(1, Math.floor(bars.value.length / 10))
  const sampledBars = bars.value.filter((_, i) => i % step === 0 || i === bars.value.length - 1)

  // Generate points with more height variation
  const topPoints = sampledBars.map((h, i) => ({
    x: (i / (sampledBars.length - 1)) * width,
    y: centerY - (h * 0.6)
  }))

  const bottomPoints = sampledBars.map((h, i) => ({
    x: (i / (sampledBars.length - 1)) * width,
    y: centerY + (h * 0.6)
  }))

  // Helper function for smooth cubic Bezier curve through points
  const smoothCurve = (points) => {
    if (points.length < 2) return ''
    let path = `M ${points[0].x},${points[0].y}`

    for (let i = 0; i < points.length - 1; i++) {
      const p0 = points[Math.max(0, i - 1)]
      const p1 = points[i]
      const p2 = points[i + 1]
      const p3 = points[Math.min(points.length - 1, i + 2)]

      // Catmull-Rom to Bezier conversion for smooth curves
      const cp1x = p1.x + (p2.x - p0.x) / 6
      const cp1y = p1.y + (p2.y - p0.y) / 6
      const cp2x = p2.x - (p3.x - p1.x) / 6
      const cp2y = p2.y - (p3.y - p1.y) / 6

      path += ` C ${cp1x},${cp1y} ${cp2x},${cp2y} ${p2.x},${p2.y}`
    }
    return path
  }

  // Build path: top edge left-to-right, then bottom edge right-to-left
  let path = smoothCurve(topPoints)
  path += ` L ${bottomPoints[bottomPoints.length - 1].x},${bottomPoints[bottomPoints.length - 1].y}`

  const reversedBottom = [...bottomPoints].reverse()
  for (let i = 0; i < reversedBottom.length - 1; i++) {
    const p0 = reversedBottom[Math.max(0, i - 1)]
    const p1 = reversedBottom[i]
    const p2 = reversedBottom[i + 1]
    const p3 = reversedBottom[Math.min(reversedBottom.length - 1, i + 2)]

    const cp1x = p1.x + (p2.x - p0.x) / 6
    const cp1y = p1.y + (p2.y - p0.y) / 6
    const cp2x = p2.x - (p3.x - p1.x) / 6
    const cp2y = p2.y - (p3.y - p1.y) / 6

    path += ` C ${cp1x},${cp1y} ${cp2x},${cp2y} ${p2.x},${p2.y}`
  }

  path += ' Z'
  return path
})

// Progress percentage from store (0-100)
const progress = computed(() => playerStore.progress * 100)

// Format time as m:ss
const formatTime = (seconds) => {
  const m = Math.floor(seconds / 60)
  const s = Math.floor(seconds % 60)
  return `${m}:${s.toString().padStart(2, '0')}`
}

// Current and total time display
const currentTime = computed(() => formatTime(playerStore.progress * duration))
const totalTime = computed(() => formatTime(duration))
</script>

<template>
  <div class="player-full" :class="{ 'is-playing': playerStore.isPlaying }" :style="{ borderRadius: playerRadius }">
    <div class="player-full__main" :style="{ padding: brandStore.playerPaddingValue }">
      <div class="player-full__controls">
        <button class="player-full__play" :style="buttonStyle" @click="togglePlayback">
          <i v-if="!playerStore.isPlaying" class="fa-solid fa-play player-full__play-icon" :style="iconStyle"></i>
          <i v-else class="fa-solid fa-pause player-full__play-icon" :style="iconStyle"></i>
        </button>

        <!-- Waveform container -->
        <div ref="waveformRef" :class="waveformClass" v-if="showWaveform">

          <!-- Bars Waveform -->
          <template v-if="waveformType === 'bars'">
            <div
              v-for="(height, index) in bars"
              :key="index"
              class="player-full__wave-bar"
              :class="{ 'is-active': (index / bars.length) * 100 < progress }"
              :style="{
                height: height + 'px',
                width: waveThickness + 'px'
              }"
            ></div>
          </template>

          <!-- Dots Waveform -->
          <template v-else-if="waveformType === 'dots'">
            <div
              v-for="(height, index) in bars"
              :key="index"
              class="player-full__wave-dot"
              :class="{ 'is-active': (index / bars.length) * 100 < progress }"
              :style="{
                width: (waveThickness + 2) + 'px',
                height: (waveThickness + 2) + 'px'
              }"
            ></div>
          </template>

          <!-- Smooth Waveform (SVG) -->
          <template v-else-if="waveformType === 'smooth'">
            <svg viewBox="0 0 200 32" preserveAspectRatio="none" class="waveform-svg">
              <path
                class="waveform-smooth-bg"
                :d="smoothPath"
                :style="{ strokeWidth: waveThickness }"
              />
              <path
                class="waveform-smooth-fill"
                :d="smoothPath"
                :style="{ strokeWidth: waveThickness, strokeDasharray: '1000', strokeDashoffset: 1000 - (progress * 10) }"
              />
            </svg>
          </template>

          <!-- Line Waveform (SVG) -->
          <template v-else-if="waveformType === 'line'">
            <svg viewBox="0 0 200 32" preserveAspectRatio="none" class="waveform-svg">
              <path
                class="waveform-line-bg"
                :d="linePath"
                :style="{ strokeWidth: waveThickness }"
              />
              <path
                class="waveform-line-fill"
                :d="linePath"
                :style="{ strokeWidth: waveThickness, strokeDasharray: '1000', strokeDashoffset: 1000 - (progress * 10) }"
              />
            </svg>
          </template>

          <!-- Blob Waveform (SVG) -->
          <template v-else-if="waveformType === 'blob'">
            <svg viewBox="0 0 200 32" preserveAspectRatio="none" class="waveform-svg">
              <defs>
                <clipPath id="blob-progress-full">
                  <rect x="0" y="0" :width="progress * 2" height="32" />
                </clipPath>
              </defs>
              <path class="blob-bg" :d="blobPath" />
              <path class="blob-fill" :d="blobPath" clip-path="url(#blob-progress-full)" />
            </svg>
          </template>

          <!-- Progress Bar Waveform -->
          <template v-else-if="waveformType === 'progress'">
            <div
              class="waveform-progress-track"
              :style="{ height: waveThickness + 'px', borderRadius: (waveThickness / 2) + 'px' }"
            >
              <div
                class="waveform-progress-fill"
                :style="{ width: progress + '%', borderRadius: (waveThickness / 2) + 'px' }"
              ></div>
            </div>
          </template>
        </div>

        <span class="player-full__timer" v-if="showTimer">
          <span class="player-full__timer-current">{{ currentTime }}</span>
          <span>/</span>
          <span>{{ totalTime }}</span>
        </span>
      </div>
    </div>

    <!-- Transcript Section -->
    <div
      v-if="playerStore.full.showTranscript"
      class="player-full__transcript-section"
      :style="{ background: playerStore.full.transcriptBg }"
    >
      <div class="player-full__transcript-label">Transcript</div>
      <p class="player-full__transcript-text">
        Welcome to our audio experience. This is a sample transcript that demonstrates how the transcript section appears within the player...
      </p>
      <a class="player-full__transcript-more">Show more</a>
    </div>
  </div>
</template>
