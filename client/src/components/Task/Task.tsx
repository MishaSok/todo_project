import React, { useState } from 'react'
import TaskProps from './Task.types'
import CheckBoxInput from '../../UIkit/Inputs/CheckBoxInput/CheckBoxInput'
import Typography from '../../UIkit/Typography'

import './Task.scss'

function Task({ taskName, taskTotalTime, taskId, onClick }: TaskProps) {
  const [checked, setChecked] = useState(false)

  const setCheckedState = () => {
    setChecked((prevState) => !prevState)
  }

  return (
    <div
      className="task"
      onClick={onClick}
    >
      <div className="task__title">
        <CheckBoxInput
          state={checked}
          onClick={setCheckedState}
        />
        <Typography
          color="gray-color-100"
          variant="text-regular"
        >
          {taskName}
        </Typography>
      </div>
      <Typography
        color="gray-color-80"
        variant="time-regular"
      >
        {taskTotalTime}
      </Typography>
    </div>
  )
}

export default Task
