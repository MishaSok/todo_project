import React, { useEffect, useRef, useState } from 'react'
import Icon from '../../UIkit/Icon'
import Folder from '../../UIkit/Folder'
import './SideBar.scss'

function SideBar() {
  const [sideBarOpened, setSideBarOpened] = useState(false)
  const [inputValue, setInputValue] = useState('Добавить папку')
  const [inputOpened, setInputOpened] = useState(false)
  const [activeFolder, setActiveFolder] = useState<any>('main')
  const inputRef = useRef<HTMLInputElement>(null)

  const handleOnSubmit = () => {
    setInputOpened(false)
    setInputValue('Добавить папку')
  }
  const handleOnClick = () => {
    setInputOpened(true)
    setInputValue('')
  }

  useEffect(() => {
    inputRef.current?.focus()
  }, [inputOpened])

  const limitFolderName = (folderName: string) => {
    if (folderName.length >= 15) {
      let slicedFolderName = folderName.slice(0, 15)
      return `${slicedFolderName}...`
    }
    return folderName
  }

  const folders = [
    {
      id: 1,
      folderName: 'Задачи Дениса',
    },
    {
      id: 2,
      folderName: 'Задачи Дениса',
    },
    {
      id: 3,
      folderName: 'Задачи Дениса',
    },
  ]
  if (!sideBarOpened) {
    return (
      <div className="sidebar__closed">
        <Icon
          onClick={() => setSideBarOpened(true)}
          iconName="folder"
          color="gray-color-80"
        />
      </div>
    )
  }

  return (
    <div className="sidebar">
      <div className="sidebar__top ">
        <Icon
          iconName="folderPlus"
          color="gray-color-80"
          onClick={() => setSideBarOpened(false)}
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
            onClick={() => setActiveFolder(folder.id)}
            activeFolder={activeFolder}
            id={folder.id}
            key={folder.id}
          />
        ))}
        <Folder
          id={'main'}
          onClick={() => setActiveFolder('main')}
          activeFolder={activeFolder}
          folderName="Основные задачи"
        />
        <Folder
          id={'archive'}
          onClick={() => setActiveFolder('archive')}
          activeFolder={activeFolder}
          folderName="Архив"
          icon="archive"
        />
      </div>
    </div>
  )
}

export default SideBar
