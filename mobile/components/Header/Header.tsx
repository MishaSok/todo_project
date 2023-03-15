import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import { Ionicons } from '@expo/vector-icons'

function Header() {
  return (
    <View style={styles.container}>
      <Ionicons
        name="ios-logo-apple"
        size={24}
        color="blue"
      />
      <View style={styles.titleWrapper}>
        <Text>Create UI-kit | </Text>
        <Text style={styles.time}>00:20:42</Text>
      </View>
      <AntDesign
        name="pause"
        size={24}
        color="#205EFF"
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 60,
    padding: 20,
    width: '100%',
    backgroundColor: '#EEEEEE',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titleWrapper: {
    flexDirection: 'row',
  },
  time: {
    color: '#787878',
  },
})

export default Header
