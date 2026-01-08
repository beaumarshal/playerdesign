<script setup>
import { ref, computed, watch, onUnmounted } from 'vue'
import PlayableMiniPlayer from '@/components/examples/PlayableMiniPlayer.vue'
import { useCodeCopy } from '@/composables/useCodeCopy'
import { useSyntaxHighlight } from '@/composables/useSyntaxHighlight'

const { copyCode, isCopied } = useCodeCopy()
const { highlightCode } = useSyntaxHighlight()

const demoRecordingId = '276be9aa27f04d4a8251a1a372e112a2'

// Track nuclear player state for stripe animation
const isNuclearPlaying = ref(false)

// Track halloween player state for ghost animation
const isHalloweenPlaying = ref(false)

// Track christmas tree player state for snow animation
const isChristmasTreePlaying = ref(false)
const snowflakes = ref([])
let snowflakeId = 0

const startSnowfall = () => {
  // Create initial batch of snowflakes
  for (let i = 0; i < 15; i++) {
    setTimeout(() => {
      if (isChristmasTreePlaying.value) {
        createSnowflake()
      }
    }, i * 200)
  }
}

const createSnowflake = () => {
  if (!isChristmasTreePlaying.value) return

  const id = snowflakeId++
  const flake = {
    id,
    x: Math.random() * 100, // percentage
    size: 8 + Math.random() * 8,
    duration: 2 + Math.random() * 2,
    delay: Math.random() * 0.5,
    opacity: 0.6 + Math.random() * 0.4,
  }
  snowflakes.value.push(flake)

  // Remove after animation
  setTimeout(() => {
    snowflakes.value = snowflakes.value.filter(f => f.id !== id)
    // Create new one if still playing
    if (isChristmasTreePlaying.value) {
      createSnowflake()
    }
  }, (flake.duration + flake.delay) * 1000)
}

const stopSnowfall = () => {
  // Let existing snowflakes finish their animation
  // They'll be removed by their timeouts
}

// Track organic blob voice-reactive animation
const organicAudioLevel = ref(0)
const isOrganicPlaying = ref(false)

// Track countdown blob state
const isCountdownPlaying = ref(false)
const countdownTimeRemaining = ref(0)
const countdownDuration = ref(0)

// Format countdown time as M:SS or S
const formattedCountdown = computed(() => {
  const secs = Math.floor(countdownTimeRemaining.value)
  if (secs >= 60) {
    const mins = Math.floor(secs / 60)
    const remainingSecs = secs % 60
    return `${mins}:${remainingSecs.toString().padStart(2, '0')}`
  }
  return secs.toString()
})

// ========== SVG BLOB ANIMATION ==========
// Based on spline technique - points around a circle animated with noise
// Blobs animate continuously for a living, organic feel
const blobPath = ref('')
const countdownBlobPath = ref('')
const blobSize = 72  // Size in pixels
const numBlobPoints = 8  // More points = smoother blob
const blobRadius = 30  // Base radius
const blobCenter = blobSize / 2  // Center of viewBox
const wobbleAmount = 6  // How much points move from origin
const noiseStep = 0.004  // How fast noise evolves

// Simple noise function (sine-based pseudo-noise)
const noise = (x) => {
  return Math.sin(x * 1.2) * 0.5 + Math.sin(x * 2.3) * 0.3 + Math.sin(x * 3.7) * 0.2
}

// Generate smooth spline path through points
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

    if (i === 0) {
      path = `M ${p1.x},${p1.y}`
    }
    path += ` C ${cp1x},${cp1y} ${cp2x},${cp2y} ${p2.x},${p2.y}`
  }
  return path + ' Z'
}

// Initialize blob points
const createBlobPoints = () => {
  const points = []
  for (let i = 0; i < numBlobPoints; i++) {
    const angle = (i / numBlobPoints) * Math.PI * 2
    const baseX = blobCenter + Math.cos(angle) * blobRadius
    const baseY = blobCenter + Math.sin(angle) * blobRadius
    points.push({
      x: baseX,
      y: baseY,
      originX: baseX,
      originY: baseY,
      noiseOffsetX: Math.random() * 1000,
      noiseOffsetY: Math.random() * 1000
    })
  }
  return points
}

const blobPoints = createBlobPoints()
const countdownBlobPoints = createBlobPoints()

// Single animation loop for all blobs (runs continuously)
let blobAnimationFrame = null

const updateBlobAnimations = () => {
  // Update organic blob
  for (const point of blobPoints) {
    point.x = point.originX + noise(point.noiseOffsetX) * wobbleAmount
    point.y = point.originY + noise(point.noiseOffsetY) * wobbleAmount
    point.noiseOffsetX += noiseStep
    point.noiseOffsetY += noiseStep
  }
  blobPath.value = spline(blobPoints)

  // Update countdown blob
  for (const point of countdownBlobPoints) {
    point.x = point.originX + noise(point.noiseOffsetX) * wobbleAmount
    point.y = point.originY + noise(point.noiseOffsetY) * wobbleAmount
    point.noiseOffsetX += noiseStep
    point.noiseOffsetY += noiseStep
  }
  countdownBlobPath.value = spline(countdownBlobPoints)

  blobAnimationFrame = requestAnimationFrame(updateBlobAnimations)
}

// Start blob animations immediately (always animating)
updateBlobAnimations()

// Cleanup on unmount
onUnmounted(() => {
  if (blobAnimationFrame) {
    cancelAnimationFrame(blobAnimationFrame)
    blobAnimationFrame = null
  }
})

// Track which example's code modal is open
const codeModalOpen = ref(null)

// ========== ENGAGEMENT REACTIONS (TikTok-style floating icons) ==========
const floatingReactions = ref([]) // Array of { id, iconClass, x, y }
let reactionIdCounter = 0

const spawnReaction = (iconClass, event) => {
  // Get click position relative to button center for variety
  const rect = event.currentTarget.getBoundingClientRect()
  const centerX = rect.width / 2
  const clickX = event.clientX - rect.left

  // Spawn 1-3 reactions per click for more impact
  const count = Math.floor(Math.random() * 2) + 1

  for (let i = 0; i < count; i++) {
    const id = reactionIdCounter++
    const offsetX = (clickX - centerX) * 0.5 + (Math.random() - 0.5) * 30
    const reaction = {
      id,
      iconClass,
      x: offsetX,
      startX: offsetX,
      drift: (Math.random() - 0.5) * 40, // Horizontal drift
      delay: i * 50, // Stagger spawns
      scale: 0.8 + Math.random() * 0.4, // Random size
      rotation: (Math.random() - 0.5) * 30, // Random rotation
    }

    setTimeout(() => {
      floatingReactions.value.push(reaction)

      // Remove after animation completes
      setTimeout(() => {
        floatingReactions.value = floatingReactions.value.filter(r => r.id !== id)
      }, 1500)
    }, reaction.delay)
  }
}

// Track which engagement players are playing (to show/hide reaction badges)
const engagementPlaying = ref({
  hearts: false,
  fire: false,
  stars: false,
})

// Active category filter
const activeCategory = ref('all')

const categories = [
  { id: 'all', label: 'All' },
  { id: 'movements', label: 'Design Movements' },
  { id: 'vibes', label: 'Vibes & Aesthetics' },
  { id: 'eras', label: 'Era & Nostalgia' },
  { id: 'functional', label: 'Functional' },
  { id: 'patterns', label: 'UI Patterns' },
  { id: 'seasonal', label: 'Seasonal' },
]

const examples = [
  // ========== DESIGN MOVEMENTS ==========
  {
    id: 'brutalist',
    title: 'Neo-Brutalist',
    category: 'movements',
    description: 'Bold, in-your-face aesthetic with bright colors, hard shadows, and zero subtlety. Pure graphic impact.',
    preview: {
      bg: '#facc15',
      bgPage: '#fff',
    },
    code: `<fortyfour-player-mini
  recording-id="rec_abc123"
  hover="none"
  progress="false"
  class="brutalist-player"
></fortyfour-player-mini>

<style>
.brutalist-player {
  --fortyfour-mini-bg: #facc15;
  --fortyfour-mini-icon: #000;
  --fortyfour-mini-size: 56px;
  --fortyfour-mini-radius: 0;
  --fortyfour-mini-border: 3px solid #000;
  box-shadow: 5px 5px 0 #000;
}

.brutalist-player:active {
  transform: translate(3px, 3px);
  box-shadow: 2px 2px 0 #000;
}
</style>`
  },
  {
    id: 'glassmorphism',
    title: 'Glassmorphism',
    category: 'movements',
    description: 'Frosted glass effect with blur, transparency, and subtle borders. Works best on colorful backgrounds.',
    preview: {
      bg: 'rgba(255,255,255,0.15)',
      bgPage: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    },
    code: `<fortyfour-player-mini
  recording-id="rec_abc123"
  hover="scale"
  class="glass-player"
></fortyfour-player-mini>

<style>
.glass-player {
  --fortyfour-mini-bg: rgba(255, 255, 255, 0.15);
  --fortyfour-mini-icon: #fff;
  --fortyfour-mini-size: 52px;
  --fortyfour-mini-radius: 16px;
  --fortyfour-mini-border: 1px solid rgba(255, 255, 255, 0.3);
}

/* Glassmorphism blur requires ::part() */
.glass-player::part(button) {
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  box-shadow:
    0 8px 32px rgba(0, 0, 0, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
}
</style>`
  },
  {
    id: 'neumorphism',
    title: 'Neumorphism',
    category: 'movements',
    description: 'Soft, extruded appearance using subtle shadows. The button appears to push out from the background.',
    preview: {
      bg: '#e0e5ec',
      bgPage: '#e0e5ec',
    },
    code: `<fortyfour-player-mini
  recording-id="rec_abc123"
  hover="none"
  class="neumorph-player"
></fortyfour-player-mini>

<style>
.neumorph-player {
  --fortyfour-mini-bg: #e0e5ec;
  --fortyfour-mini-icon: #6b7280;
  --fortyfour-mini-size: 56px;
  --fortyfour-mini-radius: 16px;
  --fortyfour-mini-border: none;
}

/* Neumorphic shadows require ::part() */
.neumorph-player::part(button) {
  box-shadow:
    8px 8px 16px #b8bcc2,
    -8px -8px 16px #ffffff;
}

.neumorph-player::part(button):hover {
  box-shadow:
    6px 6px 12px #b8bcc2,
    -6px -6px 12px #ffffff;
}

.neumorph-player::part(button):active {
  box-shadow:
    inset 4px 4px 8px #b8bcc2,
    inset -4px -4px 8px #ffffff;
}
</style>`
  },
  {
    id: 'neon',
    title: 'Neon Glow',
    category: 'vibes',
    description: 'Cyberpunk-inspired with vibrant colors and glowing effects. High impact, dark mode aesthetic.',
    preview: {
      bg: 'transparent',
      bgPage: '#0a0a0f',
    },
    code: `<fortyfour-player-mini
  recording-id="rec_abc123"
  hover="glow"
  class="neon-player"
></fortyfour-player-mini>

<style>
.neon-player {
  --fortyfour-mini-bg: transparent;
  --fortyfour-mini-icon: #0ff;
  --fortyfour-mini-size: 52px;
  --fortyfour-mini-radius: 50%;
  --fortyfour-mini-border: 2px solid #0ff;
}

/* Animated glow requires ::part() */
.neon-player::part(button) {
  box-shadow:
    0 0 10px #0ff,
    0 0 20px #0ff,
    0 0 40px #0ff;
  animation: neon-pulse 2s ease-in-out infinite;
}

@keyframes neon-pulse {
  0%, 100% {
    box-shadow: 0 0 10px #0ff, 0 0 20px #0ff, 0 0 40px #0ff;
  }
  50% {
    box-shadow: 0 0 15px #0ff, 0 0 30px #0ff, 0 0 60px #0ff;
  }
}
</style>`
  },
  {
    id: 'minimal-outline',
    title: 'Minimal Outline',
    category: 'functional',
    description: 'Clean, understated design with just a thin border. Lets the content around it take focus.',
    preview: {
      bg: 'transparent',
      bgPage: '#fafafa',
    },
    code: `<fortyfour-player-mini
  recording-id="rec_abc123"
  hover="scale"
  class="minimal-player"
>
  <svg slot="play-icon" viewBox="0 0 24 24" fill="none"
       stroke="currentColor" stroke-width="2" width="18" height="18">
    <polygon points="5 3 19 12 5 21 5 3"/>
  </svg>
  <svg slot="pause-icon" viewBox="0 0 24 24" fill="none"
       stroke="currentColor" stroke-width="2" width="18" height="18">
    <line x1="6" y1="4" x2="6" y2="20"/>
    <line x1="18" y1="4" x2="18" y2="20"/>
  </svg>
</fortyfour-player-mini>

<style>
.minimal-player {
  --fortyfour-mini-bg: transparent;
  --fortyfour-mini-icon: #374151;
  --fortyfour-mini-size: 44px;
  --fortyfour-mini-radius: 50%;
  --fortyfour-mini-border: 1.5px solid #d1d5db;
}

.minimal-player:hover {
  --fortyfour-mini-border-color: #9ca3af;
}
</style>`
  },
  {
    id: 'gradient',
    title: 'Gradient Fill',
    category: 'functional',
    description: 'Vibrant gradient background with smooth color transitions. Eye-catching and modern.',
    preview: {
      bg: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      bgPage: '#fff',
    },
    code: `<fortyfour-player-mini
  recording-id="rec_abc123"
  hover="lift"
  class="gradient-player"
></fortyfour-player-mini>

<style>
.gradient-player {
  --fortyfour-mini-icon: #fff;
  --fortyfour-mini-size: 52px;
  --fortyfour-mini-radius: 14px;
  --fortyfour-mini-border: none;
}

/* Gradient backgrounds require ::part() for advanced styling */
.gradient-player::part(button) {
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  box-shadow: 0 4px 15px rgba(245, 87, 108, 0.4);
}

.gradient-player::part(button):hover {
  box-shadow: 0 6px 20px rgba(245, 87, 108, 0.5);
}
</style>`
  },
  {
    id: 'retro',
    title: 'Retro Pixel',
    category: 'eras',
    description: '8-bit inspired with pixelated edges and nostalgic color palette. Gaming aesthetic.',
    preview: {
      bg: '#5c94fc',
      bgPage: '#1a1a2e',
    },
    code: `<fortyfour-player-mini
  recording-id="rec_abc123"
  hover="none"
  class="retro-player"
>
  <!-- Custom pixelated play icon using slot -->
  <svg slot="play-icon" viewBox="0 0 16 16" fill="currentColor" width="16" height="16">
    <path d="M4 2h2v2h2v2h2v2h2v2h-2v2h-2v2h-2v2H4v-2H2v-2H0V6h2V4h2V2z"
          transform="rotate(90 8 8)"/>
  </svg>
</fortyfour-player-mini>

<style>
.retro-player {
  --fortyfour-mini-bg: #5c94fc;
  --fortyfour-mini-icon: #fff;
  --fortyfour-mini-size: 48px;
  --fortyfour-mini-radius: 0;
  --fortyfour-mini-border: 4px solid #000;
}

/* Retro 3D effect requires ::part() */
.retro-player::part(button) {
  image-rendering: pixelated;
  box-shadow:
    4px 4px 0 #000,
    inset -4px -4px 0 #3c74dc,
    inset 4px 4px 0 #9cb4fc;
}

.retro-player::part(button):active {
  box-shadow:
    2px 2px 0 #000,
    inset 4px 4px 0 #3c74dc,
    inset -4px -4px 0 #9cb4fc;
  transform: translate(2px, 2px);
}
</style>`
  },
  {
    id: 'organic',
    title: 'Organic Blob',
    category: 'vibes',
    description: 'Soft, irregular shape that feels natural and approachable. Uses border-radius creatively.',
    preview: {
      bg: '#84cc16',
      bgPage: '#f0fdf4',
    },
    code: `<fortyfour-player-mini
  recording-id="rec_abc123"
  hover="scale"
  class="organic-player"
></fortyfour-player-mini>

<style>
.organic-player {
  --fortyfour-mini-bg: #84cc16;
  --fortyfour-mini-icon: #fff;
  --fortyfour-mini-size: 56px;
  --fortyfour-mini-border: none;
}

/* Asymmetric border-radius requires ::part() */
.organic-player::part(button) {
  border-radius: 60% 40% 50% 50% / 50% 60% 40% 50%;
  box-shadow: 0 4px 12px rgba(132, 204, 22, 0.3);
  transition: border-radius 0.4s ease, transform 0.2s ease;
}

.organic-player::part(button):hover {
  border-radius: 40% 60% 50% 50% / 50% 40% 60% 50%;
}
</style>`
  },
  {
    id: 'countdown-blob',
    title: 'Countdown Blob',
    category: 'vibes',
    description: 'Purple blob that shows a countdown timer instead of pause icon. Great for podcasts or timed content.',
    preview: {
      bg: '#a855f7',
      bgPage: '#faf5ff',
    },
    code: `<fortyfour-player-mini
  recording-id="rec_abc123"
  class="countdown-blob"
>
  <!-- Countdown timer replaces pause icon -->
  <span slot="pause-icon" class="countdown-timer">0:42</span>
</fortyfour-player-mini>

/* CSS */
.countdown-blob {
  --fortyfour-mini-bg: #a855f7;
  --fortyfour-mini-icon: #fff;
  --fortyfour-mini-size: 56px;
  --fortyfour-mini-border: none;
}

.countdown-blob::part(button) {
  border-radius: 60% 40% 55% 45% / 55% 60% 40% 45%;
  box-shadow: 0 4px 12px rgba(168, 85, 247, 0.3);
}

.countdown-timer {
  font-size: 13px;
  font-weight: 600;
  font-variant-numeric: tabular-nums;
}`
  },
  {
    id: 'nuclear',
    title: 'Nuclear Launch',
    category: 'vibes',
    description: 'Industrial military aesthetic with deep 3D depth. Heavy, tactile feel with metallic housing and warning indicators.',
    preview: {
      bg: '#dc2626',
      bgPage: '#1c1c1c',
    },
    code: `<!-- Requires Font Awesome Pro Kit -->

<!-- Wrapper for the button + warning stripes -->
<!-- Add .is-spinning to .nuclear-stripes when playing -->
<div class="nuclear-wrapper">
  <div class="nuclear-stripes"></div>
  <fortyfour-player-mini
    recording-id="rec_abc123"
    hover="none"
    progress="false"
    class="nuclear-button"
  >
    <i slot="play-icon" class="fa-solid fa-radiation"></i>
    <i slot="pause-icon" class="fa-solid fa-explosion"></i>
  </fortyfour-player-mini>
</div>

/* CSS */
.nuclear-wrapper {
  position: relative;
  width: 100px;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Hazard stripes - Rust style (6 segments) */
.nuclear-stripes {
  position: absolute;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: repeating-conic-gradient(
    #facc15 0deg 30deg,
    #1a1a1a 30deg 60deg
  );
  border: 3px solid #0a0a0a;
}

/* Spin stripes when playing */
.nuclear-stripes.is-spinning {
  animation: nuclear-spin 8s linear infinite;
}

@keyframes nuclear-spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

/* The 3D button */
.nuclear-button {
  --fortyfour-mini-bg: linear-gradient(180deg, #ef4444 0%, #dc2626 50%, #991b1b 100%);
  --fortyfour-mini-icon: #fff;
  --fortyfour-mini-size: 56px;
  --fortyfour-mini-radius: 50%;
  --fortyfour-mini-border: none;
  box-shadow:
    0 6px 0 #7f1d1d,
    0 8px 0 #581c1c,
    0 12px 20px rgba(0, 0, 0, 0.6);
  transition: transform 0.06s ease, box-shadow 0.06s ease;
}

/* Hover - icon turns yellow */
.nuclear-button:hover {
  --fortyfour-mini-bg: linear-gradient(180deg, #f87171 0%, #ef4444 50%, #b91c1c 100%);
  --fortyfour-mini-icon: #facc15;
}

/* Press - button pushes down */
.nuclear-button:active {
  transform: translateY(6px);
  box-shadow:
    0 1px 0 #7f1d1d,
    0 2px 0 #581c1c,
    0 4px 8px rgba(0, 0, 0, 0.4);
}`
  },
  {
    id: 'notification-badge',
    title: 'Notification Badge',
    category: 'patterns',
    description: 'Unread message counter badge. Perfect for voice messages or audio notifications in messaging apps.',
    preview: {
      bg: '#3b82f6',
      bgPage: '#f8fafc',
    },
    code: `<div class="player-with-badge">
  <fortyfour-player-mini
    recording-id="rec_abc123"
    hover="scale"
    class="notification-player"
  ></fortyfour-player-mini>
  <span class="badge-count">3</span>
</div>

<style>
.player-with-badge {
  position: relative;
  display: inline-block;
}

.notification-player {
  --fortyfour-mini-bg: #3b82f6;
  --fortyfour-mini-icon: #fff;
  --fortyfour-mini-size: 52px;
  --fortyfour-mini-radius: 50%;
}

.badge-count {
  position: absolute;
  top: -4px;
  right: -4px;
  min-width: 20px;
  height: 20px;
  padding: 0 6px;
  background: #ef4444;
  color: #fff;
  font-size: 11px;
  font-weight: 700;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid #fff;
  box-shadow: 0 2px 4px rgba(0,0,0,0.15);
}
</style>`
  },
  {
    id: 'live-badge',
    title: 'Live Badge',
    category: 'patterns',
    description: 'Pulsing live indicator for streaming audio, podcasts, or real-time broadcasts.',
    preview: {
      bg: '#18181b',
      bgPage: '#09090b',
    },
    code: `<div class="player-with-live">
  <fortyfour-player-mini
    recording-id="rec_abc123"
    hover="glow"
    class="live-player"
  ></fortyfour-player-mini>
  <span class="live-badge">
    <span class="live-dot"></span>
    LIVE
  </span>
</div>

<style>
.player-with-live {
  position: relative;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.live-player {
  --fortyfour-mini-bg: #18181b;
  --fortyfour-mini-icon: #ef4444;
  --fortyfour-mini-size: 56px;
  --fortyfour-mini-radius: 50%;
  --fortyfour-mini-border: 2px solid #ef4444;
}

.live-badge {
  display: flex;
  align-items: center;
  gap: 6px;
  background: #ef4444;
  color: #fff;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.5px;
  padding: 4px 10px;
  border-radius: 4px;
}

.live-dot {
  width: 6px;
  height: 6px;
  background: #fff;
  border-radius: 50%;
  animation: live-pulse 1.5s ease-in-out infinite;
}

@keyframes live-pulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.5; transform: scale(0.8); }
}
</style>`
  },
  {
    id: 'duration-badge',
    title: 'Duration Badge',
    category: 'patterns',
    description: 'Shows audio length at a glance. Great for podcasts, voice notes, or any timed content.',
    preview: {
      bg: '#8b5cf6',
      bgPage: '#faf5ff',
    },
    code: `<div class="player-with-duration">
  <fortyfour-player-mini
    recording-id="rec_abc123"
    hover="lift"
    class="duration-player"
  ></fortyfour-player-mini>
  <span class="duration-badge">1:24</span>
</div>

<style>
.player-with-duration {
  position: relative;
  display: inline-block;
}

.duration-player {
  --fortyfour-mini-bg: #8b5cf6;
  --fortyfour-mini-icon: #fff;
  --fortyfour-mini-size: 56px;
  --fortyfour-mini-radius: 14px;
}

.duration-badge {
  position: absolute;
  bottom: -6px;
  left: 50%;
  transform: translateX(-50%);
  background: #1e1b4b;
  color: #fff;
  font-size: 10px;
  font-weight: 600;
  font-family: 'SF Mono', monospace;
  padding: 2px 8px;
  border-radius: 8px;
  white-space: nowrap;
}
</style>`
  },
  {
    id: 'verified-badge',
    title: 'Verified Badge',
    category: 'patterns',
    description: 'Trust indicator for verified creators or official content. Adds credibility to audio.',
    preview: {
      bg: '#0ea5e9',
      bgPage: '#fff',
    },
    code: `<!-- Requires Font Awesome -->
<!-- Include Font Awesome Pro Kit in your HTML head -->

<div class="player-with-verified">
  <fortyfour-player-mini
    recording-id="rec_abc123"
    hover="scale"
    class="verified-player"
  ></fortyfour-player-mini>
  <span class="verified-badge">
    <i class="fa-solid fa-check"></i>
  </span>
</div>

<style>
.player-with-verified {
  position: relative;
  display: inline-block;
}

.verified-player {
  --fortyfour-mini-bg: #0ea5e9;
  --fortyfour-mini-icon: #fff;
  --fortyfour-mini-size: 52px;
  --fortyfour-mini-radius: 50%;
}

.verified-badge {
  position: absolute;
  bottom: -2px;
  right: -2px;
  width: 20px;
  height: 20px;
  background: #fff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.verified-badge i {
  font-size: 10px;
  color: #0ea5e9;
}
</style>`
  },
  // ========== ENGAGEMENT PATTERNS ==========
  {
    id: 'tiktok-hearts',
    title: 'Heart Reactions',
    category: 'patterns',
    description: 'Tap the heart badge to spawn floating hearts. Perfect for live streams, reactions, or showing appreciation.',
    preview: {
      bg: '#ec4899',
      bgPage: '#fff',
    },
    code: `<!-- Requires Font Awesome -->
<!-- Include Font Awesome Pro Kit in your HTML head -->

<!-- Player with reaction badge (badge appears only when playing) -->
<div class="player-with-reactions">
  <fortyfour-player-mini
    recording-id="rec_abc123"
    hover="scale"
    class="hearts-player"
  ></fortyfour-player-mini>
  <!-- Show badge only when audio is playing -->
  <button class="reaction-badge" hidden>
    <i class="fa-solid fa-heart"></i>
  </button>
  <div class="floating-reactions"></div>
</div>

<style>
.player-with-reactions {
  position: relative;
  display: inline-block;
}

.hearts-player {
  --fortyfour-mini-bg: #ec4899;
  --fortyfour-mini-icon: #fff;
  --fortyfour-mini-size: 56px;
}

.reaction-badge {
  position: absolute;
  top: -4px;
  right: -4px;
  width: 26px;
  height: 26px;
  border-radius: 50%;
  background: #fff;
  border: none;
  cursor: pointer;
  color: #ec4899;
  font-size: 12px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.2);
  display: flex;
  align-items: center;
  justify-content: center;
}

.floating-reaction {
  position: absolute;
  bottom: 50%;
  left: 50%;
  color: #ec4899;
  font-size: 20px;
  animation: float-up 1.5s ease-out forwards;
}

@keyframes float-up {
  0% { opacity: 1; transform: translate(-50%, 0) scale(0.3); }
  100% { opacity: 0; transform: translate(calc(-50% + var(--drift)), -120px) scale(1); }
}
</style>`
  },
  {
    id: 'fire-reactions',
    title: 'Fire Reactions',
    category: 'patterns',
    description: 'Tap the fire badge to spawn flames. Great for hype moments, hot takes, or viral content.',
    preview: {
      bg: '#f97316',
      bgPage: '#fff',
    },
    code: `<!-- Player with fire reaction badge (appears when playing) -->
<div class="player-with-reactions">
  <fortyfour-player-mini
    recording-id="rec_abc123"
    hover="glow"
    class="fire-player"
  ></fortyfour-player-mini>
  <button class="reaction-badge" hidden>
    <i class="fa-solid fa-fire"></i>
  </button>
</div>

<style>
.fire-player {
  --fortyfour-mini-bg: #f97316;
  --fortyfour-mini-icon: #fff;
}

.reaction-badge { color: #f97316; }
.floating-reaction { color: #f97316; }
</style>`
  },
  {
    id: 'star-burst',
    title: 'Star Reactions',
    category: 'patterns',
    description: 'Tap the star badge to spawn stars. Perfect for celebrations, achievements, or gamification.',
    preview: {
      bg: '#eab308',
      bgPage: '#fff',
    },
    code: `<!-- Player with star reaction badge (appears when playing) -->
<div class="player-with-reactions">
  <fortyfour-player-mini
    recording-id="rec_abc123"
    hover="lift"
    class="star-player"
  ></fortyfour-player-mini>
  <button class="reaction-badge" hidden>
    <i class="fa-solid fa-star"></i>
  </button>
</div>

<style>
.star-player {
  --fortyfour-mini-bg: #eab308;
  --fortyfour-mini-icon: #1e1b4b;
}

.reaction-badge { color: #eab308; }
.floating-reaction { color: #eab308; }
</style>`
  },
  {
    id: 'halloween',
    title: 'Halloween',
    category: 'seasonal',
    description: 'Spooky pumpkin orange with glowing effect and a floating bat. Perfect for seasonal campaigns.',
    preview: {
      bg: '#f97316',
      bgPage: '#1a1a1a',
    },
    code: `<!-- Requires Font Awesome -->
<!-- Include Font Awesome Pro Kit in your HTML head -->

<div class="halloween-player">
  <fortyfour-player-mini
    recording-id="rec_abc123"
    hover="glow"
    class="pumpkin-button"
  >
    <i slot="play-icon" class="fa-solid fa-ghost"></i>
    <i slot="pause-icon" class="fa-solid fa-skull"></i>
  </fortyfour-player-mini>
  <i class="fa-solid fa-bat halloween-bat"></i>
</div>

<style>
.halloween-player {
  position: relative;
  display: inline-block;
}

.pumpkin-button {
  --fortyfour-mini-bg: #f97316;
  --fortyfour-mini-icon: #000;
  --fortyfour-mini-size: 56px;
  --fortyfour-mini-radius: 50%;
  --fortyfour-mini-border: 3px solid #000;
}

/* Glow effect requires ::part() */
.pumpkin-button::part(button) {
  box-shadow: 0 0 20px rgba(249, 115, 22, 0.5),
              0 0 40px rgba(249, 115, 22, 0.3);
}

.halloween-bat {
  position: absolute;
  top: -12px;
  right: -8px;
  font-size: 20px;
  color: #000;
  animation: bat-float 2s ease-in-out infinite;
}

@keyframes bat-float {
  0%, 100% { transform: translateY(0) rotate(-5deg); }
  50% { transform: translateY(-4px) rotate(5deg); }
}
</style>`
  },
  {
    id: 'christmas',
    title: 'Christmas',
    category: 'seasonal',
    description: 'Festive red and green with a Santa hat topper. Spread holiday cheer with audio.',
    preview: {
      bg: '#dc2626',
      bgPage: '#166534',
    },
    code: `<div class="christmas-player">
  <span class="santa-hat">🎅</span>
  <fortyfour-player-mini
    recording-id="rec_abc123"
    hover="scale"
    class="ornament-button"
  ></fortyfour-player-mini>
</div>

<style>
.christmas-player {
  position: relative;
  display: inline-block;
}

.ornament-button {
  --fortyfour-mini-icon: #fff;
  --fortyfour-mini-size: 56px;
  --fortyfour-mini-radius: 50%;
  --fortyfour-mini-border: 3px solid #166534;
}

/* Gradient background requires ::part() */
.ornament-button::part(button) {
  background: linear-gradient(135deg, #dc2626 0%, #991b1b 100%);
  box-shadow: 0 4px 12px rgba(220, 38, 38, 0.3);
}

.santa-hat {
  position: absolute;
  top: -20px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 32px;
  filter: drop-shadow(0 2px 2px rgba(0,0,0,0.2));
}
</style>`
  },
  {
    id: 'christmas-tree',
    title: 'Christmas Tree',
    category: 'seasonal',
    description: 'A full Christmas tree with a play button. Snow falls when audio plays. Complete button replacement.',
    preview: {
      bg: '#166534',
      bgPage: '#0f172a',
    },
    code: `<!-- Full custom Christmas tree button with falling snow -->
<div class="xmas-tree-player">
  <div class="xmas-tree">
    <!-- Tree SVG -->
    <svg viewBox="0 0 80 100" class="tree-svg">
      <polygon points="40,5 10,45 70,45" fill="#166534"/>
      <polygon points="40,20 5,65 75,65" fill="#15803d"/>
      <polygon points="40,40 0,90 80,90" fill="#14532d"/>
      <rect x="32" y="90" width="16" height="12" fill="#78350f"/>
      <!-- Star -->
      <polygon points="40,0 42,8 50,8 44,13 46,21 40,16 34,21 36,13 30,8 38,8" fill="#fbbf24"/>
      <!-- Ornaments -->
      <circle cx="25" cy="55" r="4" fill="#ef4444"/>
      <circle cx="55" cy="50" r="4" fill="#3b82f6"/>
      <circle cx="35" cy="75" r="4" fill="#fbbf24"/>
      <circle cx="50" cy="70" r="4" fill="#ec4899"/>
    </svg>
    <!-- Play button overlay -->
    <button class="tree-play-btn">
      <svg viewBox="0 0 24 24" fill="white" width="20" height="20">
        <path d="M8 5v14l11-7z"/>
      </svg>
    </button>
  </div>
  <!-- Snowflakes container -->
  <div class="snowflakes"></div>
</div>

<style>
.xmas-tree-player {
  position: relative;
  display: inline-block;
}

.xmas-tree {
  position: relative;
  width: 80px;
  height: 100px;
}

.tree-svg {
  width: 100%;
  height: 100%;
}

.tree-play-btn {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: rgba(0,0,0,0.5);
  border: 2px solid white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
}

.tree-play-btn:hover {
  background: rgba(0,0,0,0.7);
  transform: translate(-50%, -50%) scale(1.1);
}

.snowflakes {
  position: absolute;
  inset: 0;
  pointer-events: none;
  overflow: hidden;
}

/* Snowflakes animate when .is-playing class is added */
.xmas-tree-player.is-playing .snowflake {
  animation: snow-fall linear infinite;
}

@keyframes snow-fall {
  0% {
    transform: translateY(-20px) rotate(0deg);
    opacity: 1;
  }
  100% {
    transform: translateY(120px) rotate(360deg);
    opacity: 0;
  }
}
</style>`
  },
  {
    id: 'july4',
    title: '4th of July',
    category: 'seasonal',
    description: 'Patriotic red, white, and blue stripes with golden stars. Celebrate independence!',
    preview: {
      bg: '#1d4ed8',
      bgPage: '#fef2f2',
    },
    code: `<!-- Requires Font Awesome -->
<!-- Include Font Awesome Pro Kit in your HTML head -->

<div class="july4-player">
  <fortyfour-player-mini
    recording-id="rec_abc123"
    hover="scale"
    class="flag-button"
  ></fortyfour-player-mini>
  <div class="star-row">
    <i class="fa-solid fa-star"></i>
    <i class="fa-solid fa-star"></i>
    <i class="fa-solid fa-star"></i>
  </div>
</div>

<style>
.july4-player {
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
}

.flag-button {
  --fortyfour-mini-icon: #1e3a5f;
  --fortyfour-mini-size: 56px;
  --fortyfour-mini-radius: 50%;
  --fortyfour-mini-border: 2px solid #1e3a5f;
}

/* Flag stripes require ::part() */
.flag-button::part(button) {
  background: linear-gradient(180deg,
    #dc2626 0%, #dc2626 33%,
    #fff 33%, #fff 66%,
    #1d4ed8 66%, #1d4ed8 100%);
}

.star-row {
  display: flex;
  gap: 4px;
  color: #facc15;
  font-size: 10px;
}
</style>`
  },
  {
    id: 'valentine',
    title: "Valentine's Day",
    category: 'seasonal',
    description: 'Romantic pink gradient with floating hearts. Perfect for love-themed content.',
    preview: {
      bg: '#ec4899',
      bgPage: '#fdf2f8',
    },
    code: `<!-- Requires Font Awesome -->
<!-- Include Font Awesome Pro Kit in your HTML head -->

<div class="valentine-player">
  <fortyfour-player-mini
    recording-id="rec_abc123"
    hover="scale"
    class="heart-button"
  >
    <i slot="play-icon" class="fa-solid fa-heart"></i>
    <i slot="pause-icon" class="fa-solid fa-heart-crack"></i>
  </fortyfour-player-mini>
  <div class="floating-hearts">
    <i class="fa-solid fa-heart heart"></i>
    <i class="fa-solid fa-heart heart"></i>
    <i class="fa-solid fa-heart heart"></i>
    <i class="fa-solid fa-heart heart"></i>
  </div>
</div>

<style>
.valentine-player {
  position: relative;
  display: inline-block;
}

.heart-button {
  --fortyfour-mini-icon: #fff;
  --fortyfour-mini-size: 56px;
  --fortyfour-mini-radius: 50%;
  --fortyfour-mini-border: none;
}

/* Gradient + glow requires ::part() */
.heart-button::part(button) {
  background: linear-gradient(135deg, #ec4899 0%, #db2777 100%);
  box-shadow: 0 4px 15px rgba(236, 72, 153, 0.4);
}

.floating-hearts {
  position: absolute;
  inset: -8px;
  pointer-events: none;
}

.heart {
  position: absolute;
  color: #fda4af;
  font-size: 12px;
  animation: heart-float 3s ease-in-out infinite;
}

.heart:nth-child(1) { top: 0; left: 10%; }
.heart:nth-child(2) { top: 20%; right: -5px; animation-delay: 0.5s; }
.heart:nth-child(3) { bottom: 0; right: 15%; animation-delay: 1s; }
.heart:nth-child(4) { bottom: 20%; left: -5px; animation-delay: 1.5s; }

@keyframes heart-float {
  0%, 100% { transform: scale(1) translateY(0); opacity: 0.7; }
  50% { transform: scale(1.2) translateY(-3px); opacity: 1; }
}
</style>`
  },
  {
    id: 'stpatricks',
    title: "St. Patrick's Day",
    category: 'seasonal',
    description: 'Lucky green with a shamrock accent. May the luck of the Irish be with your audio.',
    preview: {
      bg: '#16a34a',
      bgPage: '#f0fdf4',
    },
    code: `<div class="stpatricks-player">
  <fortyfour-player-mini
    recording-id="rec_abc123"
    hover="scale"
    class="shamrock-button"
  ></fortyfour-player-mini>
  <span class="clover">☘️</span>
</div>

<style>
.stpatricks-player {
  position: relative;
  display: inline-block;
}

.shamrock-button {
  --fortyfour-mini-bg: #16a34a;
  --fortyfour-mini-icon: #fff;
  --fortyfour-mini-size: 56px;
  --fortyfour-mini-radius: 50%;
  --fortyfour-mini-border: 3px solid #166534;
}

/* Glow effect requires ::part() */
.shamrock-button::part(button) {
  box-shadow: 0 4px 12px rgba(22, 163, 74, 0.4);
}

.clover {
  position: absolute;
  top: -8px;
  right: -8px;
  font-size: 20px;
  filter: drop-shadow(0 2px 2px rgba(0,0,0,0.2));
}
</style>`
  },

  // ========== MORE DESIGN MOVEMENTS ==========
  {
    id: 'flat-design',
    title: 'Flat Design',
    category: 'movements',
    description: 'Pure simplicity with solid colors, no shadows or depth. Clean Microsoft/Google-inspired aesthetic.',
    preview: {
      bg: '#2563eb',
      bgPage: '#fff',
    },
    code: `<fortyfour-player-mini
  recording-id="rec_abc123"
  hover="none"
  class="flat-player"
></fortyfour-player-mini>

<style>
.flat-player {
  --fortyfour-mini-bg: #2563eb;
  --fortyfour-mini-icon: #fff;
  --fortyfour-mini-size: 52px;
  --fortyfour-mini-radius: 4px;
  --fortyfour-mini-border: none;
}

/* No shadows, no gradients - pure flat */
.flat-player::part(button) {
  box-shadow: none;
  transition: background 0.15s ease;
}

.flat-player::part(button):hover {
  background: #1d4ed8;
}

.flat-player::part(button):active {
  background: #1e40af;
}
</style>`
  },
  {
    id: 'material',
    title: 'Material Design',
    category: 'movements',
    description: 'Google\'s design language with elevation, ripple effects, and depth through shadows.',
    preview: {
      bg: '#6366f1',
      bgPage: '#f5f5f5',
    },
    code: `<fortyfour-player-mini
  recording-id="rec_abc123"
  hover="lift"
  class="material-player"
></fortyfour-player-mini>

<style>
.material-player {
  --fortyfour-mini-bg: #6366f1;
  --fortyfour-mini-icon: #fff;
  --fortyfour-mini-size: 56px;
  --fortyfour-mini-radius: 50%;
  --fortyfour-mini-border: none;
}

/* Material elevation system */
.material-player::part(button) {
  box-shadow:
    0 3px 5px -1px rgba(0,0,0,0.2),
    0 6px 10px 0 rgba(0,0,0,0.14),
    0 1px 18px 0 rgba(0,0,0,0.12);
  transition: box-shadow 0.28s cubic-bezier(0.4, 0, 0.2, 1);
}

.material-player::part(button):hover {
  box-shadow:
    0 5px 5px -3px rgba(0,0,0,0.2),
    0 8px 10px 1px rgba(0,0,0,0.14),
    0 3px 14px 2px rgba(0,0,0,0.12);
}
</style>`
  },
  {
    id: 'skeuomorphic',
    title: 'Skeuomorphic',
    category: 'movements',
    description: 'Classic iOS-era realism with textures, gradients, and physical-looking depth.',
    preview: {
      bg: 'linear-gradient(180deg, #a8a8a8 0%, #888 100%)',
      bgPage: '#6b7280',
    },
    code: `<fortyfour-player-mini
  recording-id="rec_abc123"
  hover="none"
  class="skeuomorph-player"
></fortyfour-player-mini>

<style>
.skeuomorph-player {
  --fortyfour-mini-icon: #fff;
  --fortyfour-mini-size: 56px;
  --fortyfour-mini-radius: 50%;
  --fortyfour-mini-border: none;
}

/* Classic iOS button look */
.skeuomorph-player::part(button) {
  background: linear-gradient(180deg,
    #e8e8e8 0%,
    #c8c8c8 50%,
    #b8b8b8 51%,
    #d0d0d0 100%
  );
  border: 1px solid #888;
  box-shadow:
    0 1px 0 rgba(255,255,255,0.5) inset,
    0 -1px 0 rgba(0,0,0,0.1) inset,
    0 4px 8px rgba(0,0,0,0.3);
}

.skeuomorph-player::part(button):active {
  background: linear-gradient(180deg,
    #c0c0c0 0%,
    #a8a8a8 50%,
    #b0b0b0 51%,
    #c0c0c0 100%
  );
  box-shadow:
    0 1px 0 rgba(0,0,0,0.1) inset,
    0 2px 4px rgba(0,0,0,0.2);
}

.skeuomorph-player::part(icon) {
  color: #333;
  filter: drop-shadow(0 1px 0 rgba(255,255,255,0.5));
}
</style>`
  },

  // ========== MORE VIBES & AESTHETICS ==========
  {
    id: 'luxury',
    title: 'Luxury Gold',
    category: 'vibes',
    description: 'Premium feel with gold accents and dark background. Perfect for high-end brands.',
    preview: {
      bg: '#1a1a1a',
      bgPage: '#0d0d0d',
    },
    code: `<fortyfour-player-mini
  recording-id="rec_abc123"
  hover="glow"
  class="luxury-player"
></fortyfour-player-mini>

<style>
.luxury-player {
  --fortyfour-mini-bg: #1a1a1a;
  --fortyfour-mini-icon: #d4af37;
  --fortyfour-mini-size: 56px;
  --fortyfour-mini-radius: 50%;
  --fortyfour-mini-border: 2px solid #d4af37;
}

/* Gold glow effect */
.luxury-player::part(button) {
  box-shadow:
    0 0 15px rgba(212, 175, 55, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
}

.luxury-player::part(button):hover {
  box-shadow:
    0 0 25px rgba(212, 175, 55, 0.5),
    inset 0 1px 0 rgba(255, 255, 255, 0.15);
}
</style>`
  },
  {
    id: 'playful',
    title: 'Playful Bounce',
    category: 'vibes',
    description: 'Fun, energetic design with bright colors and bouncy animations. Kid-friendly.',
    preview: {
      bg: '#f472b6',
      bgPage: '#fef3c7',
    },
    code: `<fortyfour-player-mini
  recording-id="rec_abc123"
  hover="scale"
  class="playful-player"
></fortyfour-player-mini>

<style>
.playful-player {
  --fortyfour-mini-bg: #f472b6;
  --fortyfour-mini-icon: #fff;
  --fortyfour-mini-size: 60px;
  --fortyfour-mini-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
  --fortyfour-mini-border: 4px solid #fff;
}

/* Bouncy hover animation */
.playful-player::part(button) {
  box-shadow: 0 6px 0 #db2777;
  transition: transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.playful-player::part(button):hover {
  transform: scale(1.1) rotate(-3deg);
  animation: wiggle 0.5s ease-in-out;
}

@keyframes wiggle {
  0%, 100% { transform: scale(1.1) rotate(-3deg); }
  25% { transform: scale(1.1) rotate(3deg); }
  75% { transform: scale(1.1) rotate(-3deg); }
}
</style>`
  },
  {
    id: 'corporate',
    title: 'Corporate Clean',
    category: 'vibes',
    description: 'Professional, business-appropriate design. Subtle and trustworthy.',
    preview: {
      bg: '#1e3a5f',
      bgPage: '#f8fafc',
    },
    code: `<fortyfour-player-mini
  recording-id="rec_abc123"
  hover="scale"
  class="corporate-player"
></fortyfour-player-mini>

<style>
.corporate-player {
  --fortyfour-mini-bg: #1e3a5f;
  --fortyfour-mini-icon: #fff;
  --fortyfour-mini-size: 48px;
  --fortyfour-mini-radius: 8px;
  --fortyfour-mini-border: none;
}

/* Subtle professional shadow */
.corporate-player::part(button) {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: all 0.2s ease;
}

.corporate-player::part(button):hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}
</style>`
  },
  {
    id: 'hand-drawn',
    title: 'Hand-Drawn',
    category: 'vibes',
    description: 'Sketchy, whimsical style that feels personal and approachable.',
    preview: {
      bg: '#fef3c7',
      bgPage: '#fffbeb',
    },
    code: `<fortyfour-player-mini
  recording-id="rec_abc123"
  hover="scale"
  class="handdrawn-player"
></fortyfour-player-mini>

<style>
.handdrawn-player {
  --fortyfour-mini-bg: #fef3c7;
  --fortyfour-mini-icon: #292524;
  --fortyfour-mini-size: 56px;
  --fortyfour-mini-radius: 45% 55% 49% 51% / 55% 45% 55% 45%;
  --fortyfour-mini-border: 2px dashed #292524;
}

/* Imperfect, hand-drawn feel */
.handdrawn-player::part(button) {
  transform: rotate(-2deg);
  box-shadow: 3px 3px 0 #292524;
}

.handdrawn-player::part(button):hover {
  transform: rotate(1deg) scale(1.05);
}
</style>`
  },

  // ========== ERA & NOSTALGIA ==========
  {
    id: 'synthwave',
    title: '80s Synthwave',
    category: 'eras',
    description: 'Retro-futuristic neon aesthetic inspired by 1980s synth music and sci-fi.',
    preview: {
      bg: 'linear-gradient(135deg, #ff00ff 0%, #00ffff 100%)',
      bgPage: '#0a0a1a',
    },
    code: `<fortyfour-player-mini
  recording-id="rec_abc123"
  hover="glow"
  class="synthwave-player"
></fortyfour-player-mini>

<style>
.synthwave-player {
  --fortyfour-mini-icon: #fff;
  --fortyfour-mini-size: 56px;
  --fortyfour-mini-radius: 50%;
  --fortyfour-mini-border: 2px solid #ff00ff;
}

/* Synthwave gradient and glow */
.synthwave-player::part(button) {
  background: linear-gradient(135deg, #ff00ff 0%, #00ffff 100%);
  box-shadow:
    0 0 20px rgba(255, 0, 255, 0.5),
    0 0 40px rgba(0, 255, 255, 0.3);
}

.synthwave-player::part(button):hover {
  box-shadow:
    0 0 30px rgba(255, 0, 255, 0.7),
    0 0 60px rgba(0, 255, 255, 0.5);
}
</style>`
  },
  {
    id: 'y2k',
    title: 'Y2K Aesthetic',
    category: 'eras',
    description: 'Millennium-era style with chrome, iridescent colors, and futuristic vibes.',
    preview: {
      bg: 'linear-gradient(135deg, #c0c0ff 0%, #ffc0ff 50%, #c0ffff 100%)',
      bgPage: '#e0e0f0',
    },
    code: `<fortyfour-player-mini
  recording-id="rec_abc123"
  hover="scale"
  class="y2k-player"
></fortyfour-player-mini>

<style>
.y2k-player {
  --fortyfour-mini-icon: #fff;
  --fortyfour-mini-size: 52px;
  --fortyfour-mini-radius: 16px;
  --fortyfour-mini-border: 2px solid rgba(255,255,255,0.8);
}

/* Iridescent chrome effect */
.y2k-player::part(button) {
  background: linear-gradient(135deg,
    #c0c0ff 0%,
    #ffc0ff 33%,
    #c0ffff 66%,
    #ffffc0 100%
  );
  box-shadow:
    0 4px 15px rgba(192, 192, 255, 0.5),
    inset 0 2px 4px rgba(255, 255, 255, 0.8);
  animation: y2k-shift 3s ease-in-out infinite;
}

@keyframes y2k-shift {
  0%, 100% { filter: hue-rotate(0deg); }
  50% { filter: hue-rotate(30deg); }
}
</style>`
  },
  {
    id: 'art-deco',
    title: 'Art Deco',
    category: 'eras',
    description: '1920s glamour with geometric patterns, gold accents, and elegant symmetry.',
    preview: {
      bg: '#1a1a2e',
      bgPage: '#0f0f1a',
    },
    code: `<fortyfour-player-mini
  recording-id="rec_abc123"
  hover="scale"
  class="artdeco-player"
></fortyfour-player-mini>

<style>
.artdeco-player {
  --fortyfour-mini-bg: #1a1a2e;
  --fortyfour-mini-icon: #d4af37;
  --fortyfour-mini-size: 56px;
  --fortyfour-mini-radius: 8px;
  --fortyfour-mini-border: 3px solid #d4af37;
}

/* Art Deco geometric styling */
.artdeco-player::part(button) {
  box-shadow:
    0 0 0 2px #1a1a2e,
    0 0 0 5px #d4af37,
    0 4px 12px rgba(0, 0, 0, 0.4);
}

.artdeco-player::part(button):hover {
  box-shadow:
    0 0 0 2px #1a1a2e,
    0 0 0 5px #d4af37,
    0 0 20px rgba(212, 175, 55, 0.4);
}
</style>`
  },

  // ========== MORE FUNCTIONAL ==========
  {
    id: 'monochrome',
    title: 'Monochrome',
    category: 'functional',
    description: 'Single-color palette that adapts to any context. Understated and versatile.',
    preview: {
      bg: '#525252',
      bgPage: '#f5f5f5',
    },
    code: `<fortyfour-player-mini
  recording-id="rec_abc123"
  hover="scale"
  class="mono-player"
></fortyfour-player-mini>

<style>
.mono-player {
  --fortyfour-mini-bg: #525252;
  --fortyfour-mini-icon: #fff;
  --fortyfour-mini-size: 48px;
  --fortyfour-mini-radius: 50%;
  --fortyfour-mini-border: none;
}

/* Simple, clean shadow */
.mono-player::part(button) {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

.mono-player::part(button):hover {
  background: #404040;
}
</style>`
  },
  {
    id: 'high-contrast',
    title: 'High Contrast',
    category: 'functional',
    description: 'Maximum visibility with stark black and white. Accessibility-focused design.',
    preview: {
      bg: '#000',
      bgPage: '#fff',
    },
    code: `<fortyfour-player-mini
  recording-id="rec_abc123"
  hover="none"
  class="contrast-player"
></fortyfour-player-mini>

<style>
.contrast-player {
  --fortyfour-mini-bg: #000;
  --fortyfour-mini-icon: #fff;
  --fortyfour-mini-size: 56px;
  --fortyfour-mini-radius: 50%;
  --fortyfour-mini-border: 4px solid #000;
}

/* High contrast focus ring */
.contrast-player::part(button) {
  box-shadow: none;
}

.contrast-player::part(button):focus-visible {
  outline: 3px solid #000;
  outline-offset: 4px;
}

.contrast-player::part(button):hover {
  background: #333;
}
</style>`
  },
]

// Computed filtered examples based on active category
const filteredExamples = computed(() => {
  if (activeCategory.value === 'all') {
    return examples
  }
  return examples.filter(e => e.category === activeCategory.value)
})

// Get count per category
const getCategoryCount = (categoryId) => {
  if (categoryId === 'all') return examples.length
  return examples.filter(e => e.category === categoryId).length
}
</script>

<template>
  <div class="mini-examples">
    <p class="mini-examples__intro">
      Design variations showing different aesthetic styles you can achieve by combining
      CSS variables, attributes, slots, and custom CSS. Copy and adapt for your brand.
    </p>

    <!-- Category Filter -->
    <div class="category-filter">
      <button
        v-for="cat in categories"
        :key="cat.id"
        class="category-chip"
        :class="{ 'is-active': activeCategory === cat.id }"
        @click="activeCategory = cat.id"
      >
        {{ cat.label }}
        <span class="category-chip__count">{{ getCategoryCount(cat.id) }}</span>
      </button>
    </div>

    <div class="examples-grid">
      <div v-for="example in filteredExamples" :key="example.id" class="example-card">
        <!-- Preview -->
        <div
          class="example-card__preview"
          :style="{ background: example.preview.bgPage }"
        >
          <!-- Nuclear - real audio with spinning stripes when playing -->
          <div v-if="example.id === 'nuclear'" class="nuclear-wrapper">
            <div class="nuclear-stripes" :class="{ 'is-spinning': isNuclearPlaying }"></div>
            <PlayableMiniPlayer
              :recording-id="demoRecordingId"
              :size="56"
              :show-progress="false"
              hover="none"
              icon-color="#fff"
              class="nuclear-button"
              @play="isNuclearPlaying = true"
              @pause="isNuclearPlaying = false"
              @ended="isNuclearPlaying = false"
            >
              <template #play-icon>
                <i class="fa-solid fa-radiation"></i>
              </template>
              <template #pause-icon>
                <i class="fa-solid fa-explosion"></i>
              </template>
            </PlayableMiniPlayer>
          </div>
          <!-- Brutalist - real audio -->
          <PlayableMiniPlayer
            v-else-if="example.id === 'brutalist'"
            :recording-id="demoRecordingId"
            :size="56"
            :show-progress="false"
            hover="none"
            bg-color="#facc15"
            icon-color="#000"
            border-radius="0"
            border="3px solid #000"
            class="brutalist-button"
          />
          <!-- Notification Badge -->
          <div v-else-if="example.id === 'notification-badge'" class="badge-wrapper">
            <PlayableMiniPlayer
              :recording-id="demoRecordingId"
              :size="52"
              :show-progress="false"
              hover="scale"
              bg-color="#3b82f6"
              icon-color="#fff"
            />
            <span class="notification-badge">3</span>
          </div>
          <!-- Live Badge -->
          <div v-else-if="example.id === 'live-badge'" class="badge-wrapper badge-wrapper--column live-badge-wrapper">
            <PlayableMiniPlayer
              :recording-id="demoRecordingId"
              :size="56"
              :show-progress="false"
              hover="glow"
            />
            <span class="live-badge">
              <span class="live-dot"></span>
              LIVE
            </span>
          </div>
          <!-- Duration Badge -->
          <div v-else-if="example.id === 'duration-badge'" class="badge-wrapper">
            <PlayableMiniPlayer
              :recording-id="demoRecordingId"
              :size="56"
              :show-progress="false"
              hover="lift"
              bg-color="#8b5cf6"
              icon-color="#fff"
              border-radius="14px"
            />
            <span class="duration-badge">1:24</span>
          </div>
          <!-- Verified Badge -->
          <div v-else-if="example.id === 'verified-badge'" class="badge-wrapper">
            <PlayableMiniPlayer
              :recording-id="demoRecordingId"
              :size="52"
              :show-progress="false"
              hover="scale"
              bg-color="#0ea5e9"
              icon-color="#fff"
            />
            <span class="verified-badge">
              <i class="fa-solid fa-check"></i>
            </span>
          </div>

          <!-- TikTok Hearts - Reaction badge appears only when playing -->
          <div
            v-else-if="example.id === 'tiktok-hearts'"
            class="badge-wrapper"
          >
            <PlayableMiniPlayer
              :recording-id="demoRecordingId"
              :size="56"
              visualization="ring"
              hover="scale"
              bg-color="#ec4899"
              icon-color="#fff"
              progress-color="#f9a8d4"
              track-color="#ec4899"
              @play="engagementPlaying.hearts = true"
              @pause="engagementPlaying.hearts = false"
              @ended="engagementPlaying.hearts = false"
            >
              <template #play-icon>
                <i class="fa-solid fa-play"></i>
              </template>
              <template #pause-icon>
                <i class="fa-solid fa-pause"></i>
              </template>
            </PlayableMiniPlayer>
            <button
              v-if="engagementPlaying.hearts"
              class="reaction-badge reaction-badge--heart"
              @click.stop="(e) => spawnReaction('fa-heart', e)"
            ><i class="fa-solid fa-heart"></i></button>
            <div class="floating-reactions">
              <i
                v-for="reaction in floatingReactions.filter(r => r.iconClass === 'fa-heart')"
                :key="reaction.id"
                class="fa-solid fa-heart floating-reaction floating-reaction--heart"
                :style="{
                  '--start-x': reaction.startX + 'px',
                  '--drift': reaction.drift + 'px',
                  '--scale': reaction.scale,
                  '--rotation': reaction.rotation + 'deg',
                }"
              ></i>
            </div>
          </div>

          <!-- Fire Reactions - Reaction badge appears only when playing -->
          <div
            v-else-if="example.id === 'fire-reactions'"
            class="badge-wrapper"
          >
            <PlayableMiniPlayer
              :recording-id="demoRecordingId"
              :size="56"
              visualization="ring"
              hover="glow"
              bg-color="#f97316"
              icon-color="#fff"
              progress-color="#fdba74"
              track-color="#f97316"
              @play="engagementPlaying.fire = true"
              @pause="engagementPlaying.fire = false"
              @ended="engagementPlaying.fire = false"
            >
              <template #play-icon>
                <i class="fa-solid fa-play"></i>
              </template>
              <template #pause-icon>
                <i class="fa-solid fa-pause"></i>
              </template>
            </PlayableMiniPlayer>
            <button
              v-if="engagementPlaying.fire"
              class="reaction-badge reaction-badge--fire"
              @click.stop="(e) => spawnReaction('fa-fire', e)"
            ><i class="fa-solid fa-fire"></i></button>
            <div class="floating-reactions">
              <i
                v-for="reaction in floatingReactions.filter(r => r.iconClass === 'fa-fire')"
                :key="reaction.id"
                class="fa-solid fa-fire floating-reaction floating-reaction--fire"
                :style="{
                  '--start-x': reaction.startX + 'px',
                  '--drift': reaction.drift + 'px',
                  '--scale': reaction.scale,
                  '--rotation': reaction.rotation + 'deg',
                }"
              ></i>
            </div>
          </div>

          <!-- Star Burst - Reaction badge appears only when playing -->
          <div
            v-else-if="example.id === 'star-burst'"
            class="badge-wrapper"
          >
            <PlayableMiniPlayer
              :recording-id="demoRecordingId"
              :size="56"
              visualization="ring"
              hover="lift"
              bg-color="#eab308"
              icon-color="#1e1b4b"
              progress-color="#fde047"
              track-color="#eab308"
              @play="engagementPlaying.stars = true"
              @pause="engagementPlaying.stars = false"
              @ended="engagementPlaying.stars = false"
            >
              <template #play-icon>
                <i class="fa-solid fa-play"></i>
              </template>
              <template #pause-icon>
                <i class="fa-solid fa-pause"></i>
              </template>
            </PlayableMiniPlayer>
            <button
              v-if="engagementPlaying.stars"
              class="reaction-badge reaction-badge--star"
              @click.stop="(e) => spawnReaction('fa-star', e)"
            ><i class="fa-solid fa-star"></i></button>
            <div class="floating-reactions">
              <i
                v-for="reaction in floatingReactions.filter(r => r.iconClass === 'fa-star')"
                :key="reaction.id"
                class="fa-solid fa-star floating-reaction floating-reaction--star"
                :style="{
                  '--start-x': reaction.startX + 'px',
                  '--drift': reaction.drift + 'px',
                  '--scale': reaction.scale,
                  '--rotation': reaction.rotation + 'deg',
                }"
              ></i>
            </div>
          </div>

          <!-- Halloween -->
          <div v-else-if="example.id === 'halloween'" class="halloween-wrapper">
            <PlayableMiniPlayer
              :recording-id="demoRecordingId"
              :size="56"
              :show-progress="false"
              hover="glow"
              @play="isHalloweenPlaying = true"
              @pause="isHalloweenPlaying = false"
              @ended="isHalloweenPlaying = false"
            >
              <template #play-icon>
                <i class="fa-solid fa-ghost"></i>
              </template>
              <template #pause-icon>
                <i class="fa-solid fa-skull"></i>
              </template>
            </PlayableMiniPlayer>
            <i class="fa-solid fa-bat halloween-bat"></i>
            <div class="halloween-ghosts" :class="{ 'is-playing': isHalloweenPlaying }">
              <i class="fa-solid fa-ghost halloween-ghost"></i>
              <i class="fa-solid fa-ghost halloween-ghost"></i>
              <i class="fa-solid fa-ghost halloween-ghost"></i>
              <i class="fa-solid fa-ghost halloween-ghost"></i>
              <i class="fa-solid fa-ghost halloween-ghost"></i>
            </div>
          </div>
          <!-- Christmas -->
          <div v-else-if="example.id === 'christmas'" class="christmas-wrapper">
            <span class="christmas-hat">🎅</span>
            <PlayableMiniPlayer
              :recording-id="demoRecordingId"
              :size="56"
              :show-progress="false"
              hover="scale"
            />
          </div>

          <!-- Christmas Tree (full custom button with snowfall) -->
          <div
            v-else-if="example.id === 'christmas-tree'"
            class="xmas-tree-wrapper"
            :class="{ 'is-playing': isChristmasTreePlaying }"
          >
            <div class="xmas-tree">
              <!-- Tree SVG -->
              <svg viewBox="0 0 80 100" class="tree-svg">
                <!-- Tree layers -->
                <polygon points="40,8 15,40 65,40" fill="#166534"/>
                <polygon points="40,22 8,60 72,60" fill="#15803d"/>
                <polygon points="40,38 2,85 78,85" fill="#14532d"/>
                <!-- Trunk -->
                <rect x="32" y="85" width="16" height="15" fill="#78350f"/>
                <!-- Star -->
                <polygon points="40,2 42,9 49,9 44,13 46,20 40,16 34,20 36,13 31,9 38,9" fill="#fbbf24" class="tree-star"/>
                <!-- Ornaments -->
                <circle cx="28" cy="50" r="5" fill="#ef4444" class="ornament"/>
                <circle cx="52" cy="45" r="5" fill="#3b82f6" class="ornament"/>
                <circle cx="35" cy="70" r="5" fill="#fbbf24" class="ornament"/>
                <circle cx="50" cy="68" r="5" fill="#ec4899" class="ornament"/>
                <circle cx="22" cy="75" r="4" fill="#8b5cf6" class="ornament"/>
                <circle cx="58" cy="72" r="4" fill="#14b8a6" class="ornament"/>
              </svg>

              <!-- Play/Pause button overlay -->
              <button
                class="tree-play-btn"
                @click="() => {
                  if (isChristmasTreePlaying) {
                    isChristmasTreePlaying = false
                    stopSnowfall()
                  } else {
                    isChristmasTreePlaying = true
                    startSnowfall()
                  }
                }"
              >
                <svg v-if="!isChristmasTreePlaying" viewBox="0 0 24 24" fill="white" width="20" height="20">
                  <path d="M8 5v14l11-7z"/>
                </svg>
                <svg v-else viewBox="0 0 24 24" fill="white" width="20" height="20">
                  <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
                </svg>
              </button>
            </div>

            <!-- Falling snowflakes -->
            <div class="snowflakes-container">
              <span
                v-for="flake in snowflakes"
                :key="flake.id"
                class="snowflake"
                :style="{
                  left: flake.x + '%',
                  fontSize: flake.size + 'px',
                  animationDuration: flake.duration + 's',
                  animationDelay: flake.delay + 's',
                  opacity: flake.opacity,
                }"
              >❄</span>
            </div>
          </div>

          <!-- 4th of July -->
          <div v-else-if="example.id === 'july4'" class="july4-wrapper">
            <PlayableMiniPlayer
              :recording-id="demoRecordingId"
              :size="56"
              :show-progress="false"
              hover="scale"
            />
            <div class="july4-stars">
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
            </div>
          </div>
          <!-- Valentine's Day -->
          <div v-else-if="example.id === 'valentine'" class="valentine-wrapper">
            <PlayableMiniPlayer
              :recording-id="demoRecordingId"
              :size="56"
              :show-progress="false"
              hover="scale"
            >
              <template #play-icon>
                <i class="fa-solid fa-heart"></i>
              </template>
              <template #pause-icon>
                <i class="fa-solid fa-heart-crack"></i>
              </template>
            </PlayableMiniPlayer>
            <div class="valentine-hearts">
              <i class="fa-solid fa-heart valentine-heart"></i>
              <i class="fa-solid fa-heart valentine-heart"></i>
              <i class="fa-solid fa-heart valentine-heart"></i>
              <i class="fa-solid fa-heart valentine-heart"></i>
            </div>
          </div>
          <!-- St. Patrick's Day -->
          <div v-else-if="example.id === 'stpatricks'" class="stpatricks-wrapper">
            <PlayableMiniPlayer
              :recording-id="demoRecordingId"
              :size="56"
              :show-progress="false"
              hover="scale"
            />
            <span class="stpatricks-clover">☘️</span>
          </div>

          <!-- Glassmorphism (rounded with rings animation) -->
          <PlayableMiniPlayer
            v-else-if="example.id === 'glassmorphism'"
            :recording-id="demoRecordingId"
            :size="52"
            visualization="rings"
            hover="scale"
            icon-color="#fff"
            progress-color="rgba(255,255,255,0.5)"
            border-radius="16px"
            class="glass-button"
          />

          <!-- Neumorphism (rounded with pulse animation) -->
          <PlayableMiniPlayer
            v-else-if="example.id === 'neumorphism'"
            :recording-id="demoRecordingId"
            :size="56"
            visualization="pulse"
            hover="none"
            bg-color="#e0e5ec"
            icon-color="#6b7280"
            progress-color="#e0e5ec"
            border-radius="16px"
            class="neumorph-button"
          />

          <!-- Neon Glow (circular - cyan progress) -->
          <PlayableMiniPlayer
            v-else-if="example.id === 'neon'"
            :recording-id="demoRecordingId"
            :size="52"
            hover="glow"
            icon-color="#0ff"
            progress-color="#0ff"
            border="2px solid #0ff"
            class="neon-button"
          />

          <!-- Minimal Outline (circular - gray progress) -->
          <PlayableMiniPlayer
            v-else-if="example.id === 'minimal-outline'"
            :recording-id="demoRecordingId"
            :size="44"
            hover="scale"
            icon-color="#374151"
            progress-color="#9ca3af"
            border="1.5px solid #d1d5db"
            class="minimal-button"
          />

          <!-- Gradient (rounded with rounded progress) -->
          <PlayableMiniPlayer
            v-else-if="example.id === 'gradient'"
            :recording-id="demoRecordingId"
            :size="52"
            visualization="ring"
            progress-shape="14"
            hover="lift"
            icon-color="#fff"
            progress-color="#fff"
            border-radius="14px"
            class="gradient-button"
          />

          <!-- Retro Pixel (square with square progress) -->
          <PlayableMiniPlayer
            v-else-if="example.id === 'retro'"
            :recording-id="demoRecordingId"
            :size="48"
            visualization="ring"
            progress-shape="square"
            hover="none"
            bg-color="#5c94fc"
            icon-color="#fff"
            progress-color="#9cb4fc"
            border-radius="0"
            border="4px solid #000"
            class="retro-button"
          />

          <!-- Organic Blob (SVG spline animation) -->
          <div
            v-else-if="example.id === 'organic'"
            class="svg-blob-wrapper"
          >
            <svg class="svg-blob" viewBox="0 0 72 72" width="72" height="72">
              <path :d="blobPath" fill="#84cc16" />
            </svg>
            <PlayableMiniPlayer
              :recording-id="demoRecordingId"
              :size="72"
              visualization="none"
              hover="none"
              bg-color="transparent"
              icon-color="#fff"
              class="svg-blob-button"
              @play="isOrganicPlaying = true"
              @pause="isOrganicPlaying = false"
              @ended="isOrganicPlaying = false"
            >
              <template #play-icon>
                <i class="fa-solid fa-play"></i>
              </template>
              <template #pause-icon>
                <i class="fa-solid fa-pause"></i>
              </template>
            </PlayableMiniPlayer>
          </div>

          <!-- Countdown Blob -->
          <div
            v-else-if="example.id === 'countdown-blob'"
            class="svg-blob-wrapper countdown-blob"
          >
            <svg class="svg-blob" viewBox="0 0 72 72" width="72" height="72">
              <path :d="countdownBlobPath" fill="#a855f7" />
            </svg>
            <PlayableMiniPlayer
              :recording-id="demoRecordingId"
              :size="72"
              visualization="none"
              hover="none"
              bg-color="transparent"
              icon-color="#fff"
              class="svg-blob-button"
              @play="isCountdownPlaying = true; countdownTimeRemaining = $event?.duration || countdownDuration; countdownDuration = $event?.duration || countdownDuration"
              @pause="isCountdownPlaying = false"
              @ended="isCountdownPlaying = false; countdownTimeRemaining = 0"
              @timeupdate="countdownTimeRemaining = $event.remaining; countdownDuration = $event.duration"
            >
              <template #play-icon>
                <i class="fa-solid fa-play"></i>
              </template>
              <template #pause-icon>
                <span class="countdown-timer">{{ formattedCountdown }}</span>
              </template>
            </PlayableMiniPlayer>
          </div>

          <!-- Flat Design (square with square progress) -->
          <PlayableMiniPlayer
            v-else-if="example.id === 'flat-design'"
            :recording-id="demoRecordingId"
            :size="52"
            visualization="ring"
            progress-shape="4"
            hover="none"
            bg-color="#2563eb"
            icon-color="#fff"
            progress-color="#93c5fd"
            border-radius="4px"
            class="flat-button"
          />

          <!-- Material Design (circular - white progress) -->
          <PlayableMiniPlayer
            v-else-if="example.id === 'material'"
            :recording-id="demoRecordingId"
            :size="56"
            hover="lift"
            bg-color="#6366f1"
            icon-color="#fff"
            progress-color="#fff"
            class="material-button"
          />

          <!-- Skeuomorphic (circular - gray progress) -->
          <PlayableMiniPlayer
            v-else-if="example.id === 'skeuomorphic'"
            :recording-id="demoRecordingId"
            :size="56"
            hover="none"
            icon-color="#333"
            progress-color="#666"
            class="skeuomorph-button"
          />

          <!-- Luxury Gold (circular - gold progress) -->
          <PlayableMiniPlayer
            v-else-if="example.id === 'luxury'"
            :recording-id="demoRecordingId"
            :size="56"
            hover="glow"
            bg-color="#1a1a1a"
            icon-color="#d4af37"
            progress-color="#d4af37"
            border="2px solid #d4af37"
            class="luxury-button"
          />

          <!-- Playful Bounce (blob with pulse animation) -->
          <PlayableMiniPlayer
            v-else-if="example.id === 'playful'"
            :recording-id="demoRecordingId"
            :size="60"
            visualization="pulse"
            hover="scale"
            bg-color="#f472b6"
            icon-color="#fff"
            progress-color="#f472b6"
            border="4px solid #fff"
            class="playful-button"
          />

          <!-- Corporate Clean (rounded with rounded progress) -->
          <PlayableMiniPlayer
            v-else-if="example.id === 'corporate'"
            :recording-id="demoRecordingId"
            :size="48"
            visualization="ring"
            progress-shape="8"
            hover="scale"
            bg-color="#1e3a5f"
            icon-color="#fff"
            progress-color="#60a5fa"
            border-radius="8px"
            class="corporate-button"
          />

          <!-- Hand-Drawn (irregular with pulse animation) -->
          <PlayableMiniPlayer
            v-else-if="example.id === 'hand-drawn'"
            :recording-id="demoRecordingId"
            :size="56"
            visualization="pulse"
            hover="scale"
            bg-color="#fef3c7"
            icon-color="#292524"
            progress-color="#fef3c7"
            border="2px dashed #292524"
            class="handdrawn-button"
          />

          <!-- 80s Synthwave (circular - magenta progress) -->
          <PlayableMiniPlayer
            v-else-if="example.id === 'synthwave'"
            :recording-id="demoRecordingId"
            :size="56"
            hover="glow"
            icon-color="#fff"
            progress-color="#ff00ff"
            border="2px solid #ff00ff"
            class="synthwave-button"
          />

          <!-- Y2K Aesthetic (rounded with rings animation) -->
          <PlayableMiniPlayer
            v-else-if="example.id === 'y2k'"
            :recording-id="demoRecordingId"
            :size="52"
            visualization="rings"
            hover="scale"
            icon-color="#fff"
            progress-color="rgba(192, 192, 255, 0.6)"
            border-radius="16px"
            border="2px solid rgba(255,255,255,0.8)"
            class="y2k-button"
          />

          <!-- Art Deco (rounded with rounded progress) -->
          <PlayableMiniPlayer
            v-else-if="example.id === 'art-deco'"
            :recording-id="demoRecordingId"
            :size="56"
            visualization="ring"
            progress-shape="8"
            hover="scale"
            bg-color="#1a1a2e"
            icon-color="#d4af37"
            progress-color="#d4af37"
            border-radius="8px"
            border="3px solid #d4af37"
            class="artdeco-button"
          />

          <!-- Monochrome (circular - white progress) -->
          <PlayableMiniPlayer
            v-else-if="example.id === 'monochrome'"
            :recording-id="demoRecordingId"
            :size="48"
            hover="scale"
            bg-color="#525252"
            icon-color="#fff"
            progress-color="#fff"
            class="mono-button"
          />

          <!-- High Contrast (circular - white progress) -->
          <PlayableMiniPlayer
            v-else-if="example.id === 'high-contrast'"
            :recording-id="demoRecordingId"
            :size="56"
            hover="none"
            bg-color="#000"
            icon-color="#fff"
            progress-color="#fff"
            border="4px solid #000"
            class="contrast-button"
          />

          <!-- Fallback for any new examples -->
          <PlayableMiniPlayer
            v-else
            :recording-id="demoRecordingId"
            :size="52"
            hover="scale"
            :bg-color="example.preview.bg"
            icon-color="#fff"
          />
        </div>

        <!-- Footer -->
        <div class="example-card__footer">
          <span class="example-card__title">{{ example.title }}</span>
          <button class="code-btn" @click="codeModalOpen = example.id">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="16 18 22 12 16 6"></polyline>
              <polyline points="8 6 2 12 8 18"></polyline>
            </svg>
            Code
          </button>
        </div>
      </div>
    </div>

    <!-- Code Modal -->
    <Teleport to="body">
      <div v-if="codeModalOpen" class="code-modal-overlay" @click.self="codeModalOpen = null">
        <div class="code-modal">
          <div class="code-modal__header">
            <span class="code-modal__title">{{ examples.find(e => e.id === codeModalOpen)?.title }}</span>
            <div class="code-modal__actions">
              <button
                class="copy-btn"
                :class="{ 'is-copied': isCopied(codeModalOpen) }"
                @click="copyCode(examples.find(e => e.id === codeModalOpen)?.code, codeModalOpen)"
              >
                {{ isCopied(codeModalOpen) ? 'Copied!' : 'Copy' }}
              </button>
              <button class="close-btn" @click="codeModalOpen = null">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
          </div>
          <pre class="code-modal__pre"><code v-html="highlightCode(examples.find(e => e.id === codeModalOpen)?.code || '')"></code></pre>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<style scoped>
.mini-examples__intro {
  font-size: 0.9375rem;
  color: var(--ff-muted);
  line-height: 1.7;
  margin: 0 0 var(--ff-space-lg);
}

/* Category Filter */
.category-filter {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: var(--ff-space-xl);
}

.category-chip {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 14px;
  font-size: 0.8125rem;
  font-weight: 500;
  border: 1px solid var(--ff-border);
  border-radius: 20px;
  background: var(--ff-bg);
  color: var(--ff-muted);
  cursor: pointer;
  transition: all 0.15s ease;
}

.category-chip:hover {
  border-color: var(--ff-text);
  color: var(--ff-text);
}

.category-chip.is-active {
  background: var(--ff-accent);
  border-color: var(--ff-accent);
  color: #fff;
}

.category-chip__count {
  font-size: 0.6875rem;
  font-weight: 600;
  padding: 2px 6px;
  border-radius: 10px;
  background: rgba(0, 0, 0, 0.1);
}

.category-chip.is-active .category-chip__count {
  background: rgba(255, 255, 255, 0.2);
}

.examples-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: var(--ff-space-md);
}

.example-card {
  background: var(--ff-bg);
  border: 1px solid var(--ff-border);
  border-radius: 12px;
  overflow: hidden;
}

.example-card__preview {
  height: 140px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.example-card__footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--ff-space-sm) var(--ff-space-md);
  border-top: 1px solid var(--ff-border);
  background: var(--ff-surface);
}

.example-card__title {
  font-size: 0.8125rem;
  font-weight: 600;
  color: var(--ff-text);
}

.code-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  font-size: 0.75rem;
  font-weight: 500;
  border: 1px solid var(--ff-border);
  border-radius: 6px;
  background: var(--ff-bg);
  color: var(--ff-muted);
  cursor: pointer;
  transition: all 0.15s ease;
}

.code-btn:hover {
  border-color: var(--ff-text);
  color: var(--ff-text);
}

/* Code Modal - global styles for teleported content */
:global(.code-modal-overlay) {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 24px;
}

:global(.code-modal) {
  background: #1e1e1e;
  border-radius: 12px;
  width: 100%;
  max-width: 700px;
  max-height: 80vh;
  display: flex;
  flex-direction: column;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.4);
}

:global(.code-modal__header) {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  border-bottom: 1px solid #333;
}

:global(.code-modal__title) {
  font-size: 1rem;
  font-weight: 600;
  color: #fff;
}

:global(.code-modal__actions) {
  display: flex;
  gap: 8px;
}

:global(.code-modal .copy-btn) {
  padding: 6px 12px;
  font-size: 0.75rem;
  font-weight: 500;
  border: none;
  border-radius: 6px;
  background: #333;
  color: #aaa;
  cursor: pointer;
  transition: all 0.15s ease;
}

:global(.code-modal .copy-btn:hover) {
  background: #444;
  color: #fff;
}

:global(.code-modal .copy-btn.is-copied) {
  background: #16a34a;
  color: #fff;
}

:global(.close-btn) {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border: none;
  border-radius: 6px;
  background: transparent;
  color: #888;
  cursor: pointer;
  transition: all 0.15s ease;
}

:global(.close-btn:hover) {
  background: #333;
  color: #fff;
}

:global(.code-modal__pre) {
  flex: 1;
  margin: 0;
  padding: 20px;
  overflow: auto;
  font-size: 0.8125rem;
  line-height: 1.6;
  font-family: 'Fira Code', 'SF Mono', monospace;
}

:global(.code-modal__pre code) {
  color: #d4d4d4;
}

/* Neo-Brutalist */
.brutalist-button :deep(.playable-mini) {
  box-shadow: 5px 5px 0 #000 !important;
}

.brutalist-button :deep(.playable-mini:hover) {
  transform: none !important;
  box-shadow: 5px 5px 0 #000 !important;
}

.brutalist-button :deep(.playable-mini:active) {
  transform: translate(3px, 3px) !important;
  box-shadow: 2px 2px 0 #000 !important;
}

/* Glassmorphism Button */
.glass-button :deep(.playable-mini) {
  background: rgba(255, 255, 255, 0.15) !important;
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  box-shadow:
    0 8px 32px rgba(0, 0, 0, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.3) !important;
}

/* Neumorphism Button */
.neumorph-button :deep(.playable-mini) {
  box-shadow:
    8px 8px 16px #b8bcc2,
    -8px -8px 16px #ffffff !important;
  border: none !important;
}
.neumorph-button :deep(.playable-mini:hover) {
  box-shadow:
    6px 6px 12px #b8bcc2,
    -6px -6px 12px #ffffff !important;
}
.neumorph-button :deep(.playable-mini:active) {
  box-shadow:
    inset 4px 4px 8px #b8bcc2,
    inset -4px -4px 8px #ffffff !important;
}

/* Neon Button */
.neon-button :deep(.playable-mini) {
  background: transparent !important;
  box-shadow:
    0 0 10px #0ff,
    0 0 20px #0ff,
    0 0 40px #0ff !important;
  animation: neon-pulse 2s ease-in-out infinite;
}

/* Minimal Button */
.minimal-button :deep(.playable-mini) {
  background: transparent !important;
}

/* Gradient Button */
.gradient-button :deep(.playable-mini) {
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%) !important;
  box-shadow: 0 4px 15px rgba(245, 87, 108, 0.4) !important;
  border: none !important;
}
.gradient-button :deep(.playable-mini:hover) {
  box-shadow: 0 6px 20px rgba(245, 87, 108, 0.5) !important;
}

/* Retro Button */
.retro-button :deep(.playable-mini) {
  box-shadow:
    4px 4px 0 #000,
    inset -4px -4px 0 #3c74dc,
    inset 4px 4px 0 #9cb4fc !important;
  image-rendering: pixelated;
}
.retro-button :deep(.playable-mini:active) {
  box-shadow:
    2px 2px 0 #000,
    inset 4px 4px 0 #3c74dc,
    inset -4px -4px 0 #9cb4fc !important;
  transform: translate(2px, 2px);
}

/* SVG Blob Animation */
.svg-blob-wrapper {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 72px;
  height: 72px;
}

.svg-blob {
  position: absolute;
  top: 0;
  left: 0;
  width: 72px;
  height: 72px;
  filter: drop-shadow(0 4px 12px rgba(132, 204, 22, 0.3));
  pointer-events: none;
}

.svg-blob-button :deep(.playable-mini__icon) i {
  font-size: 18px;
}

.svg-blob-button {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
}

.svg-blob-button :deep(.playable-mini-wrapper) {
  gap: 0 !important;
}

.svg-blob-button :deep(.playable-mini) {
  background: transparent !important;
  box-shadow: none !important;
  border: none !important;
}

.svg-blob-button :deep(.playable-mini:hover) {
  transform: none !important;
}

/* Countdown Blob - Purple SVG blob with countdown timer */
.countdown-blob .svg-blob {
  filter: drop-shadow(0 4px 12px rgba(168, 85, 247, 0.3));
}

.countdown-timer {
  font-size: 18px;
  font-weight: 600;
  font-variant-numeric: tabular-nums;
  letter-spacing: -0.5px;
}

/* Flat Button */
.flat-button :deep(.playable-mini) {
  box-shadow: none !important;
  border: none !important;
}
.flat-button :deep(.playable-mini:hover) {
  background: #1d4ed8 !important;
}
.flat-button :deep(.playable-mini:active) {
  background: #1e40af !important;
}

/* Material Button */
.material-button :deep(.playable-mini) {
  box-shadow:
    0 3px 5px -1px rgba(0,0,0,0.2),
    0 6px 10px 0 rgba(0,0,0,0.14),
    0 1px 18px 0 rgba(0,0,0,0.12) !important;
  border: none !important;
}
.material-button :deep(.playable-mini:hover) {
  box-shadow:
    0 5px 5px -3px rgba(0,0,0,0.2),
    0 8px 10px 1px rgba(0,0,0,0.14),
    0 3px 14px 2px rgba(0,0,0,0.12) !important;
}

/* Skeuomorphic Button */
.skeuomorph-button :deep(.playable-mini) {
  background: linear-gradient(180deg, #e8e8e8 0%, #c8c8c8 50%, #b8b8b8 51%, #d0d0d0 100%) !important;
  border: 1px solid #888 !important;
  box-shadow:
    0 1px 0 rgba(255,255,255,0.5) inset,
    0 -1px 0 rgba(0,0,0,0.1) inset,
    0 4px 8px rgba(0,0,0,0.3) !important;
}
.skeuomorph-button :deep(.playable-mini:active) {
  background: linear-gradient(180deg, #c0c0c0 0%, #a8a8a8 50%, #b0b0b0 51%, #c0c0c0 100%) !important;
  box-shadow:
    0 1px 0 rgba(0,0,0,0.1) inset,
    0 2px 4px rgba(0,0,0,0.2) !important;
}

/* Luxury Button */
.luxury-button :deep(.playable-mini) {
  box-shadow:
    0 0 15px rgba(212, 175, 55, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.1) !important;
}
.luxury-button :deep(.playable-mini:hover) {
  box-shadow:
    0 0 25px rgba(212, 175, 55, 0.5),
    inset 0 1px 0 rgba(255, 255, 255, 0.15) !important;
}

/* Playful Button */
.playful-button :deep(.playable-mini) {
  border-radius: 30% 70% 70% 30% / 30% 30% 70% 70% !important;
  box-shadow: 0 6px 0 #db2777 !important;
  transition: transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1) !important;
}
.playful-button :deep(.playable-mini:hover) {
  transform: scale(1.1) rotate(-3deg) !important;
}

/* Corporate Button */
.corporate-button :deep(.playable-mini) {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1) !important;
  border: none !important;
}
.corporate-button :deep(.playable-mini:hover) {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15) !important;
}

/* Hand-Drawn Button */
.handdrawn-button :deep(.playable-mini) {
  border-radius: 45% 55% 49% 51% / 55% 45% 55% 45% !important;
  transform: rotate(-2deg);
  box-shadow: 3px 3px 0 #292524 !important;
}
.handdrawn-button :deep(.playable-mini:hover) {
  transform: rotate(1deg) scale(1.05) !important;
}

/* Synthwave Button */
.synthwave-button :deep(.playable-mini) {
  background: linear-gradient(135deg, #ff00ff 0%, #00ffff 100%) !important;
  box-shadow:
    0 0 20px rgba(255, 0, 255, 0.5),
    0 0 40px rgba(0, 255, 255, 0.3) !important;
}
.synthwave-button :deep(.playable-mini:hover) {
  box-shadow:
    0 0 30px rgba(255, 0, 255, 0.7),
    0 0 60px rgba(0, 255, 255, 0.5) !important;
}

/* Y2K Button */
.y2k-button :deep(.playable-mini) {
  background: linear-gradient(135deg, #c0c0ff 0%, #ffc0ff 33%, #c0ffff 66%, #ffffc0 100%) !important;
  box-shadow:
    0 4px 15px rgba(192, 192, 255, 0.5),
    inset 0 2px 4px rgba(255, 255, 255, 0.8) !important;
  animation: y2k-shift 3s ease-in-out infinite;
}

@keyframes y2k-shift {
  0%, 100% { filter: hue-rotate(0deg); }
  50% { filter: hue-rotate(30deg); }
}

/* Art Deco Button */
.artdeco-button :deep(.playable-mini) {
  box-shadow:
    0 0 0 2px #1a1a2e,
    0 0 0 5px #d4af37,
    0 4px 12px rgba(0, 0, 0, 0.4) !important;
}
.artdeco-button :deep(.playable-mini:hover) {
  box-shadow:
    0 0 0 2px #1a1a2e,
    0 0 0 5px #d4af37,
    0 0 20px rgba(212, 175, 55, 0.4) !important;
}

/* Monochrome Button */
.mono-button :deep(.playable-mini) {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2) !important;
  border: none !important;
}
.mono-button :deep(.playable-mini:hover) {
  background: #404040 !important;
}

/* High Contrast Button */
.contrast-button :deep(.playable-mini) {
  box-shadow: none !important;
}
.contrast-button :deep(.playable-mini:hover) {
  background: #333 !important;
}

/* LEGACY: Glassmorphism Demo (keep for backwards compat) */
:deep(.demo-glassmorphism .demo-mini) {
  background: rgba(255, 255, 255, 0.15) !important;
  border-radius: 16px !important;
  border: 1px solid rgba(255, 255, 255, 0.3) !important;
  backdrop-filter: blur(12px);
  box-shadow:
    0 8px 32px rgba(0, 0, 0, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
}
:deep(.demo-glassmorphism .demo-mini__icon) {
  color: #fff;
}

/* Neumorphism */
:deep(.demo-neumorphism .demo-mini) {
  background: #e0e5ec !important;
  border-radius: 16px !important;
  border: none !important;
  box-shadow:
    8px 8px 16px #b8bcc2,
    -8px -8px 16px #ffffff;
}
:deep(.demo-neumorphism .demo-mini__icon) {
  color: #6b7280;
}

/* Neon */
:deep(.demo-neon .demo-mini) {
  background: transparent !important;
  border: 2px solid #0ff !important;
  box-shadow:
    0 0 10px #0ff,
    0 0 20px #0ff,
    0 0 40px #0ff;
  animation: neon-glow 2s ease-in-out infinite;
}
:deep(.demo-neon .demo-mini__icon) {
  color: #0ff;
}

@keyframes neon-glow {
  0%, 100% {
    box-shadow:
      0 0 10px #0ff,
      0 0 20px #0ff,
      0 0 40px #0ff;
  }
  50% {
    box-shadow:
      0 0 15px #0ff,
      0 0 30px #0ff,
      0 0 60px #0ff;
  }
}

/* Minimal Outline */
:deep(.demo-minimal-outline .demo-mini) {
  background: transparent !important;
  border: 1.5px solid #d1d5db !important;
  width: 44px !important;
  height: 44px !important;
}
:deep(.demo-minimal-outline .demo-mini__icon) {
  color: #374151;
}

/* Gradient */
:deep(.demo-gradient .demo-mini) {
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%) !important;
  border-radius: 14px !important;
  box-shadow: 0 4px 15px rgba(245, 87, 108, 0.4);
}
:deep(.demo-gradient .demo-mini__icon) {
  color: #fff;
}

/* Retro */
:deep(.demo-retro .demo-mini) {
  background: #5c94fc !important;
  border-radius: 0 !important;
  border: 4px solid #000 !important;
  box-shadow:
    4px 4px 0 #000,
    inset -4px -4px 0 #3c74dc,
    inset 4px 4px 0 #9cb4fc;
}
:deep(.demo-retro .demo-mini__icon) {
  color: #fff;
}

/* Organic */
:deep(.demo-organic .demo-mini) {
  background: #84cc16 !important;
  border-radius: 60% 40% 50% 50% / 50% 60% 40% 50% !important;
  box-shadow: 0 4px 12px rgba(132, 204, 22, 0.3);
  transition: border-radius 0.4s ease;
}
:deep(.demo-organic .demo-mini:hover) {
  border-radius: 40% 60% 50% 50% / 50% 40% 60% 50% !important;
}
:deep(.demo-organic .demo-mini__icon) {
  color: #fff;
}

/* Nuclear Launch */
.nuclear-wrapper {
  position: relative;
  width: 100px;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Hazard stripes - Rust style */
.nuclear-stripes {
  position: absolute;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: repeating-conic-gradient(
    #facc15 0deg 30deg,
    #1a1a1a 30deg 60deg
  );
  border: 3px solid #0a0a0a;
}

/* Spin animation when playing */
.nuclear-stripes.is-spinning {
  animation: nuclear-spin 8s linear infinite;
}

@keyframes nuclear-spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

/* Red button */
.nuclear-button :deep(.playable-mini) {
  background: linear-gradient(180deg, #ef4444 0%, #dc2626 50%, #991b1b 100%) !important;
  border: none !important;
  box-shadow:
    0 6px 0 #7f1d1d,
    0 8px 0 #581c1c,
    0 12px 20px rgba(0, 0, 0, 0.6);
  transition: transform 0.06s ease, box-shadow 0.06s ease;
}

.nuclear-button :deep(.playable-mini:hover) {
  background: linear-gradient(180deg, #f87171 0%, #ef4444 50%, #b91c1c 100%) !important;
  box-shadow:
    0 6px 0 #7f1d1d,
    0 8px 0 #581c1c,
    0 12px 20px rgba(0, 0, 0, 0.6);
}

.nuclear-button :deep(.playable-mini:hover .playable-mini__icon) {
  color: #facc15 !important;
}

.nuclear-button :deep(.playable-mini:active) {
  transform: translateY(6px);
  box-shadow:
    0 1px 0 #7f1d1d,
    0 2px 0 #581c1c,
    0 4px 8px rgba(0, 0, 0, 0.4);
}

.nuclear-button :deep(.playable-mini__icon) {
  color: #fff;
  font-size: 20px;
  transition: color 0.15s ease;
}

/* Yellow progress ring */
.nuclear-button :deep(.playable-mini__progress-track) {
  stroke: rgba(250, 204, 21, 0.3) !important;
}

.nuclear-button :deep(.playable-mini__progress-fill) {
  stroke: #facc15 !important;
}

/* Badge Examples */
.badge-wrapper {
  position: relative;
  display: inline-block;
}

.badge-wrapper--column {
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

/* Notification Badge */
.notification-badge {
  position: absolute;
  top: -4px;
  right: -4px;
  min-width: 20px;
  height: 20px;
  padding: 0 6px;
  background: #ef4444;
  color: #fff;
  font-size: 11px;
  font-weight: 700;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid #fff;
  box-shadow: 0 2px 4px rgba(0,0,0,0.15);
}

/* Live Badge */
.live-badge-wrapper :deep(.playable-mini) {
  background: #18181b !important;
  border: 2px solid #ef4444 !important;
}

.live-badge-wrapper :deep(.playable-mini__icon) {
  color: #ef4444;
}

.live-badge {
  display: flex;
  align-items: center;
  gap: 6px;
  background: #ef4444;
  color: #fff;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.5px;
  padding: 4px 10px;
  border-radius: 4px;
}

.live-dot {
  width: 6px;
  height: 6px;
  background: #fff;
  border-radius: 50%;
  animation: live-pulse 1.5s ease-in-out infinite;
}

@keyframes live-pulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.5; transform: scale(0.8); }
}

/* Duration Badge */
.duration-badge {
  position: absolute;
  bottom: -6px;
  left: 50%;
  transform: translateX(-50%);
  background: #1e1b4b;
  color: #fff;
  font-size: 10px;
  font-weight: 600;
  font-family: 'SF Mono', monospace;
  padding: 2px 8px;
  border-radius: 8px;
  white-space: nowrap;
}

/* Verified Badge */
.verified-badge {
  position: absolute;
  bottom: -2px;
  right: -2px;
  width: 20px;
  height: 20px;
  background: #fff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.verified-badge i {
  font-size: 10px;
  color: #0ea5e9;
}

/* ========== ENGAGEMENT REACTIONS ========== */
/* Reaction badge - clickable icon at top right, only visible when playing */
.reaction-badge {
  position: absolute;
  top: -8px;
  right: -8px;
  width: 26px;
  height: 26px;
  border-radius: 50%;
  background: #fff;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
  z-index: 5;
  transition: transform 0.15s ease, box-shadow 0.15s ease;
  animation: badge-appear 0.2s ease-out;
}

@keyframes badge-appear {
  0% { transform: scale(0); opacity: 0; }
  50% { transform: scale(1.2); }
  100% { transform: scale(1); opacity: 1; }
}

.reaction-badge:hover {
  transform: scale(1.2);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);
}

.reaction-badge:active {
  transform: scale(0.9);
}

/* Heart badge */
.reaction-badge--heart {
  color: #ec4899;
}

/* Fire badge */
.reaction-badge--fire {
  color: #f97316;
}

/* Star badge */
.reaction-badge--star {
  color: #eab308;
}

.floating-reactions {
  position: absolute;
  inset: 0;
  pointer-events: none;
  overflow: visible;
  z-index: 10;
}

.floating-reaction {
  position: absolute;
  bottom: 50%;
  left: 50%;
  font-size: 20px;
  animation: float-up 1.5s ease-out forwards;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3));
  will-change: transform, opacity;
}

/* Heart floating icons */
.floating-reaction--heart {
  color: #ec4899;
}

/* Fire floating icons */
.floating-reaction--fire {
  color: #f97316;
  animation: fire-rise 1.2s ease-out forwards;
}

/* Star floating icons */
.floating-reaction--star {
  color: #eab308;
  animation: star-float 1s ease-out forwards;
}

@keyframes float-up {
  0% {
    opacity: 1;
    transform: translate(calc(-50% + var(--start-x, 0px)), 0) scale(0.3);
  }
  20% {
    opacity: 1;
    transform: translate(calc(-50% + var(--start-x, 0px)), -20px) scale(var(--scale, 1));
  }
  100% {
    opacity: 0;
    transform: translate(calc(-50% + var(--start-x, 0px) + var(--drift, 0px)), -120px) scale(var(--scale, 1)) rotate(var(--rotation, 0deg));
  }
}

@keyframes fire-rise {
  0% {
    opacity: 1;
    transform: translate(calc(-50% + var(--start-x, 0px)), 0) scale(0.3) rotate(0deg);
  }
  30% {
    opacity: 1;
    transform: translate(calc(-50% + var(--start-x, 0px) + var(--drift, 0px) * 0.3), -30px) scale(var(--scale, 1)) rotate(calc(var(--rotation, 0deg) * 0.5));
  }
  60% {
    opacity: 1;
    transform: translate(calc(-50% + var(--start-x, 0px) + var(--drift, 0px) * 0.8), -60px) scale(calc(var(--scale, 1) * 1.1)) rotate(var(--rotation, 0deg));
  }
  100% {
    opacity: 0;
    transform: translate(calc(-50% + var(--start-x, 0px) + var(--drift, 0px)), -100px) scale(calc(var(--scale, 1) * 0.8)) rotate(calc(var(--rotation, 0deg) * 1.5));
  }
}

@keyframes star-float {
  0% {
    opacity: 1;
    transform: translate(calc(-50% + var(--start-x, 0px)), 0) scale(0) rotate(0deg);
  }
  30% {
    opacity: 1;
    transform: translate(calc(-50% + var(--start-x, 0px)), -25px) scale(var(--scale, 1)) rotate(180deg);
  }
  100% {
    opacity: 0;
    transform: translate(calc(-50% + var(--start-x, 0px) + var(--drift, 0px)), -90px) scale(calc(var(--scale, 1) * 0.7)) rotate(360deg);
  }
}


/* Halloween */
.halloween-wrapper {
  position: relative;
  display: inline-block;
}

.halloween-wrapper :deep(.playable-mini) {
  background: #f97316 !important;
  border: 3px solid #000 !important;
  box-shadow: 0 0 20px rgba(249, 115, 22, 0.5), 0 0 40px rgba(249, 115, 22, 0.3);
}

.halloween-wrapper :deep(.playable-mini__icon) {
  color: #000;
}

.halloween-bat {
  position: absolute;
  top: -12px;
  right: -8px;
  font-size: 20px;
  color: #000;
  animation: bat-float 2s ease-in-out infinite;
}

@keyframes bat-float {
  0%, 100% { transform: translateY(0) rotate(-5deg); }
  50% { transform: translateY(-4px) rotate(5deg); }
}

.halloween-ghosts {
  position: absolute;
  inset: 0;
  pointer-events: none;
  overflow: visible;
}

.halloween-ghost {
  position: absolute;
  color: rgba(255, 255, 255, 0.9);
  font-size: 16px;
  opacity: 0;
  text-shadow: 0 0 10px rgba(249, 115, 22, 0.8);
}

.halloween-ghost:nth-child(1) { left: 50%; top: 50%; }
.halloween-ghost:nth-child(2) { left: 25%; top: 50%; }
.halloween-ghost:nth-child(3) { left: 75%; top: 50%; }
.halloween-ghost:nth-child(4) { left: 10%; top: 50%; }
.halloween-ghost:nth-child(5) { left: 90%; top: 50%; }

.halloween-ghosts.is-playing .halloween-ghost {
  animation: ghost-fly 2.5s ease-out infinite;
}

.halloween-ghosts.is-playing .halloween-ghost:nth-child(1) { animation-delay: 0s; }
.halloween-ghosts.is-playing .halloween-ghost:nth-child(2) { animation-delay: 0.4s; }
.halloween-ghosts.is-playing .halloween-ghost:nth-child(3) { animation-delay: 0.8s; }
.halloween-ghosts.is-playing .halloween-ghost:nth-child(4) { animation-delay: 1.2s; }
.halloween-ghosts.is-playing .halloween-ghost:nth-child(5) { animation-delay: 1.6s; }

@keyframes ghost-fly {
  0% {
    opacity: 0;
    transform: translateY(0) translateX(-50%) scale(0.3);
  }
  10% {
    opacity: 1;
    transform: translateY(-15px) translateX(-50%) scale(1);
  }
  60% {
    opacity: 0.7;
    transform: translateY(-80px) translateX(calc(-50% + 15px)) scale(0.9);
  }
  100% {
    opacity: 0;
    transform: translateY(-140px) translateX(calc(-50% - 10px)) scale(0.5);
  }
}

/* Christmas */
.christmas-wrapper {
  position: relative;
  display: inline-block;
}

.christmas-wrapper :deep(.playable-mini) {
  background: linear-gradient(135deg, #dc2626 0%, #991b1b 100%) !important;
  border: 3px solid #166534 !important;
  box-shadow: 0 4px 12px rgba(220, 38, 38, 0.3);
}

.christmas-wrapper :deep(.playable-mini__icon) {
  color: #fff;
}

.christmas-hat {
  position: absolute;
  top: -20px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 32px;
  filter: drop-shadow(0 2px 2px rgba(0,0,0,0.2));
}

/* Christmas Tree - Full custom button with snowfall */
.xmas-tree-wrapper {
  position: relative;
  display: inline-block;
  padding: 20px 10px;
}

.xmas-tree {
  position: relative;
  width: 80px;
  height: 100px;
  cursor: pointer;
}

.tree-svg {
  width: 100%;
  height: 100%;
  filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3));
}

.tree-star {
  animation: star-twinkle 1.5s ease-in-out infinite;
}

@keyframes star-twinkle {
  0%, 100% { opacity: 1; transform-origin: 40px 11px; transform: scale(1); }
  50% { opacity: 0.7; transform: scale(0.9); }
}

.ornament {
  filter: drop-shadow(0 1px 2px rgba(0,0,0,0.3));
}

.xmas-tree-wrapper.is-playing .ornament {
  animation: ornament-glow 1s ease-in-out infinite alternate;
}

@keyframes ornament-glow {
  0% { filter: drop-shadow(0 1px 2px rgba(0,0,0,0.3)) drop-shadow(0 0 3px currentColor); }
  100% { filter: drop-shadow(0 1px 2px rgba(0,0,0,0.3)) drop-shadow(0 0 8px currentColor); }
}

.tree-play-btn {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.6);
  border: 2px solid rgba(255, 255, 255, 0.8);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  backdrop-filter: blur(4px);
}

.tree-play-btn:hover {
  background: rgba(0, 0, 0, 0.8);
  transform: translate(-50%, -50%) scale(1.1);
  box-shadow: 0 0 20px rgba(255, 255, 255, 0.3);
}

.tree-play-btn svg {
  margin-left: 2px; /* Center play icon visually */
}

.xmas-tree-wrapper.is-playing .tree-play-btn svg {
  margin-left: 0;
}

/* Snowflakes */
.snowflakes-container {
  position: absolute;
  top: 0;
  left: -20px;
  right: -20px;
  bottom: 0;
  pointer-events: none;
  overflow: hidden;
}

.snowflake {
  position: absolute;
  top: -20px;
  color: #fff;
  text-shadow: 0 0 5px rgba(255, 255, 255, 0.8);
  animation: snow-fall linear forwards;
  will-change: transform;
}

@keyframes snow-fall {
  0% {
    transform: translateY(0) rotate(0deg);
    opacity: var(--opacity, 1);
  }
  100% {
    transform: translateY(140px) rotate(360deg);
    opacity: 0;
  }
}

/* 4th of July */
.july4-wrapper {
  position: relative;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
}

.july4-wrapper :deep(.playable-mini) {
  background: linear-gradient(180deg, #dc2626 0%, #dc2626 33%, #fff 33%, #fff 66%, #1d4ed8 66%, #1d4ed8 100%) !important;
  border: 2px solid #1e3a5f !important;
}

.july4-wrapper :deep(.playable-mini__icon) {
  color: #1e3a5f;
  text-shadow: 0 0 4px #fff;
}

.july4-stars {
  display: flex;
  gap: 4px;
  color: #facc15;
  font-size: 10px;
}

/* Valentine's Day */
.valentine-wrapper {
  position: relative;
  display: inline-block;
}

.valentine-wrapper :deep(.playable-mini) {
  background: linear-gradient(135deg, #ec4899 0%, #db2777 100%) !important;
  border-radius: 50% !important;
  box-shadow: 0 4px 15px rgba(236, 72, 153, 0.4);
}

.valentine-wrapper :deep(.playable-mini__icon) {
  color: #fff;
}

.valentine-hearts {
  position: absolute;
  inset: -8px;
  pointer-events: none;
}

.valentine-heart {
  position: absolute;
  color: #fda4af;
  font-size: 12px;
  animation: heart-float 3s ease-in-out infinite;
}

.valentine-heart:nth-child(1) { top: 0; left: 10%; animation-delay: 0s; }
.valentine-heart:nth-child(2) { top: 20%; right: -5px; animation-delay: 0.5s; }
.valentine-heart:nth-child(3) { bottom: 0; right: 15%; animation-delay: 1s; }
.valentine-heart:nth-child(4) { bottom: 20%; left: -5px; animation-delay: 1.5s; }

@keyframes heart-float {
  0%, 100% { transform: scale(1) translateY(0); opacity: 0.7; }
  50% { transform: scale(1.2) translateY(-3px); opacity: 1; }
}

/* St. Patrick's Day */
.stpatricks-wrapper {
  position: relative;
  display: inline-block;
}

.stpatricks-wrapper :deep(.playable-mini) {
  background: #16a34a !important;
  border: 3px solid #166534 !important;
  box-shadow: 0 4px 12px rgba(22, 163, 74, 0.4);
}

.stpatricks-wrapper :deep(.playable-mini__icon) {
  color: #fff;
}

.stpatricks-clover {
  position: absolute;
  top: -8px;
  right: -8px;
  font-size: 20px;
  color: #22c55e;
  filter: drop-shadow(0 2px 2px rgba(0,0,0,0.2));
}

/* ========== NEW DESIGN MOVEMENT DEMOS ========== */

/* Flat Design */
:deep(.demo-flat-design .demo-mini) {
  background: #2563eb !important;
  border-radius: 4px !important;
  border: none !important;
  box-shadow: none !important;
}
:deep(.demo-flat-design .demo-mini__icon) {
  color: #fff;
}

/* Material Design */
:deep(.demo-material .demo-mini) {
  background: #6366f1 !important;
  border-radius: 50% !important;
  box-shadow:
    0 3px 5px -1px rgba(0,0,0,0.2),
    0 6px 10px 0 rgba(0,0,0,0.14),
    0 1px 18px 0 rgba(0,0,0,0.12);
}
:deep(.demo-material .demo-mini__icon) {
  color: #fff;
}

/* Skeuomorphic */
:deep(.demo-skeuomorphic .demo-mini) {
  background: linear-gradient(180deg, #e8e8e8 0%, #c8c8c8 50%, #b8b8b8 51%, #d0d0d0 100%) !important;
  border: 1px solid #888 !important;
  box-shadow:
    0 1px 0 rgba(255,255,255,0.5) inset,
    0 -1px 0 rgba(0,0,0,0.1) inset,
    0 4px 8px rgba(0,0,0,0.3);
}
:deep(.demo-skeuomorphic .demo-mini__icon) {
  color: #333;
}

/* ========== NEW VIBE DEMOS ========== */

/* Luxury */
:deep(.demo-luxury .demo-mini) {
  background: #1a1a1a !important;
  border: 2px solid #d4af37 !important;
  box-shadow: 0 0 15px rgba(212, 175, 55, 0.3);
}
:deep(.demo-luxury .demo-mini__icon) {
  color: #d4af37;
}

/* Playful */
:deep(.demo-playful .demo-mini) {
  background: #f472b6 !important;
  border-radius: 30% 70% 70% 30% / 30% 30% 70% 70% !important;
  border: 4px solid #fff !important;
  box-shadow: 0 6px 0 #db2777;
}
:deep(.demo-playful .demo-mini__icon) {
  color: #fff;
}

/* Corporate */
:deep(.demo-corporate .demo-mini) {
  background: #1e3a5f !important;
  border-radius: 8px !important;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
:deep(.demo-corporate .demo-mini__icon) {
  color: #fff;
}

/* Hand-drawn */
:deep(.demo-hand-drawn .demo-mini) {
  background: #fef3c7 !important;
  border-radius: 45% 55% 49% 51% / 55% 45% 55% 45% !important;
  border: 2px dashed #292524 !important;
  transform: rotate(-2deg);
  box-shadow: 3px 3px 0 #292524;
}
:deep(.demo-hand-drawn .demo-mini__icon) {
  color: #292524;
}

/* ========== NEW ERA DEMOS ========== */

/* Synthwave */
:deep(.demo-synthwave .demo-mini) {
  background: linear-gradient(135deg, #ff00ff 0%, #00ffff 100%) !important;
  border: 2px solid #ff00ff !important;
  box-shadow:
    0 0 20px rgba(255, 0, 255, 0.5),
    0 0 40px rgba(0, 255, 255, 0.3);
}
:deep(.demo-synthwave .demo-mini__icon) {
  color: #fff;
}

/* Y2K */
:deep(.demo-y2k .demo-mini) {
  background: linear-gradient(135deg, #c0c0ff 0%, #ffc0ff 33%, #c0ffff 66%, #ffffc0 100%) !important;
  border-radius: 16px !important;
  border: 2px solid rgba(255,255,255,0.8) !important;
  box-shadow:
    0 4px 15px rgba(192, 192, 255, 0.5),
    inset 0 2px 4px rgba(255, 255, 255, 0.8);
  animation: y2k-demo-shift 3s ease-in-out infinite;
}
:deep(.demo-y2k .demo-mini__icon) {
  color: #fff;
}

@keyframes y2k-demo-shift {
  0%, 100% { filter: hue-rotate(0deg); }
  50% { filter: hue-rotate(30deg); }
}

/* Art Deco */
:deep(.demo-art-deco .demo-mini) {
  background: #1a1a2e !important;
  border-radius: 8px !important;
  border: 3px solid #d4af37 !important;
  box-shadow:
    0 0 0 2px #1a1a2e,
    0 0 0 5px #d4af37,
    0 4px 12px rgba(0, 0, 0, 0.4);
}
:deep(.demo-art-deco .demo-mini__icon) {
  color: #d4af37;
}

/* ========== NEW FUNCTIONAL DEMOS ========== */

/* Monochrome */
:deep(.demo-monochrome .demo-mini) {
  background: #525252 !important;
  border-radius: 50% !important;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}
:deep(.demo-monochrome .demo-mini__icon) {
  color: #fff;
}

/* High Contrast */
:deep(.demo-high-contrast .demo-mini) {
  background: #000 !important;
  border-radius: 50% !important;
  border: 4px solid #000 !important;
}
:deep(.demo-high-contrast .demo-mini__icon) {
  color: #fff;
}
</style>
