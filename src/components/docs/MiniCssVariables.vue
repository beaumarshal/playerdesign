<script setup>
import PlayableMiniPlayer from '@/components/examples/PlayableMiniPlayer.vue'
import MiniCssParts from '@/components/docs/MiniCssParts.vue'
import { useCodeCopy } from '@/composables/useCodeCopy'
import { useSyntaxHighlight } from '@/composables/useSyntaxHighlight'

const { copyCode, isCopied } = useCodeCopy()
const { highlightCode } = useSyntaxHighlight()

// Demo recording ID
const demoRecordingId = '276be9aa27f04d4a8251a1a372e112a2'

// Complete CSS reference - Stylesheet approach
const stylesheetExample = `/* Base styles */
fortyfour-player-mini {
  --fortyfour-mini-bg: #c4956a;
  --fortyfour-mini-icon: #ffffff;
  --fortyfour-mini-size: 48px;
  --fortyfour-mini-radius: 50%;
  --fortyfour-mini-border: none;
  --fortyfour-mini-border-color: #c4956a;
}

/* Dark mode */
@media (prefers-color-scheme: dark) {
  fortyfour-player-mini {
    --fortyfour-mini-bg: #e8b878;
    --fortyfour-mini-icon: #1a1a1a;
    --fortyfour-mini-border-color: #e8b878;
  }
}

/* Target specific player by class */
fortyfour-player-mini.hero-player {
  --fortyfour-mini-size: 64px;
}

/* Outlined style - just set border, color follows */
#sidebar-player {
  --fortyfour-mini-radius: 8px;
  --fortyfour-mini-border: 2px solid;
}`

// Inline style approach
const inlineExample = `<fortyfour-player-mini
  recording-id="rec_abc123"
  style="
    --fortyfour-mini-bg: #c4956a;
    --fortyfour-mini-icon: #ffffff;
    --fortyfour-mini-size: 48px;
    --fortyfour-mini-radius: 50%;
    --fortyfour-mini-border: none;
    --fortyfour-mini-border-color: #c4956a;
  "
></fortyfour-player-mini>`

// Variable definitions
const variables = [
  {
    name: '--fortyfour-mini-bg',
    description: 'Button background color',
    notes: 'Use lighter, more vibrant colors for dark mode to maintain visibility against dark backgrounds.',
    type: 'lightDark',
    demos: [
      { bg: '#c4956a', icon: '#ffffff', label: 'Light Mode', previewBg: '#f8f8f8' },
      { bg: '#e8b878', icon: '#1a1a1a', label: 'Dark Mode', previewBg: '#1a1a1a' },
    ]
  },
  {
    name: '--fortyfour-mini-icon',
    description: 'Play/pause icon color',
    notes: 'Ensure sufficient contrast with the background color. In dark mode, darker icons often work better with brighter backgrounds.',
    type: 'lightDark',
    demos: [
      { bg: '#c4956a', icon: '#ffffff', label: 'Light Mode', previewBg: '#f8f8f8' },
      { bg: '#e8b878', icon: '#1a1a1a', label: 'Dark Mode', previewBg: '#1a1a1a' },
    ]
  },
  {
    name: '--fortyfour-mini-size',
    description: 'Button diameter in pixels',
    notes: 'Default is 48px. Minimum recommended size is 32px for touch targets.',
    type: 'size',
    demos: [
      { size: 32, label: '32px' },
      { size: 48, label: '48px (default)' },
      { size: 64, label: '64px' },
    ]
  },
  {
    name: '--fortyfour-mini-radius',
    description: 'Button border radius',
    notes: 'Use 50% for pill/circle shape, 0 for square, or any pixel/rem value for rounded corners.',
    type: 'radius',
    demos: [
      { radius: '50%', label: '50% (pill)' },
      { radius: '12px', label: '12px' },
      { radius: '0', label: '0 (square)' },
    ]
  },
  {
    name: '--fortyfour-mini-border',
    description: 'Button border width and style',
    notes: 'Controls whether a border is shown and its thickness. Use with --fortyfour-mini-border-color for the color.',
    type: 'border',
    demos: [
      { border: '1px solid #c4956a', bg: 'transparent', icon: '#c4956a', label: '1px solid' },
      { border: '2px solid #c4956a', bg: 'transparent', icon: '#c4956a', label: '2px solid' },
      { border: '3px solid #c4956a', bg: 'transparent', icon: '#c4956a', label: '3px solid' },
    ]
  },
  {
    name: '--fortyfour-mini-border-color',
    description: 'Button border color',
    notes: 'Sets the border color independently. Useful for changing colors between light and dark mode.',
    type: 'border',
    demos: [
      { border: '2px solid #c4956a', bg: 'transparent', icon: '#c4956a', label: '#c4956a' },
    ]
  },
]
</script>

<template>
  <div class="mini-vars">
    <p class="mini-vars__intro">
      Style the mini player using CSS custom properties. Apply via stylesheet or inline.
    </p>

    <!-- Usage Section -->
    <div class="section-block">
      <h3 class="section-block__title">Usage</h3>

      <!-- Stylesheet Approach -->
      <div class="docs-code-block">
        <div class="docs-code-block__header">
          <span class="docs-code-block__label">CSS (Stylesheet)</span>
          <button
            class="docs-code-block__copy"
            :class="{ 'is-copied': isCopied('stylesheet') }"
            @click="copyCode(stylesheetExample, 'stylesheet')"
          >
            {{ isCopied('stylesheet') ? 'Copied!' : 'Copy' }}
          </button>
        </div>
        <pre class="docs-code-block__pre"><code v-html="highlightCode(stylesheetExample)"></code></pre>
      </div>

      <!-- Inline Approach -->
      <div class="docs-code-block" style="margin-top: var(--ff-space-md);">
        <div class="docs-code-block__header">
          <span class="docs-code-block__label">HTML (Inline Styles)</span>
          <button
            class="docs-code-block__copy"
            :class="{ 'is-copied': isCopied('inline') }"
            @click="copyCode(inlineExample, 'inline')"
          >
            {{ isCopied('inline') ? 'Copied!' : 'Copy' }}
          </button>
        </div>
        <pre class="docs-code-block__pre"><code v-html="highlightCode(inlineExample)"></code></pre>
      </div>
    </div>

    <!-- Reference Section -->
    <div class="section-block">
      <h3 class="section-block__title">Reference</h3>
      <div class="var-list">
      <div v-for="variable in variables" :key="variable.name" class="var-item">
        <code class="var-item__name">{{ variable.name }}</code>
        <p class="var-item__desc">{{ variable.description }}</p>
        <p class="var-item__notes">{{ variable.notes }}</p>

        <!-- Light/Dark Mode Demos -->
        <div v-if="variable.type === 'lightDark'" class="var-item__demos">
          <div v-for="demo in variable.demos" :key="demo.label" class="demo-card">
            <div class="demo-card__preview" :style="{ background: demo.previewBg }">
              <PlayableMiniPlayer
                :recording-id="demoRecordingId"
                :bg-color="demo.bg"
                :icon-color="demo.icon"
                :show-progress="false"
                hover="none"
              />
            </div>
            <span class="demo-card__label">{{ demo.label }}</span>
          </div>
        </div>

        <!-- Size Demos -->
        <div v-else-if="variable.type === 'size'" class="var-item__demos var-item__demos--sizes">
          <div v-for="demo in variable.demos" :key="demo.label" class="demo-card">
            <div class="demo-card__preview">
              <PlayableMiniPlayer
                :recording-id="demoRecordingId"
                :size="demo.size"
                :show-progress="false"
                hover="none"
              />
            </div>
            <span class="demo-card__label">{{ demo.label }}</span>
          </div>
        </div>

        <!-- Radius Demos -->
        <div v-else-if="variable.type === 'radius'" class="var-item__demos">
          <div v-for="demo in variable.demos" :key="demo.label" class="demo-card">
            <div class="demo-card__preview">
              <PlayableMiniPlayer
                :recording-id="demoRecordingId"
                :border-radius="demo.radius"
                :show-progress="false"
                hover="none"
              />
            </div>
            <span class="demo-card__label">{{ demo.label }}</span>
          </div>
        </div>

        <!-- Border Demos -->
        <div v-else-if="variable.type === 'border'" class="var-item__demos">
          <div v-for="demo in variable.demos" :key="demo.label" class="demo-card">
            <div class="demo-card__preview">
              <PlayableMiniPlayer
                :recording-id="demoRecordingId"
                :bg-color="demo.bg"
                :icon-color="demo.icon"
                :border="demo.border"
                :show-progress="false"
                hover="none"
              />
            </div>
            <span class="demo-card__label">{{ demo.label }}</span>
          </div>
        </div>
      </div>
      </div>
    </div>

    <!-- CSS Parts Section -->
    <div class="section-block">
      <h3 class="section-block__title">CSS Parts</h3>
      <MiniCssParts />
    </div>
  </div>
</template>

<style scoped>
.mini-vars__intro {
  font-size: 0.9375rem;
  color: var(--ff-muted);
  line-height: 1.7;
  margin: 0 0 var(--ff-space-xl);
}

/* Section Block */
.section-block {
  margin-bottom: var(--ff-space-2xl);
}

.section-block__title {
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--ff-text);
  margin: 0 0 var(--ff-space-md);
}

/* Variable List */
.var-list {
  display: flex;
  flex-direction: column;
  gap: var(--ff-space-xl);
}

.var-item {
  padding-bottom: var(--ff-space-xl);
  border-bottom: 1px solid var(--ff-border);
}

.var-item:last-child {
  border-bottom: none;
  padding-bottom: 0;
}

.var-item__name {
  display: inline-block;
  font-family: 'Fira Code', 'SF Mono', monospace;
  font-size: 0.875rem;
  font-weight: 600;
  color: #0891b2;
  background: #ecfeff;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  margin-bottom: var(--ff-space-sm);
}

[data-theme="dark"] .var-item__name {
  color: #67e8f9;
  background: #083344;
}

.var-item__desc {
  font-size: 0.9375rem;
  font-weight: 500;
  color: var(--ff-text);
  margin: 0 0 var(--ff-space-xs);
}

.var-item__notes {
  font-size: 0.8125rem;
  color: var(--ff-muted);
  margin: 0 0 var(--ff-space-md);
  line-height: 1.5;
}

/* Demo Cards */
.var-item__demos {
  display: flex;
  gap: var(--ff-space-md);
  flex-wrap: wrap;
}

.var-item__demos--sizes {
  align-items: flex-end;
}

.demo-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--ff-space-xs);
}

.demo-card__preview {
  width: 88px;
  height: 88px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  border: 1px solid var(--ff-border);
  background: #f8f8f8;
}

.demo-card__label {
  font-size: 0.6875rem;
  font-weight: 500;
  color: var(--ff-muted);
  font-family: 'Fira Code', 'SF Mono', monospace;
  text-align: center;
}

@media (max-width: 500px) {
  .var-item__demos {
    gap: var(--ff-space-sm);
  }

  .demo-card__preview {
    width: 72px;
    height: 72px;
  }
}
</style>
