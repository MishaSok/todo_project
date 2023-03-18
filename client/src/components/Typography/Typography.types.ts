import { ColorNamesTypes } from '../../types/Color.types'

type TypographyVariants = 'title-h1-medium' | 'title-h2-medium' | 'text-regular' | 'time-regular'

interface TypographyProps {
  className?: string
  color?: ColorNamesTypes
  children?: React.ReactNode
  variant?: TypographyVariants
}

export default TypographyProps
