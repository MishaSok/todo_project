import React from 'react'
import SideBar from '../../components/SideBar'
import TaskList from '../../components/TaskList'
import TaskBar from '../../components/TaskBar'

import './MainPage.scss'

function MainPage() {
  return (
    <div className="main-page">
      <SideBar />
      <TaskList />
      <TaskBar />
    </div>
  )
}

export default MainPage
