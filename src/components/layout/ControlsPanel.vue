<script setup>
import { computed } from 'vue'
import { useBuilderStore } from '@/stores/builderStore'
import ControlStep from '@/components/controls/ControlStep.vue'
import PlayerTypeTabs from '@/components/controls/PlayerTypeTabs.vue'
import FullPlayerOptions from '@/components/options/FullPlayerOptions.vue'
import MiniPlayerOptions from '@/components/options/MiniPlayerOptions.vue'
import PillPlayerOptions from '@/components/options/PillPlayerOptions.vue'

const builderStore = useBuilderStore()

const activePlayerType = computed(() => builderStore.activePlayerType)
</script>

<template>
  <div class="controls ff-card">
    <!-- Step 1: Player Type -->
    <ControlStep
      :step="1"
      title="Player Type"
    >
      <PlayerTypeTabs />
    </ControlStep>

    <!-- Step 2: Player Options -->
    <ControlStep
      :step="2"
      title="Player Options"
    >
      <FullPlayerOptions v-show="activePlayerType === 'full'" />
      <MiniPlayerOptions v-show="activePlayerType === 'mini'" />
      <PillPlayerOptions v-show="activePlayerType === 'pill'" />
    </ControlStep>
  </div>
</template>

<style scoped>
.controls {
  border-radius: 6px;
  overflow: hidden;
  padding: 0;
}
</style>
