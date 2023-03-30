import React, { useState } from 'react'
import Icon from '../../UIkit/Icon'
import CheckBoxInput from '../../UIkit/Inputs/CheckBoxInput'
import Typography from '../../UIkit/Typography'
import NoTaskImage from '../../assets/images/no-tasks.png'
import { useAppSelector } from '../../store/hooks/hooks'

import './TaskBar.scss'

function TaskBar() {
  const [checked, setChecked] = useState(false)

  const { tasks, activeTask } = useAppSelector((state) => state.tasksSlice)

  const currentTaskIndex = tasks.findIndex((el) => el.id === activeTask)
  const currentTask = tasks[currentTaskIndex]

  return (
    <div className="task-bar">
      {activeTask ? (
        <>
          <Typography variant="title-h1-medium">{currentTask.name}</Typography>
          <Typography
            className="task-bar__folder"
            variant="title-h2-medium"
            color="gray-color-80"
          >
            {currentTask.folderName}
          </Typography>
          <div className="task-bar__time">
            <div className="task-bar__time-item">
              <Typography
                variant="text-regular"
                color="gray-color-80"
              >
                сегодня
              </Typography>
              <Typography variant="time-regular">{currentTask.timeToday}</Typography>
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
              <Typography variant="time-regular">{currentTask.timeTotal}</Typography>
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
