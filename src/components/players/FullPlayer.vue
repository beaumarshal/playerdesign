<script setup>
import { computed, onMounted } from 'vue'
import { useBrandStore } from '@/stores/brandStore'
import { usePlayerStore } from '@/stores/playerStore'
import { useWaveform } from '@/composables/useWaveform'

const brandStore = useBrandStore()
const playerStore = usePlayerStore()

// Use waveform composable for bar generation
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
