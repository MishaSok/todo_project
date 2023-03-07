import React from 'react'
import { Text, View } from 'react-native'
import { Feather } from '@expo/vector-icons'

function SideBar() {
  const folders = [
    {
      folderId: 1,
      folderName: 'Main',
    },
    {
      folderId: 2,
      folderName: 'Archive',
    },
    {
      folderId: 3,
      folderName: 'StartUp',
    },
  ]
  return (
    <View>
      <View>
        <Feather
          name="folder-plus"
          size={24}
          color="#787878"
        />
      </View>
      <Text>Add folder</Text>
      <View>
        {folders.map((folder) => (
          <View key={folder.folderId}>
            <Text>{folder.folderName}</Text>
          </View>
        ))}
      </View>
    </View>
  )
}

export default SideBar
