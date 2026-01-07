import { defineStore } from 'pinia'

export const useBrandStore = defineStore('brand', {
  state: () => ({
    // Player container - Desert Waveform palette
    playerBg: '#faf8f5',           // Sand background
    playerBgTransparent: false,
    playerBorder: '#d9d4cc',        // Soft border
    playerBorderThickness: '1px',
    playerShape: 'rounded',
    playerCustomRadius: 12,
    playerPadding: 'normal',
    playerCustomPadding: 1,

    // Text colors - Warm earth tones
    textColor: '#2c2620',           // Warm charcoal
    textSecondary: '#8c8279',       // Muted text
    labelColor: '#8c8279',
    linkColor: '#c4956a',           // Warm amber
    linkHover: '#a67d52',           // Darker amber

    // Button styling - Warm amber accent
    buttonColor: '#c4956a',         // Warm amber
    buttonTransparent: false,
    iconColor: '#FFFFFF',
    buttonBorderColor: '#c4956a',
    buttonBorderThickness: '0',
    buttonShape: 'pill',
    buttonCustomRadius: 8,

    // Waveform & Timer
    showWaveform: true,
    showTimer: true,
    timeFormat: 'elapsed-total',
    waveformType: 'bars',
    waveformThickness: 'normal',
    waveformCustomThickness: 4,
    waveActive: '#c4956a',          // Warm amber
    waveInactive: '#d9d4cc',        // Soft border color
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
