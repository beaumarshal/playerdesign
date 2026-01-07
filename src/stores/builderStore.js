import { defineStore } from 'pinia'

// Detect system color scheme preference
const getSystemTheme = () => {
  if (typeof window !== 'undefined' && window.matchMedia) {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  }
  return 'light'
}

export const useBuilderStore = defineStore('builder', {
  state: () => ({
    activePlayerType: 'full', // 'full' | 'mini' | 'pill'
    theme: getSystemTheme(), // Initialize from system preference
    collapsedSteps: [],
    previewWidth: 800, // For responsive preview
  }),

  actions: {
    setPlayerType(type) {
      this.activePlayerType = type
    },

    setTheme(theme) {
      this.theme = theme
      document.documentElement.setAttribute('data-theme', this.theme)
    },

    toggleTheme() {
      this.theme = this.theme === 'light' ? 'dark' : 'light'
      document.documentElement.setAttribute('data-theme', this.theme)
    },

    // Initialize theme and listen for system changes
    initTheme() {
      // Apply current theme
      document.documentElement.setAttribute('data-theme', this.theme)

      // Listen for system preference changes
      if (typeof window !== 'undefined' && window.matchMedia) {
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
          this.setTheme(e.matches ? 'dark' : 'light')
        })
      }
    },

    toggleStep(step) {
      const idx = this.collapsedSteps.indexOf(step)
      if (idx >= 0) {
        this.collapsedSteps.splice(idx, 1)
      } else {
        this.collapsedSteps.push(step)
      }
    },

    isStepCollapsed(step) {
      return this.collapsedSteps.includes(step)
    },

    setPreviewWidth(width) {
      this.previewWidth = Math.max(320, Math.min(width, 1200))
    }
  }
})
