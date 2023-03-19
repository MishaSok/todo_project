import React from 'react'
import ButtonProps from './Button.types'
import classNames from 'classnames'
import Typography from '../Typography'
import './Button.scss'

function Button({ className, icon, children, variant, type, onClick }: ButtonProps) {
  const ButtonClassName = classNames('button', `button-${variant}`, className)

  const content =
    typeof children === 'string' ? (
      <Typography
        className="button__text"
        variant="title-h2-medium"
      >
        {children}
      </Typography>
    ) : (
      children
    )

  return (
    <button
      className={ButtonClassName}
      onClick={onClick}
      type={type}
    >
      {icon}

      {content}
    </button>
  )
}

export default Button
