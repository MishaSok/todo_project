import {
  View,
  TextInput,
  StyleSheet,
  Text,
  Button,
  TouchableOpacity,
  Keyboard,
  Alert,
} from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import axios from 'axios/index'

function LoginPage() {
  const navigation = useNavigation()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async () => {
    let status = ''
    let message = ''
    await axios
      .post('http://192.168.0.103:8000/api/login', {
        email: email,
        password: password,
      })
      .then((res) => {
        status = res.data.status
        message = res.data.message
      })

    switch (status) {
      case 'success':
        navigation.navigate('TasksPage')
      case 'failure':
        Alert.alert(message)
    }
  }

  return (
    <View style={styles.container}>
      <Text
        style={styles.title}
        onPress={() => Keyboard.dismiss()}
      >
        Login Page
      </Text>
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
      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text style={styles.forgot_button}>No account yet?</Text>
      </TouchableOpacity>
      <Button
        title="Login"
        onPress={handleLogin}
      />
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#fff',
    alignItems: 'center',
  },
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

export default LoginPage
