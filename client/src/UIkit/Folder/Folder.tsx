import React, { useState } from 'react'
import FolderProps from './Folder.types'
import Icon from '../Icon'
import Typography from '../Typography'
import './Folder.scss'
import axios from 'axios'
import { useAppDispatch } from '../../store/hooks/hooks'
import { removeFolder } from '../../store/Reducers/FoldersReducer/FoldersSlice'

function Folder({ id, activeFolder, className, folderName, onClick, icon }: FolderProps) {
  const [hover, setHover] = useState(false)

  const dispatch = useAppDispatch()

  const onDeleteFolder = async () => {
    await axios
      .delete('http://192.168.0.103:8000/api/folder', {
        data: {
          user_id: localStorage.getItem('userId'),
          folder_name: folderName,
        },
      })
      .then((res) => console.log(res))
    dispatch(removeFolder(id))
  }

  return (
    <div
      className={`folder ${activeFolder === id ? 'active' : ''}`}
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <Typography
        variant="title-h2-medium"
        color={activeFolder === id ? 'gray-color-0' : 'gray-color-80'}
      >
        {folderName}
      </Typography>
      {hover && id !== 'Archive' && id !== 'Main Tasks' ? (
        <Icon
          onClick={onDeleteFolder}
          iconName="close"
          color={activeFolder === id ? 'gray-color-0' : 'gray-color-100'}
        />
      ) : (
        <></>
      )}
    </div>
  )
}

export default Folder
