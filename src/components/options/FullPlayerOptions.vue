<script setup>
import { computed } from 'vue'
import { useBrandStore } from '@/stores/brandStore'
import { usePlayerStore } from '@/stores/playerStore'
import ColorInput from '@/components/controls/ColorInput.vue'
import SelectInput from '@/components/controls/SelectInput.vue'
import RangeSlider from '@/components/controls/RangeSlider.vue'

const brandStore = useBrandStore()
const playerStore = usePlayerStore()

// Shape options
const shapeOptions = [
  { value: 'pill', label: 'Pill' },
  { value: 'rounded', label: 'Rounded' },
  { value: 'square', label: 'Square' },
  { value: 'custom', label: 'Custom' },
]

const paddingOptions = [
  { value: 'tight', label: 'Tight' },
  { value: 'normal', label: 'Normal' },
  { value: 'spacious', label: 'Spacious' },
  { value: 'custom', label: 'Custom' },
]

const thicknessOptions = [
  { value: '0', label: 'None' },
  { value: '1px', label: '1px' },
  { value: '2px', label: '2px' },
  { value: '3px', label: '3px' },
]

const waveformOptions = [
  { value: 'bars', label: 'Bars' },
  { value: 'dots', label: 'Dots' },
  { value: 'smooth', label: 'Smooth' },
  { value: 'line', label: 'Line' },
  { value: 'blob', label: 'Blob' },
  { value: 'progress', label: 'Progress' },
]

const waveThicknessOptions = [
  { value: 'thin', label: 'Thin' },
  { value: 'normal', label: 'Normal' },
  { value: 'thick', label: 'Thick' },
]

const timeFormatOptions = [
  { value: 'elapsed-total', label: '0:00 / 1:00' },
  { value: 'elapsed', label: '0:00' },
  { value: 'remaining', label: '-1:00' },
  { value: 'seconds', label: '0s' },
  { value: 'mm-ss', label: '00:00' },
  { value: 'total-only', label: '1:00' },
]

// Apply changes
const applyChanges = () => {
  brandStore.applyCssVariables()
}
</script>

<template>
  <div class="options-panels">
    <!-- Player Style -->
    <div class="options-group">
      <h4 class="options-group__title">Player Style</h4>
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
    </div>

    <!-- Text Colors -->
    <div class="options-group">
      <h4 class="options-group__title">Text Colors</h4>
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
    </div>

    <!-- Button Style -->
    <div class="options-group">
      <h4 class="options-group__title">Button Style</h4>
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
    </div>

    <!-- Waveform & Timer -->
    <div class="options-group">
      <h4 class="options-group__title">Waveform & Timer</h4>
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
    </div>

    <!-- Transcript -->
    <div class="options-group">
      <h4 class="options-group__title">Transcript</h4>
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
    </div>
  </div>
</template>

<style scoped>
.options-group {
  margin-bottom: var(--ff-space-lg);
  padding-bottom: var(--ff-space-md);
  border-bottom: 1px solid var(--ff-border);
}

.options-group:last-child {
  margin-bottom: 0;
  padding-bottom: 0;
  border-bottom: none;
}

.options-group__title {
  font-size: 0.6875rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--ff-muted);
  margin: 0 0 var(--ff-space-md);
}

.control-row {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--ff-space-md);
  margin-bottom: var(--ff-space-md);
}

.control-row:last-child {
  margin-bottom: 0;
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: var(--ff-space-xs);
  font-size: 0.8125rem;
  color: var(--ff-text);
  cursor: pointer;
}

.checkbox-label input[type="checkbox"] {
  width: 1rem;
  height: 1rem;
  accent-color: var(--ff-accent);
  cursor: pointer;
}
</style>
