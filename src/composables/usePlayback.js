import { ref, onUnmounted } from 'vue'
import { usePlayerStore } from '@/stores/playerStore'

/**
 * Playback composable for player components
 * Handles 60-second playback simulation with progress animation
 */
export function usePlayback() {
  const playerStore = usePlayerStore()
  const duration = 60 // 60 seconds
  const animationFrame = ref(null)
  const startTime = ref(null)

  const startPlayback = () => {
    if (playerStore.isPlaying) return

    playerStore.isPlaying = true
    startTime.value = Date.now() - (playerStore.progress * duration * 1000)

    const animate = () => {
      const elapsed = Date.now() - startTime.value
      const progress = Math.min(elapsed / (duration * 1000), 1)

      playerStore.setProgress(progress)

      if (progress >= 1) {
        // Playback complete - reset
        playerStore.isPlaying = false
        playerStore.setProgress(0)
        startTime.value = null
      } else if (playerStore.isPlaying) {
        animationFrame.value = requestAnimationFrame(animate)
      }
    }

    animationFrame.value = requestAnimationFrame(animate)
  }

  const pausePlayback = () => {
    playerStore.isPlaying = false
    if (animationFrame.value) {
      cancelAnimationFrame(animationFrame.value)
      animationFrame.value = null
    }
  }

  const togglePlayback = () => {
    if (playerStore.isPlaying) {
      pausePlayback()
    } else {
      startPlayback()
    }
  }

  const resetPlayback = () => {
    pausePlayback()
    playerStore.setProgress(0)
    startTime.value = null
  }

  // Cleanup on unmount
  onUnmounted(() => {
    if (animationFrame.value) {
      cancelAnimationFrame(animationFrame.value)
    }
  })

  return {
    togglePlayback,
    startPlayback,
    pausePlayback,
    resetPlayback,
    duration,
  }
}
