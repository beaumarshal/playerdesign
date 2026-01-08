<script setup>
import DemoMiniPlayer from '@/components/examples/DemoMiniPlayer.vue'
import { useCodeCopy } from '@/composables/useCodeCopy'
import { useSyntaxHighlight } from '@/composables/useSyntaxHighlight'

const { copyCode, isCopied } = useCodeCopy()
const { highlightCode } = useSyntaxHighlight()

const usageExample = `/* Target internal elements with ::part() */
fortyfour-player-mini::part(button) {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

fortyfour-player-mini::part(icon) {
  filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.3));
}

fortyfour-player-mini::part(progress) {
  stroke: #10b981;
}`

const codeSnippets = {
  button: `fortyfour-player-mini::part(button) {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

fortyfour-player-mini::part(button):hover {
  transform: scale(1.05);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.25);
}`,
  icon: `fortyfour-player-mini::part(icon) {
  filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.3));
  transition: transform 0.15s ease;
}

fortyfour-player-mini::part(button):hover::part(icon) {
  transform: scale(1.1);
}`,
  progress: `fortyfour-player-mini::part(progress) {
  stroke: #10b981;
  stroke-width: 4px;
}`,
  progressTrack: `fortyfour-player-mini::part(progress-track) {
  stroke: rgba(0, 0, 0, 0.1);
  stroke-width: 4px;
  stroke-dasharray: 4 2;
}`,
  ripple: `fortyfour-player-mini::part(ripple) {
  background: rgba(255, 255, 255, 0.4);
  animation-duration: 0.8s;
}`,
  container: `fortyfour-player-mini::part(container) {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 8px;
}`,
}
</script>

<template>
  <div class="mini-parts">
    <p class="mini-parts__intro">
      Use <code>::part()</code> selectors to style specific internal elements of the web component.
      Unlike CSS variables, parts must be styled in a stylesheet—they cannot be used inline.
    </p>

    <!-- Usage Section -->
    <div class="section-block">
      <h4 class="section-block__title">Usage</h4>
      <div class="docs-code-block">
        <div class="docs-code-block__header">
          <span class="docs-code-block__label">CSS</span>
          <button
            class="docs-code-block__copy"
            :class="{ 'is-copied': isCopied('usage') }"
            @click="copyCode(usageExample, 'usage')"
          >
            {{ isCopied('usage') ? 'Copied!' : 'Copy' }}
          </button>
        </div>
        <pre class="docs-code-block__pre"><code v-html="highlightCode(usageExample)"></code></pre>
      </div>
    </div>

    <!-- Reference Section -->
    <div class="section-block">
      <h4 class="section-block__title">Reference</h4>

      <!-- Button Part -->
    <div class="part-example">
      <div class="part-example__header">
        <code class="part-example__name">::part(button)</code>
        <span class="part-example__desc">The main play/pause button container</span>
      </div>
      <div class="part-example__demos">
        <div class="part-demo">
          <div class="part-demo__preview">
            <DemoMiniPlayer class="demo-shadow" style="--player-primary: #c4956a; --player-icon: #fff;" />
          </div>
          <span class="part-demo__label">With shadow</span>
        </div>
        <div class="part-demo">
          <div class="part-demo__preview">
            <DemoMiniPlayer class="demo-glow" style="--player-primary: #3b82f6; --player-icon: #fff;" />
          </div>
          <span class="part-demo__label">With glow</span>
        </div>
        <div class="part-demo">
          <div class="part-demo__preview">
            <DemoMiniPlayer class="demo-border" style="--player-primary: #fff; --player-icon: #1a1a1a;" />
          </div>
          <span class="part-demo__label">With border</span>
        </div>
      </div>
      <div class="docs-code-block">
        <div class="docs-code-block__header">
          <span class="docs-code-block__label">CSS</span>
          <button
            class="docs-code-block__copy"
            :class="{ 'is-copied': isCopied('button') }"
            @click="copyCode(codeSnippets.button, 'button')"
          >
            {{ isCopied('button') ? 'Copied!' : 'Copy' }}
          </button>
        </div>
        <pre class="docs-code-block__pre"><code v-html="highlightCode(codeSnippets.button)"></code></pre>
      </div>
    </div>

    <!-- Icon Part -->
    <div class="part-example">
      <div class="part-example__header">
        <code class="part-example__name">::part(icon)</code>
        <span class="part-example__desc">The play/pause icon element</span>
      </div>
      <div class="part-example__demos">
        <div class="part-demo">
          <div class="part-demo__preview">
            <DemoMiniPlayer class="demo-icon-shadow" style="--player-primary: #1a1a1a; --player-icon: #fff;" />
          </div>
          <span class="part-demo__label">Drop shadow</span>
        </div>
        <div class="part-demo">
          <div class="part-demo__preview">
            <DemoMiniPlayer class="demo-icon-large" style="--player-primary: #8b5cf6; --player-icon: #fff;" />
          </div>
          <span class="part-demo__label">Larger icon</span>
        </div>
        <div class="part-demo">
          <div class="part-demo__preview">
            <DemoMiniPlayer class="demo-icon-offset" style="--player-primary: #10b981; --player-icon: #fff;" />
          </div>
          <span class="part-demo__label">Offset (play)</span>
        </div>
      </div>
      <div class="docs-code-block">
        <div class="docs-code-block__header">
          <span class="docs-code-block__label">CSS</span>
          <button
            class="docs-code-block__copy"
            :class="{ 'is-copied': isCopied('icon') }"
            @click="copyCode(codeSnippets.icon, 'icon')"
          >
            {{ isCopied('icon') ? 'Copied!' : 'Copy' }}
          </button>
        </div>
        <pre class="docs-code-block__pre"><code v-html="highlightCode(codeSnippets.icon)"></code></pre>
      </div>
    </div>

    <!-- Progress Part -->
    <div class="part-example">
      <div class="part-example__header">
        <code class="part-example__name">::part(progress)</code>
        <span class="part-example__desc">The circular progress ring fill</span>
      </div>
      <div class="part-example__demos">
        <div class="part-demo">
          <div class="part-demo__preview">
            <DemoMiniPlayer :showProgress="true" :progress="0.5" class="demo-progress-thin" style="--player-primary: #c4956a; --player-icon: #fff;" />
          </div>
          <span class="part-demo__label">Thin stroke</span>
        </div>
        <div class="part-demo">
          <div class="part-demo__preview">
            <DemoMiniPlayer :showProgress="true" :progress="0.5" class="demo-progress-thick" style="--player-primary: #c4956a; --player-icon: #fff;" />
          </div>
          <span class="part-demo__label">Thick stroke</span>
        </div>
        <div class="part-demo">
          <div class="part-demo__preview">
            <DemoMiniPlayer :showProgress="true" :progress="0.5" class="demo-progress-green" style="--player-primary: #1a1a1a; --player-icon: #fff;" />
          </div>
          <span class="part-demo__label">Custom color</span>
        </div>
      </div>
      <div class="docs-code-block">
        <div class="docs-code-block__header">
          <span class="docs-code-block__label">CSS</span>
          <button
            class="docs-code-block__copy"
            :class="{ 'is-copied': isCopied('progress') }"
            @click="copyCode(codeSnippets.progress, 'progress')"
          >
            {{ isCopied('progress') ? 'Copied!' : 'Copy' }}
          </button>
        </div>
        <pre class="docs-code-block__pre"><code v-html="highlightCode(codeSnippets.progress)"></code></pre>
      </div>
    </div>

    <!-- Progress Track Part -->
    <div class="part-example">
      <div class="part-example__header">
        <code class="part-example__name">::part(progress-track)</code>
        <span class="part-example__desc">The background ring behind the progress</span>
      </div>
      <div class="part-example__demos">
        <div class="part-demo">
          <div class="part-demo__preview">
            <DemoMiniPlayer :showProgress="true" :progress="0.3" class="demo-track-dashed" style="--player-primary: #3b82f6; --player-icon: #fff;" />
          </div>
          <span class="part-demo__label">Dashed</span>
        </div>
        <div class="part-demo">
          <div class="part-demo__preview">
            <DemoMiniPlayer :showProgress="true" :progress="0.3" class="demo-track-dotted" style="--player-primary: #8b5cf6; --player-icon: #fff;" />
          </div>
          <span class="part-demo__label">Dotted</span>
        </div>
        <div class="part-demo">
          <div class="part-demo__preview">
            <DemoMiniPlayer :showProgress="true" :progress="0.3" class="demo-track-hidden" style="--player-primary: #10b981; --player-icon: #fff;" />
          </div>
          <span class="part-demo__label">Hidden</span>
        </div>
      </div>
      <div class="docs-code-block">
        <div class="docs-code-block__header">
          <span class="docs-code-block__label">CSS</span>
          <button
            class="docs-code-block__copy"
            :class="{ 'is-copied': isCopied('progressTrack') }"
            @click="copyCode(codeSnippets.progressTrack, 'progressTrack')"
          >
            {{ isCopied('progressTrack') ? 'Copied!' : 'Copy' }}
          </button>
        </div>
        <pre class="docs-code-block__pre"><code v-html="highlightCode(codeSnippets.progressTrack)"></code></pre>
      </div>
    </div>

    <!-- Ripple Part -->
    <div class="part-example">
      <div class="part-example__header">
        <code class="part-example__name">::part(ripple)</code>
        <span class="part-example__desc">The click/tap feedback animation</span>
      </div>
      <div class="part-example__demos">
        <div class="part-demo">
          <div class="part-demo__preview">
            <DemoMiniPlayer :showRipple="true" style="--player-primary: #c4956a; --player-icon: #fff;" />
          </div>
          <span class="part-demo__label">Default</span>
        </div>
        <div class="part-demo">
          <div class="part-demo__preview">
            <DemoMiniPlayer :showRipple="true" class="demo-ripple-slow" style="--player-primary: #3b82f6; --player-icon: #fff;" />
          </div>
          <span class="part-demo__label">Slow</span>
        </div>
        <div class="part-demo">
          <div class="part-demo__preview">
            <DemoMiniPlayer :showRipple="true" class="demo-ripple-color" style="--player-primary: #1a1a1a; --player-icon: #fff;" />
          </div>
          <span class="part-demo__label">Custom color</span>
        </div>
      </div>
      <div class="docs-code-block">
        <div class="docs-code-block__header">
          <span class="docs-code-block__label">CSS</span>
          <button
            class="docs-code-block__copy"
            :class="{ 'is-copied': isCopied('ripple') }"
            @click="copyCode(codeSnippets.ripple, 'ripple')"
          >
            {{ isCopied('ripple') ? 'Copied!' : 'Copy' }}
          </button>
        </div>
        <pre class="docs-code-block__pre"><code v-html="highlightCode(codeSnippets.ripple)"></code></pre>
      </div>
    </div>

    <!-- Container Part -->
    <div class="part-example">
      <div class="part-example__header">
        <code class="part-example__name">::part(container)</code>
        <span class="part-example__desc">The outer wrapper for positioning context</span>
      </div>
      <p class="part-example__note">
        Use this part to control the player's position within a flex or grid layout, or to add wrapper-level styling like margins.
      </p>
      <div class="docs-code-block">
        <div class="docs-code-block__header">
          <span class="docs-code-block__label">CSS</span>
          <button
            class="docs-code-block__copy"
            :class="{ 'is-copied': isCopied('container') }"
            @click="copyCode(codeSnippets.container, 'container')"
          >
            {{ isCopied('container') ? 'Copied!' : 'Copy' }}
          </button>
        </div>
        <pre class="docs-code-block__pre"><code v-html="highlightCode(codeSnippets.container)"></code></pre>
      </div>
    </div>
    </div>
  </div>
</template>

<style scoped>
.mini-parts__intro {
  font-size: 0.9375rem;
  color: var(--ff-muted);
  line-height: 1.7;
  margin: 0 0 var(--ff-space-xl);
}

.mini-parts__intro code {
  background: var(--ff-bg-subtle);
  padding: 0.125rem 0.375rem;
  border-radius: 4px;
  font-family: 'Fira Code', 'SF Mono', monospace;
  font-size: 0.875rem;
}

/* Section Block */
.section-block {
  margin-bottom: var(--ff-space-2xl);
}

.section-block__title {
  font-size: 1rem;
  font-weight: 600;
  color: var(--ff-text);
  margin: 0 0 var(--ff-space-md);
}

.part-example {
  margin-bottom: var(--ff-space-xl);
  padding-bottom: var(--ff-space-xl);
  border-bottom: 1px solid var(--ff-border);
}

.part-example:last-child {
  border-bottom: none;
  margin-bottom: 0;
  padding-bottom: 0;
}

.part-example__header {
  margin-bottom: var(--ff-space-md);
}

.part-example__name {
  display: block;
  font-family: 'Fira Code', 'SF Mono', monospace;
  font-size: 0.9375rem;
  font-weight: 600;
  color: #a855f7;
  margin-bottom: 0.25rem;
}

[data-theme="dark"] .part-example__name {
  color: #c4b5fd;
}

.part-example__desc {
  font-size: 0.8125rem;
  color: var(--ff-muted);
}

.part-example__note {
  font-size: 0.8125rem;
  color: var(--ff-muted);
  margin: 0 0 var(--ff-space-md);
  font-style: italic;
}

.part-example__demos {
  display: flex;
  gap: var(--ff-space-lg);
  margin-bottom: var(--ff-space-lg);
}

.part-demo {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--ff-space-sm);
}

.part-demo__preview {
  width: 100px;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  border: 1px solid var(--ff-border);
  background: #f8f8f8;
}

[data-theme="dark"] .part-demo__preview {
  background: #1a1a1a;
}

.part-demo__label {
  font-size: 0.75rem;
  color: var(--ff-muted);
}

/* Demo effect classes */
:deep(.demo-shadow .demo-mini) {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

:deep(.demo-glow .demo-mini) {
  box-shadow: 0 0 20px rgba(59, 130, 246, 0.5);
}

:deep(.demo-border .demo-mini) {
  border: 2px solid #e5e7eb;
}

/* Icon demos */
:deep(.demo-icon-shadow .demo-mini__icon) {
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.4));
}

:deep(.demo-icon-large .demo-mini__icon) {
  transform: scale(1.3);
}

:deep(.demo-icon-offset .demo-mini__icon) {
  transform: translateX(2px);
}

/* Progress demos */
:deep(.demo-progress-thin) .demo-mini__progress-fill {
  stroke-width: 2px;
}

:deep(.demo-progress-thin) .demo-mini__progress-track {
  stroke-width: 2px;
}

:deep(.demo-progress-thick) .demo-mini__progress-fill {
  stroke-width: 5px;
}

:deep(.demo-progress-thick) .demo-mini__progress-track {
  stroke-width: 5px;
}

:deep(.demo-progress-green) .demo-mini__progress-fill {
  stroke: #10b981;
}

/* Progress track demos */
:deep(.demo-track-dashed) .demo-mini__progress-track {
  stroke-dasharray: 8 4;
  opacity: 0.4;
}

:deep(.demo-track-dotted) .demo-mini__progress-track {
  stroke-dasharray: 2 4;
  stroke-linecap: round;
  opacity: 0.5;
}

:deep(.demo-track-hidden) .demo-mini__progress-track {
  opacity: 0;
}

/* Ripple demos */
:deep(.demo-ripple-slow) .demo-mini__ripple {
  animation-duration: 1.2s;
}

:deep(.demo-ripple-color) .demo-mini__ripple {
  background: #10b981;
}
</style>
