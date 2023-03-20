import React, { useState } from 'react'
import FolderProps from './Folder.types'
import classNames from 'classnames'
import Icon from '../Icon'
import Typography from '../Typography'
import './Folder.scss'

function Folder({ id, className, folderName }: FolderProps) {
  const [activeFolder, setActiveFolder] = useState<number>()
  const FolderClassName = classNames(
    'folder',
    {
      'folder active': activeFolder === id,
    },
    className,
  )

  const handleOnClick = () => {
    setActiveFolder(id)
    console.log(activeFolder)
  }

  return (
    <div
      className={FolderClassName}
      onClick={handleOnClick}
    >
      <Typography
        variant="title-h2-medium"
        color="gray-color-80"
      >
        {folderName}
      </Typography>
      <Icon iconName="close" />
    </div>
  )
}

export default Folder
