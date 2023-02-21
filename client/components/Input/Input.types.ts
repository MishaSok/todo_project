import React, { SetStateAction } from 'react'

interface InputProps {
  placeholder?: string
  value?: string
  setValue?: React.Dispatch<SetStateAction<string>>
}

export default InputProps
