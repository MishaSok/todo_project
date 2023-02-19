import { View, Button, TextInput, StyleSheet, Alert, Text } from 'react-native'
import { useState } from 'react'

function RegisterPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confPassword, setConfPassword] = useState('')

  return (
    <View>
      <Text style={styles.title}>Register Page</Text>
      <View>
        <TextInput
          style={styles.input}
          value={email}
          placeholder="Email..."
          onChangeText={(email) => setEmail(email)}
        />
      </View>
      <View>
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry={true}
          value={password}
          textContentType="password"
          onChangeText={(password) => setPassword(password)}
        />
      </View>
      <View>
        <TextInput
          style={styles.input}
          placeholder="Confirm password"
          secureTextEntry={true}
          value={confPassword}
          textContentType="password"
          onChangeText={(confPassword) => setConfPassword(confPassword)}
        />
      </View>
      <Button
        title="Register"
        onPress={() => Alert.alert('хуй')}
      />
    </View>
  )
}
const styles = StyleSheet.create({
  input: {
    width: 200,
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 12,
  },
  title: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,
  },
})

export default RegisterPage
