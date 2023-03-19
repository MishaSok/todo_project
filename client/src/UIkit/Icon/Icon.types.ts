import { ColorNamesTypes } from '../../types/Color.types'
import { IconNameTypes } from '../../types/Icon.types'

interface IconProps {
  className?: string

  iconName: IconNameTypes
  size?: number
  width?: number
  height?: number
  viewBox?: number
  color?: ColorNamesTypes
}
export default IconProps
