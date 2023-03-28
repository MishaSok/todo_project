import React, { useEffect, useRef, useState } from 'react'
import Icon from '../../UIkit/Icon'
import Folder from '../../UIkit/Folder'
import { useAppDispatch, useAppSelector } from '../../store/hooks/hooks'
import { addFolder, setActiveFolder } from '../../store/Reducers/FoldersReducer/FoldersSlice'
import axios from 'axios'
import './SideBar.scss'

function SideBar() {
  const [sideBarOpened, setSideBarOpened] = useState(false)
  const [inputValue, setInputValue] = useState('Добавить папку')
  const [inputOpened, setInputOpened] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const dispatch = useAppDispatch()
  const { folders, activeFolder } = useAppSelector((state) => state.foldersSlice)

  const handleOnSubmit = async (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault()
    let folderId: number = 0
    await axios
      .post('http://192.168.0.103:8000/api/folder', {
        user_id: localStorage.getItem('userId'),
        folder_name: inputValue,
      })
      .then((res) => (folderId = res.data.folder_id))
    dispatch(
      addFolder({
        id: folderId,
        folderName: inputValue,
      }),
    )
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
        {folders.map((folder) => (
          <Folder
            folderName={limitFolderName(folder.folderName)}
            onClick={() => dispatch(setActiveFolder(folder.id))}
            activeFolder={activeFolder}
            id={folder.id}
            key={folder.id}
          />
        ))}
        <Folder
          id={'Main Tasks'}
          onClick={() => dispatch(setActiveFolder('Main Tasks'))}
          activeFolder={activeFolder}
          folderName="Основные задачи"
        />
        <Folder
          id={'Archive'}
          onClick={() => dispatch(setActiveFolder('Archive'))}
          activeFolder={activeFolder}
          folderName="Архив"
          icon="archive"
        />
      </div>
    </div>
  )
}

export default SideBar
