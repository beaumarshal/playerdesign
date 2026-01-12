<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import PlayablePillPlayer from '@/components/examples/PlayablePillPlayer.vue'
import { useCodeCopy } from '@/composables/useCodeCopy'
import { useSyntaxHighlight } from '@/composables/useSyntaxHighlight'

const { copyCode, isCopied } = useCodeCopy()
const { highlightCode } = useSyntaxHighlight()

const demoRecordingId = '276be9aa27f04d4a8251a1a372e112a2'

// Track which example's code modal is open
const codeModalOpen = ref(null)

// ========== SVG BLOB PILL ANIMATION ==========
const pillBlobPath = ref('')
const pillBlobWidth = 200
const pillBlobHeight = 72
const numPillBlobPoints = 10
const pillRadiusX = 85  // Horizontal radius
const pillRadiusY = 28  // Vertical radius
const pillCenterX = pillBlobWidth / 2
const pillCenterY = pillBlobHeight / 2
const pillWobbleAmount = 6
const pillNoiseStep = 0.004

// Noise function - same as mini blob
const noise = (x) => {
  return Math.sin(x * 1.2) * 0.5 + Math.sin(x * 2.3) * 0.3 + Math.sin(x * 3.7) * 0.2
}

// Catmull-Rom to Bezier spline - creates smooth closed curve
const spline = (points) => {
  const n = points.length
  if (n < 2) return ''
  let path = ''
  for (let i = 0; i < n; i++) {
    const p0 = points[(i - 1 + n) % n]
    const p1 = points[i]
    const p2 = points[(i + 1) % n]
    const p3 = points[(i + 2) % n]
    const cp1x = p1.x + (p2.x - p0.x) / 6
    const cp1y = p1.y + (p2.y - p0.y) / 6
    const cp2x = p2.x - (p3.x - p1.x) / 6
    const cp2y = p2.y - (p3.y - p1.y) / 6
    if (i === 0) path = `M ${p1.x},${p1.y}`
    path += ` C ${cp1x},${cp1y} ${cp2x},${cp2y} ${p2.x},${p2.y}`
  }
  return path + ' Z'
}

// Create blob points around ellipse with initial noise for organic shape
const pillBlobPoints = []
for (let i = 0; i < numPillBlobPoints; i++) {
  const angle = (i / numPillBlobPoints) * Math.PI * 2
  const baseX = pillCenterX + Math.cos(angle) * pillRadiusX
  const baseY = pillCenterY + Math.sin(angle) * pillRadiusY
  const noiseOffsetX = Math.random() * 1000
  const noiseOffsetY = Math.random() * 1000
  // Apply initial noise so starting shape is already organic
  const x = baseX + noise(noiseOffsetX) * pillWobbleAmount
  const y = baseY + noise(noiseOffsetY) * pillWobbleAmount
  pillBlobPoints.push({
    x,
    y,
    originX: baseX,
    originY: baseY,
    noiseOffsetX,
    noiseOffsetY
  })
}

let pillBlobAnimationFrame = null

const updatePillBlobAnimation = () => {
  for (const point of pillBlobPoints) {
    point.x = point.originX + noise(point.noiseOffsetX) * pillWobbleAmount
    point.y = point.originY + noise(point.noiseOffsetY) * pillWobbleAmount
    point.noiseOffsetX += pillNoiseStep
    point.noiseOffsetY += pillNoiseStep
  }
  pillBlobPath.value = spline(pillBlobPoints)
  pillBlobAnimationFrame = requestAnimationFrame(updatePillBlobAnimation)
}

// Start animation on mount
onMounted(() => {
  updatePillBlobAnimation()
})

onUnmounted(() => {
  if (pillBlobAnimationFrame) {
    cancelAnimationFrame(pillBlobAnimationFrame)
  }
})

// Active category filter
const activeCategory = ref('all')

const categories = [
  { id: 'all', label: 'All' },
  { id: 'compact', label: 'Compact & Minimal' },
  { id: 'movements', label: 'Design Movements' },
  { id: 'vibes', label: 'Vibes & Aesthetics' },
  { id: 'functional', label: 'Functional' },
]

const examples = [
  // ========== COMPACT & MINIMAL ==========
  {
    id: 'tiny-dark',
    title: 'Tiny Dark',
    category: 'compact',
    description: 'Ultra-compact pill with mini waveform.',
    preview: {
      bgPage: '#1a1a1a',
    },
    code: `<fortyfour-player-pill
  recording-id="rec_abc123"
  size="sm"
  show-timer="false"
  class="tiny-dark-pill"
></fortyfour-player-pill>

<style>
.tiny-dark-pill {
  --fortyfour-pill-bg: #333;
  --fortyfour-pill-button: #fff;
  --fortyfour-pill-icon: #333;
  --fortyfour-pill-wave: #555;
  --fortyfour-pill-wave-active: #fff;
  --fortyfour-pill-waveform-width: 40px;
}
</style>`
  },
  {
    id: 'tiny-light',
    title: 'Tiny Light',
    category: 'compact',
    description: 'Minimal light pill with mini waveform.',
    preview: {
      bgPage: '#f5f5f5',
    },
    code: `<fortyfour-player-pill
  recording-id="rec_abc123"
  size="sm"
  show-timer="false"
  class="tiny-light-pill"
></fortyfour-player-pill>

<style>
.tiny-light-pill {
  --fortyfour-pill-bg: #fff;
  --fortyfour-pill-button: #111;
  --fortyfour-pill-icon: #fff;
  --fortyfour-pill-wave: #d1d5db;
  --fortyfour-pill-wave-active: #111;
  --fortyfour-pill-waveform-width: 40px;
  border: 1px solid #e5e7eb;
}
</style>`
  },
  {
    id: 'timer-only-dark',
    title: 'Timer Only (Dark)',
    category: 'compact',
    description: 'Play button and timer, no waveform.',
    preview: {
      bgPage: '#111',
    },
    code: `<fortyfour-player-pill
  recording-id="rec_abc123"
  waveform="none"
  class="timer-only-dark-pill"
></fortyfour-player-pill>

<style>
.timer-only-dark-pill {
  --fortyfour-pill-bg: #1f1f1f;
  --fortyfour-pill-button: #3b82f6;
  --fortyfour-pill-icon: #fff;
  --fortyfour-pill-text: #9ca3af;
}
</style>`
  },
  {
    id: 'timer-only-light',
    title: 'Timer Only (Light)',
    category: 'compact',
    description: 'Clean timer display without waveform.',
    preview: {
      bgPage: '#fff',
    },
    code: `<fortyfour-player-pill
  recording-id="rec_abc123"
  waveform="none"
  class="timer-only-light-pill"
></fortyfour-player-pill>

<style>
.timer-only-light-pill {
  --fortyfour-pill-bg: #f9fafb;
  --fortyfour-pill-button: #6366f1;
  --fortyfour-pill-icon: #fff;
  --fortyfour-pill-text: #6b7280;
  border: 1px solid #e5e7eb;
}
</style>`
  },
  {
    id: 'micro-pill',
    title: 'Micro Pill',
    category: 'compact',
    description: 'Extremely compact, just button and time.',
    preview: {
      bgPage: '#f0fdf4',
    },
    code: `<fortyfour-player-pill
  recording-id="rec_abc123"
  waveform="none"
  size="sm"
  class="micro-pill"
></fortyfour-player-pill>

<style>
.micro-pill {
  --fortyfour-pill-bg: #dcfce7;
  --fortyfour-pill-button: #16a34a;
  --fortyfour-pill-icon: #fff;
  --fortyfour-pill-text: #166534;
}
</style>`
  },
  {
    id: 'inline-play',
    title: 'Expand on Play',
    category: 'compact',
    description: 'Starts as button, expands smoothly to full player on click.',
    preview: {
      bgPage: '#fff',
    },
    code: `<fortyfour-player-pill
  recording-id="rec_abc123"
  expand-on-play="true"
  class="inline-play-pill"
></fortyfour-player-pill>

<style>
.inline-play-pill {
  --fortyfour-pill-bg: #f3f4f6;
  --fortyfour-pill-button: #ef4444;
  --fortyfour-pill-icon: #fff;
  --fortyfour-pill-text: #6b7280;
  --fortyfour-pill-wave: #d1d5db;
  --fortyfour-pill-wave-active: #ef4444;
}
</style>`
  },
  {
    id: 'badge-pill',
    title: 'Badge Style',
    category: 'compact',
    description: 'Tiny badge-like player.',
    preview: {
      bgPage: '#1e1b4b',
    },
    code: `<fortyfour-player-pill
  recording-id="rec_abc123"
  waveform="none"
  show-timer="false"
  size="sm"
  class="badge-pill"
></fortyfour-player-pill>

<style>
.badge-pill {
  --fortyfour-pill-bg: #4f46e5;
  --fortyfour-pill-button: rgba(255,255,255,0.2);
  --fortyfour-pill-icon: #fff;
}
</style>`
  },
  {
    id: 'ghost-pill',
    title: 'Ghost Pill',
    category: 'compact',
    description: 'Transparent background, timer only.',
    preview: {
      bgPage: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
    },
    code: `<fortyfour-player-pill
  recording-id="rec_abc123"
  waveform="none"
  class="ghost-pill"
></fortyfour-player-pill>

<style>
.ghost-pill {
  --fortyfour-pill-bg: transparent;
  --fortyfour-pill-button: #d97706;
  --fortyfour-pill-icon: #fff;
  --fortyfour-pill-text: #92400e;
  border: 2px solid #d97706;
}
</style>`
  },
  // ========== DESIGN MOVEMENTS ==========
  {
    id: 'brutalist',
    title: 'Neo-Brutalist',
    category: 'movements',
    description: 'Bold yellow with hard black shadows. Pure graphic impact.',
    preview: {
      bgPage: '#fff',
    },
    code: `<fortyfour-player-pill
  recording-id="rec_abc123"
  class="brutalist-pill"
></fortyfour-player-pill>

<style>
.brutalist-pill {
  --fortyfour-pill-bg: #facc15;
  --fortyfour-pill-button: #000;
  --fortyfour-pill-icon: #facc15;
  --fortyfour-pill-text: #000;
  --fortyfour-pill-wave: #000;
  --fortyfour-pill-wave-active: #000;
  --fortyfour-pill-radius: 0;
  border: 3px solid #000;
  box-shadow: 5px 5px 0 #000;
}
</style>`
  },
  {
    id: 'glassmorphism',
    title: 'Glassmorphism',
    category: 'movements',
    description: 'Frosted glass effect with blur and transparency.',
    preview: {
      bgPage: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    },
    code: `<fortyfour-player-pill
  recording-id="rec_abc123"
  class="glass-pill"
></fortyfour-player-pill>

<style>
.glass-pill {
  --fortyfour-pill-bg: rgba(255, 255, 255, 0.15);
  --fortyfour-pill-button: rgba(255, 255, 255, 0.25);
  --fortyfour-pill-icon: #fff;
  --fortyfour-pill-text: #fff;
  --fortyfour-pill-wave: rgba(255, 255, 255, 0.3);
  --fortyfour-pill-wave-active: #fff;
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.3);
}
</style>`
  },
  {
    id: 'neumorphism',
    title: 'Neumorphism',
    category: 'movements',
    description: 'Soft UI with subtle shadows creating depth.',
    preview: {
      bgPage: '#e0e5ec',
    },
    code: `<fortyfour-player-pill
  recording-id="rec_abc123"
  class="neumorphic-pill"
></fortyfour-player-pill>

<style>
.neumorphic-pill {
  --fortyfour-pill-bg: #e0e5ec;
  --fortyfour-pill-button: #e0e5ec;
  --fortyfour-pill-icon: #6b7280;
  --fortyfour-pill-text: #6b7280;
  --fortyfour-pill-wave: #c8cdd5;
  --fortyfour-pill-wave-active: #6366f1;
  box-shadow:
    8px 8px 16px #b8bcc2,
    -8px -8px 16px #ffffff;
}
</style>`
  },
  // ========== VIBES & AESTHETICS ==========
  {
    id: 'minimal-dark',
    title: 'Minimal Dark',
    category: 'vibes',
    description: 'Clean dark mode with subtle accent colors.',
    preview: {
      bgPage: '#111',
    },
    code: `<fortyfour-player-pill
  recording-id="rec_abc123"
  class="minimal-dark-pill"
></fortyfour-player-pill>

<style>
.minimal-dark-pill {
  --fortyfour-pill-bg: #1f1f1f;
  --fortyfour-pill-button: #3b82f6;
  --fortyfour-pill-icon: #fff;
  --fortyfour-pill-text: #9ca3af;
  --fortyfour-pill-wave: #374151;
  --fortyfour-pill-wave-active: #3b82f6;
}
</style>`
  },
  {
    id: 'minimal-light',
    title: 'Minimal Light',
    category: 'vibes',
    description: 'Clean light mode with soft grays.',
    preview: {
      bgPage: '#fff',
    },
    code: `<fortyfour-player-pill
  recording-id="rec_abc123"
  class="minimal-light-pill"
></fortyfour-player-pill>

<style>
.minimal-light-pill {
  --fortyfour-pill-bg: #f9fafb;
  --fortyfour-pill-button: #111827;
  --fortyfour-pill-icon: #fff;
  --fortyfour-pill-text: #6b7280;
  --fortyfour-pill-wave: #e5e7eb;
  --fortyfour-pill-wave-active: #111827;
  border: 1px solid #e5e7eb;
}
</style>`
  },
  {
    id: 'spotify',
    title: 'Spotify Style',
    category: 'vibes',
    description: 'Iconic green accent on dark background.',
    preview: {
      bgPage: '#121212',
    },
    code: `<fortyfour-player-pill
  recording-id="rec_abc123"
  class="spotify-pill"
></fortyfour-player-pill>

<style>
.spotify-pill {
  --fortyfour-pill-bg: #282828;
  --fortyfour-pill-button: #1db954;
  --fortyfour-pill-icon: #000;
  --fortyfour-pill-text: #b3b3b3;
  --fortyfour-pill-wave: #404040;
  --fortyfour-pill-wave-active: #1db954;
}
</style>`
  },
  {
    id: 'luxury',
    title: 'Luxury Gold',
    category: 'vibes',
    description: 'Elegant dark with gold accents.',
    preview: {
      bgPage: '#0a0a0a',
    },
    code: `<fortyfour-player-pill
  recording-id="rec_abc123"
  class="luxury-pill"
></fortyfour-player-pill>

<style>
.luxury-pill {
  --fortyfour-pill-bg: #1a1a1a;
  --fortyfour-pill-button: transparent;
  --fortyfour-pill-icon: #d4af37;
  --fortyfour-pill-text: #d4af37;
  --fortyfour-pill-wave: #333;
  --fortyfour-pill-wave-active: #d4af37;
  border: 1px solid #d4af37;
}
</style>`
  },
  {
    id: 'gradient',
    title: 'Gradient Glow',
    category: 'vibes',
    description: 'Vibrant gradient background with glow effect.',
    preview: {
      bgPage: '#1a1a2e',
    },
    code: `<fortyfour-player-pill
  recording-id="rec_abc123"
  class="gradient-pill"
></fortyfour-player-pill>

<style>
.gradient-pill {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  --fortyfour-pill-button: rgba(255,255,255,0.2);
  --fortyfour-pill-icon: #fff;
  --fortyfour-pill-text: #fff;
  --fortyfour-pill-wave: rgba(255,255,255,0.3);
  --fortyfour-pill-wave-active: #fff;
  box-shadow: 0 4px 20px rgba(102, 126, 234, 0.4);
}
</style>`
  },
  {
    id: 'blob',
    title: 'Organic Blob',
    category: 'vibes',
    description: 'Animated organic blob shape with fluid movement.',
    preview: {
      bgPage: '#faf8f5',
    },
    code: `<div class="blob-pill-wrapper">
  <svg class="blob-pill-svg" viewBox="0 0 200 72">
    <path class="blob-pill-path" d="..." fill="#c4956a" />
  </svg>
  <fortyfour-player-pill
    recording-id="rec_abc123"
    waveform="none"
    class="blob-pill"
  ></fortyfour-player-pill>
</div>

<style>
.blob-pill-wrapper {
  position: relative;
  width: 200px;
  height: 72px;
}
.blob-pill-svg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}
.blob-pill-path {
  /* Animate with JS using spline curves */
}
.blob-pill {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  --fortyfour-pill-bg: transparent;
  --fortyfour-pill-button: transparent;
  --fortyfour-pill-icon: #fff;
  --fortyfour-pill-text: #fff;
}
</style>`
  },
  // ========== FUNCTIONAL ==========
  {
    id: 'voice-message',
    title: 'Voice Message',
    category: 'functional',
    description: 'Chat-style voice message bubble.',
    preview: {
      bgPage: '#f0f2f5',
    },
    code: `<fortyfour-player-pill
  recording-id="rec_abc123"
  class="voice-message-pill"
></fortyfour-player-pill>

<style>
.voice-message-pill {
  --fortyfour-pill-bg: #0084ff;
  --fortyfour-pill-button: rgba(255,255,255,0.2);
  --fortyfour-pill-icon: #fff;
  --fortyfour-pill-text: rgba(255,255,255,0.9);
  --fortyfour-pill-wave: rgba(255,255,255,0.3);
  --fortyfour-pill-wave-active: #fff;
  --fortyfour-pill-radius: 18px 18px 4px 18px;
}
</style>`
  },
  {
    id: 'podcast',
    title: 'Podcast Player',
    category: 'functional',
    description: 'Clean podcast-style player with progress bar.',
    preview: {
      bgPage: '#fff',
    },
    code: `<fortyfour-player-pill
  recording-id="rec_abc123"
  waveform="progress"
  class="podcast-pill"
></fortyfour-player-pill>

<style>
.podcast-pill {
  --fortyfour-pill-bg: #fff;
  --fortyfour-pill-button: #7c3aed;
  --fortyfour-pill-icon: #fff;
  --fortyfour-pill-text: #374151;
  --fortyfour-pill-wave: #e5e7eb;
  --fortyfour-pill-wave-active: #7c3aed;
  border: 1px solid #e5e7eb;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}
</style>`
  },
  {
    id: 'notification',
    title: 'Audio Notification',
    category: 'functional',
    description: 'Compact notification-style player.',
    preview: {
      bgPage: '#1f2937',
    },
    code: `<fortyfour-player-pill
  recording-id="rec_abc123"
  size="sm"
  waveform="dots"
  class="notification-pill"
></fortyfour-player-pill>

<style>
.notification-pill {
  --fortyfour-pill-bg: #374151;
  --fortyfour-pill-button: #10b981;
  --fortyfour-pill-icon: #fff;
  --fortyfour-pill-text: #9ca3af;
  --fortyfour-pill-wave: #4b5563;
  --fortyfour-pill-wave-active: #10b981;
}
</style>`
  },
  {
    id: 'audiobook',
    title: 'Audiobook',
    category: 'functional',
    description: 'Large, comfortable player for long-form audio.',
    preview: {
      bgPage: '#fef3c7',
    },
    code: `<fortyfour-player-pill
  recording-id="rec_abc123"
  size="lg"
  waveform="smooth"
  class="audiobook-pill"
></fortyfour-player-pill>

<style>
.audiobook-pill {
  --fortyfour-pill-bg: #fffbeb;
  --fortyfour-pill-button: #d97706;
  --fortyfour-pill-icon: #fff;
  --fortyfour-pill-text: #92400e;
  --fortyfour-pill-wave: #fde68a;
  --fortyfour-pill-wave-active: #d97706;
  border: 1px solid #fcd34d;
}
</style>`
  },
]

// Filter examples by category
const filteredExamples = computed(() => {
  if (activeCategory.value === 'all') return examples
  return examples.filter(ex => ex.category === activeCategory.value)
})
</script>

<template>
  <div class="pill-examples">
    <!-- Category filter -->
    <div class="category-filter">
      <button
        v-for="cat in categories"
        :key="cat.id"
        class="category-btn"
        :class="{ active: activeCategory === cat.id }"
        @click="activeCategory = cat.id"
      >
        {{ cat.label }}
      </button>
    </div>

    <!-- Examples grid -->
    <div class="examples-grid">
      <div
        v-for="example in filteredExamples"
        :key="example.id"
        class="example-card"
      >
        <div
          class="example-preview"
          :style="{ background: example.preview.bgPage }"
        >
          <!-- Tiny Dark -->
          <PlayablePillPlayer
            v-if="example.id === 'tiny-dark'"
            :recording-id="demoRecordingId"
            size="sm"
            waveform="bars"
            waveform-width="40px"
            :show-timer="false"
            bg-color="#333"
            button-color="#fff"
            icon-color="#333"
            wave-color="#555"
            wave-active-color="#fff"
          />

          <!-- Tiny Light -->
          <PlayablePillPlayer
            v-else-if="example.id === 'tiny-light'"
            :recording-id="demoRecordingId"
            size="sm"
            waveform="bars"
            waveform-width="40px"
            :show-timer="false"
            bg-color="#fff"
            button-color="#111"
            icon-color="#fff"
            wave-color="#d1d5db"
            wave-active-color="#111"
            border="1px solid #e5e7eb"
          />

          <!-- Timer Only Dark -->
          <PlayablePillPlayer
            v-else-if="example.id === 'timer-only-dark'"
            :recording-id="demoRecordingId"
            waveform="none"
            bg-color="#1f1f1f"
            button-color="#3b82f6"
            icon-color="#fff"
            text-color="#9ca3af"
          />

          <!-- Timer Only Light -->
          <PlayablePillPlayer
            v-else-if="example.id === 'timer-only-light'"
            :recording-id="demoRecordingId"
            waveform="none"
            bg-color="#f9fafb"
            button-color="#6366f1"
            icon-color="#fff"
            text-color="#6b7280"
            border="1px solid #e5e7eb"
          />

          <!-- Micro Pill -->
          <PlayablePillPlayer
            v-else-if="example.id === 'micro-pill'"
            :recording-id="demoRecordingId"
            size="sm"
            waveform="none"
            bg-color="#dcfce7"
            button-color="#16a34a"
            icon-color="#fff"
            text-color="#166534"
          />

          <!-- Inline Play -->
          <PlayablePillPlayer
            v-else-if="example.id === 'inline-play'"
            :recording-id="demoRecordingId"
            :expand-on-play="true"
            bg-color="#f3f4f6"
            button-color="#ef4444"
            icon-color="#fff"
            text-color="#6b7280"
            wave-color="#d1d5db"
            wave-active-color="#ef4444"
          />

          <!-- Badge Pill -->
          <PlayablePillPlayer
            v-else-if="example.id === 'badge-pill'"
            :recording-id="demoRecordingId"
            size="sm"
            waveform="none"
            :show-timer="false"
            bg-color="#4f46e5"
            button-color="rgba(255,255,255,0.2)"
            icon-color="#fff"
          />

          <!-- Ghost Pill -->
          <PlayablePillPlayer
            v-else-if="example.id === 'ghost-pill'"
            :recording-id="demoRecordingId"
            waveform="none"
            bg-color="transparent"
            button-color="#d97706"
            icon-color="#fff"
            text-color="#92400e"
            border="2px solid #d97706"
          />

          <!-- Brutalist -->
          <PlayablePillPlayer
            v-else-if="example.id === 'brutalist'"
            :recording-id="demoRecordingId"
            bg-color="#facc15"
            button-color="#000"
            icon-color="#facc15"
            text-color="#000"
            wave-color="#000"
            wave-active-color="#000"
            border-radius="0"
            border="3px solid #000"
            class="brutalist-pill"
          />

          <!-- Glassmorphism -->
          <PlayablePillPlayer
            v-else-if="example.id === 'glassmorphism'"
            :recording-id="demoRecordingId"
            bg-color="rgba(255, 255, 255, 0.15)"
            button-color="rgba(255, 255, 255, 0.25)"
            icon-color="#fff"
            text-color="#fff"
            wave-color="rgba(255, 255, 255, 0.3)"
            wave-active-color="#fff"
            class="glass-pill"
          />

          <!-- Neumorphism -->
          <PlayablePillPlayer
            v-else-if="example.id === 'neumorphism'"
            :recording-id="demoRecordingId"
            bg-color="#e0e5ec"
            button-color="#e0e5ec"
            icon-color="#6b7280"
            text-color="#6b7280"
            wave-color="#c8cdd5"
            wave-active-color="#6366f1"
            class="neumorphic-pill"
          />

          <!-- Minimal Dark -->
          <PlayablePillPlayer
            v-else-if="example.id === 'minimal-dark'"
            :recording-id="demoRecordingId"
            bg-color="#1f1f1f"
            button-color="#3b82f6"
            icon-color="#fff"
            text-color="#9ca3af"
            wave-color="#374151"
            wave-active-color="#3b82f6"
          />

          <!-- Minimal Light -->
          <PlayablePillPlayer
            v-else-if="example.id === 'minimal-light'"
            :recording-id="demoRecordingId"
            bg-color="#f9fafb"
            button-color="#111827"
            icon-color="#fff"
            text-color="#6b7280"
            wave-color="#e5e7eb"
            wave-active-color="#111827"
            border="1px solid #e5e7eb"
          />

          <!-- Spotify -->
          <PlayablePillPlayer
            v-else-if="example.id === 'spotify'"
            :recording-id="demoRecordingId"
            bg-color="#282828"
            button-color="#1db954"
            icon-color="#000"
            text-color="#b3b3b3"
            wave-color="#404040"
            wave-active-color="#1db954"
          />

          <!-- Luxury -->
          <PlayablePillPlayer
            v-else-if="example.id === 'luxury'"
            :recording-id="demoRecordingId"
            bg-color="#1a1a1a"
            button-color="transparent"
            icon-color="#d4af37"
            text-color="#d4af37"
            wave-color="#333"
            wave-active-color="#d4af37"
            border="1px solid #d4af37"
            class="luxury-pill"
          />

          <!-- Gradient -->
          <PlayablePillPlayer
            v-else-if="example.id === 'gradient'"
            :recording-id="demoRecordingId"
            button-color="rgba(255,255,255,0.2)"
            icon-color="#fff"
            text-color="#fff"
            wave-color="rgba(255,255,255,0.3)"
            wave-active-color="#fff"
            class="gradient-pill"
          />

          <!-- Blob -->
          <div
            v-else-if="example.id === 'blob'"
            class="blob-pill-wrapper"
          >
            <svg
              class="blob-pill-svg"
              :viewBox="`0 0 ${pillBlobWidth} ${pillBlobHeight}`"
            >
              <path :d="pillBlobPath" fill="#c4956a" />
            </svg>
            <PlayablePillPlayer
              :recording-id="demoRecordingId"
              waveform="none"
              :no-container-style="true"
              icon-color="#fff"
              text-color="#fff"
              class="blob-pill-player"
            />
          </div>

          <!-- Voice Message -->
          <PlayablePillPlayer
            v-else-if="example.id === 'voice-message'"
            :recording-id="demoRecordingId"
            bg-color="#0084ff"
            button-color="rgba(255,255,255,0.2)"
            icon-color="#fff"
            text-color="rgba(255,255,255,0.9)"
            wave-color="rgba(255,255,255,0.3)"
            wave-active-color="#fff"
            border-radius="18px 18px 4px 18px"
          />

          <!-- Podcast -->
          <PlayablePillPlayer
            v-else-if="example.id === 'podcast'"
            :recording-id="demoRecordingId"
            waveform="progress"
            bg-color="#fff"
            button-color="#7c3aed"
            icon-color="#fff"
            text-color="#374151"
            wave-color="#e5e7eb"
            wave-active-color="#7c3aed"
            border="1px solid #e5e7eb"
            class="podcast-pill"
          />

          <!-- Notification -->
          <PlayablePillPlayer
            v-else-if="example.id === 'notification'"
            :recording-id="demoRecordingId"
            size="sm"
            waveform="dots"
            bg-color="#374151"
            button-color="#10b981"
            icon-color="#fff"
            text-color="#9ca3af"
            wave-color="#4b5563"
            wave-active-color="#10b981"
          />

          <!-- Audiobook -->
          <PlayablePillPlayer
            v-else-if="example.id === 'audiobook'"
            :recording-id="demoRecordingId"
            size="lg"
            waveform="smooth"
            bg-color="#fffbeb"
            button-color="#d97706"
            icon-color="#fff"
            text-color="#92400e"
            wave-color="#fde68a"
            wave-active-color="#d97706"
            border="1px solid #fcd34d"
          />
        </div>

        <div class="example-info">
          <h4 class="example-title">{{ example.title }}</h4>
          <p class="example-description">{{ example.description }}</p>
          <button class="code-btn" @click="codeModalOpen = example.id">
            <i class="fa-solid fa-code"></i>
            View Code
          </button>
        </div>

        <!-- Code Modal -->
        <Teleport to="body">
          <div v-if="codeModalOpen === example.id" class="code-modal-overlay" @click.self="codeModalOpen = null">
            <div class="code-modal">
              <div class="code-modal__header">
                <h3>{{ example.title }}</h3>
                <div class="code-modal__actions">
                  <button class="copy-btn" @click="copyCode(example.code)">
                    <i :class="isCopied ? 'fa-solid fa-check' : 'fa-solid fa-copy'"></i>
                    {{ isCopied ? 'Copied!' : 'Copy' }}
                  </button>
                  <button class="close-btn" @click="codeModalOpen = null">
                    <i class="fa-solid fa-times"></i>
                  </button>
                </div>
              </div>
              <pre class="code-modal__pre"><code v-html="highlightCode(example.code)"></code></pre>
            </div>
          </div>
        </Teleport>
      </div>
    </div>
  </div>
</template>

<style scoped>
.pill-examples {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.category-filter {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.category-btn {
  padding: 6px 14px;
  border: 1px solid var(--ff-border);
  border-radius: 999px;
  background: var(--ff-bg);
  color: var(--ff-muted);
  font-size: 0.8125rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.15s ease;
}

.category-btn:hover {
  border-color: var(--ff-accent);
  color: var(--ff-accent);
}

.category-btn.active {
  background: var(--ff-accent);
  border-color: var(--ff-accent);
  color: #fff;
}

.examples-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
  gap: 20px;
}

.example-card {
  background: var(--ff-card);
  border: 1px solid var(--ff-border);
  border-radius: 12px;
  overflow: hidden;
}

.example-preview {
  padding: 32px 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100px;
}

.example-info {
  padding: 16px 20px;
  border-top: 1px solid var(--ff-border);
}

.example-title {
  margin: 0 0 4px;
  font-size: 0.9375rem;
  font-weight: 600;
  color: var(--ff-text);
}

.example-description {
  margin: 0 0 12px;
  font-size: 0.8125rem;
  color: var(--ff-muted);
  line-height: 1.4;
}

.code-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  background: var(--ff-bg);
  border: 1px solid var(--ff-border);
  border-radius: 6px;
  font-size: 0.75rem;
  font-weight: 500;
  color: var(--ff-muted);
  cursor: pointer;
  transition: all 0.15s ease;
}

.code-btn:hover {
  border-color: var(--ff-accent);
  color: var(--ff-accent);
}

/* Special styles for specific examples */
.brutalist-pill {
  box-shadow: 5px 5px 0 #000;
}

.glass-pill {
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.3);
}

.neumorphic-pill {
  box-shadow:
    8px 8px 16px #b8bcc2,
    -8px -8px 16px #ffffff;
}

.luxury-pill :deep(.playable-pill__button) {
  border: 1px solid #d4af37;
}

.gradient-pill {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%) !important;
  box-shadow: 0 4px 20px rgba(102, 126, 234, 0.4);
}

.podcast-pill {
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}

/* Blob Pill */
.blob-pill-wrapper {
  position: relative;
  width: 200px;
  height: 72px;
}

.blob-pill-svg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.blob-pill-player {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

/* Code Modal */
.code-modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
}

.code-modal {
  background: #1e1e1e;
  border-radius: 12px;
  width: 100%;
  max-width: 600px;
  max-height: 80vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.code-modal__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  border-bottom: 1px solid #333;
}

.code-modal__header h3 {
  margin: 0;
  font-size: 1rem;
  font-weight: 600;
  color: #fff;
}

.code-modal__actions {
  display: flex;
  gap: 8px;
}

.copy-btn,
.close-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  border: none;
  border-radius: 6px;
  font-size: 0.8125rem;
  cursor: pointer;
  transition: all 0.15s ease;
}

.copy-btn {
  background: #3b82f6;
  color: #fff;
}

.copy-btn:hover {
  background: #2563eb;
}

.close-btn {
  background: #374151;
  color: #9ca3af;
}

.close-btn:hover {
  background: #4b5563;
  color: #fff;
}

.code-modal__pre {
  flex: 1;
  margin: 0;
  padding: 20px;
  overflow: auto;
  font-size: 0.8125rem;
  line-height: 1.6;
  font-family: 'Fira Code', 'SF Mono', monospace;
}

.code-modal__pre code {
  color: #d4d4d4;
}
</style>
