import { View, TextInput, StyleSheet, Text, Alert, Button, TouchableOpacity } from 'react-native'
import { useState } from 'react'

function AuthPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return (
    <View>
      <Text style={styles.title}>Login Page</Text>
      <View>
        <TextInput
          placeholder="Email"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
        />
      </View>
      <View>
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry={true}
          value={password}
          textContentType="password"
          onChangeText={setPassword}
        />
      </View>
      <TouchableOpacity>
        <Text style={styles.forgot_button}>Forgot Password?</Text>
      </TouchableOpacity>
      <Button
        title="Login"
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
  forgot_button: {
    textAlign: 'center',
    height: 30,
    marginBottom: 30,
  },
})

export default AuthPage
