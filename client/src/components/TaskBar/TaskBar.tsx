import React, { useState } from 'react'
import Icon from '../../UIkit/Icon'
import CheckBoxInput from '../../UIkit/Inputs/CheckBoxInput'
import Typography from '../../UIkit/Typography'
import NoTaskImage from '../../assets/images/no-tasks.png'

import './TaskBar.scss'

function TaskBar() {
  const [checked, setChecked] = useState(false)
  const [activeTask, setActiveTask] = useState('')

  return (
    <div className="task-bar">
      {activeTask ? (
        <>
          <Typography variant="title-h1-medium">{activeTask}</Typography>
          <Typography
            className="task-bar__folder"
            variant="title-h2-medium"
            color="gray-color-80"
          >
            Основные задачи
          </Typography>
          <div className="task-bar__time">
            <div className="task-bar__time-item">
              <Typography
                variant="text-regular"
                color="gray-color-80"
              >
                сегодня
              </Typography>
              <Typography variant="time-regular">00:20:15</Typography>
            </div>
            <Icon
              iconName="stop"
              color="primary-color"
            />
            <div className="task-bar__time-item">
              <Typography
                variant="text-regular"
                color="gray-color-80"
              >
                всего
              </Typography>
              <Typography variant="time-regular">13:20:15</Typography>
            </div>
          </div>
          <div className="task-bar__tools">
            <div className="task-bar__tools-item">
              <CheckBoxInput
                className="task-bar__tools__checkbox"
                state={checked}
                onClick={() => setChecked((prevState) => !prevState)}
              />
              <Typography
                variant="title-h2-medium"
                color="primary-color"
              >
                Выполнено
              </Typography>
            </div>
            <div className="task-bar__tools-item">
              <Icon
                iconName="archive"
                color="primary-color"
              />
              <Typography
                variant="title-h2-medium"
                color="primary-color"
              >
                В архив
              </Typography>
            </div>
            <div className="task-bar__tools-item">
              <Icon
                iconName="trash"
                color="error-color"
              />
              <Typography
                variant="title-h2-medium"
                color="error-color"
              >
                Удалить задачу
              </Typography>
            </div>
          </div>
        </>
      ) : (
        <div className="no-tasks">
          <Typography variant="title-h1-medium">Нет открытых задач</Typography>
          <Typography
            className="no-tasks__desc"
            variant="text-regular"
            color="gray-color-80"
          >
            Откройте задачу, на которую планируете трекать время
          </Typography>
          <img
            className="no-tasks__img"
            src={NoTaskImage}
            alt="NoTaskImage"
          />
        </div>
      )}
    </div>
  )
}

export default TaskBar
