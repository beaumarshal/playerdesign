<script setup>
import { ref, onMounted, onUnmounted, provide, computed } from 'vue'
import BuilderHeader from './BuilderHeader.vue'
import DocsSidebar from '@/components/docs/DocsSidebar.vue'

const props = defineProps({
  sections: {
    type: Array,
    required: true
  }
})

// Flatten nested sections for scroll spy
const flattenSections = (items, flat = []) => {
  items.forEach(item => {
    if (item.id) flat.push(item)
    if (item.children) flattenSections(item.children, flat)
  })
  return flat
}

const flatSections = computed(() => flattenSections(props.sections))

const activeSection = ref(flatSections.value[0]?.id || '')
const contentRef = ref(null)

// Provide active section to children
provide('activeSection', activeSection)

// Scroll spy implementation
let observer = null

const setupScrollSpy = () => {
  const options = {
    root: null,
    rootMargin: '-80px 0px -70% 0px',
    threshold: 0
  }

  observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        activeSection.value = entry.target.id
      }
    })
  }, options)

  // Observe all flattened sections
  flatSections.value.forEach((section) => {
    const el = document.getElementById(section.id)
    if (el) observer.observe(el)
  })
}

onMounted(() => {
  // Small delay to ensure DOM is ready
  setTimeout(setupScrollSpy, 100)

  // Handle initial hash
  if (window.location.hash) {
    const id = window.location.hash.slice(1)
    const el = document.getElementById(id)
    if (el) {
      setTimeout(() => {
        el.scrollIntoView({ behavior: 'smooth' })
        activeSection.value = id
      }, 200)
    }
  }
})

onUnmounted(() => {
  if (observer) {
    observer.disconnect()
  }
})

const scrollToSection = (id) => {
  const el = document.getElementById(id)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' })
    activeSection.value = id
    // Update URL hash without triggering scroll
    history.pushState(null, '', `#${id}`)
  }
}
</script>

<template>
  <div class="docs-layout">
    <BuilderHeader show-docs-nav />
    <div class="docs-layout__container">
      <DocsSidebar
        :sections="sections"
        :active-section="activeSection"
        @navigate="scrollToSection"
      />
      <main ref="contentRef" class="docs-layout__content">
        <slot />
      </main>
    </div>
  </div>
</template>

<style scoped>
.docs-layout {
  min-height: 100vh;
}

.docs-layout__container {
  max-width: 1400px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 260px 1fr;
  gap: var(--ff-space-xl);
  padding: var(--ff-space-xl) var(--ff-space-lg);
}

.docs-layout__content {
  min-width: 0;
  padding-bottom: 200px;
}

@media (max-width: 900px) {
  .docs-layout__container {
    grid-template-columns: 1fr;
  }
}
</style>
