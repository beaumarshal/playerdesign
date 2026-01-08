<script setup>
import { useCodeCopy } from '@/composables/useCodeCopy'
import { useSyntaxHighlight } from '@/composables/useSyntaxHighlight'

const { copyCode, isCopied } = useCodeCopy()
const { highlightCode } = useSyntaxHighlight()

const cdnCode = `<script src="https://cdn.44.audio/player.js"><\/script>`

const usageCode = `<fortyfour-audio-player
  recording-id="YOUR_RECORDING_ID"
></fortyfour-audio-player>`
</script>

<template>
  <div class="getting-started">
    <section id="getting-started" class="gs-section">
      <h2 class="gs-section__title">Getting Started</h2>

      <!-- Step 1: Installation -->
      <div class="gs-step">
        <h3 class="gs-step__title">1. Add the script</h3>
        <p class="gs-step__text">
          Include the 44.audio player script in your HTML. Place it in the <code>&lt;head&gt;</code>
          or before the closing <code>&lt;/body&gt;</code> tag.
        </p>
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

      <!-- Step 2: Usage -->
      <div class="gs-step">
        <h3 class="gs-step__title">2. Add the player</h3>
        <p class="gs-step__text">
          Add the player component to your page with a recording ID. The player automatically fetches the audio and transcription data.
        </p>
        <div class="docs-code-block">
          <div class="docs-code-block__header">
            <span class="docs-code-block__label">HTML</span>
            <button
              class="docs-code-block__copy"
              :class="{ 'is-copied': isCopied('usage') }"
              @click="copyCode(usageCode, 'usage')"
            >
              {{ isCopied('usage') ? 'Copied!' : 'Copy' }}
            </button>
          </div>
          <pre class="docs-code-block__pre"><code v-html="highlightCode(usageCode)"></code></pre>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.getting-started {
  /* Container */
}

.gs-section {
  scroll-margin-top: 100px;
  padding-bottom: var(--ff-space-2xl);
  margin-bottom: var(--ff-space-xl);
  border-bottom: 1px solid var(--ff-border);
}

.gs-section:last-child {
  border-bottom: none;
}

.gs-section__title {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--ff-text);
  margin: 0 0 var(--ff-space-md);
}

.gs-section__text {
  font-size: 0.9375rem;
  color: var(--ff-muted);
  line-height: 1.7;
  margin: 0 0 var(--ff-space-lg);
}

.gs-section__text code {
  background: var(--ff-bg-subtle);
  padding: 0.125rem 0.375rem;
  border-radius: 4px;
  font-family: 'Fira Code', 'SF Mono', monospace;
  font-size: 0.875rem;
}

/* Steps */
.gs-step {
  margin-bottom: var(--ff-space-xl);
}

.gs-step:last-child {
  margin-bottom: 0;
}

.gs-step__title {
  font-size: 1rem;
  font-weight: 600;
  color: var(--ff-text);
  margin: 0 0 var(--ff-space-sm);
}

.gs-step__text {
  font-size: 0.9375rem;
  color: var(--ff-muted);
  line-height: 1.7;
  margin: 0 0 var(--ff-space-md);
}

.gs-step__text code {
  background: var(--ff-bg-subtle);
  padding: 0.125rem 0.375rem;
  border-radius: 4px;
  font-family: 'Fira Code', 'SF Mono', monospace;
  font-size: 0.875rem;
}
</style>
