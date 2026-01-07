import { defineStore } from 'pinia'

export const useBuilderStore = defineStore('builder', {
  state: () => ({
    activePlayerType: 'full', // 'full' | 'mini' | 'pill'
    theme: 'light', // 'light' | 'dark'
    collapsedSteps: [],
    previewWidth: 800, // For responsive preview
  }),

  actions: {
    setPlayerType(type) {
      this.activePlayerType = type
    },

    toggleTheme() {
      this.theme = this.theme === 'light' ? 'dark' : 'light'
      document.documentElement.setAttribute('data-theme', this.theme)
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
