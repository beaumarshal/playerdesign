<script setup>
import { onMounted } from 'vue'
import { useBuilderStore } from './stores/builderStore'

const builderStore = useBuilderStore()

onMounted(() => {
  // Initialize theme from system preference and listen for changes
  builderStore.initTheme()
})
</script>

<template>
  <div class="ff-page">
    <div class="ff-gradient-bar"></div>
    <router-view />
  </div>
</template>

<style scoped>
/* Global app styles - page wrapper is now just a shell for router */
</style>
