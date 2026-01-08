<script setup>
import { computed } from 'vue'
import { useBrandStore } from '@/stores/brandStore'
import { usePlayerStore } from '@/stores/playerStore'
import {
  shapeOptions,
  paddingOptions,
  thicknessOptions,
  waveformOptions,
  waveThicknessOptions,
  timeFormatOptions
} from '@/composables/useOptionArrays'
import OptionsGroup from '@/components/controls/OptionsGroup.vue'
import ThemeSelector from '@/components/controls/ThemeSelector.vue'
import ColorInput from '@/components/controls/ColorInput.vue'
import SelectInput from '@/components/controls/SelectInput.vue'
import RangeSlider from '@/components/controls/RangeSlider.vue'

const brandStore = useBrandStore()
const playerStore = usePlayerStore()

const applyChanges = () => brandStore.applyCssVariables()

// Computed to get/set current mode colors
const currentMode = computed(() => brandStore.previewMode)
const isLightMode = computed(() => brandStore.previewMode === 'light')
</script>

<template>
  <div class="options-panels">
    <!-- Theme Selector -->
    <ThemeSelector />

    <!-- Player Style (shape/layout - same for both modes) -->
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
      <div class="control-row" v-if="brandStore.playerShape === 'custom'">
        <RangeSlider
          v-model="brandStore.playerCustomRadius"
          label="Corner Radius"
          :min="0"
          :max="50"
          unit="px"
        />
      </div>
      <div class="control-row">
        <SelectInput
          v-model="brandStore.playerPadding"
          label="Padding"
          :options="paddingOptions"
        />
        <SelectInput
          v-model="brandStore.buttonShape"
          label="Button Shape"
          :options="shapeOptions"
        />
      </div>
      <div class="control-row" v-if="brandStore.playerPadding === 'custom'">
        <RangeSlider
          v-model="brandStore.playerCustomPadding"
          label="Padding"
          :min="0"
          :max="3"
          :step="0.25"
          unit="rem"
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

    <!-- Waveform & Timer (shared settings) -->
    <OptionsGroup title="Waveform & Timer">
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
        <SelectInput
          v-model="brandStore.waveformThickness"
          label="Thickness"
          :options="waveThicknessOptions"
        />
      </div>
      <div class="control-row">
        <SelectInput
          v-model="brandStore.timeFormat"
          label="Time Format"
          :options="timeFormatOptions"
        />
      </div>
    </OptionsGroup>

    <!-- Transcript -->
    <OptionsGroup title="Transcript">
      <div class="control-row">
        <label class="checkbox-label">
          <input type="checkbox" v-model="playerStore.full.showTranscript" />
          Show Transcript
        </label>
        <label class="checkbox-label">
          <input type="checkbox" v-model="playerStore.full.showTranslation" />
          Show Translation
        </label>
      </div>
      <div class="control-row" v-if="playerStore.full.showTranscript">
        <ColorInput
          v-model="playerStore.full.transcriptBg"
          label="Transcript Background"
        />
      </div>
    </OptionsGroup>
  </div>
</template>
