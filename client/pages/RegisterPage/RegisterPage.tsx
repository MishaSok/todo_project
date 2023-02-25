import { View, Button, TextInput, StyleSheet, Text, StatusBar } from 'react-native'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
function RegisterPage() {
  const navigation = useNavigation()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confPassword, setConfPassword] = useState('')
  const [refresh, setRefresh] = useState('')
  const [access, setAccess] = useState('')

  const validation = () => {
    if (password === confPassword) {
      return true
    }
    return false
  }

  const storeData = async (key: string, value: string) => {
    try {
      await AsyncStorage.setItem(key, value)
    } catch (e) {
      console.error(e)
    }
  }

  const getData = async (key: string) => {
    try {
      const value = await AsyncStorage.getItem(key)
      console.log(value)
      if (value !== null) {
        console.log(value)
      }
    } catch (e) {
      console.error(e)
    }
  }
  const handleRegister = async () => {
    let status = ''
    if (validation()) {
      await axios
        .post('http://192.168.0.103:8000/api/register_user', {
          email: email,
          password: password,
        })
        .then((res) => (status = res.data.status))
      if (status === 'success') {
        await axios
          .post('http://192.168.0.103:8000/api/token', {
            email: email,
            password: password,
          })
          .then(async (res) => {
            setRefresh(res.data.refresh)
            setAccess(res.data.access)
            navigation.navigate('Login')
          })
      } else {
        console.log('бэкенд хуйня ебаная')
      }
    } else {
      console.log('pizda')
    }
  }
  useEffect(() => {
    if (access && refresh) {
      storeData('access', access)
      storeData('refresh', refresh)
    }
  }, [access, refresh])

  return (
    <View style={styles.container}>
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
        onPress={handleRegister}
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
})

export default RegisterPage
