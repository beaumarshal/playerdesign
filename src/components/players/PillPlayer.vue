<script setup>
import { ref, computed, onMounted } from 'vue'
import { useBrandStore } from '@/stores/brandStore'
import { usePlayerStore } from '@/stores/playerStore'

const brandStore = useBrandStore()
const playerStore = usePlayerStore()

const bars = ref([])

// Generate random bar heights for waveform
const generateBars = () => {
  const count = 20
  bars.value = Array.from({ length: count }, () =>
    Math.random() * 10 + 3
  )
}

onMounted(() => {
  generateBars()
})

const pillStyle = computed(() => {
  const styles = playerStore.pillStyles
  return {
    height: styles.height,
    padding: styles.padding,
    gap: styles.gap,
    borderRadius: brandStore.playerRadius,
  }
})

const buttonStyle = computed(() => {
  const styles = playerStore.pillStyles
  return {
    width: styles.btnSize,
    height: styles.btnSize,
    borderRadius: brandStore.buttonRadius,
    background: brandStore.buttonTransparent ? 'transparent' : brandStore.buttonColor,
  }
})

const timerStyle = computed(() => ({
  fontSize: playerStore.pillStyles.fontSize,
}))

const iconStyle = computed(() => ({
  color: brandStore.iconColor,
}))

// Waveform class based on type
const waveformClass = computed(() => [
  'player-pill__waveform',
  `player-full__waveform--${brandStore.waveformType}`
])

// SVG path for smooth waveform
const smoothPath = computed(() => {
  const points = bars.value.map((h, i) => {
    const x = (i / (bars.value.length - 1)) * 100
    const y = 50 - (h / 13) * 40
    return `${x},${y}`
  })
  return `M ${points.join(' L ')}`
})

// SVG path for line waveform
const linePath = computed(() => {
  const points = bars.value.map((h, i) => {
    const x = (i / (bars.value.length - 1)) * 100
    const y = 50 + (i % 2 === 0 ? -1 : 1) * (h / 13) * 35
    return `${x},${y}`
  })
  return `M ${points.join(' L ')}`
})

// Progress percentage (mock for preview)
const progress = computed(() => 30)
</script>

<template>
  <div class="player-pill" :style="pillStyle">
    <button class="player-pill__play" :style="buttonStyle">
      <i class="fa-solid fa-play player-pill__play-icon" :style="iconStyle"></i>
    </button>

    <!-- Waveform container -->
    <div :class="waveformClass" v-if="brandStore.showWaveform">

      <!-- Bars Waveform -->
      <template v-if="brandStore.waveformType === 'bars'">
        <div
          v-for="(height, index) in bars"
          :key="index"
          class="player-pill__wave-bar"
          :class="{ 'is-active': (index / bars.length) * 100 < progress }"
          :style="{ height: height + 'px' }"
        ></div>
      </template>

      <!-- Dots Waveform -->
      <template v-else-if="brandStore.waveformType === 'dots'">
        <div
          v-for="(height, index) in bars"
          :key="index"
          class="player-pill__wave-dot"
          :class="{ 'is-active': (index / bars.length) * 100 < progress }"
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

    <span class="player-pill__timer" v-if="brandStore.showTimer" :style="timerStyle">
      0:00 / 1:24
    </span>
  </div>
</template>
