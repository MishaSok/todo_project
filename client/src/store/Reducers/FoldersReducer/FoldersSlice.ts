import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type Folder = {
  id: number | string
  folderName: string
}

interface FolderState {
  folders: Folder[]
  activeFolder: string | number
}

const initialState: FolderState = {
  folders: [],
  activeFolder: 'Main Tasks',
}

const foldersSlice = createSlice({
  name: 'folders',
  initialState,
  reducers: {
    setFolders(state, action: PayloadAction<Folder[]>) {
      state.folders = action.payload
    },
    addFolder(state, action: PayloadAction<Folder>) {
      state.folders.push(action.payload)
    },
    removeFolder(state, action: PayloadAction<number | string>) {
      const index = state.folders.findIndex((folder) => folder.id === action.payload)
      state.folders.splice(index, 1)
    },
    setActiveFolder(state, action: PayloadAction<string | number>) {
      state.activeFolder = action.payload
    },
  },
})

export default foldersSlice.reducer
export const { setFolders, removeFolder, addFolder, setActiveFolder } = foldersSlice.actions
