<script setup>
import { computed, onMounted } from 'vue'
import { useBrandStore } from '@/stores/brandStore'
import { usePlayerStore } from '@/stores/playerStore'
import { useWaveform } from '@/composables/useWaveform'

const brandStore = useBrandStore()
const playerStore = usePlayerStore()

// Use waveform composable for bar/dot generation
const { waveformRef, bars } = useWaveform({
  barWidth: brandStore.waveThickness || 4,
  gap: 2,
  minBars: 20,
  minHeight: 4,
  maxHeight: 24
})

onMounted(() => {
  brandStore.applyCssVariables()
})

// Computed styles
const buttonStyle = computed(() => ({
  borderRadius: brandStore.buttonRadius,
  background: brandStore.buttonTransparent ? 'transparent' : brandStore.buttonColor,
}))

const iconStyle = computed(() => ({
  color: brandStore.iconColor,
}))

// Waveform class based on type
const waveformClass = computed(() => [
  'player-full__waveform',
  `player-full__waveform--${brandStore.waveformType}`
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

// Progress percentage (mock for preview)
const progress = computed(() => 30)
</script>

<template>
  <div class="player-full" :style="{ borderRadius: brandStore.playerRadius }">
    <div class="player-full__main" :style="{ padding: brandStore.playerPaddingValue }">
      <div class="player-full__controls">
        <button class="player-full__play" :style="buttonStyle">
          <i class="fa-solid fa-play player-full__play-icon" :style="iconStyle"></i>
        </button>

        <!-- Waveform container -->
        <div ref="waveformRef" :class="waveformClass" v-if="brandStore.showWaveform">

          <!-- Bars Waveform -->
          <template v-if="brandStore.waveformType === 'bars'">
            <div
              v-for="(height, index) in bars"
              :key="index"
              class="player-full__wave-bar"
              :class="{ 'is-active': (index / bars.length) * 100 < progress }"
              :style="{
                height: height + 'px',
                width: brandStore.waveThickness + 'px'
              }"
            ></div>
          </template>

          <!-- Dots Waveform -->
          <template v-else-if="brandStore.waveformType === 'dots'">
            <div
              v-for="(height, index) in bars"
              :key="index"
              class="player-full__wave-dot"
              :class="{ 'is-active': (index / bars.length) * 100 < progress }"
              :style="{
                width: (brandStore.waveThickness + 2) + 'px',
                height: (brandStore.waveThickness + 2) + 'px'
              }"
            ></div>
          </template>

          <!-- Smooth Waveform (SVG) -->
          <template v-else-if="brandStore.waveformType === 'smooth'">
            <svg viewBox="0 0 200 32" preserveAspectRatio="none" class="waveform-svg">
              <path
                class="waveform-smooth-bg"
                :d="smoothPath"
                :style="{ strokeWidth: brandStore.waveThickness }"
              />
              <path
                class="waveform-smooth-fill"
                :d="smoothPath"
                :style="{ strokeWidth: brandStore.waveThickness, strokeDasharray: '1000', strokeDashoffset: 1000 - (progress * 10) }"
              />
            </svg>
          </template>

          <!-- Line Waveform (SVG) -->
          <template v-else-if="brandStore.waveformType === 'line'">
            <svg viewBox="0 0 200 32" preserveAspectRatio="none" class="waveform-svg">
              <path
                class="waveform-line-bg"
                :d="linePath"
                :style="{ strokeWidth: brandStore.waveThickness }"
              />
              <path
                class="waveform-line-fill"
                :d="linePath"
                :style="{ strokeWidth: brandStore.waveThickness, strokeDasharray: '1000', strokeDashoffset: 1000 - (progress * 10) }"
              />
            </svg>
          </template>

          <!-- Blob Waveform (SVG) -->
          <template v-else-if="brandStore.waveformType === 'blob'">
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
          <template v-else-if="brandStore.waveformType === 'progress'">
            <div
              class="waveform-progress-track"
              :style="{ height: brandStore.waveThickness + 'px', borderRadius: (brandStore.waveThickness / 2) + 'px' }"
            >
              <div
                class="waveform-progress-fill"
                :style="{ width: progress + '%', borderRadius: (brandStore.waveThickness / 2) + 'px' }"
              ></div>
            </div>
          </template>
        </div>

        <span class="player-full__timer" v-if="brandStore.showTimer">
          <span class="player-full__timer-current">0:00</span>
          <span>/</span>
          <span>2:34</span>
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
