import React from 'react'
import Icon from '../../Icon'
import classNames from 'classnames'
import CheckBoxInputProps from './CheckBoxInput.types'

import './CheckBoxInput.scss'

function CheckBoxInput({ className, state, onClick }: CheckBoxInputProps) {
  const CheckboxInputClassName = classNames(
    'checkboxInput',
    state ? 'checkboxInput--checked' : '',
    className,
  )
  return (
    <div
      onClick={onClick}
      className={CheckboxInputClassName}
    >
      {state && (
        <Icon
          iconName="done"
          viewBox={35}
          color="gray-color-0"
        />
      )}
    </div>
  )
}

export default CheckBoxInput
