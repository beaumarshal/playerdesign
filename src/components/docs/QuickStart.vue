<script setup>
import { useCodeCopy } from '@/composables/useCodeCopy'
import { useSyntaxHighlight } from '@/composables/useSyntaxHighlight'

const { copyCode, isCopied } = useCodeCopy()
const { highlightCode } = useSyntaxHighlight()

const cdnCode = `<script src="https://cdn.44.audio/player.js"><\/script>`

const basicUsageCode = `<fortyfour-player-mini
  recording-id="your_recording_id"
></fortyfour-player-mini>`

const styledUsageCode = `<fortyfour-player-mini
  recording-id="your_recording_id"
  progress="ring"
  style="--fortyfour-mini-bg: #3b82f6; --fortyfour-mini-icon: #ffffff;"
></fortyfour-player-mini>`
</script>

<template>
  <div class="quickstart">
    <p class="quickstart__intro">
      The Mini Player is a compact, button-style audio player perfect for product demos,
      voice messages, profile intros, and anywhere you need a minimal audio interface.
    </p>

    <!-- Installation -->
    <div class="quickstart__section">
      <h3 class="quickstart__heading">Installation</h3>
      <p class="quickstart__text">Add the player script to your HTML:</p>
      <div class="docs-code-block">
        <div class="docs-code-block__header">
          <span class="docs-code-block__label">HTML</span>
          <button
            class="docs-code-block__copy"
            :class="{ 'is-copied': isCopied('cdn') }"
            @click="copyCode(cdnCode, 'cdn')"
          >
            {{ isCopied('cdn') ? 'Copied!' : 'Copy' }}
          </button>
        </div>
        <pre class="docs-code-block__pre"><code v-html="highlightCode(cdnCode)"></code></pre>
      </div>
    </div>

    <!-- Basic Usage -->
    <div class="quickstart__section">
      <h3 class="quickstart__heading">Basic Usage</h3>
      <p class="quickstart__text">Add the player component with your recording ID:</p>
      <div class="docs-code-block">
        <div class="docs-code-block__header">
          <span class="docs-code-block__label">HTML</span>
          <button
            class="docs-code-block__copy"
            :class="{ 'is-copied': isCopied('basic') }"
            @click="copyCode(basicUsageCode, 'basic')"
          >
            {{ isCopied('basic') ? 'Copied!' : 'Copy' }}
          </button>
        </div>
        <pre class="docs-code-block__pre"><code v-html="highlightCode(basicUsageCode)"></code></pre>
      </div>
    </div>

    <!-- Styled Example -->
    <div class="quickstart__section">
      <h3 class="quickstart__heading">With Custom Styling</h3>
      <p class="quickstart__text">Customize colors and enable progress ring:</p>
      <div class="docs-code-block">
        <div class="docs-code-block__header">
          <span class="docs-code-block__label">HTML</span>
          <button
            class="docs-code-block__copy"
            :class="{ 'is-copied': isCopied('styled') }"
            @click="copyCode(styledUsageCode, 'styled')"
          >
            {{ isCopied('styled') ? 'Copied!' : 'Copy' }}
          </button>
        </div>
        <pre class="docs-code-block__pre"><code v-html="highlightCode(styledUsageCode)"></code></pre>
      </div>
    </div>

    <!-- Info Box -->
    <div class="docs-info-box docs-info-box--tip">
      <div class="docs-info-box__title">Tip</div>
      <div class="docs-info-box__content">
        Use the interactive playground below to design your player and copy the generated code.
      </div>
    </div>
  </div>
</template>

<style scoped>
.quickstart__intro {
  font-size: 1.0625rem;
  color: var(--ff-text);
  line-height: 1.7;
  margin: 0 0 var(--ff-space-xl);
}

.quickstart__section {
  margin-bottom: var(--ff-space-xl);
}

.quickstart__heading {
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--ff-text);
  margin: 0 0 var(--ff-space-sm);
}

.quickstart__text {
  font-size: 0.9375rem;
  color: var(--ff-muted);
  margin: 0 0 var(--ff-space-md);
}
</style>
