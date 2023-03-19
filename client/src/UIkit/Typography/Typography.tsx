import React from 'react'
import classNames from 'classnames'
import TypographyProps from './Typography.types'
import './Typography.scss'
import { getColorAsCSSVariable } from '../../utils/colorUtils'

function Typography({ className, variant, children, color }: TypographyProps) {
  const TypographyClassName = classNames('typography', `typography-${variant}`, className)
  const typographyStyle: React.CSSProperties = {}

  if (color) {
    typographyStyle.color = getColorAsCSSVariable(color)
  }

  return (
    <p
      className={TypographyClassName}
      style={typographyStyle}
    >
      {children}
    </p>
  )
}

export default Typography
