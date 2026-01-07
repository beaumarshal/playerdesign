<script setup>
import { computed } from 'vue'
import { useBuilderStore } from '@/stores/builderStore'
import ExampleCard from './ExampleCard.vue'

const builderStore = useBuilderStore()

const activePlayerType = computed(() => builderStore.activePlayerType)

// Full Player Examples with rich fake data
const fullExamples = [
  {
    label: 'Article Embed',
    description: 'Audio embedded in blog post',
    example: {
      type: 'article',
      image: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=400&h=200&fit=crop',
      category: 'Technology',
      title: 'The Future of Voice Interfaces in Web Design',
      excerpt: 'How audio-first experiences are reshaping the way we interact with digital content...',
    }
  },
  {
    label: 'Podcast Episode',
    description: 'Full episode player',
    example: {
      type: 'podcast',
      artwork: 'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=120&h=120&fit=crop',
      show: 'The Creative Hour',
      title: 'Building Products People Actually Want',
      date: 'Jan 3, 2026',
      duration: '42 min',
    }
  },
  {
    label: 'Course Lesson',
    description: 'E-learning audio player',
    example: {
      type: 'course',
      module: 'Module 3 · Lesson 7',
      title: 'Understanding User Psychology in Design',
      progress: 65,
    }
  },
  {
    label: 'Landing Page',
    description: 'Marketing page audio',
    example: {
      type: 'landing',
      headline: 'Hear Our Story',
      subhead: 'Listen to our founder explain why we built this product',
      cta: 'Start Free Trial',
    }
  },
]

// Mini Player Examples with rich fake data
const miniExamples = [
  {
    label: 'Artwork Overlay',
    description: 'Audio guide for artwork',
    example: {
      type: 'artwork',
      image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=400&h=300&fit=crop',
      title: 'Starry Night',
      artist: 'Vincent van Gogh, 1889',
    }
  },
  {
    label: 'Product Card',
    description: 'Product demo audio',
    example: {
      type: 'product',
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=160&h=160&fit=crop',
      name: 'Studio Pro Headphones',
      description: 'Premium wireless headphones with active noise cancellation',
      price: '$299',
    }
  },
  {
    label: 'Profile Card',
    description: 'Voice introduction',
    example: {
      type: 'profile',
      cover: 'https://images.unsplash.com/photo-1557683316-973673baf926?w=400&h=120&fit=crop',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
      name: 'Alex Morgan',
      role: 'Product Designer at Stripe',
    }
  },
  {
    label: 'Audio Guide',
    description: 'Museum/gallery guide',
    example: {
      type: 'guide',
      image: 'https://images.unsplash.com/photo-1518998053901-5348d3961a04?w=200&h=150&fit=crop',
      number: '12',
      title: 'The Grand Hall & Renaissance Collection',
      duration: '3:45',
    }
  },
]

// Pill Player Examples with rich fake data
const pillExamples = [
  {
    label: 'Chat Message',
    description: 'Voice message in chat',
    example: {
      type: 'chat',
      otherAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=48&h=48&fit=crop',
      otherMessage: 'Hey! Can you send me the details?',
    }
  },
  {
    label: 'Social Bio',
    description: 'Profile audio intro',
    example: {
      type: 'social',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=96&h=96&fit=crop',
      name: 'Jordan Lee',
      handle: '@jordanlee',
      bio: 'Designer, maker, coffee enthusiast. Building cool stuff.',
    }
  },
  {
    label: 'Voice Note',
    description: 'Inline voice memo',
    example: {
      type: 'note',
      date: 'Today, 2:34 PM',
      tag: 'Ideas',
      title: 'App redesign thoughts',
    }
  },
  {
    label: 'Testimonial',
    description: 'Customer audio review',
    example: {
      type: 'testimonial',
      quote: 'This product completely transformed how our team collaborates. Highly recommend!',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=56&h=56&fit=crop',
      name: 'Sarah Chen',
      company: 'Head of Design, Acme Inc',
    }
  },
]

const currentExamples = computed(() => {
  switch (activePlayerType.value) {
    case 'full': return fullExamples
    case 'mini': return miniExamples
    case 'pill': return pillExamples
    default: return fullExamples
  }
})
</script>

<template>
  <div class="examples-section">
    <h3 class="examples-title">Use Case Examples</h3>
    <div class="examples-grid">
      <ExampleCard
        v-for="item in currentExamples"
        :key="item.label"
        :label="item.label"
        :description="item.description"
        :player-type="activePlayerType"
        :example="item.example"
      />
    </div>
  </div>
</template>

<style scoped>
.examples-section {
  margin-top: var(--ff-space-xl);
}

.examples-title {
  font-size: 0.6875rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--ff-muted);
  margin: 0 0 var(--ff-space-md);
}

.examples-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--ff-space-md);
}

@media (max-width: 768px) {
  .examples-grid {
    grid-template-columns: 1fr;
  }
}
</style>
