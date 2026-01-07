/**
 * Shared option arrays for player configuration
 * Used across FullPlayerOptions, MiniPlayerOptions, PillPlayerOptions
 */

export const shapeOptions = [
  { value: 'pill', label: 'Pill' },
  { value: 'rounded', label: 'Rounded' },
  { value: 'square', label: 'Square' },
  { value: 'custom', label: 'Custom' },
]

export const paddingOptions = [
  { value: 'tight', label: 'Tight' },
  { value: 'normal', label: 'Normal' },
  { value: 'spacious', label: 'Spacious' },
  { value: 'custom', label: 'Custom' },
]

export const thicknessOptions = [
  { value: '0', label: 'None' },
  { value: '1px', label: '1px' },
  { value: '2px', label: '2px' },
  { value: '3px', label: '3px' },
]

export const waveformOptions = [
  { value: 'bars', label: 'Bars' },
  { value: 'dots', label: 'Dots' },
  { value: 'smooth', label: 'Smooth' },
  { value: 'line', label: 'Line' },
  { value: 'blob', label: 'Blob' },
  { value: 'progress', label: 'Progress' },
]

export const waveThicknessOptions = [
  { value: 'thin', label: 'Thin' },
  { value: 'normal', label: 'Normal' },
  { value: 'thick', label: 'Thick' },
]

export const timeFormatOptions = [
  { value: 'elapsed-total', label: '0:00 / 1:00' },
  { value: 'elapsed', label: '0:00' },
  { value: 'remaining', label: '-1:00' },
  { value: 'seconds', label: '0s' },
  { value: 'mm-ss', label: '00:00' },
  { value: 'total-only', label: '1:00' },
]

export const sizeOptions = {
  mini: [
    { value: 'sm', label: 'Small (40px)' },
    { value: 'md', label: 'Medium (56px)' },
    { value: 'lg', label: 'Large (72px)' },
  ],
  pill: [
    { value: 'xs', label: 'Extra Small (28px)' },
    { value: 'sm', label: 'Small (36px)' },
    { value: 'md', label: 'Medium (44px)' },
    { value: 'lg', label: 'Large (56px)' },
    { value: 'custom', label: 'Custom' },
  ],
}

export const positionOptions = [
  { value: 'center', label: 'Center' },
  { value: 'bottom-left', label: 'Bottom Left' },
  { value: 'bottom-center', label: 'Bottom Center' },
  { value: 'bottom-right', label: 'Bottom Right' },
]

export const animationOptions = [
  { value: 'none', label: 'None' },
  { value: 'pulse', label: 'Pulse' },
  { value: 'rings', label: 'Rings' },
]
