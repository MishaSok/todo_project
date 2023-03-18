import React from 'react'
import Typography from '../Typography/Typography'
import classNames from 'classnames'
import ButtonProps from './Button.types'
import './Button.scss'

function Button({ className, icon, children, type, onClick }: ButtonProps) {
  const ButtonClassName = classNames('button', `button-${type}`, className)

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
      type="button"
      className={ButtonClassName}
      onClick={onClick}
    >
      {icon}

      {content}
    </button>
  )
}

export default Button
