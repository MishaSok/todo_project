import { StatusBar } from 'expo-status-bar'
import { StyleSheet, View } from 'react-native'
import Header from './components/Header/Header'
import TasksPage from './pages/TasksPage/TasksPage'

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Header />
      <TasksPage />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
})
