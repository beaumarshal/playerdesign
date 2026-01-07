<script setup>
import { useBrandStore } from '@/stores/brandStore'
import { usePlayerStore } from '@/stores/playerStore'
import {
  shapeOptions,
  thicknessOptions,
  waveformOptions,
  sizeOptions
} from '@/composables/useOptionArrays'
import OptionsGroup from '@/components/controls/OptionsGroup.vue'
import ColorInput from '@/components/controls/ColorInput.vue'
import SelectInput from '@/components/controls/SelectInput.vue'
import RangeSlider from '@/components/controls/RangeSlider.vue'

const brandStore = useBrandStore()
const playerStore = usePlayerStore()

const applyChanges = () => brandStore.applyCssVariables()
</script>

<template>
  <div class="options-panels">
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

    <!-- Player Style -->
    <OptionsGroup title="Player Style">
      <div class="control-row">
        <ColorInput
          v-model="brandStore.playerBg"
          label="Background"
          :transparent-option="true"
          v-model:is-transparent="brandStore.playerBgTransparent"
          @update:model-value="applyChanges"
        />
        <ColorInput
          v-model="brandStore.playerBorder"
          label="Border"
          @update:model-value="applyChanges"
        />
      </div>
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
    </OptionsGroup>

    <!-- Text Colors -->
    <OptionsGroup title="Text Colors">
      <div class="control-row">
        <ColorInput
          v-model="brandStore.textColor"
          label="Primary Text"
          @update:model-value="applyChanges"
        />
        <ColorInput
          v-model="brandStore.textSecondary"
          label="Secondary Text"
          @update:model-value="applyChanges"
        />
      </div>
    </OptionsGroup>

    <!-- Button Style -->
    <OptionsGroup title="Button Style">
      <div class="control-row">
        <ColorInput
          v-model="brandStore.buttonColor"
          label="Button Color"
          :transparent-option="true"
          v-model:is-transparent="brandStore.buttonTransparent"
          @update:model-value="applyChanges"
        />
        <ColorInput
          v-model="brandStore.iconColor"
          label="Icon Color"
          @update:model-value="applyChanges"
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

    <!-- Waveform -->
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
      <div class="control-row">
        <ColorInput
          v-model="brandStore.waveActive"
          label="Active Color"
          @update:model-value="applyChanges"
        />
        <ColorInput
          v-model="brandStore.waveInactive"
          label="Inactive Color"
          @update:model-value="applyChanges"
        />
      </div>
    </OptionsGroup>
  </div>
</template>
