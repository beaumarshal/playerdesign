<script setup>
import { computed } from 'vue'
import { useBrandStore } from '@/stores/brandStore'
import { usePlayerStore } from '@/stores/playerStore'
import {
  shapeOptions,
  thicknessOptions,
  waveformOptions,
  sizeOptions
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
          v-model="playerStore.pill.size"
          label="Size"
          :options="sizeOptions.pill"
        />
      </div>
      <div class="control-row" v-if="playerStore.pill.size === 'custom'">
        <RangeSlider
          v-model="playerStore.pill.customSize"
          label="Custom Height"
          :min="24"
          :max="72"
          unit="px"
        />
      </div>
    </OptionsGroup>

    <!-- Player Layout -->
    <OptionsGroup title="Player Layout">
      <div class="control-row">
        <SelectInput
          v-model="brandStore.playerBorderThickness"
          label="Border Thickness"
          :options="thicknessOptions"
        />
        <SelectInput
          v-model="brandStore.playerShape"
          label="Shape"
          :options="shapeOptions"
        />
      </div>
      <div class="control-row">
        <SelectInput
          v-model="brandStore.buttonShape"
          label="Button Shape"
          :options="shapeOptions"
        />
      </div>
    </OptionsGroup>

    <!-- Waveform Settings -->
    <OptionsGroup title="Waveform">
      <div class="control-row">
        <label class="checkbox-label">
          <input type="checkbox" v-model="brandStore.showWaveform" />
          Show Waveform
        </label>
        <label class="checkbox-label">
          <input type="checkbox" v-model="brandStore.showTimer" />
          Show Timer
        </label>
      </div>
      <div class="control-row">
        <SelectInput
          v-model="brandStore.waveformType"
          label="Waveform Type"
          :options="waveformOptions"
        />
      </div>
    </OptionsGroup>

    <!-- Light Mode Colors -->
    <OptionsGroup title="Light Mode Colors" :badge="isLightMode ? 'Active' : ''">
      <div class="control-row">
        <ColorInput
          v-model="brandStore.light.playerBg"
          label="Background"
          :transparent-option="true"
          v-model:is-transparent="brandStore.playerBgTransparent"
          @update:model-value="applyChanges"
        />
        <ColorInput
          v-model="brandStore.light.playerBorder"
          label="Border"
          @update:model-value="applyChanges"
        />
      </div>
      <div class="control-row">
        <ColorInput
          v-model="brandStore.light.textColor"
          label="Primary Text"
          @update:model-value="applyChanges"
        />
        <ColorInput
          v-model="brandStore.light.textSecondary"
          label="Secondary Text"
          @update:model-value="applyChanges"
        />
      </div>
      <div class="control-row">
        <ColorInput
          v-model="brandStore.light.buttonColor"
          label="Button"
          @update:model-value="applyChanges"
        />
        <ColorInput
          v-model="brandStore.light.iconColor"
          label="Icon"
          @update:model-value="applyChanges"
        />
      </div>
      <div class="control-row">
        <ColorInput
          v-model="brandStore.light.waveActive"
          label="Wave Active"
          @update:model-value="applyChanges"
        />
        <ColorInput
          v-model="brandStore.light.waveInactive"
          label="Wave Inactive"
          @update:model-value="applyChanges"
        />
      </div>
    </OptionsGroup>

    <!-- Dark Mode Colors -->
    <OptionsGroup title="Dark Mode Colors" :badge="!isLightMode ? 'Active' : ''">
      <div class="control-row">
        <ColorInput
          v-model="brandStore.dark.playerBg"
          label="Background"
          @update:model-value="applyChanges"
        />
        <ColorInput
          v-model="brandStore.dark.playerBorder"
          label="Border"
          @update:model-value="applyChanges"
        />
      </div>
      <div class="control-row">
        <ColorInput
          v-model="brandStore.dark.textColor"
          label="Primary Text"
          @update:model-value="applyChanges"
        />
        <ColorInput
          v-model="brandStore.dark.textSecondary"
          label="Secondary Text"
          @update:model-value="applyChanges"
        />
      </div>
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
      <div class="control-row">
        <ColorInput
          v-model="brandStore.dark.waveActive"
          label="Wave Active"
          @update:model-value="applyChanges"
        />
        <ColorInput
          v-model="brandStore.dark.waveInactive"
          label="Wave Inactive"
          @update:model-value="applyChanges"
        />
      </div>
    </OptionsGroup>
  </div>
</template>
