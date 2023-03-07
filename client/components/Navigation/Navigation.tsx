import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'
import TasksPage from '../../pages/TasksPage/TasksPage'
import RegisterPage from '../../pages/RegisterPage/RegisterPage'
import LoginPage from '../../pages/LoginPage/LoginPage'

const Stack = createNativeStackNavigator()

function Navigation() {
  const isLoggedIn = false

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <>
          <Stack.Screen
            name={'TasksPage'}
            component={TasksPage}
          />
          <Stack.Screen
            name={'Login'}
            component={LoginPage}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name={'Register'}
            component={RegisterPage}
            options={{ headerShown: false }}
          />
        </>
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Navigation
