import { ref, onUnmounted, watch } from 'vue'

/**
 * Audio playback composable for 44.audio recordings
 * Handles real audio playback with progress tracking
 */
export function useAudioPlayback(recordingId = null) {
  const audio = ref(null)
  const isPlaying = ref(false)
  const isLoading = ref(false)
  const hasError = ref(false)
  const progress = ref(0)
  const duration = ref(0)
  const currentTime = ref(0)

  const getAudioUrl = (id) => {
    // Use the API endpoint which redirects to CDN
    return `https://api.44.audio/v1/recordings/${id}/audio.mp3`
  }

  const initAudio = (id) => {
    if (!id) return

    // Clean up existing audio
    if (audio.value) {
      audio.value.pause()
      audio.value.src = ''
      audio.value = null
    }

    isLoading.value = true
    hasError.value = false
    progress.value = 0

    const audioEl = new Audio()
    // Don't set crossOrigin - let browser handle redirect naturally
    audioEl.preload = 'metadata'
    audioEl.src = getAudioUrl(id)

    audioEl.addEventListener('loadedmetadata', () => {
      duration.value = audioEl.duration
      isLoading.value = false
    })

    audioEl.addEventListener('canplaythrough', () => {
      isLoading.value = false
    })

    audioEl.addEventListener('timeupdate', () => {
      currentTime.value = audioEl.currentTime
      if (duration.value > 0) {
        progress.value = audioEl.currentTime / duration.value
      }
    })

    audioEl.addEventListener('ended', () => {
      isPlaying.value = false
      progress.value = 0
      currentTime.value = 0
    })

    audioEl.addEventListener('error', (e) => {
      console.error('Audio load error:', audioEl.error?.message || 'Unknown error', audioEl.src)
      hasError.value = true
      isLoading.value = false
    })

    audioEl.addEventListener('play', () => {
      isPlaying.value = true
    })

    // Start loading
    audioEl.load()

    audioEl.addEventListener('pause', () => {
      isPlaying.value = false
    })

    audio.value = audioEl
  }

  const play = () => {
    if (audio.value && !isLoading.value && !hasError.value) {
      audio.value.play().catch(err => {
        console.error('Play error:', err)
        hasError.value = true
      })
    }
  }

  const pause = () => {
    if (audio.value) {
      audio.value.pause()
    }
  }

  const toggle = () => {
    if (isPlaying.value) {
      pause()
    } else {
      play()
    }
  }

  const seek = (time) => {
    if (audio.value && duration.value > 0) {
      audio.value.currentTime = time
    }
  }

  const seekToProgress = (progressValue) => {
    if (audio.value && duration.value > 0) {
      audio.value.currentTime = progressValue * duration.value
    }
  }

  // Initialize if recordingId provided
  if (recordingId) {
    initAudio(recordingId)
  }

  // Cleanup on unmount
  onUnmounted(() => {
    if (audio.value) {
      audio.value.pause()
      audio.value.src = ''
      audio.value = null
    }
  })

  return {
    // State
    isPlaying,
    isLoading,
    hasError,
    progress,
    duration,
    currentTime,
    // Methods
    initAudio,
    play,
    pause,
    toggle,
    seek,
    seekToProgress,
    getAudioUrl,
  }
}
