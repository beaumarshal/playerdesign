# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

44.audio Player Builder - A Vue 3 interactive builder for designing audio players (Full, Mini, Pill variants) with real-time customization and theme support.

## Commands

```bash
npm run dev      # Start dev server at http://localhost:5173
npm run build    # Production build
npm run preview  # Preview production build
```

## Architecture

### Tech Stack
- Vue 3 with Composition API (`<script setup>`)
- Pinia for state management
- Vite for build tooling
- CSS variables for theming (no CSS-in-JS)

### Three-Store Pattern

**builderStore** - UI state (theme, active player type, collapsed steps, preview width)
- Handles system dark mode detection via `initTheme()`
- Sets `data-theme` attribute on document root

**playerStore** - Player-specific options per variant
- `full`: transcript settings
- `mini`: size, position, animation
- `pill`: size with custom scaling
- Getters return CSS classes (`miniSizeClass`, `miniPositionClass`)

**brandStore** - Visual styling (colors, shapes, waveform)
- `applyCssVariables()` syncs all styling to CSS custom properties
- Computed getters convert enum values to CSS (`buttonRadius`, `playerRadius`)

### Data Flow
```
User Input → Store Mutation → Computed Properties → CSS Variables → Visual Update
```

Option panels call `brandStore.applyCssVariables()` after color changes to sync CSS.

### Component Organization

```
src/components/
├── layout/      # BuilderHeader, ControlsPanel, PreviewPanel
├── controls/    # Reusable inputs (ColorInput, SelectInput, RangeSlider, OptionsGroup)
├── options/     # Player-specific option panels (FullPlayerOptions, etc.)
├── players/     # Player preview components (FullPlayer, MiniPlayer, PillPlayer)
├── preview/     # ResponsivePreview with drag-to-resize
└── examples/    # Use case example cards
```

### Composables

**useOptionArrays.js** - Centralized dropdown options (shapes, sizes, waveform types)

**useWaveform.js** - Generates waveform bars with ResizeObserver for responsive regeneration

### CSS Architecture

Three CSS files with distinct purposes:
- `fortyfour.css` - Builder UI (nav, cards, buttons, forms) using `--ff-*` variables
- `players.css` - Player component styles using `--player-*` variables
- `options.css` - Shared option panel styles

**Important:** fortyfour.css styles the builder UI only, NOT the player components. Keep these separated.

### Design System (Desert Waveform Palette)

Golden ratio spacing: `--ff-space-xs` (0.382rem) through `--ff-space-2xl` (4.236rem)

Colors:
- Accent: `#c4956a` (warm amber)
- Background: `#faf8f5` (sand)
- Text: `#2c2620` (warm charcoal)
- Border: `#d9d4cc`

Dark mode uses `data-theme="dark"` attribute with automatic system preference detection.

## Patterns

### Adding a Brand Property
1. Add to `brandStore` state with default value
2. Add computed getter if transformation needed
3. Include in `cssVariables` getter
4. Add control in appropriate options panel
5. Reference via CSS variable in player styles

### v-model with Store
```vue
<ColorInput
  v-model="brandStore.buttonColor"
  @update:model-value="applyChanges"
/>
```

### Player Type Switching
Options panels use `v-show` (not `v-if`) to preserve state when switching between player types.

### Waveform Usage
```javascript
const { waveformRef, bars } = useWaveform({ barWidth: 4, gap: 2 })
// Template: ref="waveformRef" on container, v-for="height in bars"
```
