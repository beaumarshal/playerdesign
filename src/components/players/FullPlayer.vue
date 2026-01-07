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

// SVG path for smooth waveform
const smoothPath = computed(() => {
  const points = bars.value.map((h, i) => {
    const x = (i / (bars.value.length - 1)) * 100
    const y = 50 - (h / 24) * 40
    return `${x},${y}`
  })
  return `M ${points.join(' L ')}`
})

// SVG path for line waveform (zigzag)
const linePath = computed(() => {
  const points = bars.value.map((h, i) => {
    const x = (i / (bars.value.length - 1)) * 100
    const y = 50 + (i % 2 === 0 ? -1 : 1) * (h / 24) * 35
    return `${x},${y}`
  })
  return `M ${points.join(' L ')}`
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
            <svg viewBox="0 0 100 100" preserveAspectRatio="none">
              <path class="waveform-smooth-bg" :d="smoothPath" />
              <path
                class="waveform-smooth-fill"
                :d="smoothPath"
                :style="{ strokeDashoffset: 200 - (progress * 2) }"
              />
            </svg>
          </template>

          <!-- Line Waveform (SVG) -->
          <template v-else-if="brandStore.waveformType === 'line'">
            <svg viewBox="0 0 100 100" preserveAspectRatio="none">
              <path class="waveform-line-bg" :d="linePath" />
              <path
                class="waveform-line-fill"
                :d="linePath"
                :style="{ strokeDashoffset: 300 - (progress * 3) }"
              />
            </svg>
          </template>

          <!-- Blob Waveform (SVG) -->
          <template v-else-if="brandStore.waveformType === 'blob'">
            <svg viewBox="0 0 100 40" preserveAspectRatio="none">
              <ellipse class="blob-bg" cx="50" cy="20" rx="48" ry="18" />
              <ellipse
                class="blob-fill"
                cx="50" cy="20" rx="48" ry="18"
                :style="{ clipPath: `inset(0 ${100 - progress}% 0 0)` }"
              />
            </svg>
          </template>

          <!-- Progress Bar Waveform -->
          <template v-else-if="brandStore.waveformType === 'progress'">
            <div class="waveform-progress-track">
              <div
                class="waveform-progress-fill"
                :style="{ width: progress + '%' }"
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
