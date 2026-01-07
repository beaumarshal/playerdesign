<script setup>
import { useBrandStore } from '@/stores/brandStore'
import { usePlayerStore } from '@/stores/playerStore'
import ColorInput from '@/components/controls/ColorInput.vue'
import SelectInput from '@/components/controls/SelectInput.vue'
import RangeSlider from '@/components/controls/RangeSlider.vue'

const brandStore = useBrandStore()
const playerStore = usePlayerStore()

const sizeOptions = [
  { value: 'xs', label: 'Extra Small (28px)' },
  { value: 'sm', label: 'Small (36px)' },
  { value: 'md', label: 'Medium (44px)' },
  { value: 'lg', label: 'Large (56px)' },
  { value: 'custom', label: 'Custom' },
]

const shapeOptions = [
  { value: 'pill', label: 'Pill' },
  { value: 'rounded', label: 'Rounded' },
  { value: 'square', label: 'Square' },
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

const applyChanges = () => {
  brandStore.applyCssVariables()
}
</script>

<template>
  <div class="options-panels">
    <!-- Size -->
    <div class="options-group">
      <h4 class="options-group__title">Size</h4>
      <div class="control-row">
        <SelectInput
          v-model="playerStore.pill.size"
          label="Size"
          :options="sizeOptions"
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
    </div>

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
      </div>
    </div>

    <!-- Waveform -->
    <div class="options-group">
      <h4 class="options-group__title">Waveform</h4>
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
