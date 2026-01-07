import { defineStore } from 'pinia'

export const usePlayerStore = defineStore('player', {
  state: () => ({
    // Full player specific options
    full: {
      showTranscript: false,
      showTranslation: false,
      transcriptBg: '#F1F5F9',
    },

    // Mini player specific options
    mini: {
      size: 'md', // 'sm' | 'md' | 'lg'
      position: 'center', // 'center' | 'bottom-left' | 'bottom-center' | 'bottom-right'
      animation: 'circular', // 'none' | 'circular' | 'pulse' | 'rings'
    },

    // Pill player specific options
    pill: {
      size: 'md', // 'xs' | 'sm' | 'md' | 'lg' | 'custom'
      customSize: 44,
    },

    // Playback state
    isPlaying: false,
    progress: 0, // 0-1
  }),

  getters: {
    // Mini player size classes
    miniSizeClass: (state) => `player-mini--${state.mini.size}`,

    // Mini player position class
    miniPositionClass: (state) => `player-mini--${state.mini.position}`,

    // Mini player animation class
    miniAnimationClass: (state) => {
      if (state.mini.animation === 'none' || state.mini.animation === 'circular') {
        return ''
      }
      return `player-mini--${state.mini.animation}`
    },

    // Pill player size styles
    pillStyles: (state) => {
      const presets = {
        xs: { height: '1.75rem', padding: '0.25rem 0.625rem 0.25rem 0.25rem', btnSize: '1.375rem', fontSize: '0.625rem', gap: '0.375rem' },
        sm: { height: '2.25rem', padding: '0.3rem 0.75rem 0.3rem 0.3rem', btnSize: '1.625rem', fontSize: '0.6875rem', gap: '0.5rem' },
        md: { height: '2.75rem', padding: '0.375rem 0.875rem 0.375rem 0.375rem', btnSize: '2rem', fontSize: '0.75rem', gap: '0.625rem' },
        lg: { height: '3.5rem', padding: '0.5rem 1rem 0.5rem 0.5rem', btnSize: '2.5rem', fontSize: '0.875rem', gap: '0.75rem' },
      }

      if (state.pill.size === 'custom') {
        const h = state.pill.customSize
        const scale = h / 44 // Base size is 44px (md)
        return {
          height: `${h}px`,
          padding: `${Math.round(6 * scale)}px ${Math.round(14 * scale)}px ${Math.round(6 * scale)}px ${Math.round(6 * scale)}px`,
          btnSize: `${Math.round(32 * scale)}px`,
          fontSize: `${Math.max(9, Math.round(11 * scale))}px`,
          gap: `${Math.round(10 * scale)}px`,
        }
      }

      return presets[state.pill.size] || presets.md
    },
  },

  actions: {
    // Toggle play/pause
    togglePlay() {
      this.isPlaying = !this.isPlaying
    },

    // Set progress
    setProgress(value) {
      this.progress = Math.max(0, Math.min(1, value))
    },

    // Reset playback
    resetPlayback() {
      this.isPlaying = false
      this.progress = 0
    },

    // Update full player options
    updateFullOption(key, value) {
      if (key in this.full) {
        this.full[key] = value
      }
    },

    // Update mini player options
    updateMiniOption(key, value) {
      if (key in this.mini) {
        this.mini[key] = value
      }
    },

    // Update pill player options
    updatePillOption(key, value) {
      if (key in this.pill) {
        this.pill[key] = value
      }
    },
  }
})
