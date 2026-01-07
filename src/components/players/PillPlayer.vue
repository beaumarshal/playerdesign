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
</script>

<template>
  <div class="player-pill" :style="pillStyle">
    <button class="player-pill__play" :style="buttonStyle">
      <i class="fa-solid fa-play player-pill__play-icon" :style="iconStyle"></i>
    </button>

    <div class="player-pill__waveform" v-if="brandStore.showWaveform">
      <div
        v-for="(height, index) in bars"
        :key="index"
        class="player-pill__wave-bar"
        :style="{ height: height + 'px' }"
      ></div>
    </div>

    <span class="player-pill__timer" v-if="brandStore.showTimer" :style="timerStyle">
      0:00 / 1:24
    </span>
  </div>
</template>

<style scoped>
/* Player styles are in players.css */
</style>
