import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type Folder = {
  id: number
  folderName: string
}

interface FolderState {
  folders: Folder[]
}

const initialState: FolderState = {
  folders: [],
}

const foldersSlice = createSlice({
  name: 'folders',
  initialState,
  reducers: {
    setFolders(state, action: PayloadAction<Folder[]>) {
      state.folders = action.payload
    },
  },
})

export default foldersSlice.reducer
export const {} = foldersSlice.actions
