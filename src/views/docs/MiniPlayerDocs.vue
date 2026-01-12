<script setup>
import DocsLayout from '@/components/layout/DocsLayout.vue'
import DocsSection from '@/components/docs/DocsSection.vue'
import MiniPlayground from '@/components/docs/MiniPlayground.vue'
import GettingStarted from '@/components/docs/GettingStarted.vue'
import MiniCssVariables from '@/components/docs/MiniCssVariables.vue'
import MiniAttributes from '@/components/docs/MiniAttributes.vue'
import MiniSlots from '@/components/docs/MiniSlots.vue'
import MiniExamples from '@/components/docs/MiniExamples.vue'
import PillExamples from '@/components/docs/PillExamples.vue'
import InspirationGallery from '@/components/examples/InspirationGallery.vue'
import ComingSoon from '@/components/docs/ComingSoon.vue'

const sections = [
  {
    group: 'Overview',
    children: [
      { id: 'getting-started', label: 'Getting Started' },
    ]
  },
  {
    group: 'Players',
    children: [
      { id: 'default-player', label: 'Default', badge: 'Soon' },
      {
        id: 'mini-player',
        label: 'Mini',
        children: [
          { id: 'mini-styling', label: 'Styling' },
          { id: 'mini-attributes', label: 'Attributes' },
          { id: 'mini-slots', label: 'Slots' },
          { id: 'mini-examples', label: 'Examples' },
          { id: 'mini-inspiration', label: 'Inspiration' },
          { id: 'mini-playground', label: 'Playground' },
        ]
      },
      {
        id: 'pill-player',
        label: 'Pill',
        children: [
          { id: 'pill-examples', label: 'Examples' },
        ]
      },
    ]
  },
]

// Flatten sections for scroll spy
const flattenSections = (items, flat = []) => {
  items.forEach(item => {
    if (item.id) flat.push({ id: item.id })
    if (item.children) flattenSections(item.children, flat)
  })
  return flat
}

const flatSections = flattenSections(sections)
</script>

<template>
  <DocsLayout :sections="sections">
    <!-- Getting Started Content (Installation, Usage, Configuration) -->
    <GettingStarted />

    <!-- Default Player (Coming Soon) -->
    <DocsSection
      id="default-player"
      title="Default Player"
    >
      <ComingSoon player-type="Default Player" />
    </DocsSection>

    <!-- Mini Player Section -->
    <DocsSection
      id="mini-player"
      title="Mini Player"
      description="A compact, button-style audio player"
    >
      <p class="player-intro">
        The Mini Player is perfect for product demos, voice messages, profile intros,
        and anywhere you need a minimal audio interface. Customize it using CSS Variables,
        Attributes, CSS Parts, and Slots.
      </p>
    </DocsSection>

    <!-- Mini Player - Styling -->
    <DocsSection
      id="mini-styling"
      title="Styling"
    >
      <MiniCssVariables />
    </DocsSection>

    <!-- Mini Player - Attributes -->
    <DocsSection
      id="mini-attributes"
      title="Attributes"
    >
      <MiniAttributes />
    </DocsSection>

    <!-- Mini Player - Slots -->
    <DocsSection
      id="mini-slots"
      title="Slots"
    >
      <MiniSlots />
    </DocsSection>

    <!-- Mini Player - Examples -->
    <DocsSection
      id="mini-examples"
      title="Examples"
      description="Complete code examples combining variables, attributes, and slots"
    >
      <MiniExamples />
    </DocsSection>

    <!-- Mini Player - Inspiration -->
    <DocsSection
      id="mini-inspiration"
      title="Inspiration Gallery"
      description="Ideas for integrating voice into your product"
    >
      <InspirationGallery :show-header="false" :compact="true" />
    </DocsSection>

    <!-- Mini Player - Playground -->
    <DocsSection
      id="mini-playground"
      title="Playground"
      description="Design your Mini Player interactively and copy the generated code"
    >
      <MiniPlayground />
    </DocsSection>

    <!-- Pill Player Section -->
    <DocsSection
      id="pill-player"
      title="Pill Player"
      description="A pill-shaped audio player with waveform visualization"
    >
      <p class="player-intro">
        The Pill Player combines a play button, waveform visualization, and timer in a compact
        horizontal format. Perfect for podcasts, voice messages, and audio content that needs
        more context than a simple button.
      </p>
    </DocsSection>

    <!-- Pill Player - Examples -->
    <DocsSection
      id="pill-examples"
      title="Examples"
      description="Complete code examples for pill player styles"
    >
      <PillExamples />
    </DocsSection>
  </DocsLayout>
</template>

<style scoped>
.player-intro {
  font-size: 0.9375rem;
  color: var(--ff-muted);
  line-height: 1.7;
  margin: 0;
}
</style>
