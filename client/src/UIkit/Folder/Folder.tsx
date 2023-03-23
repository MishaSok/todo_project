import React, { useState } from 'react'
import FolderProps from './Folder.types'
import Icon from '../Icon'
import Typography from '../Typography'
import './Folder.scss'

function Folder({ id, activeFolder, className, folderName, onClick, icon }: FolderProps) {
  const [hover, setHover] = useState(false)

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
      {hover && id !== 'archive' && id !== 'main' ? (
        <Icon
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
