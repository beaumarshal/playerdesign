<script setup>
import { ref, computed } from 'vue'
import { useBrandStore } from '@/stores/brandStore'
import { usePlayerStore } from '@/stores/playerStore'
import MiniPlayerOptions from '@/components/options/MiniPlayerOptions.vue'
import MiniPlayer from '@/components/players/MiniPlayer.vue'
import { useCodeCopy } from '@/composables/useCodeCopy'
import { useSyntaxHighlight } from '@/composables/useSyntaxHighlight'

const brandStore = useBrandStore()
const playerStore = usePlayerStore()
const { copyCode, isCopied } = useCodeCopy()
const { highlightCode } = useSyntaxHighlight()

const isDarkMode = computed(() => brandStore.previewMode === 'dark')
const styleApproach = ref('inline')
const recordingId = 'rec_abc123'

// Preview background
const previewBgStyle = computed(() => ({
  background: isDarkMode.value ? '#121212' : '#f5f5f5',
  borderColor: isDarkMode.value ? '#2a2a2a' : 'var(--ff-border)',
}))

// Reactive dependencies for code generation
// Access all reactive values directly to ensure Vue tracks them
const buttonShape = computed(() => brandStore.buttonShape)
const buttonRadius = computed(() => brandStore.buttonRadius)
const buttonTransparent = computed(() => brandStore.buttonTransparent)
const buttonBorderThickness = computed(() => brandStore.buttonBorderThickness)
const miniSize = computed(() => playerStore.mini.size)
const miniCustomSize = computed(() => playerStore.mini.customSize)
const miniAnimation = computed(() => playerStore.mini.animation)
const lightColors = computed(() => ({ ...brandStore.light }))
const darkColors = computed(() => ({ ...brandStore.dark }))

// Size map for mini player (matches sizeOptions.mini values)
const sizeMap = { sm: '40px', md: '56px', lg: '72px' }

// Border thickness - values are already in correct format ('0', '1px', '2px', '3px')

// Map animation type to visualization attribute value
const animationToVisualization = {
  none: '',
  circular: 'ring',
  pulse: 'pulse',
  rings: 'rings'
}

// Build CSS variables string from current options
const buildCssVars = (colors, isTransparent = false) => {
  const vars = []

  // Background - handle transparent
  if (isTransparent) {
    vars.push(`--fortyfour-mini-bg: transparent`)
  } else {
    vars.push(`--fortyfour-mini-bg: ${colors.buttonColor}`)
  }

  vars.push(`--fortyfour-mini-icon: ${colors.iconColor}`)

  // Add radius if not default (pill)
  if (buttonShape.value !== 'pill') {
    vars.push(`--fortyfour-mini-radius: ${buttonRadius.value}`)
  }

  // Add size if not default (medium)
  if (miniSize.value === 'custom') {
    vars.push(`--fortyfour-mini-size: ${miniCustomSize.value}px`)
  } else if (miniSize.value !== 'md') {
    vars.push(`--fortyfour-mini-size: ${sizeMap[miniSize.value] || '56px'}`)
  }

  // Add border if not zero
  if (buttonBorderThickness.value && buttonBorderThickness.value !== '0') {
    vars.push(`--fortyfour-mini-border: ${buttonBorderThickness.value} solid ${colors.buttonColor}`)
  }

  return vars.join('; ')
}

// Build CSS block from current options
const buildCssBlock = (colors, selector = 'fortyfour-player-mini', isTransparent = false) => {
  const lines = []

  // Background - handle transparent
  if (isTransparent) {
    lines.push(`  --fortyfour-mini-bg: transparent;`)
  } else {
    lines.push(`  --fortyfour-mini-bg: ${colors.buttonColor};`)
  }

  lines.push(`  --fortyfour-mini-icon: ${colors.iconColor};`)

  // Add radius if not default (pill)
  if (buttonShape.value !== 'pill') {
    lines.push(`  --fortyfour-mini-radius: ${buttonRadius.value};`)
  }

  // Add size if not default
  if (miniSize.value === 'custom') {
    lines.push(`  --fortyfour-mini-size: ${miniCustomSize.value}px;`)
  } else if (miniSize.value !== 'md') {
    lines.push(`  --fortyfour-mini-size: ${sizeMap[miniSize.value] || '56px'};`)
  }

  // Add border if not zero
  if (buttonBorderThickness.value && buttonBorderThickness.value !== '0') {
    lines.push(`  --fortyfour-mini-border: ${buttonBorderThickness.value} solid ${colors.buttonColor};`)
  }

  return `${selector} {\n${lines.join('\n')}\n}`
}

// Get visualization attribute based on animation type
const visualizationAttribute = computed(() => {
  const viz = animationToVisualization[miniAnimation.value]
  return viz ? `\n  visualization="${viz}"` : ''
})

// Light mode inline code
const lightInlineCode = computed(() => {
  const cssVars = buildCssVars(lightColors.value, buttonTransparent.value)
  return `<fortyfour-player-mini
  recording-id="${recordingId}"${visualizationAttribute.value}
  style="${cssVars}"
></fortyfour-player-mini>`
})

// Dark mode inline code
const darkInlineCode = computed(() => {
  const cssVars = buildCssVars(darkColors.value, buttonTransparent.value)
  return `<fortyfour-player-mini
  recording-id="${recordingId}"${visualizationAttribute.value}
  style="${cssVars}"
></fortyfour-player-mini>`
})

// HTML code (for stylesheet approach)
const htmlCode = computed(() => {
  return `<fortyfour-player-mini
  recording-id="${recordingId}"${visualizationAttribute.value}
></fortyfour-player-mini>`
})

// CSS code (for stylesheet approach)
const cssCode = computed(() => {
  const lightBlock = buildCssBlock(lightColors.value, 'fortyfour-player-mini', buttonTransparent.value)
  const darkBlock = buildCssBlock(darkColors.value, '  fortyfour-player-mini', buttonTransparent.value)

  return `${lightBlock}

@media (prefers-color-scheme: dark) {
${darkBlock}
}`
})

// Highlighted code (computed to ensure reactivity)
const highlightedLightCode = computed(() => highlightCode(lightInlineCode.value))
const highlightedDarkCode = computed(() => highlightCode(darkInlineCode.value))
const highlightedHtmlCode = computed(() => highlightCode(htmlCode.value))
const highlightedCssCode = computed(() => highlightCode(cssCode.value))

const handleModeChange = (mode) => {
  brandStore.setPreviewMode(mode, playerStore)
}
</script>

<template>
  <div class="playground">
    <div class="playground__grid">
      <!-- Options Panel -->
      <div class="playground__options">
        <MiniPlayerOptions />
      </div>

      <!-- Preview + Code -->
      <div class="playground__right">
        <!-- Preview Header -->
        <div class="playground__preview-header">
          <span class="playground__preview-title">Preview</span>
          <div class="playground__mode-toggle">
            <button
              class="mode-btn"
              :class="{ 'is-active': brandStore.previewMode === 'light' }"
              @click="handleModeChange('light')"
              title="Light Mode"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="5"></circle>
                <line x1="12" y1="1" x2="12" y2="3"></line>
                <line x1="12" y1="21" x2="12" y2="23"></line>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                <line x1="1" y1="12" x2="3" y2="12"></line>
                <line x1="21" y1="12" x2="23" y2="12"></line>
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
              </svg>
            </button>
            <button
              class="mode-btn"
              :class="{ 'is-active': brandStore.previewMode === 'dark' }"
              @click="handleModeChange('dark')"
              title="Dark Mode"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
              </svg>
            </button>
          </div>
        </div>

        <!-- Preview Container -->
        <div class="playground__preview" :style="previewBgStyle">
          <div class="playground__preview-area">
            <MiniPlayer />
          </div>
        </div>

        <!-- Code Output -->
        <div class="playground__code">
          <div class="playground__style-toggle">
            <button
              class="style-btn"
              :class="{ 'is-active': styleApproach === 'inline' }"
              @click="styleApproach = 'inline'"
            >
              Inline Style
            </button>
            <button
              class="style-btn"
              :class="{ 'is-active': styleApproach === 'stylesheet' }"
              @click="styleApproach = 'stylesheet'"
            >
              Stylesheet
            </button>
          </div>

          <!-- Inline Style Output -->
          <template v-if="styleApproach === 'inline'">
            <div class="docs-code-block">
              <div class="docs-code-block__header">
                <span class="docs-code-block__label">Light Mode</span>
                <button
                  class="docs-code-block__copy"
                  :class="{ 'is-copied': isCopied('light') }"
                  @click="copyCode(lightInlineCode, 'light')"
                >
                  {{ isCopied('light') ? 'Copied!' : 'Copy' }}
                </button>
              </div>
              <pre class="docs-code-block__pre"><code v-html="highlightedLightCode"></code></pre>
            </div>
            <div class="docs-code-block">
              <div class="docs-code-block__header">
                <span class="docs-code-block__label">Dark Mode</span>
                <button
                  class="docs-code-block__copy"
                  :class="{ 'is-copied': isCopied('dark') }"
                  @click="copyCode(darkInlineCode, 'dark')"
                >
                  {{ isCopied('dark') ? 'Copied!' : 'Copy' }}
                </button>
              </div>
              <pre class="docs-code-block__pre"><code v-html="highlightedDarkCode"></code></pre>
            </div>
          </template>

          <!-- Stylesheet Output -->
          <template v-else>
            <div class="docs-code-block">
              <div class="docs-code-block__header">
                <span class="docs-code-block__label">HTML</span>
                <button
                  class="docs-code-block__copy"
                  :class="{ 'is-copied': isCopied('html') }"
                  @click="copyCode(htmlCode, 'html')"
                >
                  {{ isCopied('html') ? 'Copied!' : 'Copy' }}
                </button>
              </div>
              <pre class="docs-code-block__pre"><code v-html="highlightedHtmlCode"></code></pre>
            </div>
            <div class="docs-code-block">
              <div class="docs-code-block__header">
                <span class="docs-code-block__label">CSS</span>
                <button
                  class="docs-code-block__copy"
                  :class="{ 'is-copied': isCopied('css') }"
                  @click="copyCode(cssCode, 'css')"
                >
                  {{ isCopied('css') ? 'Copied!' : 'Copy' }}
                </button>
              </div>
              <pre class="docs-code-block__pre"><code v-html="highlightedCssCode"></code></pre>
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.playground__grid {
  display: grid;
  grid-template-columns: 340px 1fr;
  gap: var(--ff-space-xl);
}

.playground__options {
  background: var(--ff-bg);
  border: 1px solid var(--ff-border);
  border-radius: 12px;
  padding: var(--ff-space-lg);
}

.playground__right {
  display: flex;
  flex-direction: column;
  gap: var(--ff-space-md);
}

.playground__preview-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.playground__preview-title {
  font-size: 0.6875rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--ff-muted);
}

.playground__mode-toggle {
  display: flex;
  background: var(--ff-bg);
  border: 1px solid var(--ff-border);
  border-radius: 6px;
  padding: 2px;
}

.mode-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 28px;
  border: none;
  background: transparent;
  border-radius: 4px;
  color: var(--ff-muted);
  cursor: pointer;
  transition: all 0.15s ease;
}

.mode-btn:hover {
  color: var(--ff-text);
}

.mode-btn.is-active {
  background: var(--ff-accent);
  color: white;
}

.playground__preview {
  border: 1px solid var(--ff-border);
  border-radius: 12px;
  padding: var(--ff-space-xl);
  min-height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.playground__preview-area {
  position: relative;
  width: 120px;
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.playground__preview-area :deep(.player-mini) {
  position: relative;
}

.playground__code {
  border: 1px solid var(--ff-border);
  border-radius: 8px;
  overflow: hidden;
}

.playground__style-toggle {
  display: flex;
  gap: 1px;
  background: var(--ff-border);
}

.style-btn {
  flex: 1;
  padding: 0.625rem;
  font-size: 0.8125rem;
  font-weight: 500;
  color: var(--ff-muted);
  background: var(--ff-bg-subtle);
  border: none;
  cursor: pointer;
  transition: all 0.15s ease;
}

.style-btn:hover {
  color: var(--ff-text);
}

.style-btn.is-active {
  color: var(--ff-text);
  background: var(--ff-bg);
}

.playground__code .docs-code-block {
  margin-bottom: 0;
  border-radius: 0;
  border: none;
  border-top: 1px solid var(--ff-border);
}

@media (max-width: 900px) {
  .playground__grid {
    grid-template-columns: 1fr;
  }
}
</style>
