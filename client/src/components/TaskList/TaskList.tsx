import React, { useEffect, useRef, useState } from 'react'
import Icon from '../../UIkit/Icon'
import Typography from '../../UIkit/Typography'
import Task from '../Task'

import './TaskList.scss'

function TaskList() {
  const [inputValue, setInputValue] = useState('Добавить задачу')
  const [inputOpened, setInputOpened] = useState(false)

  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [inputOpened])

  const handleOnClick = () => {
    setInputOpened(true)
    setInputValue('')
  }

  const handleOnSubmit = () => {
    setInputOpened(false)
    setInputValue('Добавить задачу')
  }
  return (
    <div className="main">
      <div className="main__sort">
        <div className="main__folder">Задачи Дениса</div>
        <div className="main__sort-title">
          <Icon
            iconName="sorting"
            color="primary-color"
          />
          <Typography
            variant="title-h2-medium"
            color="primary-color"
          >
            Сортировка
          </Typography>
        </div>
      </div>

      <div className="main__titles">
        <Typography
          variant="text-regular"
          color="gray-color-80"
        >
          задача
        </Typography>
        <Typography
          variant="text-regular"
          color="gray-color-80"
        >
          время
        </Typography>
      </div>

      <div className="main__task">
        <Icon
          iconName="plus"
          color="gray-color-80"
        />
        {inputOpened ? (
          <form onSubmit={handleOnSubmit}>
            <input
              type="text"
              onChange={(e) => setInputValue(e.target.value)}
              value={inputValue}
              ref={inputRef}
              maxLength={64}
            />
          </form>
        ) : (
          <div onClick={handleOnClick}>{inputValue}</div>
        )}
      </div>
      <Task
        taskName="Сделать UI-kit"
        taskTotalTime="03:12:12"
      />
      <Task
        taskName="Сделать UI-kit"
        taskTotalTime="03:12:12"
      />
      <Task
        taskName="Сделать UI-kit"
        taskTotalTime="03:12:12"
      />
      <Task
        taskName="Сделать UI-kit"
        taskTotalTime="03:12:12"
      />
      {/*{filteredTasks.map((task) => (*/}
      {/*  <Task*/}
      {/*    key={uuid()}*/}
      {/*    taskName={task.name}*/}
      {/*    taskTotalTime={task.total_time}*/}
      {/*    taskId={task.id}*/}
      {/*    activeFolderId={activeFolderId}*/}
      {/*  />*/}
      {/*))}*/}
    </div>
  )
}

export default TaskList
