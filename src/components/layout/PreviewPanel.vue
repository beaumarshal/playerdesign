<script setup>
import { ref, computed } from 'vue'
import { useBuilderStore } from '@/stores/builderStore'
import { useBrandStore } from '@/stores/brandStore'
import { usePlayerStore } from '@/stores/playerStore'
import ResponsivePreview from '@/components/preview/ResponsivePreview.vue'
import FullPlayer from '@/components/players/FullPlayer.vue'
import MiniPlayer from '@/components/players/MiniPlayer.vue'
import PillPlayer from '@/components/players/PillPlayer.vue'
import ExamplesSection from '@/components/examples/ExamplesSection.vue'

const builderStore = useBuilderStore()
const brandStore = useBrandStore()
const playerStore = usePlayerStore()

const activePlayerType = computed(() => builderStore.activePlayerType)
const isDarkMode = computed(() => brandStore.previewMode === 'dark')

// State for preview/code toggle
const activeTab = ref('preview') // 'preview' | 'code'
const styleApproach = ref('inline') // 'inline' | 'stylesheet'

// Preview container background based on mode
const previewBgStyle = computed(() => ({
  background: isDarkMode.value ? '#121212' : '#f5f5f5',
  borderColor: isDarkMode.value ? '#2a2a2a' : 'var(--ff-border)',
}))

const handleModeChange = (mode) => {
  brandStore.setPreviewMode(mode, playerStore)
}

// Copy code to clipboard
const copyCode = async (text) => {
  try {
    await navigator.clipboard.writeText(text)
  } catch (err) {
    console.error('Failed to copy:', err)
  }
}

const recordingId = 'rec_abc123'

// Player type tag names
const playerTagName = computed(() => {
  switch (activePlayerType.value) {
    case 'mini': return 'fortyfour-player-mini'
    case 'pill': return 'fortyfour-player-pill'
    default: return 'fortyfour-player'
  }
})

// Light mode inline code
const lightInlineCode = computed(() => {
  const colors = brandStore.light
  if (activePlayerType.value === 'mini') {
    return `<${playerTagName.value}
  recording-id="${recordingId}"
  progress="ring"
  style="--fortyfour-player-mini-bg: ${colors.buttonColor}; --fortyfour-player-mini-icon-color: ${colors.iconColor};"
></${playerTagName.value}>`
  }
  return `<${playerTagName.value}
  recording-id="${recordingId}"
  style="--fortyfour-player-bg: ${colors.buttonColor}; --fortyfour-player-icon-color: ${colors.iconColor};"
></${playerTagName.value}>`
})

// Dark mode inline code
const darkInlineCode = computed(() => {
  const colors = brandStore.dark
  if (activePlayerType.value === 'mini') {
    return `<${playerTagName.value}
  recording-id="${recordingId}"
  progress="ring"
  style="--fortyfour-player-mini-bg: ${colors.buttonColor}; --fortyfour-player-mini-icon-color: ${colors.iconColor};"
></${playerTagName.value}>`
  }
  return `<${playerTagName.value}
  recording-id="${recordingId}"
  style="--fortyfour-player-bg: ${colors.buttonColor}; --fortyfour-player-icon-color: ${colors.iconColor};"
></${playerTagName.value}>`
})

// HTML code (for stylesheet approach)
const htmlCode = computed(() => {
  if (activePlayerType.value === 'mini') {
    return `<${playerTagName.value}
  recording-id="${recordingId}"
  progress="ring"
></${playerTagName.value}>`
  }
  return `<${playerTagName.value}
  recording-id="${recordingId}"
></${playerTagName.value}>`
})

// CSS code (for stylesheet approach)
const cssCode = computed(() => {
  const lightColors = brandStore.light
  const darkColors = brandStore.dark
  const prefix = activePlayerType.value === 'mini' ? 'fortyfour-player-mini' : 'fortyfour-player'
  return `${playerTagName.value} {
  --${prefix}-bg: ${lightColors.buttonColor};
  --${prefix}-icon-color: ${lightColors.iconColor};
}

@media (prefers-color-scheme: dark) {
  ${playerTagName.value} {
    --${prefix}-bg: ${darkColors.buttonColor};
    --${prefix}-icon-color: ${darkColors.iconColor};
  }
}`
})

// Syntax highlighting helper function
const highlightCode = (code) => {
  const tokens = []
  const placeholder = (content, cls) => {
    const idx = tokens.length
    tokens.push({ content, cls })
    return `__TOKEN_${idx}__`
  }

  code = code.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
  code = code.replace(/(&lt;!--.*?--&gt;)/g, (m) => placeholder(m, 'comment'))
  code = code.replace(/"([^"\\]*(\\.[^"\\]*)*)"/g, (m) => placeholder(m, 'string'))
  code = code.replace(/'([^'\\]*(\\.[^'\\]*)*)'/g, (m) => placeholder(m, 'string'))
  code = code.replace(/#[0-9a-fA-F]{3,8}\b/g, (m) => placeholder(m, 'color'))
  code = code.replace(/@(media|import|keyframes)\b/g, (m) => placeholder(m, 'keyword'))
  code = code.replace(/(&lt;)(\/?)([\w][\w-]*)/g, (m, lt, slash, tag) =>
    placeholder(lt + slash, 'bracket') + placeholder(tag, 'tag'))
  code = code.replace(/(\/?&gt;)/g, (m) => placeholder(m, 'bracket'))
  code = code.replace(/\s([\w][\w-]*)(=)/g, (m, attr, eq) =>
    ' ' + placeholder(attr, 'attr') + placeholder(eq, 'punct'))
  code = code.replace(/^(\s*)(--[\w-]+|[\w-]+)(:)/gm, (m, ws, prop, colon) =>
    ws + placeholder(prop, 'property') + placeholder(colon, 'punct'))
  code = code.replace(/(\{|\})/g, (m) => placeholder(m, 'bracket'))
  code = code.replace(/(;)/g, (m) => placeholder(m, 'punct'))
  code = code.replace(/(\(|\))/g, (m) => placeholder(m, 'punct'))
  code = code.replace(/__TOKEN_(\d+)__/g, (m, idx) => {
    const t = tokens[parseInt(idx)]
    return `<span class="hl-${t.cls}">${t.content}</span>`
  })

  return code
}

const highlightedLightInline = computed(() => highlightCode(lightInlineCode.value))
const highlightedDarkInline = computed(() => highlightCode(darkInlineCode.value))
const highlightedHtml = computed(() => highlightCode(htmlCode.value))
const highlightedCss = computed(() => highlightCode(cssCode.value))
</script>

<template>
  <div class="preview">
    <div class="preview__header">
      <h2 class="preview__title">Preview</h2>
      <div class="preview__controls">
        <!-- Preview/Code Toggle -->
        <div class="preview__tab-toggle">
          <button
            class="tab-btn"
            :class="{ 'is-active': activeTab === 'preview' }"
            @click="activeTab = 'preview'"
          >
            Preview
          </button>
          <button
            class="tab-btn"
            :class="{ 'is-active': activeTab === 'code' }"
            @click="activeTab = 'code'"
          >
            Code
          </button>
        </div>
        <!-- Light/Dark Mode Toggle -->
        <div class="preview__mode-toggle">
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
    </div>

    <!-- Preview Tab Content -->
    <template v-if="activeTab === 'preview'">
      <!-- Full Player uses responsive preview -->
      <ResponsivePreview v-if="activePlayerType === 'full'" :dark-mode="isDarkMode">
        <FullPlayer />
      </ResponsivePreview>

      <!-- Mini Player Preview -->
      <div
        v-else-if="activePlayerType === 'mini'"
        class="preview__container preview__container--mini"
        :style="previewBgStyle"
      >
        <div class="preview__mini-area">
          <MiniPlayer />
        </div>
      </div>

      <!-- Pill Player Preview -->
      <div
        v-else-if="activePlayerType === 'pill'"
        class="preview__container preview__container--pill"
        :style="previewBgStyle"
      >
        <PillPlayer />
      </div>
    </template>

    <!-- Code Tab Content -->
    <div v-else class="preview__code-panel">
      <!-- Style Approach Toggle -->
      <div class="preview__style-toggle">
        <button
          class="style-btn"
          :class="{ 'is-active': styleApproach === 'inline' }"
          @click="styleApproach = 'inline'"
        >
          Inline
        </button>
        <button
          class="style-btn"
          :class="{ 'is-active': styleApproach === 'stylesheet' }"
          @click="styleApproach = 'stylesheet'"
        >
          Stylesheet
        </button>
      </div>

      <!-- Inline: Light Mode and Dark Mode -->
      <template v-if="styleApproach === 'inline'">
        <div class="code-block">
          <div class="code-block__header">
            <span class="code-block__label">Light Mode</span>
            <button class="code-block__copy" @click="copyCode(lightInlineCode)" title="Copy">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
              </svg>
            </button>
          </div>
          <pre class="code-block__code"><code v-html="highlightedLightInline"></code></pre>
        </div>
        <div class="code-block">
          <div class="code-block__header">
            <span class="code-block__label">Dark Mode</span>
            <button class="code-block__copy" @click="copyCode(darkInlineCode)" title="Copy">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
              </svg>
            </button>
          </div>
          <pre class="code-block__code"><code v-html="highlightedDarkInline"></code></pre>
        </div>
      </template>

      <!-- Stylesheet: HTML and CSS -->
      <template v-else>
        <div class="code-block">
          <div class="code-block__header">
            <span class="code-block__label">HTML</span>
            <button class="code-block__copy" @click="copyCode(htmlCode)" title="Copy">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
              </svg>
            </button>
          </div>
          <pre class="code-block__code"><code v-html="highlightedHtml"></code></pre>
        </div>
        <div class="code-block">
          <div class="code-block__header">
            <span class="code-block__label">CSS</span>
            <button class="code-block__copy" @click="copyCode(cssCode)" title="Copy">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
              </svg>
            </button>
          </div>
          <pre class="code-block__code"><code v-html="highlightedCss"></code></pre>
        </div>
      </template>
    </div>

    <!-- Examples Section -->
    <ExamplesSection />
  </div>
</template>

<style scoped>
.preview {
  position: sticky;
  top: var(--ff-space-xl);
}

.preview__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: var(--ff-space-md);
}

.preview__title {
  font-size: 0.6875rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--ff-muted);
  margin: 0;
}

.preview__controls {
  display: flex;
  align-items: center;
  gap: var(--ff-space-sm);
}

.preview__tab-toggle {
  display: flex;
  background: var(--ff-bg);
  border: 1px solid var(--ff-border);
  border-radius: 20px;
  padding: 3px;
}

.tab-btn {
  padding: 0.375rem 0.875rem;
  font-size: 0.8125rem;
  font-weight: 500;
  color: var(--ff-muted);
  background: transparent;
  border: none;
  border-radius: 16px;
  cursor: pointer;
  transition: all 0.15s ease;
}

.tab-btn:hover {
  color: var(--ff-text);
}

.tab-btn.is-active {
  color: var(--ff-text);
  background: var(--ff-bg-subtle);
}

.preview__mode-toggle {
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

.preview__container {
  background: var(--ff-bg-subtle);
  border: 1px solid var(--ff-border);
  border-radius: 6px;
  padding: var(--ff-space-lg);
  margin-bottom: var(--ff-space-xl);
}

.preview__container--mini {
  min-height: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.preview__mini-area {
  position: relative;
  width: 120px;
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.preview__mini-area :deep(.player-mini) {
  position: relative;
}

.preview__container--pill {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 120px;
}

/* Code Panel */
.preview__code-panel {
  border: 1px solid var(--ff-border);
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: var(--ff-space-xl);
}

.preview__style-toggle {
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

/* Code Blocks */
.code-block {
  border-top: 1px solid var(--ff-border);
}

.code-block__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem var(--ff-space-md);
  background: #f1f5f9;
  border-bottom: 1px solid #e2e8f0;
}

.code-block__label {
  font-size: 0.6875rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: #64748b;
}

.code-block__copy {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  color: #94a3b8;
  background: transparent;
  border: 1px solid transparent;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.15s ease;
}

.code-block__copy:hover {
  color: #475569;
  background: #e2e8f0;
}

.code-block__code {
  margin: 0;
  padding: var(--ff-space-md);
  font-family: 'Fira Code', 'SF Mono', 'Consolas', 'Monaco', monospace;
  font-size: 0.8125rem;
  line-height: 1.7;
  color: #334155;
  background: #f8fafc;
  overflow-x: auto;
  white-space: pre;
}

/* Syntax Highlighting */
.code-block__code :deep(.hl-comment) { color: #a0aec0; font-style: italic; }
.code-block__code :deep(.hl-keyword) { color: #a855f7; font-weight: 500; }
.code-block__code :deep(.hl-tag) { color: #ec4899; }
.code-block__code :deep(.hl-attr) { color: #8b5cf6; }
.code-block__code :deep(.hl-string) { color: #059669; }
.code-block__code :deep(.hl-property) { color: #0891b2; }
.code-block__code :deep(.hl-punct) { color: #64748b; }
.code-block__code :deep(.hl-bracket) { color: #475569; }
.code-block__code :deep(.hl-color) { color: #c026d3; }

/* Dark theme code blocks */
[data-theme="dark"] .code-block__header {
  background: #1e293b;
  border-bottom-color: #334155;
}
[data-theme="dark"] .code-block__label { color: #94a3b8; }
[data-theme="dark"] .code-block__copy { color: #64748b; }
[data-theme="dark"] .code-block__copy:hover { color: #e2e8f0; background: #334155; }
[data-theme="dark"] .code-block__code { background: #0f172a; color: #e2e8f0; }
[data-theme="dark"] .code-block__code :deep(.hl-comment) { color: #64748b; }
[data-theme="dark"] .code-block__code :deep(.hl-keyword) { color: #c4b5fd; }
[data-theme="dark"] .code-block__code :deep(.hl-tag) { color: #f472b6; }
[data-theme="dark"] .code-block__code :deep(.hl-attr) { color: #a5b4fc; }
[data-theme="dark"] .code-block__code :deep(.hl-string) { color: #6ee7b7; }
[data-theme="dark"] .code-block__code :deep(.hl-property) { color: #67e8f9; }
[data-theme="dark"] .code-block__code :deep(.hl-punct) { color: #94a3b8; }
[data-theme="dark"] .code-block__code :deep(.hl-bracket) { color: #94a3b8; }
[data-theme="dark"] .code-block__code :deep(.hl-color) { color: #e879f9; }
</style>
