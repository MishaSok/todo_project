import { MouseEventHandler } from 'react'

type ButtonTypes = 'primary' | 'secondary'

type ButtonState =
  | 'primary-hover'
  | 'secondary-hover'
  | 'primary-disable'
  | 'secondary-disable'
  | 'primary-focus'
  | 'secondary-focus'

interface ButtonProps {
  className?: string
  children: React.ReactNode

  type?: ButtonTypes

  state?: ButtonState
  icon?: React.ReactNode

  onClick?: MouseEventHandler
}

export default ButtonProps
