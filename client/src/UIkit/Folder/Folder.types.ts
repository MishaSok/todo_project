import { IconNameTypes } from '../../types/Icon.types'

interface FolderProps {
  className?: string
  folderName: string
  id: number | string
  activeFolder: number | string
  onClick?: () => void
  icon?: IconNameTypes
}

export default FolderProps
