<script setup>
import { computed, watch, useSlots, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useBrandStore } from '@/stores/brandStore'
import { usePlayerStore } from '@/stores/playerStore'
import { useAudioPlayback } from '@/composables/useAudioPlayback'

const props = defineProps({
  // Recording ID for real audio playback
  recordingId: {
    type: String,
    default: '276be9aa27f04d4a8251a1a372e112a2'
  },
  // Allow forcing animations for preview
  previewAnimation: {
    type: Boolean,
    default: false
  },
  // Override isPlaying state (for demos)
  isPlayingOverride: {
    type: Boolean,
    default: null
  },
  // Show progress ring (for demos)
  showProgress: {
    type: Boolean,
    default: false
  },
  // Progress value 0-1 (for demos)
  progressOverride: {
    type: Number,
    default: null
  }
})

const slots = useSlots()

const brandStore = useBrandStore()
const playerStore = usePlayerStore()

// Real audio playback
const {
  isPlaying,
  isLoading,
  hasError,
  progress,
  toggle,
  initAudio
} = useAudioPlayback()

// Initialize audio on mount
onMounted(() => {
  if (props.recordingId) {
    initAudio(props.recordingId)
  }
})

// Watch for recording ID changes
watch(() => props.recordingId, (newId) => {
  if (newId) {
    initAudio(newId)
  }
})

// Extract reactive refs from store
const {
  buttonColor,
  iconColor,
  buttonRadius,
  buttonTransparent,
  previewMode
} = storeToRefs(brandStore)

// Re-apply CSS variables when preview mode changes
watch(previewMode, () => {
  brandStore.applyCssVariables()
})

// Use prop override or real playback state
const isCurrentlyPlaying = computed(() => {
  return props.isPlayingOverride !== null ? props.isPlayingOverride : isPlaying.value
})

// Use prop progress override or real playback progress
const currentProgress = computed(() => {
  return props.progressOverride !== null ? props.progressOverride : progress.value
})

// Progress degrees for circular animation
const progressDegrees = computed(() => {
  return currentProgress.value * 360
})

// Check if we should show progress ring
const showProgressRing = computed(() => {
  return props.showProgress || playerStore.mini.animation === 'circular'
})

// Handle click - toggle real audio playback
const handleClick = () => {
  if (!isLoading.value && !hasError.value) {
    toggle()
  }
}

// Check if slots are provided
const hasPlayIconSlot = computed(() => !!slots['play-icon'])
const hasPauseIconSlot = computed(() => !!slots['pause-icon'])

const miniClasses = computed(() => [
  'player-mini',
  playerStore.miniAnimationClass,
  { 'is-playing': isCurrentlyPlaying.value }
])

const miniStyle = computed(() => ({
  ...playerStore.miniStyles,
  background: buttonTransparent.value ? 'transparent' : buttonColor.value,
  borderRadius: buttonRadius.value,
}))

const iconStyle = computed(() => ({
  color: iconColor.value,
  fill: iconColor.value,
}))

const progressFillStyle = computed(() => ({
  background: `conic-gradient(${buttonColor.value} ${progressDegrees.value}deg, transparent ${progressDegrees.value}deg)`,
}))
</script>

<template>
  <div :class="miniClasses" :style="miniStyle" @click="handleClick">
    <!-- Progress Ring -->
    <div class="player-mini__progress-ring" v-if="showProgressRing">
      <div class="player-mini__progress-track"></div>
      <div class="player-mini__progress-fill" :style="progressFillStyle"></div>
    </div>

    <!-- Loading State -->
    <template v-if="isLoading">
      <svg class="player-mini__icon player-mini__spinner" viewBox="0 0 24 24" :style="iconStyle">
        <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" stroke-width="2" opacity="0.25"/>
        <path d="M12 2a10 10 0 0 1 10 10" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      </svg>
    </template>

    <!-- Error State -->
    <template v-else-if="hasError">
      <svg class="player-mini__icon" viewBox="0 0 24 24" :style="iconStyle">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" fill="currentColor"/>
      </svg>
    </template>

    <!-- Play Icon (shown when not playing) -->
    <template v-else-if="!isCurrentlyPlaying">
      <slot name="play-icon">
        <svg class="player-mini__icon" viewBox="0 0 24 24" :style="iconStyle">
          <path d="M8 5v14l11-7z" fill="currentColor"/>
        </svg>
      </slot>
    </template>

    <!-- Pause Icon (shown when playing) -->
    <template v-else>
      <slot name="pause-icon">
        <svg class="player-mini__icon" viewBox="0 0 24 24" :style="iconStyle">
          <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" fill="currentColor"/>
        </svg>
      </slot>
    </template>
  </div>
</template>

<style scoped>
/* Player styles are in players.css */

.player-mini__spinner {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
</style>
