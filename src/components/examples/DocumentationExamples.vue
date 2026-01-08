<script setup>
import { ref } from 'vue'
import DemoMiniPlayer from './DemoMiniPlayer.vue'

defineProps({
  showHeader: {
    type: Boolean,
    default: true
  }
})

const activeCategory = ref('variables')

const categories = [
  { id: 'variables', label: 'CSS Variables', description: 'I want to theme it' },
  { id: 'attributes', label: 'Attributes', description: 'I want to configure it' },
  { id: 'parts', label: 'CSS Parts', description: 'I want to style something specific' },
  { id: 'slots', label: 'Slots', description: 'I want to replace something entirely' },
]

// Code snippets stored separately to avoid template literal issues
const codeSnippets = {
  bg: `<fortyfour-player-mini
  recording-id="rec_abc123"
  style="--fortyfour-mini-bg: #3b82f6;"
></fortyfour-player-mini>`,
  icon: `<fortyfour-player-mini
  recording-id="rec_abc123"
  style="--fortyfour-mini-bg: #fef3c7;
         --fortyfour-mini-icon: #b45309;"
></fortyfour-player-mini>`,
  size: `<fortyfour-player-mini
  recording-id="rec_abc123"
  style="--fortyfour-mini-size: 64px;"
></fortyfour-player-mini>`,
  rid: `<fortyfour-player-mini recording-id="rec_abc123"></fortyfour-player-mini>`,
  progress: `<fortyfour-player-mini
  recording-id="rec_abc123"
  progress="ring"
></fortyfour-player-mini>`,
  autoplay: `<fortyfour-player-mini
  recording-id="rec_abc123"
  autoplay
></fortyfour-player-mini>`,
  button: `fortyfour-player-mini::part(button) {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

fortyfour-player-mini::part(button):hover {
  transform: scale(1.05);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.25);
}`,
  progresspart: `fortyfour-player-mini::part(progress) {
  stroke: #10b981;
  stroke-width: 4px;
}`,
  // Font Awesome play icons
  playsolid: `<!-- Font Awesome Play (Solid) -->
<fortyfour-player-mini recording-id="rec_abc123">
  <svg slot="play-icon" xmlns="http://www.w3.org/2000/svg"
       viewBox="0 0 384 512" fill="currentColor">
    <path d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80V432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z"/>
  </svg>
</fortyfour-player-mini>`,
  playcircle: `<!-- Font Awesome Circle Play (Solid) -->
<fortyfour-player-mini recording-id="rec_abc123">
  <svg slot="play-icon" xmlns="http://www.w3.org/2000/svg"
       viewBox="0 0 512 512" fill="currentColor">
    <path d="M0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zM188.3 147.1c-7.6 4.2-12.3 12.3-12.3 20.9V344c0 8.7 4.7 16.7 12.3 20.9s16.8 4.1 24.3-.5l144-88c7.1-4.4 11.5-12.1 11.5-20.5s-4.4-16.1-11.5-20.5l-144-88c-7.4-4.5-16.7-4.7-24.3-.5z"/>
  </svg>
</fortyfour-player-mini>`,
  playcaret: `<!-- Font Awesome Caret Right (Solid) -->
<fortyfour-player-mini recording-id="rec_abc123">
  <svg slot="play-icon" xmlns="http://www.w3.org/2000/svg"
       viewBox="0 0 256 512" fill="currentColor">
    <path d="M246.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-9.2-9.2-22.9-11.9-34.9-6.9s-19.8 16.6-19.8 29.6l0 256c0 12.9 7.8 24.6 19.8 29.6s25.7 2.2 34.9-6.9l128-128z"/>
  </svg>
</fortyfour-player-mini>`,
  // Font Awesome pause icons
  pausesolid: `<!-- Font Awesome Pause (Solid) -->
<fortyfour-player-mini recording-id="rec_abc123">
  <svg slot="pause-icon" xmlns="http://www.w3.org/2000/svg"
       viewBox="0 0 320 512" fill="currentColor">
    <path d="M48 64C21.5 64 0 85.5 0 112V400c0 26.5 21.5 48 48 48H80c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48H48zm192 0c-26.5 0-48 21.5-48 48V400c0 26.5 21.5 48 48 48h32c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48H240z"/>
  </svg>
</fortyfour-player-mini>`,
  pausecircle: `<!-- Font Awesome Circle Pause (Solid) -->
<fortyfour-player-mini recording-id="rec_abc123">
  <svg slot="pause-icon" xmlns="http://www.w3.org/2000/svg"
       viewBox="0 0 512 512" fill="currentColor">
    <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM224 192V320c0 17.7-14.3 32-32 32s-32-14.3-32-32V192c0-17.7 14.3-32 32-32s32 14.3 32 32zm128 0V320c0 17.7-14.3 32-32 32s-32-14.3-32-32V192c0-17.7 14.3-32 32-32s32 14.3 32 32z"/>
  </svg>
</fortyfour-player-mini>`,
  // Font Awesome Kit example
  fakit: `<!-- Using Font Awesome Kit (requires FA to be loaded) -->
<fortyfour-player-mini recording-id="rec_abc123">
  <i slot="play-icon" class="fa-solid fa-play"></i>
  <i slot="pause-icon" class="fa-solid fa-pause"></i>
</fortyfour-player-mini>

<style>
/* Style the Font Awesome icons */
fortyfour-player-mini [slot="play-icon"],
fortyfour-player-mini [slot="pause-icon"] {
  font-size: 18px;
  color: inherit;
}
</style>`,
}

// Copy to clipboard with feedback
const copiedIndex = ref(null)
const copyCode = (key) => {
  const text = codeSnippets[key]
  if (!text) return
  navigator.clipboard.writeText(text).then(() => {
    copiedIndex.value = key
    setTimeout(() => { copiedIndex.value = null }, 2000)
  }).catch(err => {
    console.error('Failed to copy:', err)
  })
}

// Syntax highlighting
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
  code = code.replace(/::part\(/g, (m) => placeholder(m, 'keyword'))
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
</script>

<template>
  <div class="doc-examples">
    <template v-if="showHeader">
      <h3 class="doc-examples__title">Customization</h3>
      <p class="doc-examples__intro">Multiple ways to customize the mini player to match your design</p>
    </template>

    <!-- Category Tabs -->
    <div class="doc-examples__tabs">
      <button
        v-for="cat in categories"
        :key="cat.id"
        class="doc-examples__tab"
        :class="{ 'is-active': activeCategory === cat.id }"
        @click="activeCategory = cat.id"
      >
        <span class="doc-examples__tab-label">{{ cat.label }}</span>
        <span class="doc-examples__tab-desc">{{ cat.description }}</span>
      </button>
    </div>

    <!-- CSS Variables Section -->
    <div v-if="activeCategory === 'variables'" class="doc-section">
      <div class="doc-section__header">
        <h4 class="doc-section__title">CSS Variables</h4>
        <p class="doc-section__desc">Override default styling using CSS custom properties. Apply inline or in your stylesheet.</p>
      </div>

      <!-- Background Color -->
      <div class="example-row">
        <div class="example-row__info">
          <code class="example-row__var">--fortyfour-mini-bg</code>
          <span class="example-row__label">Button background color</span>
        </div>
        <div class="example-row__demos">
          <div class="demo-item">
            <div class="demo-item__preview" style="background: #f8f8f8;">
              <DemoMiniPlayer style="--player-primary: #c4956a; --player-icon: #fff;" />
            </div>
            <code class="demo-item__value">#c4956a</code>
          </div>
          <div class="demo-item">
            <div class="demo-item__preview" style="background: #f8f8f8;">
              <DemoMiniPlayer style="--player-primary: #3b82f6; --player-icon: #fff;" />
            </div>
            <code class="demo-item__value">#3b82f6</code>
          </div>
          <div class="demo-item">
            <div class="demo-item__preview" style="background: #f8f8f8;">
              <DemoMiniPlayer style="--player-primary: #10b981; --player-icon: #fff;" />
            </div>
            <code class="demo-item__value">#10b981</code>
          </div>
          <div class="demo-item">
            <div class="demo-item__preview" style="background: #f8f8f8;">
              <DemoMiniPlayer style="--player-primary: #1a1a1a; --player-icon: #fff;" />
            </div>
            <code class="demo-item__value">#1a1a1a</code>
          </div>
        </div>
        <div class="example-row__code">
          <div class="code-block">
            <div class="code-block__header">
              <span>HTML</span>
              <button class="code-block__copy" @click="copyCode('bg')">
                {{ copiedIndex === 'bg' ? 'Copied!' : 'Copy' }}
              </button>
            </div>
            <pre class="code-block__pre"><code v-html="highlightCode(codeSnippets.bg)"></code></pre>
          </div>
        </div>
      </div>

      <!-- Icon Color -->
      <div class="example-row">
        <div class="example-row__info">
          <code class="example-row__var">--fortyfour-mini-icon</code>
          <span class="example-row__label">Play/pause icon color</span>
        </div>
        <div class="example-row__demos">
          <div class="demo-item">
            <div class="demo-item__preview" style="background: #f8f8f8;">
              <DemoMiniPlayer style="--player-primary: #f3f4f6; --player-icon: #1a1a1a;" />
            </div>
            <code class="demo-item__value">#1a1a1a</code>
          </div>
          <div class="demo-item">
            <div class="demo-item__preview" style="background: #f8f8f8;">
              <DemoMiniPlayer style="--player-primary: #fef3c7; --player-icon: #b45309;" />
            </div>
            <code class="demo-item__value">#b45309</code>
          </div>
          <div class="demo-item">
            <div class="demo-item__preview" style="background: #f8f8f8;">
              <DemoMiniPlayer style="--player-primary: #fce7f3; --player-icon: #be185d;" />
            </div>
            <code class="demo-item__value">#be185d</code>
          </div>
          <div class="demo-item">
            <div class="demo-item__preview" style="background: #1a1a1a;">
              <DemoMiniPlayer style="--player-primary: transparent; --player-icon: #fff; border: 2px solid rgba(255,255,255,0.3);" />
            </div>
            <code class="demo-item__value">#ffffff</code>
          </div>
        </div>
        <div class="example-row__code">
          <div class="code-block">
            <div class="code-block__header">
              <span>HTML</span>
              <button class="code-block__copy" @click="copyCode('icon')">
                {{ copiedIndex === 'icon' ? 'Copied!' : 'Copy' }}
              </button>
            </div>
            <pre class="code-block__pre"><code v-html="highlightCode(codeSnippets.icon)"></code></pre>
          </div>
        </div>
      </div>

      <!-- Size -->
      <div class="example-row">
        <div class="example-row__info">
          <code class="example-row__var">--fortyfour-mini-size</code>
          <span class="example-row__label">Button diameter</span>
        </div>
        <div class="example-row__demos example-row__demos--sizes">
          <div class="demo-item demo-item--size">
            <div class="demo-item__preview demo-item__preview--size" style="background: #f8f8f8;">
              <DemoMiniPlayer :size="32" style="--player-primary: #c4956a; --player-icon: #fff;" />
            </div>
            <code class="demo-item__value">32px</code>
          </div>
          <div class="demo-item demo-item--size">
            <div class="demo-item__preview demo-item__preview--size" style="background: #f8f8f8;">
              <DemoMiniPlayer :size="48" style="--player-primary: #c4956a; --player-icon: #fff;" />
            </div>
            <code class="demo-item__value">48px</code>
          </div>
          <div class="demo-item demo-item--size">
            <div class="demo-item__preview demo-item__preview--size" style="background: #f8f8f8;">
              <DemoMiniPlayer :size="64" style="--player-primary: #c4956a; --player-icon: #fff;" />
            </div>
            <code class="demo-item__value">64px</code>
          </div>
          <div class="demo-item demo-item--size">
            <div class="demo-item__preview demo-item__preview--size" style="background: #f8f8f8;">
              <DemoMiniPlayer :size="80" style="--player-primary: #c4956a; --player-icon: #fff;" />
            </div>
            <code class="demo-item__value">80px</code>
          </div>
        </div>
        <div class="example-row__code">
          <div class="code-block">
            <div class="code-block__header">
              <span>HTML</span>
              <button class="code-block__copy" @click="copyCode('size')">
                {{ copiedIndex === 'size' ? 'Copied!' : 'Copy' }}
              </button>
            </div>
            <pre class="code-block__pre"><code v-html="highlightCode(codeSnippets.size)"></code></pre>
          </div>
        </div>
      </div>
    </div>

    <!-- Attributes Section -->
    <div v-else-if="activeCategory === 'attributes'" class="doc-section">
      <div class="doc-section__header">
        <h4 class="doc-section__title">HTML Attributes</h4>
        <p class="doc-section__desc">Configure player behavior and appearance through HTML attributes.</p>
      </div>

      <!-- Recording ID -->
      <div class="attr-example">
        <div class="attr-example__header">
          <code class="attr-example__name">recording-id</code>
          <span class="attr-example__badge attr-example__badge--required">Required</span>
        </div>
        <p class="attr-example__desc">The unique identifier for your audio recording from 44.audio</p>
        <div class="code-block">
          <div class="code-block__header">
            <span>HTML</span>
            <button class="code-block__copy" @click="copyCode('rid')">
              {{ copiedIndex === 'rid' ? 'Copied!' : 'Copy' }}
            </button>
          </div>
          <pre class="code-block__pre"><code v-html="highlightCode(codeSnippets.rid)"></code></pre>
        </div>
      </div>

      <!-- Progress -->
      <div class="attr-example">
        <div class="attr-example__header">
          <code class="attr-example__name">progress</code>
          <span class="attr-example__badge">Optional</span>
        </div>
        <p class="attr-example__desc">Display style for playback progress. Options: <code>none</code>, <code>ring</code></p>
        <div class="attr-example__demos">
          <div class="attr-demo">
            <div class="attr-demo__preview" style="background: #f8f8f8;">
              <DemoMiniPlayer style="--player-primary: #c4956a; --player-icon: #fff;" />
            </div>
            <div class="attr-demo__label">
              <code>progress="none"</code>
              <span>No progress indicator</span>
            </div>
          </div>
          <div class="attr-demo">
            <div class="attr-demo__preview" style="background: #f8f8f8;">
              <DemoMiniPlayer :showProgress="true" :progress="0.65" style="--player-primary: #c4956a; --player-icon: #fff;" />
            </div>
            <div class="attr-demo__label">
              <code>progress="ring"</code>
              <span>Circular progress ring</span>
            </div>
          </div>
        </div>
        <div class="code-block">
          <div class="code-block__header">
            <span>HTML</span>
            <button class="code-block__copy" @click="copyCode('progress')">
              {{ copiedIndex === 'progress' ? 'Copied!' : 'Copy' }}
            </button>
          </div>
          <pre class="code-block__pre"><code v-html="highlightCode(codeSnippets.progress)"></code></pre>
        </div>
      </div>

      <!-- Autoplay -->
      <div class="attr-example">
        <div class="attr-example__header">
          <code class="attr-example__name">autoplay</code>
          <span class="attr-example__badge">Optional</span>
        </div>
        <p class="attr-example__desc">Start playback automatically when the page loads. Note: Many browsers block autoplay without user interaction.</p>
        <div class="code-block">
          <div class="code-block__header">
            <span>HTML</span>
            <button class="code-block__copy" @click="copyCode('autoplay')">
              {{ copiedIndex === 'autoplay' ? 'Copied!' : 'Copy' }}
            </button>
          </div>
          <pre class="code-block__pre"><code v-html="highlightCode(codeSnippets.autoplay)"></code></pre>
        </div>
      </div>
    </div>

    <!-- CSS Parts Section -->
    <div v-else-if="activeCategory === 'parts'" class="doc-section">
      <div class="doc-section__header">
        <h4 class="doc-section__title">CSS Parts</h4>
        <p class="doc-section__desc">Use <code>::part()</code> selector to style specific internal elements of the web component.</p>
      </div>

      <!-- Button Part -->
      <div class="part-example">
        <div class="part-example__header">
          <code class="part-example__name">::part(button)</code>
          <span class="part-example__desc">The main play/pause button container</span>
        </div>
        <div class="part-example__demos">
          <div class="part-demo">
            <div class="part-demo__preview" style="background: #f8f8f8;">
              <DemoMiniPlayer class="demo-shadow" style="--player-primary: #c4956a; --player-icon: #fff;" />
            </div>
            <span class="part-demo__label">With shadow</span>
          </div>
          <div class="part-demo">
            <div class="part-demo__preview" style="background: #f8f8f8;">
              <DemoMiniPlayer class="demo-glow" style="--player-primary: #3b82f6; --player-icon: #fff;" />
            </div>
            <span class="part-demo__label">With glow</span>
          </div>
          <div class="part-demo">
            <div class="part-demo__preview" style="background: #f8f8f8;">
              <DemoMiniPlayer class="demo-border" style="--player-primary: #fff; --player-icon: #1a1a1a;" />
            </div>
            <span class="part-demo__label">With border</span>
          </div>
        </div>
        <div class="code-block">
          <div class="code-block__header">
            <span>CSS</span>
            <button class="code-block__copy" @click="copyCode('button')">
              {{ copiedIndex === 'button' ? 'Copied!' : 'Copy' }}
            </button>
          </div>
          <pre class="code-block__pre"><code v-html="highlightCode(codeSnippets.button)"></code></pre>
        </div>
      </div>

      <!-- Progress Part -->
      <div class="part-example">
        <div class="part-example__header">
          <code class="part-example__name">::part(progress)</code>
          <span class="part-example__desc">The circular progress ring SVG</span>
        </div>
        <div class="part-example__demos">
          <div class="part-demo">
            <div class="part-demo__preview" style="background: #f8f8f8;">
              <DemoMiniPlayer :showProgress="true" :progress="0.5" class="demo-progress-thin" style="--player-primary: #c4956a; --player-icon: #fff;" />
            </div>
            <span class="part-demo__label">Thin stroke</span>
          </div>
          <div class="part-demo">
            <div class="part-demo__preview" style="background: #f8f8f8;">
              <DemoMiniPlayer :showProgress="true" :progress="0.5" class="demo-progress-thick" style="--player-primary: #c4956a; --player-icon: #fff;" />
            </div>
            <span class="part-demo__label">Thick stroke</span>
          </div>
          <div class="part-demo">
            <div class="part-demo__preview" style="background: #f8f8f8;">
              <DemoMiniPlayer :showProgress="true" :progress="0.5" class="demo-progress-green" style="--player-primary: #1a1a1a; --player-icon: #fff;" />
            </div>
            <span class="part-demo__label">Custom color</span>
          </div>
        </div>
        <div class="code-block">
          <div class="code-block__header">
            <span>CSS</span>
            <button class="code-block__copy" @click="copyCode('progresspart')">
              {{ copiedIndex === 'progresspart' ? 'Copied!' : 'Copy' }}
            </button>
          </div>
          <pre class="code-block__pre"><code v-html="highlightCode(codeSnippets.progresspart)"></code></pre>
        </div>
      </div>
    </div>

    <!-- Slots Section -->
    <div v-else-if="activeCategory === 'slots'" class="doc-section">
      <div class="doc-section__header">
        <h4 class="doc-section__title">Slots</h4>
        <p class="doc-section__desc">Replace default icons with Font Awesome or any custom SVG. The icon inherits <code>currentColor</code> from the player.</p>
      </div>

      <!-- Play Icon Slot -->
      <div class="slot-example">
        <div class="slot-example__header">
          <code class="slot-example__name">slot="play-icon"</code>
          <span class="slot-example__desc">Replace the default play icon with Font Awesome icons</span>
        </div>
        <div class="slot-example__demos">
          <div class="slot-demo">
            <div class="slot-demo__preview" style="background: #f8f8f8;">
              <DemoMiniPlayer style="--player-primary: #c4956a; --player-icon: #fff;" />
            </div>
            <span class="slot-demo__label">Default</span>
          </div>
          <div class="slot-demo">
            <div class="slot-demo__preview" style="background: #f8f8f8;">
              <DemoMiniPlayer style="--player-primary: #3b82f6; --player-icon: #fff;">
                <template #play-icon>
                  <!-- Font Awesome Play Solid -->
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" fill="currentColor" width="18" height="18">
                    <path d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80V432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z"/>
                  </svg>
                </template>
              </DemoMiniPlayer>
            </div>
            <span class="slot-demo__label">fa-play</span>
          </div>
          <div class="slot-demo">
            <div class="slot-demo__preview" style="background: #f8f8f8;">
              <DemoMiniPlayer style="--player-primary: #10b981; --player-icon: #fff;">
                <template #play-icon>
                  <!-- Font Awesome Circle Play -->
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor" width="24" height="24">
                    <path d="M0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zM188.3 147.1c-7.6 4.2-12.3 12.3-12.3 20.9V344c0 8.7 4.7 16.7 12.3 20.9s16.8 4.1 24.3-.5l144-88c7.1-4.4 11.5-12.1 11.5-20.5s-4.4-16.1-11.5-20.5l-144-88c-7.4-4.5-16.7-4.7-24.3-.5z"/>
                  </svg>
                </template>
              </DemoMiniPlayer>
            </div>
            <span class="slot-demo__label">fa-circle-play</span>
          </div>
          <div class="slot-demo">
            <div class="slot-demo__preview" style="background: #f8f8f8;">
              <DemoMiniPlayer style="--player-primary: #8b5cf6; --player-icon: #fff;">
                <template #play-icon>
                  <!-- Font Awesome Caret Right -->
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512" fill="currentColor" width="14" height="18">
                    <path d="M246.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-9.2-9.2-22.9-11.9-34.9-6.9s-19.8 16.6-19.8 29.6l0 256c0 12.9 7.8 24.6 19.8 29.6s25.7 2.2 34.9-6.9l128-128z"/>
                  </svg>
                </template>
              </DemoMiniPlayer>
            </div>
            <span class="slot-demo__label">fa-caret-right</span>
          </div>
        </div>
        <div class="code-block">
          <div class="code-block__header">
            <span>HTML</span>
            <button class="code-block__copy" @click="copyCode('playsolid')">
              {{ copiedIndex === 'playsolid' ? 'Copied!' : 'Copy' }}
            </button>
          </div>
          <pre class="code-block__pre"><code v-html="highlightCode(codeSnippets.playsolid)"></code></pre>
        </div>
        <p class="slot-example__note">
          <strong>Tip:</strong> Set <code>width</code> and <code>height</code> on the SVG to control size. Use <code>fill="currentColor"</code> to inherit the icon color from <code>--fortyfour-mini-icon</code>.
        </p>
      </div>

      <!-- Pause Icon Slot -->
      <div class="slot-example">
        <div class="slot-example__header">
          <code class="slot-example__name">slot="pause-icon"</code>
          <span class="slot-example__desc">Replace the default pause icon with Font Awesome icons</span>
        </div>
        <div class="slot-example__demos">
          <div class="slot-demo">
            <div class="slot-demo__preview" style="background: #f8f8f8;">
              <DemoMiniPlayer :isPlaying="true" style="--player-primary: #c4956a; --player-icon: #fff;" />
            </div>
            <span class="slot-demo__label">Default</span>
          </div>
          <div class="slot-demo">
            <div class="slot-demo__preview" style="background: #f8f8f8;">
              <DemoMiniPlayer :isPlaying="true" style="--player-primary: #ef4444; --player-icon: #fff;">
                <template #pause-icon>
                  <!-- Font Awesome Pause Solid -->
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" fill="currentColor" width="14" height="18">
                    <path d="M48 64C21.5 64 0 85.5 0 112V400c0 26.5 21.5 48 48 48H80c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48H48zm192 0c-26.5 0-48 21.5-48 48V400c0 26.5 21.5 48 48 48h32c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48H240z"/>
                  </svg>
                </template>
              </DemoMiniPlayer>
            </div>
            <span class="slot-demo__label">fa-pause</span>
          </div>
          <div class="slot-demo">
            <div class="slot-demo__preview" style="background: #f8f8f8;">
              <DemoMiniPlayer :isPlaying="true" style="--player-primary: #f97316; --player-icon: #fff;">
                <template #pause-icon>
                  <!-- Font Awesome Circle Pause -->
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor" width="24" height="24">
                    <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM224 192V320c0 17.7-14.3 32-32 32s-32-14.3-32-32V192c0-17.7 14.3-32 32-32s32 14.3 32 32zm128 0V320c0 17.7-14.3 32-32 32s-32-14.3-32-32V192c0-17.7 14.3-32 32-32s32 14.3 32 32z"/>
                  </svg>
                </template>
              </DemoMiniPlayer>
            </div>
            <span class="slot-demo__label">fa-circle-pause</span>
          </div>
        </div>
        <div class="code-block">
          <div class="code-block__header">
            <span>HTML</span>
            <button class="code-block__copy" @click="copyCode('pausesolid')">
              {{ copiedIndex === 'pausesolid' ? 'Copied!' : 'Copy' }}
            </button>
          </div>
          <pre class="code-block__pre"><code v-html="highlightCode(codeSnippets.pausesolid)"></code></pre>
        </div>
      </div>

      <!-- Using Font Awesome Kit -->
      <div class="slot-example">
        <div class="slot-example__header">
          <code class="slot-example__name">Using Font Awesome Kit</code>
          <span class="slot-example__desc">If you have Font Awesome installed, you can use &lt;i&gt; tags instead</span>
        </div>
        <div class="code-block">
          <div class="code-block__header">
            <span>HTML + CSS</span>
            <button class="code-block__copy" @click="copyCode('fakit')">
              {{ copiedIndex === 'fakit' ? 'Copied!' : 'Copy' }}
            </button>
          </div>
          <pre class="code-block__pre"><code v-html="highlightCode(codeSnippets.fakit)"></code></pre>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.doc-examples {
  margin-top: var(--ff-space-xl);
}

.doc-examples__title {
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--ff-text);
  margin: 0 0 0.25rem;
}

.doc-examples__intro {
  font-size: 0.875rem;
  color: var(--ff-muted);
  margin: 0 0 var(--ff-space-lg);
}

/* Category Tabs */
.doc-examples__tabs {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--ff-space-xs);
  margin-bottom: var(--ff-space-xl);
  background: var(--ff-bg-subtle);
  padding: 4px;
  border-radius: 10px;
}

.doc-examples__tab {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: var(--ff-space-sm) var(--ff-space-xs);
  background: transparent;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.15s ease;
  text-align: center;
}

.doc-examples__tab:hover {
  background: var(--ff-bg);
}

.doc-examples__tab.is-active {
  background: var(--ff-bg);
  box-shadow: 0 1px 3px rgba(0,0,0,0.08);
}

.doc-examples__tab-label {
  font-size: 0.8125rem;
  font-weight: 600;
  color: var(--ff-text);
}

.doc-examples__tab-desc {
  font-size: 0.6875rem;
  color: var(--ff-muted);
  margin-top: 2px;
}

/* Section */
.doc-section__header {
  margin-bottom: var(--ff-space-lg);
}

.doc-section__title {
  font-size: 0.9375rem;
  font-weight: 600;
  color: var(--ff-text);
  margin: 0 0 0.25rem;
}

.doc-section__desc {
  font-size: 0.8125rem;
  color: var(--ff-muted);
  margin: 0;
}

.doc-section__desc code {
  background: var(--ff-bg-subtle);
  padding: 0.125rem 0.375rem;
  border-radius: 4px;
  font-size: 0.75rem;
}

/* Example Row (CSS Variables) */
.example-row {
  margin-bottom: var(--ff-space-xl);
  padding-bottom: var(--ff-space-xl);
  border-bottom: 1px solid var(--ff-border);
}

.example-row:last-child {
  border-bottom: none;
  margin-bottom: 0;
  padding-bottom: 0;
}

.example-row__info {
  margin-bottom: var(--ff-space-md);
}

.example-row__var {
  display: inline-block;
  font-family: 'Fira Code', 'SF Mono', monospace;
  font-size: 0.875rem;
  font-weight: 600;
  color: #0891b2;
  background: #ecfeff;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  margin-right: var(--ff-space-sm);
}

.example-row__label {
  font-size: 0.8125rem;
  color: var(--ff-muted);
}

.example-row__demos {
  display: flex;
  gap: var(--ff-space-md);
  margin-bottom: var(--ff-space-lg);
  flex-wrap: wrap;
}

.example-row__demos--sizes {
  align-items: flex-end;
}

/* Demo Item */
.demo-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--ff-space-sm);
}

.demo-item__preview {
  width: 80px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  border: 1px solid var(--ff-border);
}

.demo-item__preview--size {
  width: 100px;
  height: 100px;
}

.demo-item__value {
  font-family: 'Fira Code', 'SF Mono', monospace;
  font-size: 0.6875rem;
  color: var(--ff-muted);
  background: var(--ff-bg-subtle);
  padding: 0.125rem 0.375rem;
  border-radius: 4px;
}

/* Demo Effect Classes - applied directly to DemoMiniPlayer root */
:deep(.demo-shadow) {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

:deep(.demo-glow) {
  box-shadow: 0 0 20px rgba(59, 130, 246, 0.5);
}

:deep(.demo-border) {
  border: 2px solid #e5e7eb;
}

/* Progress ring variations */
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

/* Code Block */
.code-block {
  border: 1px solid var(--ff-border);
  border-radius: 8px;
  overflow: hidden;
  background: var(--ff-bg);
}

.code-block__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem var(--ff-space-md);
  background: #f1f5f9;
  border-bottom: 1px solid #e2e8f0;
  font-size: 0.6875rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: #64748b;
}

.code-block__copy {
  font-size: 0.6875rem;
  font-weight: 500;
  color: #64748b;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  transition: all 0.15s ease;
}

.code-block__copy:hover {
  background: #e2e8f0;
  color: #334155;
}

.code-block__pre {
  margin: 0;
  padding: var(--ff-space-md);
  font-family: 'Fira Code', 'SF Mono', 'Consolas', monospace;
  font-size: 0.75rem;
  line-height: 1.6;
  color: #334155;
  background: #f8fafc;
  overflow-x: auto;
  white-space: pre;
}

/* Syntax Highlighting */
.code-block__pre :deep(.hl-comment) { color: #a0aec0; font-style: italic; }
.code-block__pre :deep(.hl-keyword) { color: #a855f7; font-weight: 500; }
.code-block__pre :deep(.hl-tag) { color: #ec4899; }
.code-block__pre :deep(.hl-attr) { color: #8b5cf6; }
.code-block__pre :deep(.hl-string) { color: #059669; }
.code-block__pre :deep(.hl-property) { color: #0891b2; }
.code-block__pre :deep(.hl-punct) { color: #64748b; }
.code-block__pre :deep(.hl-bracket) { color: #475569; }
.code-block__pre :deep(.hl-color) { color: #c026d3; }

/* Attribute Examples */
.attr-example {
  margin-bottom: var(--ff-space-xl);
  padding-bottom: var(--ff-space-xl);
  border-bottom: 1px solid var(--ff-border);
}

.attr-example:last-child {
  border-bottom: none;
  margin-bottom: 0;
  padding-bottom: 0;
}

.attr-example__header {
  display: flex;
  align-items: center;
  gap: var(--ff-space-sm);
  margin-bottom: var(--ff-space-sm);
}

.attr-example__name {
  font-family: 'Fira Code', 'SF Mono', monospace;
  font-size: 0.9375rem;
  font-weight: 600;
  color: #8b5cf6;
}

.attr-example__badge {
  font-size: 0.625rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  padding: 0.125rem 0.5rem;
  border-radius: 4px;
  background: #f1f5f9;
  color: #64748b;
}

.attr-example__badge--required {
  background: #fef3c7;
  color: #b45309;
}

.attr-example__desc {
  font-size: 0.8125rem;
  color: var(--ff-muted);
  margin: 0 0 var(--ff-space-md);
}

.attr-example__desc code {
  background: var(--ff-bg-subtle);
  padding: 0.125rem 0.375rem;
  border-radius: 4px;
  font-size: 0.75rem;
}

.attr-example__demos {
  display: flex;
  gap: var(--ff-space-lg);
  margin-bottom: var(--ff-space-lg);
}

.attr-demo {
  display: flex;
  flex-direction: column;
  gap: var(--ff-space-sm);
}

.attr-demo__preview {
  width: 100px;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  border: 1px solid var(--ff-border);
}

.attr-demo__label {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.attr-demo__label code {
  font-family: 'Fira Code', 'SF Mono', monospace;
  font-size: 0.6875rem;
  color: #059669;
}

.attr-demo__label span {
  font-size: 0.6875rem;
  color: var(--ff-muted);
}

/* Part Examples */
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

.part-example__desc {
  font-size: 0.8125rem;
  color: var(--ff-muted);
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
}

.part-demo__label {
  font-size: 0.75rem;
  color: var(--ff-muted);
}

/* Slot Examples */
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

.slot-example__desc {
  font-size: 0.8125rem;
  color: var(--ff-muted);
}

.slot-example__demos {
  display: flex;
  gap: var(--ff-space-lg);
  margin-bottom: var(--ff-space-lg);
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
}

.slot-demo__label {
  font-size: 0.75rem;
  color: var(--ff-muted);
  font-family: 'Fira Code', 'SF Mono', monospace;
}

.slot-example__note {
  margin-top: var(--ff-space-md);
  padding: var(--ff-space-md);
  background: #fefce8;
  border: 1px solid #fef08a;
  border-radius: 8px;
  font-size: 0.8125rem;
  color: #854d0e;
}

.slot-example__note code {
  background: rgba(0, 0, 0, 0.06);
  padding: 0.125rem 0.375rem;
  border-radius: 4px;
  font-size: 0.75rem;
}

.slot-example__note strong {
  color: #713f12;
}

/* Responsive */
@media (max-width: 600px) {
  .doc-examples__tabs {
    grid-template-columns: repeat(2, 1fr);
  }

  .example-row__demos {
    gap: var(--ff-space-sm);
  }

  .demo-item__preview {
    width: 64px;
    height: 64px;
  }
}
</style>
