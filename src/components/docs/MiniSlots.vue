<script setup>
import DemoMiniPlayer from '@/components/examples/DemoMiniPlayer.vue'
import { useCodeCopy } from '@/composables/useCodeCopy'
import { useSyntaxHighlight } from '@/composables/useSyntaxHighlight'

const { copyCode, isCopied } = useCodeCopy()
const { highlightCode } = useSyntaxHighlight()

const codeSnippets = {
  playsolid: `<fortyfour-player-mini recording-id="rec_abc123">
  <svg slot="play-icon" xmlns="http://www.w3.org/2000/svg"
       viewBox="0 0 384 512" fill="currentColor">
    <path d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6..."/>
  </svg>
</fortyfour-player-mini>`,
  pausesolid: `<fortyfour-player-mini recording-id="rec_abc123">
  <svg slot="pause-icon" xmlns="http://www.w3.org/2000/svg"
       viewBox="0 0 320 512" fill="currentColor">
    <path d="M48 64C21.5 64 0 85.5 0 112V400c0 26.5..."/>
  </svg>
</fortyfour-player-mini>`,
  fakit: `<!-- 1. Load Font Awesome (in <head>) -->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">

<!-- 2. Use FA icons in slots -->
<fortyfour-player-mini recording-id="rec_abc123">
  <i slot="play-icon" class="fa-solid fa-play"></i>
  <i slot="pause-icon" class="fa-solid fa-pause"></i>
</fortyfour-player-mini>`,
  loading: `<fortyfour-player-mini recording-id="rec_abc123">
  <div slot="loading" class="custom-spinner">
    <div class="spinner-ring"></div>
  </div>
</fortyfour-player-mini>

<style>
.custom-spinner {
  width: 20px;
  height: 20px;
}
.spinner-ring {
  width: 100%;
  height: 100%;
  border: 2px solid currentColor;
  border-top-color: transparent;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}
</style>`,
  error: `<fortyfour-player-mini recording-id="rec_abc123">
  <svg slot="error" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.65 6.35A7.958 7.958 0 0012 4c-4.42 0-7.99
             3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55
             7.73-6h-2.08A5.99 5.99 0 0112 18c-3.31 0-6-2.69-6-6s2.69-6
             6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"/>
  </svg>
</fortyfour-player-mini>`,
  badge: `<fortyfour-player-mini recording-id="rec_abc123">
  <span slot="badge" class="duration-badge">0:45</span>
</fortyfour-player-mini>

<style>
.duration-badge {
  font-size: 10px;
  font-weight: 600;
  padding: 2px 6px;
  background: rgba(0, 0, 0, 0.75);
  color: white;
  border-radius: 4px;
}
</style>`,
  tooltip: `<fortyfour-player-mini recording-id="rec_abc123">
  <div slot="tooltip" class="player-tooltip">
    <strong>Morning Meditation</strong>
    <span>0:45 • Sarah Chen</span>
  </div>
</fortyfour-player-mini>

<style>
.player-tooltip {
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.player-tooltip strong {
  font-size: 12px;
}
.player-tooltip span {
  font-size: 11px;
  opacity: 0.7;
}
</style>`,
}
</script>

<template>
  <div class="mini-slots">
    <p class="mini-slots__intro">
      Replace default content with custom HTML using slots. Use <code>fill="currentColor"</code> on SVGs to inherit the icon color.
    </p>

    <!-- Play Icon Slot -->
    <div class="slot-example">
      <div class="slot-example__header">
        <code class="slot-example__name">slot="play-icon"</code>
        <span class="slot-example__desc">Replace the default play icon</span>
      </div>
      <div class="slot-example__demos">
        <div class="slot-demo">
          <div class="slot-demo__preview">
            <DemoMiniPlayer style="--player-primary: #c4956a; --player-icon: #fff;" />
          </div>
          <span class="slot-demo__label">Default</span>
        </div>
        <div class="slot-demo">
          <div class="slot-demo__preview">
            <DemoMiniPlayer style="--player-primary: #3b82f6; --player-icon: #fff;">
              <template #play-icon>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" fill="currentColor" width="18" height="18">
                  <path d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80V432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z"/>
                </svg>
              </template>
            </DemoMiniPlayer>
          </div>
          <span class="slot-demo__label">Solid</span>
        </div>
        <div class="slot-demo">
          <div class="slot-demo__preview">
            <DemoMiniPlayer style="--player-primary: #10b981; --player-icon: #fff;">
              <template #play-icon>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor" width="24" height="24">
                  <path d="M0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zM188.3 147.1c-7.6 4.2-12.3 12.3-12.3 20.9V344c0 8.7 4.7 16.7 12.3 20.9s16.8 4.1 24.3-.5l144-88c7.1-4.4 11.5-12.1 11.5-20.5s-4.4-16.1-11.5-20.5l-144-88c-7.4-4.5-16.7-4.7-24.3-.5z"/>
                </svg>
              </template>
            </DemoMiniPlayer>
          </div>
          <span class="slot-demo__label">Circle</span>
        </div>
        <div class="slot-demo">
          <div class="slot-demo__preview">
            <DemoMiniPlayer style="--player-primary: #8b5cf6; --player-icon: #fff;">
              <template #play-icon>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512" fill="currentColor" width="14" height="18">
                  <path d="M246.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-9.2-9.2-22.9-11.9-34.9-6.9s-19.8 16.6-19.8 29.6l0 256c0 12.9 7.8 24.6 19.8 29.6s25.7 2.2 34.9-6.9l128-128z"/>
                </svg>
              </template>
            </DemoMiniPlayer>
          </div>
          <span class="slot-demo__label">Caret</span>
        </div>
      </div>
      <div class="docs-code-block">
        <div class="docs-code-block__header">
          <span class="docs-code-block__label">HTML</span>
          <button
            class="docs-code-block__copy"
            :class="{ 'is-copied': isCopied('playsolid') }"
            @click="copyCode(codeSnippets.playsolid, 'playsolid')"
          >
            {{ isCopied('playsolid') ? 'Copied!' : 'Copy' }}
          </button>
        </div>
        <pre class="docs-code-block__pre"><code v-html="highlightCode(codeSnippets.playsolid)"></code></pre>
      </div>
      <div class="docs-info-box docs-info-box--tip">
        <div class="docs-info-box__title">Tip</div>
        <div class="docs-info-box__content">
          Set <code>width</code> and <code>height</code> on the SVG to control size. Use <code>fill="currentColor"</code> to inherit the icon color from <code>--fortyfour-mini-icon</code>.
        </div>
      </div>
    </div>

    <!-- Pause Icon Slot -->
    <div class="slot-example">
      <div class="slot-example__header">
        <code class="slot-example__name">slot="pause-icon"</code>
        <span class="slot-example__desc">Replace the default pause icon</span>
      </div>
      <div class="slot-example__demos">
        <div class="slot-demo">
          <div class="slot-demo__preview">
            <DemoMiniPlayer :isPlaying="true" style="--player-primary: #c4956a; --player-icon: #fff;" />
          </div>
          <span class="slot-demo__label">Default</span>
        </div>
        <div class="slot-demo">
          <div class="slot-demo__preview">
            <DemoMiniPlayer :isPlaying="true" style="--player-primary: #ef4444; --player-icon: #fff;">
              <template #pause-icon>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" fill="currentColor" width="14" height="18">
                  <path d="M48 64C21.5 64 0 85.5 0 112V400c0 26.5 21.5 48 48 48H80c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48H48zm192 0c-26.5 0-48 21.5-48 48V400c0 26.5 21.5 48 48 48h32c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48H240z"/>
                </svg>
              </template>
            </DemoMiniPlayer>
          </div>
          <span class="slot-demo__label">Solid</span>
        </div>
        <div class="slot-demo">
          <div class="slot-demo__preview">
            <DemoMiniPlayer :isPlaying="true" style="--player-primary: #f97316; --player-icon: #fff;">
              <template #pause-icon>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor" width="24" height="24">
                  <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM224 192V320c0 17.7-14.3 32-32 32s-32-14.3-32-32V192c0-17.7 14.3-32 32-32s32 14.3 32 32zm128 0V320c0 17.7-14.3 32-32 32s-32-14.3-32-32V192c0-17.7 14.3-32 32-32s32 14.3 32 32z"/>
                </svg>
              </template>
            </DemoMiniPlayer>
          </div>
          <span class="slot-demo__label">Circle</span>
        </div>
      </div>
      <div class="docs-code-block">
        <div class="docs-code-block__header">
          <span class="docs-code-block__label">HTML</span>
          <button
            class="docs-code-block__copy"
            :class="{ 'is-copied': isCopied('pausesolid') }"
            @click="copyCode(codeSnippets.pausesolid, 'pausesolid')"
          >
            {{ isCopied('pausesolid') ? 'Copied!' : 'Copy' }}
          </button>
        </div>
        <pre class="docs-code-block__pre"><code v-html="highlightCode(codeSnippets.pausesolid)"></code></pre>
      </div>
    </div>

    <!-- Using Font Awesome -->
    <div class="slot-example">
      <div class="slot-example__header">
        <code class="slot-example__name">Using Font Awesome</code>
        <span class="slot-example__desc">Use Font Awesome icons with the &lt;i&gt; tag</span>
      </div>
      <div class="slot-example__demos">
        <div class="slot-demo">
          <div class="slot-demo__preview">
            <DemoMiniPlayer style="--player-primary: #3b82f6; --player-icon: #fff;">
              <template #play-icon>
                <i class="fa-solid fa-play"></i>
              </template>
              <template #pause-icon>
                <i class="fa-solid fa-pause"></i>
              </template>
            </DemoMiniPlayer>
          </div>
          <span class="slot-demo__label">fa-play</span>
        </div>
        <div class="slot-demo">
          <div class="slot-demo__preview">
            <DemoMiniPlayer style="--player-primary: #10b981; --player-icon: #fff;">
              <template #play-icon>
                <i class="fa-solid fa-circle-play"></i>
              </template>
              <template #pause-icon>
                <i class="fa-solid fa-circle-pause"></i>
              </template>
            </DemoMiniPlayer>
          </div>
          <span class="slot-demo__label">fa-circle-play</span>
        </div>
        <div class="slot-demo">
          <div class="slot-demo__preview">
            <DemoMiniPlayer style="--player-primary: #8b5cf6; --player-icon: #fff;">
              <template #play-icon>
                <i class="fa-solid fa-caret-right"></i>
              </template>
              <template #pause-icon>
                <i class="fa-solid fa-grip-lines-vertical"></i>
              </template>
            </DemoMiniPlayer>
          </div>
          <span class="slot-demo__label">fa-caret-right</span>
        </div>
        <div class="slot-demo">
          <div class="slot-demo__preview">
            <DemoMiniPlayer style="--player-primary: #ef4444; --player-icon: #fff;">
              <template #play-icon>
                <i class="fa-regular fa-circle-play"></i>
              </template>
              <template #pause-icon>
                <i class="fa-regular fa-circle-pause"></i>
              </template>
            </DemoMiniPlayer>
          </div>
          <span class="slot-demo__label">fa-regular</span>
        </div>
      </div>
      <div class="docs-code-block">
        <div class="docs-code-block__header">
          <span class="docs-code-block__label">HTML</span>
          <button
            class="docs-code-block__copy"
            :class="{ 'is-copied': isCopied('fakit') }"
            @click="copyCode(codeSnippets.fakit, 'fakit')"
          >
            {{ isCopied('fakit') ? 'Copied!' : 'Copy' }}
          </button>
        </div>
        <pre class="docs-code-block__pre"><code v-html="highlightCode(codeSnippets.fakit)"></code></pre>
      </div>
    </div>

    <!-- Loading Slot -->
    <div class="slot-example">
      <div class="slot-example__header">
        <code class="slot-example__name">slot="loading"</code>
        <span class="slot-example__desc">Custom loading spinner while audio buffers</span>
      </div>
      <div class="slot-example__demos">
        <div class="slot-demo">
          <div class="slot-demo__preview">
            <DemoMiniPlayer :loading="true" style="--player-primary: #c4956a; --player-icon: #fff;" />
          </div>
          <span class="slot-demo__label">Default</span>
        </div>
        <div class="slot-demo">
          <div class="slot-demo__preview">
            <DemoMiniPlayer :loading="true" style="--player-primary: #3b82f6; --player-icon: #fff;">
              <template #loading>
                <div class="custom-dots">
                  <span></span><span></span><span></span>
                </div>
              </template>
            </DemoMiniPlayer>
          </div>
          <span class="slot-demo__label">Dots</span>
        </div>
        <div class="slot-demo">
          <div class="slot-demo__preview">
            <DemoMiniPlayer :loading="true" style="--player-primary: #10b981; --player-icon: #fff;">
              <template #loading>
                <div class="custom-pulse"></div>
              </template>
            </DemoMiniPlayer>
          </div>
          <span class="slot-demo__label">Pulse</span>
        </div>
      </div>
      <div class="docs-code-block">
        <div class="docs-code-block__header">
          <span class="docs-code-block__label">HTML + CSS</span>
          <button
            class="docs-code-block__copy"
            :class="{ 'is-copied': isCopied('loading') }"
            @click="copyCode(codeSnippets.loading, 'loading')"
          >
            {{ isCopied('loading') ? 'Copied!' : 'Copy' }}
          </button>
        </div>
        <pre class="docs-code-block__pre"><code v-html="highlightCode(codeSnippets.loading)"></code></pre>
      </div>
    </div>

    <!-- Error Slot -->
    <div class="slot-example">
      <div class="slot-example__header">
        <code class="slot-example__name">slot="error"</code>
        <span class="slot-example__desc">Custom error state when audio fails to load</span>
      </div>
      <div class="slot-example__demos">
        <div class="slot-demo">
          <div class="slot-demo__preview">
            <DemoMiniPlayer :error="true" style="--player-icon: #fff;" />
          </div>
          <span class="slot-demo__label">Default</span>
        </div>
        <div class="slot-demo">
          <div class="slot-demo__preview">
            <DemoMiniPlayer :error="true" style="--player-icon: #fff;">
              <template #error>
                <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                  <path d="M17.65 6.35A7.958 7.958 0 0012 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08A5.99 5.99 0 0112 18c-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"/>
                </svg>
              </template>
            </DemoMiniPlayer>
          </div>
          <span class="slot-demo__label">Retry</span>
        </div>
        <div class="slot-demo">
          <div class="slot-demo__preview">
            <DemoMiniPlayer :error="true" style="--player-icon: #fff;">
              <template #error>
                <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                  <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                </svg>
              </template>
            </DemoMiniPlayer>
          </div>
          <span class="slot-demo__label">Close</span>
        </div>
      </div>
      <div class="docs-code-block">
        <div class="docs-code-block__header">
          <span class="docs-code-block__label">HTML</span>
          <button
            class="docs-code-block__copy"
            :class="{ 'is-copied': isCopied('error') }"
            @click="copyCode(codeSnippets.error, 'error')"
          >
            {{ isCopied('error') ? 'Copied!' : 'Copy' }}
          </button>
        </div>
        <pre class="docs-code-block__pre"><code v-html="highlightCode(codeSnippets.error)"></code></pre>
      </div>
    </div>

    <!-- Badge Slot -->
    <div class="slot-example">
      <div class="slot-example__header">
        <code class="slot-example__name">slot="badge"</code>
        <span class="slot-example__desc">Overlay badge for duration, "NEW", or custom labels</span>
      </div>
      <div class="slot-example__demos">
        <div class="slot-demo">
          <div class="slot-demo__preview">
            <DemoMiniPlayer :showBadge="true" style="--player-primary: #c4956a; --player-icon: #fff;" />
          </div>
          <span class="slot-demo__label">Default</span>
        </div>
        <div class="slot-demo">
          <div class="slot-demo__preview">
            <DemoMiniPlayer style="--player-primary: #3b82f6; --player-icon: #fff;">
              <template #badge>
                <span class="demo-badge demo-badge--duration">0:45</span>
              </template>
            </DemoMiniPlayer>
          </div>
          <span class="slot-demo__label">Duration</span>
        </div>
        <div class="slot-demo">
          <div class="slot-demo__preview">
            <DemoMiniPlayer style="--player-primary: #10b981; --player-icon: #fff;">
              <template #badge>
                <span class="demo-badge demo-badge--live">LIVE</span>
              </template>
            </DemoMiniPlayer>
          </div>
          <span class="slot-demo__label">Live</span>
        </div>
        <div class="slot-demo">
          <div class="slot-demo__preview">
            <DemoMiniPlayer style="--player-primary: #8b5cf6; --player-icon: #fff;">
              <template #badge>
                <span class="demo-badge demo-badge--count">3</span>
              </template>
            </DemoMiniPlayer>
          </div>
          <span class="slot-demo__label">Count</span>
        </div>
      </div>
      <div class="docs-code-block">
        <div class="docs-code-block__header">
          <span class="docs-code-block__label">HTML + CSS</span>
          <button
            class="docs-code-block__copy"
            :class="{ 'is-copied': isCopied('badge') }"
            @click="copyCode(codeSnippets.badge, 'badge')"
          >
            {{ isCopied('badge') ? 'Copied!' : 'Copy' }}
          </button>
        </div>
        <pre class="docs-code-block__pre"><code v-html="highlightCode(codeSnippets.badge)"></code></pre>
      </div>
    </div>

    <!-- Tooltip Slot -->
    <div class="slot-example">
      <div class="slot-example__header">
        <code class="slot-example__name">slot="tooltip"</code>
        <span class="slot-example__desc">Custom hover tooltip with track info</span>
      </div>
      <div class="slot-example__demos">
        <div class="slot-demo">
          <div class="slot-demo__preview slot-demo__preview--tall">
            <DemoMiniPlayer :showTooltip="true" style="--player-primary: #c4956a; --player-icon: #fff;" />
          </div>
          <span class="slot-demo__label">Default</span>
        </div>
        <div class="slot-demo">
          <div class="slot-demo__preview slot-demo__preview--tall">
            <DemoMiniPlayer style="--player-primary: #3b82f6; --player-icon: #fff;">
              <template #tooltip>
                <div class="demo-tooltip">
                  <strong>Morning Meditation</strong>
                  <span>0:45 · Sarah Chen</span>
                </div>
              </template>
            </DemoMiniPlayer>
          </div>
          <span class="slot-demo__label">Track info</span>
        </div>
        <div class="slot-demo">
          <div class="slot-demo__preview slot-demo__preview--tall">
            <DemoMiniPlayer style="--player-primary: #10b981; --player-icon: #fff;">
              <template #tooltip>
                <div class="demo-tooltip demo-tooltip--icon">
                  <svg viewBox="0 0 24 24" fill="currentColor" width="12" height="12">
                    <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
                  </svg>
                  <span>Click to play</span>
                </div>
              </template>
            </DemoMiniPlayer>
          </div>
          <span class="slot-demo__label">With icon</span>
        </div>
      </div>
      <div class="docs-code-block">
        <div class="docs-code-block__header">
          <span class="docs-code-block__label">HTML + CSS</span>
          <button
            class="docs-code-block__copy"
            :class="{ 'is-copied': isCopied('tooltip') }"
            @click="copyCode(codeSnippets.tooltip, 'tooltip')"
          >
            {{ isCopied('tooltip') ? 'Copied!' : 'Copy' }}
          </button>
        </div>
        <pre class="docs-code-block__pre"><code v-html="highlightCode(codeSnippets.tooltip)"></code></pre>
      </div>
    </div>
  </div>
</template>

<style scoped>
.mini-slots__intro {
  font-size: 0.9375rem;
  color: var(--ff-muted);
  line-height: 1.7;
  margin: 0 0 var(--ff-space-xl);
}

.mini-slots__intro code {
  background: var(--ff-bg-subtle);
  padding: 0.125rem 0.375rem;
  border-radius: 4px;
  font-family: 'Fira Code', 'SF Mono', monospace;
  font-size: 0.875rem;
}

.slot-example {
  margin-bottom: var(--ff-space-xl);
  padding-bottom: var(--ff-space-xl);
  border-bottom: 1px solid var(--ff-border);
}

.slot-example:last-child {
  border-bottom: none;
  margin-bottom: 0;
  padding-bottom: 0;
}

.slot-example__header {
  margin-bottom: var(--ff-space-md);
}

.slot-example__name {
  display: block;
  font-family: 'Fira Code', 'SF Mono', monospace;
  font-size: 0.9375rem;
  font-weight: 600;
  color: #059669;
  margin-bottom: 0.25rem;
}

[data-theme="dark"] .slot-example__name {
  color: #6ee7b7;
}

.slot-example__desc {
  font-size: 0.8125rem;
  color: var(--ff-muted);
}

.slot-example__demos {
  display: flex;
  gap: var(--ff-space-lg);
  margin-bottom: var(--ff-space-lg);
  flex-wrap: wrap;
}

.slot-demo {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--ff-space-sm);
}

.slot-demo__preview {
  width: 100px;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  border: 1px solid var(--ff-border);
  background: #f8f8f8;
}

.slot-demo__preview--tall {
  height: 120px;
}

[data-theme="dark"] .slot-demo__preview {
  background: #1a1a1a;
}

.slot-demo__label {
  font-size: 0.75rem;
  color: var(--ff-muted);
  font-family: 'Fira Code', 'SF Mono', monospace;
}

/* Custom loading animation demos */
.custom-dots {
  display: flex;
  gap: 4px;
}

.custom-dots span {
  width: 6px;
  height: 6px;
  background: currentColor;
  border-radius: 50%;
  animation: dots 1.4s ease-in-out infinite;
}

.custom-dots span:nth-child(2) {
  animation-delay: 0.2s;
}

.custom-dots span:nth-child(3) {
  animation-delay: 0.4s;
}

@keyframes dots {
  0%, 80%, 100% {
    transform: scale(0.6);
    opacity: 0.5;
  }
  40% {
    transform: scale(1);
    opacity: 1;
  }
}

.custom-pulse {
  width: 16px;
  height: 16px;
  background: currentColor;
  border-radius: 50%;
  animation: pulse 1.2s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% {
    transform: scale(0.8);
    opacity: 0.5;
  }
  50% {
    transform: scale(1.1);
    opacity: 1;
  }
}

/* Badge demos */
.demo-badge {
  display: block;
  font-size: 0.5rem;
  font-weight: 700;
  padding: 2px 5px;
  border-radius: 4px;
  line-height: 1;
}

.demo-badge--duration {
  background: rgba(0, 0, 0, 0.75);
  color: white;
}

.demo-badge--live {
  background: #ef4444;
  color: white;
  animation: live-pulse 2s ease-in-out infinite;
}

@keyframes live-pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.7; }
}

.demo-badge--count {
  background: #3b82f6;
  color: white;
  width: 16px;
  height: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  padding: 0;
}

/* Tooltip demos */
.demo-tooltip {
  display: flex;
  flex-direction: column;
  gap: 2px;
  text-align: center;
}

.demo-tooltip strong {
  font-size: 0.6875rem;
  color: var(--ff-text);
}

.demo-tooltip span {
  font-size: 0.625rem;
  color: var(--ff-muted);
}

.demo-tooltip--icon {
  flex-direction: row;
  align-items: center;
  gap: 4px;
}

.demo-tooltip--icon svg {
  color: var(--ff-muted);
}
</style>
