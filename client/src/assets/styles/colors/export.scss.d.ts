export type Colors = {
  'primary-color': string
  'primary-focus-color': string
  'secondary-color': string
  'error-color': string
  'success-color': string
  'gray-color-0': string
  'gray-color-20': string
  'gray-color-40': string
  'gray-color-60': string
  'gray-color-80': string
  'gray-color-100': string
}

export type ColorNames = keyof Colors

declare const styles: Colors

export default styles
