<script setup>
defineProps({
  sections: {
    type: Array,
    required: true
  },
  activeSection: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['navigate'])

const isActive = (item, activeSection) => {
  return item.id === activeSection
}

const hasActiveChild = (item, activeSection) => {
  if (item.children) {
    return item.children.some(child => child.id === activeSection)
  }
  return false
}
</script>

<template>
  <aside class="docs-sidebar">
    <div class="docs-sidebar__inner">
      <div class="docs-sidebar__header">
        <h2 class="docs-sidebar__title">Player Docs</h2>
      </div>

      <nav class="docs-sidebar__nav">
        <template v-for="item in sections" :key="item.id || item.group">
          <!-- Group Header (non-clickable) -->
          <div v-if="item.group" class="docs-sidebar__group">
            <span class="docs-sidebar__group-label">{{ item.group }}</span>
            <template v-for="child in item.children" :key="child.id">
              <!-- Nested item with children -->
              <template v-if="child.children">
                <button
                  class="docs-sidebar__link docs-sidebar__link--parent"
                  :class="{
                    'is-active': isActive(child, activeSection),
                    'has-active-child': hasActiveChild(child, activeSection)
                  }"
                  @click="emit('navigate', child.id)"
                >
                  {{ child.label }}
                  <span v-if="child.badge" class="docs-sidebar__badge docs-sidebar__badge--soon">
                    {{ child.badge }}
                  </span>
                </button>
                <button
                  v-for="subchild in child.children"
                  :key="subchild.id"
                  class="docs-sidebar__link docs-sidebar__link--nested"
                  :class="{ 'is-active': activeSection === subchild.id }"
                  @click="emit('navigate', subchild.id)"
                >
                  {{ subchild.label }}
                </button>
              </template>
              <!-- Simple nested item -->
              <button
                v-else
                class="docs-sidebar__link docs-sidebar__link--child"
                :class="{ 'is-active': activeSection === child.id }"
                @click="emit('navigate', child.id)"
              >
                {{ child.label }}
                <span v-if="child.badge" class="docs-sidebar__badge docs-sidebar__badge--soon">
                  {{ child.badge }}
                </span>
              </button>
            </template>
          </div>

          <!-- Top-level item -->
          <button
            v-else
            class="docs-sidebar__link"
            :class="{ 'is-active': activeSection === item.id }"
            @click="emit('navigate', item.id)"
          >
            {{ item.label }}
          </button>
        </template>
      </nav>
    </div>
  </aside>
</template>

<style scoped>
.docs-sidebar {
  position: sticky;
  top: var(--ff-space-xl);
  height: fit-content;
  max-height: calc(100vh - var(--ff-space-xl) * 2);
  overflow-y: auto;
}

.docs-sidebar__inner {
  background: var(--ff-bg);
  border: 1px solid var(--ff-border);
  border-radius: 12px;
  padding: var(--ff-space-lg);
  display: flex;
  flex-direction: column;
  gap: var(--ff-space-md);
}

.docs-sidebar__header {
  padding-bottom: var(--ff-space-md);
  border-bottom: 1px solid var(--ff-border);
}

.docs-sidebar__title {
  font-size: 1rem;
  font-weight: 600;
  color: var(--ff-text);
  margin: 0;
}

.docs-sidebar__nav {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.docs-sidebar__group {
  margin-top: var(--ff-space-md);
}

.docs-sidebar__group:first-child {
  margin-top: 0;
}

.docs-sidebar__group-label {
  display: block;
  font-size: 0.6875rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--ff-muted);
  padding: var(--ff-space-sm) var(--ff-space-sm);
  margin-bottom: 2px;
}

.docs-sidebar__link {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--ff-space-sm);
  padding: 0.5rem var(--ff-space-sm);
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--ff-muted);
  background: transparent;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.15s ease;
  text-align: left;
  width: 100%;
}

.docs-sidebar__link:hover {
  color: var(--ff-text);
  background: var(--ff-bg-subtle);
}

.docs-sidebar__link.is-active {
  color: var(--ff-accent);
  background: var(--ff-accent-subtle);
}

.docs-sidebar__link--child {
  padding-left: var(--ff-space-md);
}

.docs-sidebar__link--parent {
  font-weight: 600;
  color: var(--ff-text);
}

.docs-sidebar__link--parent.is-active {
  color: var(--ff-accent);
  background: var(--ff-accent-subtle);
}

.docs-sidebar__link--parent.has-active-child {
  font-weight: 700;
  color: var(--ff-text);
  background: transparent;
}

.docs-sidebar__link--nested {
  padding-left: var(--ff-space-xl);
  font-size: 0.8125rem;
}

.docs-sidebar__badge {
  font-size: 0.5625rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  padding: 0.125rem 0.375rem;
  border-radius: 4px;
}

.docs-sidebar__badge--soon {
  color: var(--ff-muted);
  background: var(--ff-bg-subtle);
  border: 1px solid var(--ff-border);
}

.docs-sidebar__footer {
  padding-top: var(--ff-space-md);
  border-top: 1px solid var(--ff-border);
  margin-top: auto;
}

.docs-sidebar__back {
  display: flex;
  align-items: center;
  gap: var(--ff-space-xs);
  font-size: 0.8125rem;
  color: var(--ff-muted);
  text-decoration: none;
  transition: color 0.15s ease;
}

.docs-sidebar__back:hover {
  color: var(--ff-text);
}

@media (max-width: 900px) {
  .docs-sidebar {
    position: relative;
    top: 0;
    max-height: none;
  }

  .docs-sidebar__inner {
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
  }

  .docs-sidebar__header {
    border-bottom: none;
    padding-bottom: 0;
  }

  .docs-sidebar__nav {
    flex-direction: row;
    flex-wrap: wrap;
    gap: var(--ff-space-xs);
    width: 100%;
  }

  .docs-sidebar__group {
    display: flex;
    flex-wrap: wrap;
    gap: var(--ff-space-xs);
    margin-top: var(--ff-space-sm);
  }

  .docs-sidebar__group-label {
    width: 100%;
    padding: var(--ff-space-xs);
  }

  .docs-sidebar__link {
    padding: 0.375rem 0.625rem;
  }

  .docs-sidebar__link--child,
  .docs-sidebar__link--nested {
    padding-left: 0.625rem;
  }

  .docs-sidebar__footer {
    border-top: none;
    padding-top: 0;
    margin-left: auto;
  }
}
</style>
