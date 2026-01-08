import { defineStore } from 'pinia'

// Audio-punned theme presets with light and dark variants
// Dark mode design principles:
// - Tinted backgrounds (not pure black) that echo the theme's color identity
// - High contrast text (minimum 4.5:1 ratio)
// - Slightly brighter accent colors to pop against dark backgrounds
// - Subtle borders that define edges without being harsh
const themePresets = {
  'desert-waveform': {
    name: 'Desert Waveform',
    light: {
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
    dark: {
      playerBg: '#1f1c1a',           // Warm dark brown
      playerBorder: '#3d3835',       // Warm gray border
      textColor: '#f5f0ea',          // Warm off-white
      textSecondary: '#b5ada5',      // Muted warm gray
      buttonColor: '#e8b878',        // Noticeably brighter amber for dark
      iconColor: '#1f1c1a',          // Match bg for contrast
      waveActive: '#e8b878',         // Match button
      waveInactive: '#4a4540',       // Visible but subtle
      transcriptBg: '#2a2725',       // Slightly lighter than bg
    },
  },
  'bass-ically-blue': {
    name: 'Bass-ically Blue',
    light: {
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
    dark: {
      playerBg: '#171c24',           // Deep blue-gray
      playerBorder: '#2a3441',       // Blue-tinted border
      textColor: '#e8edf4',          // Cool off-white
      textSecondary: '#94a3b8',      // Slate gray
      buttonColor: '#5c9fe8',        // Brighter blue for dark bg
      iconColor: '#171c24',          // Match bg
      waveActive: '#5c9fe8',         // Match button
      waveInactive: '#3a4556',       // Visible blue-gray
      transcriptBg: '#1e2530',       // Slightly lighter
    },
  },
  'treble-in-paradise': {
    name: 'Treble in Paradise',
    light: {
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
    dark: {
      playerBg: '#172124',           // Teal-tinted dark
      playerBorder: '#2d4a4e',       // Teal border
      textColor: '#e6f7f5',          // Mint off-white
      textSecondary: '#7dd3c8',      // Bright teal
      buttonColor: '#45c4be',        // Vibrant teal
      iconColor: '#172124',          // Match bg
      waveActive: '#f5a54a',         // Brighter orange
      waveInactive: '#3a5558',       // Teal-gray
      transcriptBg: '#1e2c30',       // Slightly lighter
    },
  },
  'sound-of-silence': {
    name: 'Sound of Silence',
    light: {
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
    dark: {
      playerBg: '#18191c',           // Near black, slight warm
      playerBorder: '#2e3138',       // Neutral dark gray
      textColor: '#f4f5f7',          // Clean white
      textSecondary: '#9ca3af',      // Medium gray
      buttonColor: '#f0f1f3',        // Near white button
      iconColor: '#18191c',          // Match bg
      waveActive: '#a0a8b3',         // Light gray
      waveInactive: '#3a3d44',       // Subtle divider
      transcriptBg: '#212328',       // Slightly lighter
    },
  },
  'purple-haze': {
    name: 'Purple Haze',
    light: {
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
    dark: {
      playerBg: '#1a1720',           // Deep purple-black
      playerBorder: '#3d2d5a',       // Purple border
      textColor: '#f0e8fa',          // Lavender white
      textSecondary: '#c9b8e8',      // Light purple
      buttonColor: '#b794f6',        // Bright purple
      iconColor: '#1a1720',          // Match bg
      waveActive: '#b794f6',         // Match button
      waveInactive: '#4a3a6a',       // Visible purple
      transcriptBg: '#221e2c',       // Slightly lighter
    },
  },
  'mint-condition': {
    name: 'Mint Condition',
    light: {
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
    dark: {
      playerBg: '#161f1a',           // Deep forest
      playerBorder: '#2d4a3a',       // Green-tinted border
      textColor: '#e2f5e9',          // Mint white
      textSecondary: '#7ed9a0',      // Bright mint
      buttonColor: '#5bc77f',        // Vibrant green
      iconColor: '#161f1a',          // Match bg
      waveActive: '#5bc77f',         // Match button
      waveInactive: '#3a5545',       // Forest green
      transcriptBg: '#1c2820',       // Slightly lighter
    },
  },
  'sunset-sonata': {
    name: 'Sunset Sonata',
    light: {
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
    dark: {
      playerBg: '#1f1915',           // Warm charcoal
      playerBorder: '#5c3d1e',       // Burnt orange border
      textColor: '#faf0e4',          // Warm cream
      textSecondary: '#e8c090',      // Golden tan
      buttonColor: '#f59e42',        // Bright orange
      iconColor: '#1f1915',          // Match bg
      waveActive: '#f59e42',         // Match button
      waveInactive: '#6a4a28',       // Warm brown
      transcriptBg: '#28201a',       // Slightly lighter
    },
  },
  'midnight-dj': {
    name: 'Midnight DJ',
    light: {
      playerBg: '#f7fafc',
      playerBorder: '#e2e8f0',
      textColor: '#1a202c',
      textSecondary: '#4a5568',
      buttonColor: '#3182ce',
      iconColor: '#FFFFFF',
      waveActive: '#3182ce',
      waveInactive: '#e2e8f0',
      transcriptBg: '#edf2f7',
    },
    dark: {
      playerBg: '#0f1218',           // Deep midnight blue
      playerBorder: '#252d3a',       // Blue-gray border
      textColor: '#eef2f7',          // Clean cool white
      textSecondary: '#8898aa',      // Steel blue
      buttonColor: '#4da3ec',        // Electric blue
      iconColor: '#0f1218',          // Match bg
      waveActive: '#4da3ec',         // Match button
      waveInactive: '#3a4658',       // Navy gray
      transcriptBg: '#181e28',       // Slightly lighter
    },
  },
  'coral-chorus': {
    name: 'Coral Chorus',
    light: {
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
    dark: {
      playerBg: '#1f1717',           // Warm dark red
      playerBorder: '#5c2a2a',       // Deep red border
      textColor: '#fae8e8',          // Pink white
      textSecondary: '#f0a8a8',      // Soft coral
      buttonColor: '#f87171',        // Bright coral
      iconColor: '#1f1717',          // Match bg
      waveActive: '#f87171',         // Match button
      waveInactive: '#6a3838',       // Dark coral
      transcriptBg: '#2a1e1e',       // Slightly lighter
    },
  },
  'golden-oldies': {
    name: 'Golden Oldies',
    light: {
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
    dark: {
      playerBg: '#1c1a14',           // Warm dark gold
      playerBorder: '#5c4a1e',       // Golden border
      textColor: '#faf5e4',          // Cream white
      textSecondary: '#e8d48a',      // Soft gold
      buttonColor: '#eab935',        // Bright gold
      iconColor: '#1c1a14',          // Match bg
      waveActive: '#eab935',         // Match button
      waveInactive: '#6a5828',       // Dark gold
      transcriptBg: '#242018',       // Slightly lighter
    },
  },
}

export const useBrandStore = defineStore('brand', {
  state: () => ({
    // Current theme and preview mode
    currentTheme: 'desert-waveform',
    previewMode: 'light', // 'light' | 'dark'

    // Shared options (same for both modes)
    playerBgTransparent: false,
    playerBorderThickness: '1px',
    playerShape: 'rounded',
    playerCustomRadius: 12,
    playerPadding: 'normal',
    playerCustomPadding: 1,
    buttonTransparent: false,
    buttonBorderThickness: '0',
    buttonShape: 'pill',
    buttonCustomRadius: 8,
    showWaveform: true,
    showTimer: true,
    timeFormat: 'elapsed-total',
    waveformType: 'bars',
    waveformThickness: 'normal',
    waveformCustomThickness: 4,

    // Light mode colors - Desert Waveform palette
    light: {
      playerBg: '#faf8f5',
      playerBorder: '#d9d4cc',
      textColor: '#2c2620',
      textSecondary: '#8c8279',
      labelColor: '#8c8279',
      linkColor: '#c4956a',
      linkHover: '#a67d52',
      buttonColor: '#c4956a',
      iconColor: '#FFFFFF',
      buttonBorderColor: '#c4956a',
      waveActive: '#c4956a',
      waveInactive: '#d9d4cc',
      transcriptBg: '#f0ede8',
    },

    // Dark mode colors - Desert Waveform palette (matches theme preset)
    dark: {
      playerBg: '#1f1c1a',           // Warm dark brown
      playerBorder: '#3d3835',       // Warm gray border
      textColor: '#f5f0ea',          // Warm off-white
      textSecondary: '#b5ada5',      // Muted warm gray
      labelColor: '#b5ada5',
      linkColor: '#d4a574',
      linkHover: '#e4b584',
      buttonColor: '#e8b878',        // Noticeably brighter/lighter amber for dark mode
      iconColor: '#1f1c1a',          // Match bg for contrast
      buttonBorderColor: '#e8b878',
      waveActive: '#e8b878',         // Match button
      waveInactive: '#4a4540',       // Visible but subtle
      transcriptBg: '#2a2725',       // Slightly lighter than bg
    },
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

    // Get current mode's colors (explicit conditionals for better reactivity)
    currentColors(state) {
      return state.previewMode === 'dark' ? state.dark : state.light
    },

    // Convenience getters for current mode colors (explicit for reactivity)
    playerBg(state) {
      return state.previewMode === 'dark' ? state.dark.playerBg : state.light.playerBg
    },
    playerBorder(state) {
      return state.previewMode === 'dark' ? state.dark.playerBorder : state.light.playerBorder
    },
    textColor(state) {
      return state.previewMode === 'dark' ? state.dark.textColor : state.light.textColor
    },
    textSecondary(state) {
      return state.previewMode === 'dark' ? state.dark.textSecondary : state.light.textSecondary
    },
    labelColor(state) {
      return state.previewMode === 'dark' ? state.dark.labelColor : state.light.labelColor
    },
    buttonColor(state) {
      return state.previewMode === 'dark' ? state.dark.buttonColor : state.light.buttonColor
    },
    iconColor(state) {
      return state.previewMode === 'dark' ? state.dark.iconColor : state.light.iconColor
    },
    buttonBorderColor(state) {
      return state.previewMode === 'dark' ? state.dark.buttonBorderColor : state.light.buttonBorderColor
    },
    waveActive(state) {
      return state.previewMode === 'dark' ? state.dark.waveActive : state.light.waveActive
    },
    waveInactive(state) {
      return state.previewMode === 'dark' ? state.dark.waveInactive : state.light.waveInactive
    },
    transcriptBg(state) {
      return state.previewMode === 'dark' ? state.dark.transcriptBg : state.light.transcriptBg
    },

    // CSS variables object for player styling (uses current mode)
    cssVariables(state) {
      const colors = state.previewMode === 'dark' ? state.dark : state.light
      return {
        '--player-bg': state.playerBgTransparent ? 'transparent' : colors.playerBg,
        '--player-border': colors.playerBorder,
        '--player-text': colors.textColor,
        '--player-text-secondary': colors.textSecondary,
        '--player-primary': colors.buttonColor,
        '--player-primary-hover': colors.buttonColor,
        '--player-wave-active': colors.waveActive,
        '--player-wave-inactive': colors.waveInactive,
        '--player-icon': colors.iconColor,
        '--player-transcript-bg': colors.transcriptBg,
      }
    },

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

    // Apply a theme preset - sets both light and dark colors
    applyTheme(themeKey, playerStore = null) {
      const theme = themePresets[themeKey]
      if (!theme) return

      this.currentTheme = themeKey

      // Apply light mode colors
      if (theme.light) {
        this.light = { ...theme.light }
      }

      // Apply dark mode colors
      if (theme.dark) {
        this.dark = { ...theme.dark }
      }

      // Update transcript backgrounds in playerStore if provided
      if (playerStore) {
        // Use current mode's transcript bg
        const currentColors = this[this.previewMode]
        if (currentColors.transcriptBg) {
          playerStore.full.transcriptBg = currentColors.transcriptBg
        }
      }

      this.applyCssVariables()
    },

    // Toggle preview mode
    setPreviewMode(mode, playerStore = null) {
      this.previewMode = mode

      // Update transcript background for new mode
      if (playerStore) {
        const currentColors = this[mode]
        if (currentColors.transcriptBg) {
          playerStore.full.transcriptBg = currentColors.transcriptBg
        }
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
