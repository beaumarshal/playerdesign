<script setup>
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
import ColorInput from '@/components/controls/ColorInput.vue'
import SelectInput from '@/components/controls/SelectInput.vue'
import RangeSlider from '@/components/controls/RangeSlider.vue'

const brandStore = useBrandStore()
const playerStore = usePlayerStore()

const applyChanges = () => brandStore.applyCssVariables()
</script>

<template>
  <div class="options-panels">
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

    <!-- Waveform & Timer -->
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
