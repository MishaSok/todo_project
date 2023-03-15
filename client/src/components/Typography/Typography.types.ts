import TypographyVariants from '../../types/TypographyVariant.types'
import { ColorNamesTypes } from '../../types/Color.types'

interface TypographyProps {
  className?: string
  color?: ColorNamesTypes
  children?: React.ReactNode
  variant?: TypographyVariants
}

export default TypographyProps
