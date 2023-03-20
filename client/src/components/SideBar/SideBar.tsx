import React, { useRef, useState } from 'react'
import './SideBar.scss'
import Icon from '../../UIkit/Icon'
import Folder from '../../UIkit/Folder'

function SideBar() {
  const [inputValue, setInputValue] = useState('Добавить папку')
  const [inputOpened, setInputOpened] = useState(false)
  const inputRef = useRef(null)

  const handleOnSubmit = () => {
    setInputOpened(false)
    setInputValue('Добавить папку')
  }
  const handleOnClick = () => {
    setInputOpened(true)
    setInputValue('')
  }
  const limitFolderName = (folderName: string) => {
    if (folderName.length >= 12) {
      let slicedFolderName = folderName.slice(0, 12)
      return `${slicedFolderName}...`
    }
    return folderName
  }

  const folders = [
    {
      id: 1,
      folderName: 'Задачи бэкера',
    },
    {
      id: 2,
      folderName: 'Задачи бэкера',
    },
    {
      id: 3,
      folderName: 'Задачи бэкера',
    },
    {
      id: 4,
      folderName: 'Задачи бэкера',
    },
    {
      id: 5,
      folderName: 'Задачи бэкера',
    },
    {
      id: 6,
      folderName: 'Задачи бэкера',
    },
  ]

  return (
    <div className="sidebar">
      <div className="sidebar__top ">
        <Icon
          iconName="folderPlus"
          color="gray-color-80"
        />
        {inputOpened ? (
          <div className="sidebar__top-input">
            <form onSubmit={handleOnSubmit}>
              <input
                type="text"
                onChange={(e) => setInputValue(e.target.value)}
                value={inputValue}
                ref={inputRef}
                maxLength={32}
              />
            </form>
          </div>
        ) : (
          <div onClick={handleOnClick}>{inputValue}</div>
        )}
      </div>
      <div className="sidebar__items">
        {folders.map((folder, index) => (
          <Folder
            folderName={limitFolderName(folder.folderName)}
            id={folder.id}
            key={index}
          />
        ))}
      </div>
    </div>
  )
}

export default SideBar
