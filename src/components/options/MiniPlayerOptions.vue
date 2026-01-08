<script setup>
import { computed } from 'vue'
import { useBrandStore } from '@/stores/brandStore'
import { usePlayerStore } from '@/stores/playerStore'
import {
  shapeOptions,
  thicknessOptions,
  sizeOptions,
  animationOptions
} from '@/composables/useOptionArrays'
import OptionsGroup from '@/components/controls/OptionsGroup.vue'
import ThemeSelector from '@/components/controls/ThemeSelector.vue'
import ColorInput from '@/components/controls/ColorInput.vue'
import SelectInput from '@/components/controls/SelectInput.vue'
import RangeSlider from '@/components/controls/RangeSlider.vue'

const brandStore = useBrandStore()
const playerStore = usePlayerStore()

const applyChanges = () => brandStore.applyCssVariables()
const isLightMode = computed(() => brandStore.previewMode === 'light')
</script>

<template>
  <div class="options-panels">
    <!-- Theme Selector -->
    <ThemeSelector />

    <!-- Size -->
    <OptionsGroup title="Size">
      <div class="control-row">
        <SelectInput
          v-model="playerStore.mini.size"
          label="Size"
          :options="sizeOptions.mini"
        />
      </div>
      <div class="control-row" v-if="playerStore.mini.size === 'custom'">
        <RangeSlider
          v-model="playerStore.mini.customSize"
          label="Custom Size"
          :min="24"
          :max="120"
          unit="px"
        />
      </div>
    </OptionsGroup>

    <!-- Animation -->
    <OptionsGroup title="Animation">
      <div class="control-row">
        <SelectInput
          v-model="playerStore.mini.animation"
          label="Animation Type"
          :options="animationOptions"
        />
      </div>
    </OptionsGroup>

    <!-- Button Layout -->
    <OptionsGroup title="Button Layout">
      <div class="control-row">
        <SelectInput
          v-model="brandStore.buttonShape"
          label="Button Shape"
          :options="shapeOptions"
        />
        <SelectInput
          v-model="brandStore.buttonBorderThickness"
          label="Border"
          :options="thicknessOptions"
        />
      </div>
      <div class="control-row" v-if="brandStore.buttonShape === 'custom'">
        <RangeSlider
          v-model="brandStore.buttonCustomRadius"
          label="Corner Radius"
          :min="0"
          :max="50"
          unit="px"
        />
      </div>
    </OptionsGroup>

    <!-- Light Mode Colors -->
    <OptionsGroup title="Light Mode Colors" :badge="isLightMode ? 'Active' : ''">
      <div class="control-row">
        <ColorInput
          v-model="brandStore.light.buttonColor"
          label="Button"
          :transparent-option="true"
          v-model:is-transparent="brandStore.buttonTransparent"
          @update:model-value="applyChanges"
        />
        <ColorInput
          v-model="brandStore.light.iconColor"
          label="Icon"
          @update:model-value="applyChanges"
        />
      </div>
    </OptionsGroup>

    <!-- Dark Mode Colors -->
    <OptionsGroup title="Dark Mode Colors" :badge="!isLightMode ? 'Active' : ''">
      <div class="control-row">
        <ColorInput
          v-model="brandStore.dark.buttonColor"
          label="Button"
          @update:model-value="applyChanges"
        />
        <ColorInput
          v-model="brandStore.dark.iconColor"
          label="Icon"
          @update:model-value="applyChanges"
        />
      </div>
    </OptionsGroup>
  </div>
</template>
