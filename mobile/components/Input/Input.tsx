import React, { ChangeEvent } from 'react'
import { StyleSheet, TextInput, View } from 'react-native'
import InputProps from './Input.types'

function Input({ value, setValue, placeholder = 'Add new task' }: InputProps) {
  const changeHandler = (text: string) => {
    if (setValue) {
      setValue(text)
    }
  }
  return (
    <View style={styles.container}>
      <TextInput
        placeholder={placeholder}
        style={styles.input}
        value={value}
        onChangeText={(text) => changeHandler(text)}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: 200,
  },
  input: {
    padding: 10,
    fontSize: 20,
    lineHeight: 24,
    maxLength: 40,
  },
})

export default Input
