import { ColorNamesTypes } from '../types/Color.types'

function getColorAsCSSVariable(colorName: ColorNamesTypes) {
  return `var(--${colorName})`
}

export { getColorAsCSSVariable }
