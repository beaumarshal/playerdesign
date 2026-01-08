<script setup>
import DemoMiniPlayer from '@/components/examples/DemoMiniPlayer.vue'
import { useCodeCopy } from '@/composables/useCodeCopy'
import { useSyntaxHighlight } from '@/composables/useSyntaxHighlight'

const { copyCode, isCopied } = useCodeCopy()
const { highlightCode } = useSyntaxHighlight()

const codeSnippets = {
  rid: `<fortyfour-player-mini recording-id="rec_abc123"></fortyfour-player-mini>`,
  visualization: `<!-- Progress ring around button -->
<fortyfour-player-mini
  recording-id="rec_abc123"
  visualization="ring"
></fortyfour-player-mini>

<!-- Pulsing animation while playing -->
<fortyfour-player-mini
  recording-id="rec_abc123"
  visualization="pulse"
></fortyfour-player-mini>

<!-- Expanding rings animation -->
<fortyfour-player-mini
  recording-id="rec_abc123"
  visualization="rings"
></fortyfour-player-mini>`,
  autoplay: `<fortyfour-player-mini
  recording-id="rec_abc123"
  autoplay
></fortyfour-player-mini>`,
  disabled: `<fortyfour-player-mini
  recording-id="rec_abc123"
  disabled
></fortyfour-player-mini>`,
  loop: `<fortyfour-player-mini
  recording-id="rec_abc123"
  loop
></fortyfour-player-mini>`,
  playbackRate: `<fortyfour-player-mini
  recording-id="rec_abc123"
  playback-rate="1.5"
></fortyfour-player-mini>`,
  preload: `<!-- Don't load anything until play -->
<fortyfour-player-mini
  recording-id="rec_abc123"
  preload="none"
></fortyfour-player-mini>

<!-- Load metadata only (duration, etc.) -->
<fortyfour-player-mini
  recording-id="rec_abc123"
  preload="metadata"
></fortyfour-player-mini>

<!-- Preload entire audio file -->
<fortyfour-player-mini
  recording-id="rec_abc123"
  preload="auto"
></fortyfour-player-mini>`,
  showDuration: `<fortyfour-player-mini
  recording-id="rec_abc123"
  show-duration
></fortyfour-player-mini>`,
  muted: `<!-- Useful for autoplay (browsers allow muted autoplay) -->
<fortyfour-player-mini
  recording-id="rec_abc123"
  autoplay
  muted
></fortyfour-player-mini>`,
  analyticsId: `<fortyfour-player-mini
  recording-id="rec_abc123"
  analytics-id="homepage-hero-cta"
></fortyfour-player-mini>`,
  hover: `<!-- Disable hover effect -->
<fortyfour-player-mini
  recording-id="rec_abc123"
  hover="none"
></fortyfour-player-mini>

<!-- Scale up on hover (default) -->
<fortyfour-player-mini
  recording-id="rec_abc123"
  hover="scale"
></fortyfour-player-mini>

<!-- Glow effect on hover -->
<fortyfour-player-mini
  recording-id="rec_abc123"
  hover="glow"
></fortyfour-player-mini>

<!-- Lift with shadow on hover -->
<fortyfour-player-mini
  recording-id="rec_abc123"
  hover="lift"
></fortyfour-player-mini>`,
  variant: `<!-- Solid background (default) -->
<fortyfour-player-mini
  recording-id="rec_abc123"
  variant="solid"
></fortyfour-player-mini>

<!-- Ghost/outlined style -->
<fortyfour-player-mini
  recording-id="rec_abc123"
  variant="ghost"
></fortyfour-player-mini>

<!-- Soft/muted background -->
<fortyfour-player-mini
  recording-id="rec_abc123"
  variant="soft"
></fortyfour-player-mini>`,
}
</script>

<template>
  <div class="mini-attrs">
    <p class="mini-attrs__intro">
      Configure player behavior and appearance through HTML attributes.
    </p>

    <!-- Recording ID -->
    <div class="attr-example">
      <div class="attr-example__header">
        <code class="attr-example__name">recording-id</code>
        <span class="attr-example__badge attr-example__badge--required">Required</span>
      </div>
      <p class="attr-example__desc">The unique identifier for your audio recording from 44.audio</p>
      <div class="docs-code-block">
        <div class="docs-code-block__header">
          <span class="docs-code-block__label">HTML</span>
          <button
            class="docs-code-block__copy"
            :class="{ 'is-copied': isCopied('rid') }"
            @click="copyCode(codeSnippets.rid, 'rid')"
          >
            {{ isCopied('rid') ? 'Copied!' : 'Copy' }}
          </button>
        </div>
        <pre class="docs-code-block__pre"><code v-html="highlightCode(codeSnippets.rid)"></code></pre>
      </div>
    </div>

    <!-- Visualization -->
    <div class="attr-example">
      <div class="attr-example__header">
        <code class="attr-example__name">visualization</code>
        <span class="attr-example__badge">Optional</span>
      </div>
      <p class="attr-example__desc">Visual feedback style during playback. Options: <code>none</code>, <code>ring</code>, <code>pulse</code>, <code>rings</code></p>
      <div class="attr-example__demos attr-example__demos--wrap">
        <div class="attr-demo">
          <div class="attr-demo__preview">
            <DemoMiniPlayer />
          </div>
          <div class="attr-demo__label">
            <code>none</code>
            <span>No visualization</span>
          </div>
        </div>
        <div class="attr-demo">
          <div class="attr-demo__preview">
            <DemoMiniPlayer :showProgress="true" :progress="0.65" />
          </div>
          <div class="attr-demo__label">
            <code>ring</code>
            <span>Progress ring</span>
          </div>
        </div>
        <div class="attr-demo">
          <div class="attr-demo__preview">
            <DemoMiniPlayer :isPlaying="true" class="demo-pulse" />
          </div>
          <div class="attr-demo__label">
            <code>pulse</code>
            <span>Pulsing glow</span>
          </div>
        </div>
        <div class="attr-demo">
          <div class="attr-demo__preview">
            <DemoMiniPlayer :isPlaying="true" :showRipple="true" />
          </div>
          <div class="attr-demo__label">
            <code>rings</code>
            <span>Expanding rings</span>
          </div>
        </div>
      </div>
      <div class="docs-code-block">
        <div class="docs-code-block__header">
          <span class="docs-code-block__label">HTML</span>
          <button
            class="docs-code-block__copy"
            :class="{ 'is-copied': isCopied('visualization') }"
            @click="copyCode(codeSnippets.visualization, 'visualization')"
          >
            {{ isCopied('visualization') ? 'Copied!' : 'Copy' }}
          </button>
        </div>
        <pre class="docs-code-block__pre"><code v-html="highlightCode(codeSnippets.visualization)"></code></pre>
      </div>
    </div>

    <!-- Hover -->
    <div class="attr-example">
      <div class="attr-example__header">
        <code class="attr-example__name">hover</code>
        <span class="attr-example__badge">Optional</span>
      </div>
      <p class="attr-example__desc">Hover interaction style. Options: <code>none</code>, <code>scale</code> (default), <code>glow</code>, <code>lift</code></p>
      <div class="attr-example__demos attr-example__demos--wrap">
        <div class="attr-demo">
          <div class="attr-demo__preview">
            <DemoMiniPlayer hover="none" />
          </div>
          <div class="attr-demo__label">
            <code>none</code>
            <span>No effect</span>
          </div>
        </div>
        <div class="attr-demo">
          <div class="attr-demo__preview">
            <DemoMiniPlayer hover="scale" />
          </div>
          <div class="attr-demo__label">
            <code>scale</code>
            <span>Scale up (default)</span>
          </div>
        </div>
        <div class="attr-demo">
          <div class="attr-demo__preview">
            <DemoMiniPlayer hover="glow" />
          </div>
          <div class="attr-demo__label">
            <code>glow</code>
            <span>Glow effect</span>
          </div>
        </div>
        <div class="attr-demo">
          <div class="attr-demo__preview">
            <DemoMiniPlayer hover="lift" />
          </div>
          <div class="attr-demo__label">
            <code>lift</code>
            <span>Lift with shadow</span>
          </div>
        </div>
      </div>
      <div class="docs-code-block">
        <div class="docs-code-block__header">
          <span class="docs-code-block__label">HTML</span>
          <button
            class="docs-code-block__copy"
            :class="{ 'is-copied': isCopied('hover') }"
            @click="copyCode(codeSnippets.hover, 'hover')"
          >
            {{ isCopied('hover') ? 'Copied!' : 'Copy' }}
          </button>
        </div>
        <pre class="docs-code-block__pre"><code v-html="highlightCode(codeSnippets.hover)"></code></pre>
      </div>
    </div>

    <!-- Variant -->
    <div class="attr-example">
      <div class="attr-example__header">
        <code class="attr-example__name">variant</code>
        <span class="attr-example__badge">Optional</span>
      </div>
      <p class="attr-example__desc">Button style variant. Options: <code>solid</code> (default), <code>ghost</code>, <code>soft</code></p>
      <div class="attr-example__demos">
        <div class="attr-demo">
          <div class="attr-demo__preview">
            <DemoMiniPlayer />
          </div>
          <div class="attr-demo__label">
            <code>solid</code>
            <span>Filled background (default)</span>
          </div>
        </div>
        <div class="attr-demo">
          <div class="attr-demo__preview">
            <DemoMiniPlayer bgColor="transparent" iconColor="#c4956a" border="2px solid #c4956a" />
          </div>
          <div class="attr-demo__label">
            <code>ghost</code>
            <span>Transparent + border</span>
          </div>
        </div>
        <div class="attr-demo">
          <div class="attr-demo__preview">
            <DemoMiniPlayer bgColor="rgba(196, 149, 106, 0.15)" iconColor="#c4956a" />
          </div>
          <div class="attr-demo__label">
            <code>soft</code>
            <span>Muted background</span>
          </div>
        </div>
      </div>
      <div class="docs-code-block">
        <div class="docs-code-block__header">
          <span class="docs-code-block__label">HTML</span>
          <button
            class="docs-code-block__copy"
            :class="{ 'is-copied': isCopied('variant') }"
            @click="copyCode(codeSnippets.variant, 'variant')"
          >
            {{ isCopied('variant') ? 'Copied!' : 'Copy' }}
          </button>
        </div>
        <pre class="docs-code-block__pre"><code v-html="highlightCode(codeSnippets.variant)"></code></pre>
      </div>
    </div>

    <!-- Autoplay -->
    <div class="attr-example">
      <div class="attr-example__header">
        <code class="attr-example__name">autoplay</code>
        <span class="attr-example__badge">Optional</span>
      </div>
      <p class="attr-example__desc">Start playback automatically when the page loads. Note: Many browsers block autoplay without user interaction.</p>
      <div class="docs-code-block">
        <div class="docs-code-block__header">
          <span class="docs-code-block__label">HTML</span>
          <button
            class="docs-code-block__copy"
            :class="{ 'is-copied': isCopied('autoplay') }"
            @click="copyCode(codeSnippets.autoplay, 'autoplay')"
          >
            {{ isCopied('autoplay') ? 'Copied!' : 'Copy' }}
          </button>
        </div>
        <pre class="docs-code-block__pre"><code v-html="highlightCode(codeSnippets.autoplay)"></code></pre>
      </div>
    </div>

    <!-- Disabled -->
    <div class="attr-example">
      <div class="attr-example__header">
        <code class="attr-example__name">disabled</code>
        <span class="attr-example__badge">Optional</span>
      </div>
      <p class="attr-example__desc">Disable the player, making it non-interactive with reduced opacity.</p>
      <div class="attr-example__demos">
        <div class="attr-demo">
          <div class="attr-demo__preview">
            <DemoMiniPlayer style="--player-primary: #c4956a; --player-icon: #fff;" />
          </div>
          <div class="attr-demo__label">
            <code>Normal</code>
            <span>Interactive</span>
          </div>
        </div>
        <div class="attr-demo">
          <div class="attr-demo__preview">
            <DemoMiniPlayer :disabled="true" style="--player-primary: #c4956a; --player-icon: #fff;" />
          </div>
          <div class="attr-demo__label">
            <code>disabled</code>
            <span>Non-interactive</span>
          </div>
        </div>
      </div>
      <div class="docs-code-block">
        <div class="docs-code-block__header">
          <span class="docs-code-block__label">HTML</span>
          <button
            class="docs-code-block__copy"
            :class="{ 'is-copied': isCopied('disabled') }"
            @click="copyCode(codeSnippets.disabled, 'disabled')"
          >
            {{ isCopied('disabled') ? 'Copied!' : 'Copy' }}
          </button>
        </div>
        <pre class="docs-code-block__pre"><code v-html="highlightCode(codeSnippets.disabled)"></code></pre>
      </div>
    </div>

    <!-- Loop -->
    <div class="attr-example">
      <div class="attr-example__header">
        <code class="attr-example__name">loop</code>
        <span class="attr-example__badge">Optional</span>
      </div>
      <p class="attr-example__desc">Automatically restart playback when the audio ends. Useful for ambient sounds or background music.</p>
      <div class="docs-code-block">
        <div class="docs-code-block__header">
          <span class="docs-code-block__label">HTML</span>
          <button
            class="docs-code-block__copy"
            :class="{ 'is-copied': isCopied('loop') }"
            @click="copyCode(codeSnippets.loop, 'loop')"
          >
            {{ isCopied('loop') ? 'Copied!' : 'Copy' }}
          </button>
        </div>
        <pre class="docs-code-block__pre"><code v-html="highlightCode(codeSnippets.loop)"></code></pre>
      </div>
    </div>

    <!-- Playback Rate -->
    <div class="attr-example">
      <div class="attr-example__header">
        <code class="attr-example__name">playback-rate</code>
        <span class="attr-example__badge">Optional</span>
      </div>
      <p class="attr-example__desc">Set the playback speed. Options: <code>0.5</code>, <code>0.75</code>, <code>1</code> (default), <code>1.25</code>, <code>1.5</code>, <code>2</code></p>
      <div class="attr-example__demos attr-example__demos--wrap">
        <div class="attr-demo attr-demo--small">
          <div class="attr-demo__preview attr-demo__preview--small">
            <DemoMiniPlayer :size="36" style="--player-primary: #64748b; --player-icon: #fff;" />
          </div>
          <code class="attr-demo__rate">0.5x</code>
        </div>
        <div class="attr-demo attr-demo--small">
          <div class="attr-demo__preview attr-demo__preview--small">
            <DemoMiniPlayer :size="36" style="--player-primary: #64748b; --player-icon: #fff;" />
          </div>
          <code class="attr-demo__rate">0.75x</code>
        </div>
        <div class="attr-demo attr-demo--small">
          <div class="attr-demo__preview attr-demo__preview--small">
            <DemoMiniPlayer :size="36" style="--player-primary: #c4956a; --player-icon: #fff;" />
          </div>
          <code class="attr-demo__rate">1x</code>
        </div>
        <div class="attr-demo attr-demo--small">
          <div class="attr-demo__preview attr-demo__preview--small">
            <DemoMiniPlayer :size="36" style="--player-primary: #64748b; --player-icon: #fff;" />
          </div>
          <code class="attr-demo__rate">1.25x</code>
        </div>
        <div class="attr-demo attr-demo--small">
          <div class="attr-demo__preview attr-demo__preview--small">
            <DemoMiniPlayer :size="36" style="--player-primary: #64748b; --player-icon: #fff;" />
          </div>
          <code class="attr-demo__rate">1.5x</code>
        </div>
        <div class="attr-demo attr-demo--small">
          <div class="attr-demo__preview attr-demo__preview--small">
            <DemoMiniPlayer :size="36" style="--player-primary: #64748b; --player-icon: #fff;" />
          </div>
          <code class="attr-demo__rate">2x</code>
        </div>
      </div>
      <div class="docs-code-block">
        <div class="docs-code-block__header">
          <span class="docs-code-block__label">HTML</span>
          <button
            class="docs-code-block__copy"
            :class="{ 'is-copied': isCopied('playbackRate') }"
            @click="copyCode(codeSnippets.playbackRate, 'playbackRate')"
          >
            {{ isCopied('playbackRate') ? 'Copied!' : 'Copy' }}
          </button>
        </div>
        <pre class="docs-code-block__pre"><code v-html="highlightCode(codeSnippets.playbackRate)"></code></pre>
      </div>
    </div>

    <!-- Preload -->
    <div class="attr-example">
      <div class="attr-example__header">
        <code class="attr-example__name">preload</code>
        <span class="attr-example__badge">Optional</span>
      </div>
      <p class="attr-example__desc">Control when audio data is loaded. Options: <code>none</code>, <code>metadata</code>, <code>auto</code></p>
      <div class="attr-example__table">
        <div class="attr-table">
          <div class="attr-table__row attr-table__row--header">
            <span>Value</span>
            <span>Behavior</span>
          </div>
          <div class="attr-table__row">
            <code>none</code>
            <span>Don't preload anything—wait until user clicks play</span>
          </div>
          <div class="attr-table__row">
            <code>metadata</code>
            <span>Load duration and other metadata, but not the audio</span>
          </div>
          <div class="attr-table__row">
            <code>auto</code>
            <span>Preload the entire audio file for instant playback</span>
          </div>
        </div>
      </div>
      <div class="docs-code-block">
        <div class="docs-code-block__header">
          <span class="docs-code-block__label">HTML</span>
          <button
            class="docs-code-block__copy"
            :class="{ 'is-copied': isCopied('preload') }"
            @click="copyCode(codeSnippets.preload, 'preload')"
          >
            {{ isCopied('preload') ? 'Copied!' : 'Copy' }}
          </button>
        </div>
        <pre class="docs-code-block__pre"><code v-html="highlightCode(codeSnippets.preload)"></code></pre>
      </div>
    </div>

    <!-- Show Duration -->
    <div class="attr-example">
      <div class="attr-example__header">
        <code class="attr-example__name">show-duration</code>
        <span class="attr-example__badge">Optional</span>
      </div>
      <p class="attr-example__desc">Display the audio duration below the player button.</p>
      <div class="attr-example__demos">
        <div class="attr-demo">
          <div class="attr-demo__preview">
            <DemoMiniPlayer style="--player-primary: #c4956a; --player-icon: #fff;" />
          </div>
          <div class="attr-demo__label">
            <code>Default</code>
            <span>No duration</span>
          </div>
        </div>
        <div class="attr-demo">
          <div class="attr-demo__preview attr-demo__preview--tall">
            <DemoMiniPlayer :showTooltip="true" style="--player-primary: #c4956a; --player-icon: #fff;">
              <template #tooltip>
                <span style="font-size: 11px; color: var(--ff-muted);">0:45</span>
              </template>
            </DemoMiniPlayer>
          </div>
          <div class="attr-demo__label">
            <code>show-duration</code>
            <span>Shows duration</span>
          </div>
        </div>
      </div>
      <div class="docs-code-block">
        <div class="docs-code-block__header">
          <span class="docs-code-block__label">HTML</span>
          <button
            class="docs-code-block__copy"
            :class="{ 'is-copied': isCopied('showDuration') }"
            @click="copyCode(codeSnippets.showDuration, 'showDuration')"
          >
            {{ isCopied('showDuration') ? 'Copied!' : 'Copy' }}
          </button>
        </div>
        <pre class="docs-code-block__pre"><code v-html="highlightCode(codeSnippets.showDuration)"></code></pre>
      </div>
    </div>

    <!-- Muted -->
    <div class="attr-example">
      <div class="attr-example__header">
        <code class="attr-example__name">muted</code>
        <span class="attr-example__badge">Optional</span>
      </div>
      <p class="attr-example__desc">Start playback muted. Useful with <code>autoplay</code> since browsers allow muted autoplay.</p>
      <div class="docs-code-block">
        <div class="docs-code-block__header">
          <span class="docs-code-block__label">HTML</span>
          <button
            class="docs-code-block__copy"
            :class="{ 'is-copied': isCopied('muted') }"
            @click="copyCode(codeSnippets.muted, 'muted')"
          >
            {{ isCopied('muted') ? 'Copied!' : 'Copy' }}
          </button>
        </div>
        <pre class="docs-code-block__pre"><code v-html="highlightCode(codeSnippets.muted)"></code></pre>
      </div>
      <div class="docs-info-box docs-info-box--tip">
        <div class="docs-info-box__title">Tip</div>
        <div class="docs-info-box__content">
          Most browsers block unmuted autoplay. Combine <code>autoplay</code> with <code>muted</code> for reliable automatic playback, then prompt users to unmute.
        </div>
      </div>
    </div>

    <!-- Analytics ID -->
    <div class="attr-example">
      <div class="attr-example__header">
        <code class="attr-example__name">analytics-id</code>
        <span class="attr-example__badge">Optional</span>
      </div>
      <p class="attr-example__desc">Custom identifier for tracking play events in your analytics. Emitted with the <code>play</code> event.</p>
      <div class="docs-code-block">
        <div class="docs-code-block__header">
          <span class="docs-code-block__label">HTML</span>
          <button
            class="docs-code-block__copy"
            :class="{ 'is-copied': isCopied('analyticsId') }"
            @click="copyCode(codeSnippets.analyticsId, 'analyticsId')"
          >
            {{ isCopied('analyticsId') ? 'Copied!' : 'Copy' }}
          </button>
        </div>
        <pre class="docs-code-block__pre"><code v-html="highlightCode(codeSnippets.analyticsId)"></code></pre>
      </div>
      <div class="docs-info-box docs-info-box--note">
        <div class="docs-info-box__title">Usage</div>
        <div class="docs-info-box__content">
          Listen for the <code>play</code> event to capture analytics:
          <pre class="docs-info-box__code">player.addEventListener('play', (e) => {
  analytics.track('audio_play', {
    id: e.detail.analyticsId
  });
});</pre>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.mini-attrs__intro {
  font-size: 0.9375rem;
  color: var(--ff-muted);
  line-height: 1.7;
  margin: 0 0 var(--ff-space-xl);
}

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

[data-theme="dark"] .attr-example__name {
  color: #a5b4fc;
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

[data-theme="dark"] .attr-example__badge {
  background: #1e293b;
  color: #94a3b8;
}

.attr-example__badge--required {
  background: #fef3c7;
  color: #b45309;
}

[data-theme="dark"] .attr-example__badge--required {
  background: #422006;
  color: #fbbf24;
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

.attr-example__demos--wrap {
  flex-wrap: wrap;
  gap: var(--ff-space-md);
}

.attr-demo {
  display: flex;
  flex-direction: column;
  gap: var(--ff-space-sm);
}

.attr-demo--small {
  align-items: center;
}

.attr-demo__preview {
  width: 100px;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  border: 1px solid var(--ff-border);
  background: #f8f8f8;
}

.attr-demo__preview--small {
  width: 60px;
  height: 60px;
  border-radius: 8px;
}

.attr-demo__preview--tall {
  height: 110px;
}

[data-theme="dark"] .attr-demo__preview {
  background: #1a1a1a;
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

[data-theme="dark"] .attr-demo__label code {
  color: #6ee7b7;
}

.attr-demo__label span {
  font-size: 0.6875rem;
  color: var(--ff-muted);
}

.attr-demo__rate {
  font-family: 'Fira Code', 'SF Mono', monospace;
  font-size: 0.6875rem;
  color: var(--ff-muted);
}

/* Table styles */
.attr-example__table {
  margin-bottom: var(--ff-space-lg);
}

.attr-table {
  border: 1px solid var(--ff-border);
  border-radius: 8px;
  overflow: hidden;
}

.attr-table__row {
  display: grid;
  grid-template-columns: 100px 1fr;
  gap: var(--ff-space-md);
  padding: var(--ff-space-sm) var(--ff-space-md);
  border-bottom: 1px solid var(--ff-border);
}

.attr-table__row:last-child {
  border-bottom: none;
}

.attr-table__row--header {
  background: var(--ff-bg-subtle);
  font-size: 0.6875rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--ff-muted);
}

.attr-table__row code {
  font-family: 'Fira Code', 'SF Mono', monospace;
  font-size: 0.75rem;
  color: #059669;
}

[data-theme="dark"] .attr-table__row code {
  color: #6ee7b7;
}

.attr-table__row span {
  font-size: 0.8125rem;
  color: var(--ff-text);
}

/* Info box code */
.docs-info-box__code {
  margin-top: var(--ff-space-sm);
  padding: var(--ff-space-sm);
  background: var(--ff-bg-subtle);
  border-radius: 4px;
  font-family: 'Fira Code', 'SF Mono', monospace;
  font-size: 0.75rem;
  overflow-x: auto;
  white-space: pre;
}

/* Pulse animation for demo */
.demo-pulse :deep(.demo-mini) {
  animation: demo-pulse 1.5s ease-in-out infinite;
}

@keyframes demo-pulse {
  0%, 100% {
    box-shadow: 0 0 0 0 rgba(196, 149, 106, 0.4);
  }
  50% {
    box-shadow: 0 0 0 12px rgba(196, 149, 106, 0);
  }
}

</style>
