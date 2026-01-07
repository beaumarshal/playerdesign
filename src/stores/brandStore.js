import { defineStore } from 'pinia'

// Audio-punned theme presets based on popular color palettes
const themePresets = {
  'desert-waveform': {
    name: 'Desert Waveform',
    playerBg: '#faf8f5',
    playerBorder: '#d9d4cc',
    textColor: '#2c2620',
    textSecondary: '#8c8279',
    buttonColor: '#c4956a',
    iconColor: '#FFFFFF',
    waveActive: '#c4956a',
    waveInactive: '#d9d4cc',
    transcriptBg: '#f0ede8',
  },
  'bass-ically-blue': {
    name: 'Bass-ically Blue',
    playerBg: '#f0f4f8',
    playerBorder: '#c9d6e3',
    textColor: '#1a365d',
    textSecondary: '#4a5568',
    buttonColor: '#3182ce',
    iconColor: '#FFFFFF',
    waveActive: '#3182ce',
    waveInactive: '#bee3f8',
    transcriptBg: '#e2e8f0',
  },
  'treble-in-paradise': {
    name: 'Treble in Paradise',
    playerBg: '#f7fafc',
    playerBorder: '#b2f5ea',
    textColor: '#234e52',
    textSecondary: '#4a5568',
    buttonColor: '#319795',
    iconColor: '#FFFFFF',
    waveActive: '#ed8936',
    waveInactive: '#b2f5ea',
    transcriptBg: '#e6fffa',
  },
  'sound-of-silence': {
    name: 'Sound of Silence',
    playerBg: '#ffffff',
    playerBorder: '#e2e8f0',
    textColor: '#1a202c',
    textSecondary: '#718096',
    buttonColor: '#2d3748',
    iconColor: '#FFFFFF',
    waveActive: '#4a5568',
    waveInactive: '#e2e8f0',
    transcriptBg: '#f7fafc',
  },
  'purple-haze': {
    name: 'Purple Haze',
    playerBg: '#faf5ff',
    playerBorder: '#e9d8fd',
    textColor: '#44337a',
    textSecondary: '#6b46c1',
    buttonColor: '#805ad5',
    iconColor: '#FFFFFF',
    waveActive: '#805ad5',
    waveInactive: '#e9d8fd',
    transcriptBg: '#f3e8ff',
  },
  'mint-condition': {
    name: 'Mint Condition',
    playerBg: '#f0fff4',
    playerBorder: '#9ae6b4',
    textColor: '#22543d',
    textSecondary: '#276749',
    buttonColor: '#38a169',
    iconColor: '#FFFFFF',
    waveActive: '#38a169',
    waveInactive: '#c6f6d5',
    transcriptBg: '#e6ffed',
  },
  'sunset-sonata': {
    name: 'Sunset Sonata',
    playerBg: '#fffaf0',
    playerBorder: '#fbd38d',
    textColor: '#744210',
    textSecondary: '#975a16',
    buttonColor: '#dd6b20',
    iconColor: '#FFFFFF',
    waveActive: '#ed8936',
    waveInactive: '#feebc8',
    transcriptBg: '#fef3e2',
  },
  'midnight-dj': {
    name: 'Midnight DJ',
    playerBg: '#1a202c',
    playerBorder: '#2d3748',
    textColor: '#f7fafc',
    textSecondary: '#a0aec0',
    buttonColor: '#63b3ed',
    iconColor: '#1a202c',
    waveActive: '#63b3ed',
    waveInactive: '#4a5568',
    transcriptBg: '#2d3748',
  },
  'coral-chorus': {
    name: 'Coral Chorus',
    playerBg: '#fff5f5',
    playerBorder: '#feb2b2',
    textColor: '#742a2a',
    textSecondary: '#c53030',
    buttonColor: '#f56565',
    iconColor: '#FFFFFF',
    waveActive: '#fc8181',
    waveInactive: '#fed7d7',
    transcriptBg: '#fee2e2',
  },
  'golden-oldies': {
    name: 'Golden Oldies',
    playerBg: '#fffff0',
    playerBorder: '#ecc94b',
    textColor: '#744210',
    textSecondary: '#975a16',
    buttonColor: '#d69e2e',
    iconColor: '#FFFFFF',
    waveActive: '#ecc94b',
    waveInactive: '#faf089',
    transcriptBg: '#fefce8',
  },
}

export const useBrandStore = defineStore('brand', {
  state: () => ({
    // Current theme
    currentTheme: 'desert-waveform',
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

    // Available themes for dropdown
    availableThemes: () => {
      return Object.entries(themePresets).map(([key, theme]) => ({
        value: key,
        label: theme.name,
      }))
    },
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

    // Apply a theme preset
    applyTheme(themeKey, playerStore = null) {
      const theme = themePresets[themeKey]
      if (!theme) return

      this.currentTheme = themeKey
      this.playerBg = theme.playerBg
      this.playerBorder = theme.playerBorder
      this.textColor = theme.textColor
      this.textSecondary = theme.textSecondary
      this.labelColor = theme.textSecondary
      this.buttonColor = theme.buttonColor
      this.iconColor = theme.iconColor
      this.waveActive = theme.waveActive
      this.waveInactive = theme.waveInactive
      this.buttonBorderColor = theme.buttonColor

      // Update transcript background if playerStore is provided
      if (playerStore && theme.transcriptBg) {
        playerStore.full.transcriptBg = theme.transcriptBg
      }

      this.applyCssVariables()
    },

    // Reset to defaults
    reset() {
      this.$reset()
      this.applyCssVariables()
    }
  }
})
