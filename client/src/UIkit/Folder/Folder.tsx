import React, { useState } from 'react'
import FolderProps from './Folder.types'
import classNames from 'classnames'
import Icon from '../Icon'
import Typography from '../Typography'
import './Folder.scss'

function Folder({ id, className, folderName }: FolderProps) {
  const [activeFolder, setActiveFolder] = useState<any>()

  const handleClick = () => {
    setActiveFolder(id)
    console.log(`id ${id}, activeID ${activeFolder}`)
  }

  return (
    <div
      className={`folder ${activeFolder === id ? 'active' : ''}`}
      onClick={handleClick}
    >
      <Typography
        variant="title-h2-medium"
        color={activeFolder === id ? 'gray-color-0' : 'gray-color-80'}
      >
        {folderName}
      </Typography>
      <Icon iconName="close" />
    </div>
  )
}

export default Folder
