import React, { useEffect, useRef, useState } from 'react'
import Icon from '../../UIkit/Icon'
import Typography from '../../UIkit/Typography'
import Task from '../Task'
import SortPopUp from '../SortPopUp'
import { useAppDispatch, useAppSelector } from '../../store/hooks/hooks'

import { addTask, setActiveTask, setTasks } from '../../store/Reducers/TasksReducer/TasksReducer'
import axios from 'axios'
import { FolderType, setFolders } from '../../store/Reducers/FoldersReducer/FoldersSlice'
import { TaskType } from '../../store/Reducers/TasksReducer/TasksReducer'
import './TaskList.scss'

function TaskList() {
  const [inputValue, setInputValue] = useState('Добавить задачу')
  const [inputOpened, setInputOpened] = useState(false)
  const [sortOpened, setSortOpened] = useState(false)

  const inputRef = useRef<HTMLInputElement>(null)

  const dispatch = useAppDispatch()
  const tasks = useAppSelector((state) => state.tasksSlice.tasks)
  const { activeFolder } = useAppSelector((state) => state.foldersSlice)

  useEffect(() => {
    const userId = localStorage.getItem('userId')
    let folders: FolderType[] = []
    let tasks: TaskType[] = []

    const getData = async () => {
      await axios.get(`http://192.168.0.103:8000/api/init/${userId}`).then((res) => {
        folders = res.data.folders
        tasks = res.data.tasks
      })
      dispatch(setFolders(folders))
      dispatch(setTasks(tasks))
    }
    getData()
  }, [dispatch])

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [inputOpened])

  const handleOnClick = () => {
    setInputOpened(true)
    setInputValue('')
  }

  const handleOnSubmit = async (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault()
    await axios
      .post(`http://192.168.0.103:8000/api/tasks`, {
        user_id: localStorage.getItem('userId'),
        folder_id: activeFolder,
        task_text: inputValue,
      })
      .then((res) =>
        dispatch(
          addTask({
            id: res.data.id,
            name: res.data.name,
            completed: res.data.completed,
            folderName: res.data.folderName,
            timeToday: res.data.timeToday,
            timeTotal: res.data.timeTotal,
          }),
        ),
      )

    setInputOpened(false)
    setInputValue('Добавить задачу')
  }

  const onTaskClick = (task: TaskType) => {
    dispatch(setActiveTask(task.id))
  }

  return (
    <div className="main">
      <div className="main__sort">
        <div className="main__folder">Задачи Дениса</div>
        <div
          className="main__sort-title"
          onClick={() => setSortOpened((state) => !state)}
        >
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
          {sortOpened && <SortPopUp className="main__sort__popup" />}
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
      {tasks.map((task) => (
        <Task
          onClick={() => onTaskClick(task)}
          key={task.id}
          taskName={task.name}
          taskId={task.id}
          taskTotalTime={task.timeTotal}
        />
      ))}
    </div>
  )
}

export default TaskList
