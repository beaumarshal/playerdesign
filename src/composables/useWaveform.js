import { ref, onMounted, onUnmounted, nextTick } from 'vue'

/**
 * Composable for managing waveform bar generation and resize handling
 * @param {Object} options
 * @param {number} options.barWidth - Width of each bar in pixels (default: 4)
 * @param {number} options.gap - Gap between bars in pixels (default: 2)
 * @param {number} options.minBars - Minimum number of bars (default: 20)
 * @param {number} options.minHeight - Minimum bar height (default: 4)
 * @param {number} options.maxHeight - Maximum bar height (default: 24)
 */
export function useWaveform(options = {}) {
  const {
    barWidth = 4,
    gap = 2,
    minBars = 20,
    minHeight = 4,
    maxHeight = 24
  } = options

  const waveformRef = ref(null)
  const bars = ref([])
  let resizeObserver = null

  // Generate random bar heights based on container width
  const generateBars = () => {
    if (!waveformRef.value) {
      // Fallback if ref not ready
      bars.value = Array.from({ length: 80 }, () =>
        Math.random() * (maxHeight - minHeight) + minHeight
      )
      return
    }

    const containerWidth = waveformRef.value.clientWidth
    const count = Math.floor(containerWidth / (barWidth + gap))

    bars.value = Array.from({ length: Math.max(count, minBars) }, () =>
      Math.random() * (maxHeight - minHeight) + minHeight
    )
  }

  // Initialize waveform and set up resize observer
  const initWaveform = async () => {
    await nextTick()
    generateBars()

    if (waveformRef.value && window.ResizeObserver) {
      resizeObserver = new ResizeObserver(() => {
        generateBars()
      })
      resizeObserver.observe(waveformRef.value)
    }
  }

  // Cleanup resize observer
  const cleanup = () => {
    if (resizeObserver) {
      resizeObserver.disconnect()
      resizeObserver = null
    }
  }

  onMounted(initWaveform)
  onUnmounted(cleanup)

  return {
    waveformRef,
    bars,
    generateBars,
    initWaveform,
    cleanup
  }
}
