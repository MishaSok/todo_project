import React from 'react'
import classNames from 'classnames'
import './Typography.scss'
import TypographyProps from './Typography.types'

function Typography({ className, variant, children, color }: TypographyProps) {
  const TypographyClassName = classNames('typography', `typography-${variant}`, className)

  let customStyle
  if (color) {
    customStyle = {
      color: color,
    }
  }

  return (
    <p
      className={TypographyClassName}
      style={{ ...customStyle }}
    >
      {children}
    </p>
  )
}

export default Typography
