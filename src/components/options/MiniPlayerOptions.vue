<script setup>
import { useBrandStore } from '@/stores/brandStore'
import { usePlayerStore } from '@/stores/playerStore'
import {
  shapeOptions,
  thicknessOptions,
  sizeOptions,
  positionOptions,
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
</script>

<template>
  <div class="options-panels">
    <!-- Theme Selector -->
    <ThemeSelector />

    <!-- Size & Position -->
    <OptionsGroup title="Size & Position">
      <div class="control-row">
        <SelectInput
          v-model="playerStore.mini.size"
          label="Size"
          :options="sizeOptions.mini"
        />
        <SelectInput
          v-model="playerStore.mini.position"
          label="Position"
          :options="positionOptions"
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
      <div class="control-row" v-if="brandStore.buttonBorderThickness !== '0'">
        <ColorInput
          v-model="brandStore.buttonBorderColor"
          label="Border Color"
          @update:model-value="applyChanges"
        />
      </div>
    </OptionsGroup>
  </div>
</template>
