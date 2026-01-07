<script setup>
import { useBrandStore } from '@/stores/brandStore'
import { usePlayerStore } from '@/stores/playerStore'
import ColorInput from '@/components/controls/ColorInput.vue'
import SelectInput from '@/components/controls/SelectInput.vue'
import RangeSlider from '@/components/controls/RangeSlider.vue'

const brandStore = useBrandStore()
const playerStore = usePlayerStore()

const sizeOptions = [
  { value: 'sm', label: 'Small (40px)' },
  { value: 'md', label: 'Medium (56px)' },
  { value: 'lg', label: 'Large (72px)' },
]

const positionOptions = [
  { value: 'center', label: 'Center' },
  { value: 'bottom-left', label: 'Bottom Left' },
  { value: 'bottom-center', label: 'Bottom Center' },
  { value: 'bottom-right', label: 'Bottom Right' },
]

const animationOptions = [
  { value: 'none', label: 'None' },
  { value: 'circular', label: 'Circular Progress' },
  { value: 'pulse', label: 'Pulse' },
  { value: 'rings', label: 'Rings' },
]

const shapeOptions = [
  { value: 'pill', label: 'Circle' },
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

const applyChanges = () => {
  brandStore.applyCssVariables()
}
</script>

<template>
  <div class="options-panels">
    <!-- Size & Position -->
    <div class="options-group">
      <h4 class="options-group__title">Size & Position</h4>
      <div class="control-row">
        <SelectInput
          v-model="playerStore.mini.size"
          label="Size"
          :options="sizeOptions"
        />
        <SelectInput
          v-model="playerStore.mini.position"
          label="Position"
          :options="positionOptions"
        />
      </div>
    </div>

    <!-- Animation -->
    <div class="options-group">
      <h4 class="options-group__title">Animation</h4>
      <div class="control-row">
        <SelectInput
          v-model="playerStore.mini.animation"
          label="Animation Type"
          :options="animationOptions"
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
      <div class="control-row" v-if="brandStore.buttonBorderThickness !== '0'">
        <ColorInput
          v-model="brandStore.buttonBorderColor"
          label="Border Color"
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
</style>
