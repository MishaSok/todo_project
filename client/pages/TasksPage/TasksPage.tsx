import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { SimpleLineIcons } from '@expo/vector-icons'
import { Feather } from '@expo/vector-icons'
import { AntDesign } from '@expo/vector-icons'
import Input from '../../components/Input/Input'

function TasksPage() {
  return (
    <View style={styles.container}>
      <View style={styles.headerWrapper}>
        <View style={styles.header}>
          <TouchableOpacity>
            <SimpleLineIcons
              name="folder"
              size={24}
              color="#787878"
            />
          </TouchableOpacity>
          <Text style={styles.title}>Main tasks</Text>
        </View>
        <TouchableOpacity>
          <Feather
            name="filter"
            size={24}
            color="#205EFF"
          />
        </TouchableOpacity>
      </View>
      <View style={styles.containerTitles}>
        <Text style={styles.containerTitles__title}>Task</Text>
        <Text style={styles.containerTitles__title}>Time</Text>
      </View>
      <View style={styles.addTaskContainer}>
        <AntDesign
          name="plus"
          size={24}
          color="#787878"
        />
        <Input />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingLeft: 24,
    paddingRight: 24,
  },
  headerWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 15,
    paddingBottom: 15,
  },
  header: {
    flexDirection: 'row',
  },
  title: {
    marginLeft: 20,
    fontSize: 24,
  },
  containerTitles: {
    paddingTop: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  containerTitles__title: {
    fontSize: 16,
    color: '#787878',
  },
  addTaskContainer: {
    paddingTop: 24,
    flexDirection: 'row',
    alignItems: 'center',
  },
})

export default TasksPage
