<script setup>
import { ref, computed, onMounted } from 'vue'
import { useBrandStore } from '@/stores/brandStore'
import { usePlayerStore } from '@/stores/playerStore'

const brandStore = useBrandStore()
const playerStore = usePlayerStore()

const waveformRef = ref(null)
const bars = ref([])

// Generate random bar heights
const generateBars = () => {
  const count = 50
  bars.value = Array.from({ length: count }, () =>
    Math.random() * 20 + 4
  )
}

onMounted(() => {
  generateBars()
  brandStore.applyCssVariables()
})

// Computed styles
const playerStyle = computed(() => ({
  borderRadius: brandStore.playerRadius,
  padding: brandStore.playerPaddingValue,
}))

const buttonStyle = computed(() => ({
  borderRadius: brandStore.buttonRadius,
  background: brandStore.buttonTransparent ? 'transparent' : brandStore.buttonColor,
}))

const iconStyle = computed(() => ({
  color: brandStore.iconColor,
}))
</script>

<template>
  <div class="player-full" :style="{ borderRadius: brandStore.playerRadius }">
    <div class="player-full__main" :style="{ padding: brandStore.playerPaddingValue }">
      <div class="player-full__controls">
        <button class="player-full__play" :style="buttonStyle">
          <i class="fa-solid fa-play player-full__play-icon" :style="iconStyle"></i>
        </button>

        <div
          ref="waveformRef"
          class="player-full__waveform player-full__waveform--bars"
        >
          <div
            v-for="(height, index) in bars"
            :key="index"
            class="player-full__wave-bar"
            :style="{
              height: height + 'px',
              width: brandStore.waveThickness + 'px'
            }"
          ></div>
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

<style scoped>
/* Player styles are in players.css - this just adds scoped overrides if needed */
</style>
