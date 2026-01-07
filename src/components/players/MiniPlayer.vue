<script setup>
import { computed } from 'vue'
import { useBrandStore } from '@/stores/brandStore'
import { usePlayerStore } from '@/stores/playerStore'

const brandStore = useBrandStore()
const playerStore = usePlayerStore()

const miniClasses = computed(() => [
  'player-mini',
  playerStore.miniSizeClass,
  playerStore.miniPositionClass,
  playerStore.miniAnimationClass,
  { 'is-playing': playerStore.isPlaying }
])

const miniStyle = computed(() => ({
  background: brandStore.buttonTransparent ? 'transparent' : brandStore.buttonColor,
  borderRadius: brandStore.buttonRadius,
}))

const iconStyle = computed(() => ({
  color: brandStore.iconColor,
  fill: brandStore.iconColor,
}))
</script>

<template>
  <div :class="miniClasses" :style="miniStyle">
    <div class="player-mini__progress-ring" v-if="playerStore.mini.animation === 'circular'">
      <div class="player-mini__progress-track"></div>
      <div class="player-mini__progress-fill"></div>
    </div>
    <svg class="player-mini__icon player-mini__icon--play" viewBox="0 0 24 24" :style="iconStyle">
      <path d="M8 5v14l11-7z" fill="currentColor"/>
    </svg>
    <svg class="player-mini__icon player-mini__icon--pause" viewBox="0 0 24 24" :style="iconStyle">
      <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" fill="currentColor"/>
    </svg>
  </div>
</template>

<style scoped>
/* Player styles are in players.css */
</style>
