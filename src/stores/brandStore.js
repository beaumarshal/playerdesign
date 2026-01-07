import { defineStore } from 'pinia'

export const useBrandStore = defineStore('brand', {
  state: () => ({
    // Player container
    playerBg: '#FFFFFF',
    playerBgTransparent: false,
    playerBorder: '#E2E8F0',
    playerBorderThickness: '1px',
    playerShape: 'rounded', // 'pill' | 'rounded' | 'square' | 'custom'
    playerCustomRadius: 12,
    playerPadding: 'normal', // 'tight' | 'normal' | 'spacious' | 'custom'
    playerCustomPadding: 1,

    // Text colors
    textColor: '#0F172A',
    textSecondary: '#64748B',
    labelColor: '#64748B',
    linkColor: '#3B82F6',
    linkHover: '#2563EB',

    // Button styling
    buttonColor: '#3B82F6',
    buttonTransparent: false,
    iconColor: '#FFFFFF',
    buttonBorderColor: '#3B82F6',
    buttonBorderThickness: '0',
    buttonShape: 'pill', // 'pill' | 'rounded' | 'square' | 'custom'
    buttonCustomRadius: 8,

    // Waveform & Timer
    showWaveform: true,
    showTimer: true,
    timeFormat: 'elapsed-total', // 'elapsed-total' | 'elapsed' | 'remaining' | 'seconds' | 'mm-ss' | 'total-only'
    waveformType: 'bars', // 'bars' | 'smooth' | 'dots' | 'line' | 'blob' | 'progress'
    waveformThickness: 'normal', // 'thin' | 'normal' | 'thick' | 'custom'
    waveformCustomThickness: 4,
    waveActive: '#3B82F6',
    waveInactive: '#CBD5E1',
  }),

  getters: {
    // Computed radius for button shape
    buttonRadius: (state) => {
      switch (state.buttonShape) {
        case 'pill': return '9999px'
        case 'rounded': return '0.5rem'
        case 'square': return '0'
        case 'custom': return `${state.buttonCustomRadius}px`
        default: return '9999px'
      }
    },

    // Computed radius for player shape
    playerRadius: (state) => {
      switch (state.playerShape) {
        case 'pill': return '9999px'
        case 'rounded': return '0.75rem'
        case 'square': return '0'
        case 'custom': return `${state.playerCustomRadius}px`
        default: return '0.75rem'
      }
    },

    // Computed waveform thickness
    waveThickness: (state) => {
      switch (state.waveformThickness) {
        case 'thin': return 2
        case 'normal': return 4
        case 'thick': return 6
        case 'custom': return state.waveformCustomThickness
        default: return 4
      }
    },

    // Computed player padding
    playerPaddingValue: (state) => {
      switch (state.playerPadding) {
        case 'tight': return '0.5rem'
        case 'normal': return '1rem'
        case 'spacious': return '1.5rem'
        case 'custom': return `${state.playerCustomPadding}rem`
        default: return '1rem'
      }
    },

    // CSS variables object for player styling
    cssVariables: (state) => ({
      '--player-bg': state.playerBgTransparent ? 'transparent' : state.playerBg,
      '--player-border': state.playerBorder,
      '--player-text': state.textColor,
      '--player-text-secondary': state.textSecondary,
      '--player-primary': state.buttonColor,
      '--player-primary-hover': state.buttonColor, // Could be computed darker
      '--player-wave-active': state.waveActive,
      '--player-wave-inactive': state.waveInactive,
    }),
  },

  actions: {
    // Apply all CSS variables to document root
    applyCssVariables() {
      const root = document.documentElement
      const vars = this.cssVariables
      Object.entries(vars).forEach(([key, value]) => {
        root.style.setProperty(key, value)
      })
      // Also set custom computed values
      root.style.setProperty('--player-radius', this.playerRadius)
      root.style.setProperty('--player-button-radius', this.buttonRadius)
    },

    // Reset to defaults
    reset() {
      this.$reset()
      this.applyCssVariables()
    }
  }
})
