<script setup>
/**
 * IsolatedMiniPlayer - A standalone mini player for inspiration gallery
 * This component is completely independent from the playground/brandStore
 * All styling is controlled via props - no store dependencies
 */
const props = defineProps({
  buttonColor: {
    type: String,
    default: '#c4956a'
  },
  iconColor: {
    type: String,
    default: '#ffffff'
  },
  borderRadius: {
    type: String,
    default: '50%'
  },
  size: {
    type: String,
    default: '48px'
  },
  isPlaying: {
    type: Boolean,
    default: false
  },
  showProgress: {
    type: Boolean,
    default: false
  },
  progress: {
    type: Number,
    default: 0
  }
})

const miniStyle = {
  background: props.buttonColor,
  borderRadius: props.borderRadius,
  width: props.size,
  height: props.size,
}

const iconStyle = {
  color: props.iconColor,
  fill: props.iconColor,
}

const progressDegrees = props.progress * 360

const progressFillStyle = {
  background: `conic-gradient(${props.buttonColor} ${progressDegrees}deg, transparent ${progressDegrees}deg)`,
}
</script>

<template>
  <div class="player-mini-isolated" :style="miniStyle">
    <!-- Progress Ring -->
    <div class="player-mini-isolated__progress-ring" v-if="showProgress">
      <div class="player-mini-isolated__progress-track"></div>
      <div class="player-mini-isolated__progress-fill" :style="progressFillStyle"></div>
    </div>

    <!-- Play Icon (shown when not playing) -->
    <template v-if="!isPlaying">
      <svg class="player-mini-isolated__icon" viewBox="0 0 24 24" :style="iconStyle">
        <path d="M8 5v14l11-7z" fill="currentColor"/>
      </svg>
    </template>

    <!-- Pause Icon (shown when playing) -->
    <template v-else>
      <svg class="player-mini-isolated__icon" viewBox="0 0 24 24" :style="iconStyle">
        <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" fill="currentColor"/>
      </svg>
    </template>
  </div>
</template>

<style scoped>
.player-mini-isolated {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: transform 0.15s ease, box-shadow 0.15s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

.player-mini-isolated:hover {
  transform: scale(1.05);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.player-mini-isolated__icon {
  width: 40%;
  height: 40%;
  transition: transform 0.15s ease;
}

/* Progress Ring */
.player-mini-isolated__progress-ring {
  position: absolute;
  inset: -4px;
  border-radius: inherit;
}

.player-mini-isolated__progress-track {
  position: absolute;
  inset: 0;
  border-radius: inherit;
  border: 3px solid rgba(255, 255, 255, 0.2);
}

.player-mini-isolated__progress-fill {
  position: absolute;
  inset: 0;
  border-radius: inherit;
  mask:
    linear-gradient(#fff 0 0) content-box,
    linear-gradient(#fff 0 0);
  mask-composite: exclude;
  padding: 3px;
}
</style>
