import { ref, onUnmounted, watch } from 'vue'

/**
 * Audio playback composable for 44.audio recordings
 * Handles real audio playback with progress tracking and audio level analysis
 */
export function useAudioPlayback(recordingId = null) {
  const audio = ref(null)
  const isPlaying = ref(false)
  const isLoading = ref(false)
  const hasError = ref(false)
  const progress = ref(0)
  const duration = ref(0)
  const currentTime = ref(0)
  const audioLevel = ref(0) // 0-1 normalized audio level for voice-reactive animations

  // Web Audio API for level analysis
  let audioContext = null
  let analyser = null
  let source = null
  let levelAnimationFrame = null

  const getAudioUrl = (id) => {
    // Direct CDN URL - format the ID with dashes
    const formattedId = id.replace(/(.{8})(.{4})(.{4})(.{4})(.{12})/, '$1-$2-$3-$4-$5')
    return `https://audio.44.audio/projects/4c5c20bc-60d6-493b-8fcb-1f9add90dad9/recordings/${formattedId}.mp3`
  }

  const initAudio = (id) => {
    if (!id) return

    // Clean up existing audio
    if (audio.value) {
      audio.value.pause()
      // Remove event listeners before clearing src to avoid error events
      audio.value.onloadedmetadata = null
      audio.value.oncanplaythrough = null
      audio.value.ontimeupdate = null
      audio.value.onended = null
      audio.value.onerror = null
      audio.value.onplay = null
      audio.value.onpause = null
      audio.value = null
    }

    isLoading.value = true
    hasError.value = false
    progress.value = 0

    const audioEl = new Audio()
    // Note: crossOrigin causes failures due to redirect chain CORS issues
    // Audio still plays without it, but Web Audio analyser won't get data
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
      setupAudioAnalyser()
      startLevelAnalysis()
    })

    // Start loading
    audioEl.load()

    audioEl.addEventListener('pause', () => {
      isPlaying.value = false
      stopLevelAnalysis()
    })

    audio.value = audioEl
  }

  // Set up Web Audio API analyser for voice-reactive animations
  const setupAudioAnalyser = () => {
    if (!audio.value || audioContext) return

    try {
      audioContext = new (window.AudioContext || window.webkitAudioContext)()
      analyser = audioContext.createAnalyser()
      analyser.fftSize = 256
      analyser.smoothingTimeConstant = 0.8

      source = audioContext.createMediaElementSource(audio.value)
      source.connect(analyser)
      analyser.connect(audioContext.destination)
    } catch (e) {
      console.warn('Could not set up audio analyser:', e)
    }
  }

  // Analyze audio levels in real-time
  const startLevelAnalysis = () => {
    if (!analyser) return

    const dataArray = new Uint8Array(analyser.frequencyBinCount)

    const analyze = () => {
      if (!isPlaying.value) return

      analyser.getByteFrequencyData(dataArray)

      // Calculate average level across frequency bins
      let sum = 0
      for (let i = 0; i < dataArray.length; i++) {
        sum += dataArray[i]
      }
      const average = sum / dataArray.length

      // Normalize to 0-1 range
      audioLevel.value = Math.min(1, average / 128)

      levelAnimationFrame = requestAnimationFrame(analyze)
    }

    analyze()
  }

  const stopLevelAnalysis = () => {
    if (levelAnimationFrame) {
      cancelAnimationFrame(levelAnimationFrame)
      levelAnimationFrame = null
    }
    audioLevel.value = 0
  }

  const play = () => {
    if (audio.value && !hasError.value) {
      // Play even if still loading - browser will start when ready
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
    stopLevelAnalysis()
    if (audioContext) {
      audioContext.close()
      audioContext = null
    }
    if (audio.value) {
      audio.value.pause()
      // Clear listeners to avoid error events during cleanup
      audio.value.onloadedmetadata = null
      audio.value.oncanplaythrough = null
      audio.value.ontimeupdate = null
      audio.value.onended = null
      audio.value.onerror = null
      audio.value.onplay = null
      audio.value.onpause = null
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
    audioLevel, // 0-1 normalized level for voice-reactive animations
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
