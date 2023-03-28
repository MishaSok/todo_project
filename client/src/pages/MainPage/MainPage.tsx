import React from 'react'
import SideBar from '../../components/SideBar'
import TaskList from '../../components/TaskList'
import TaskBar from '../../components/TaskBar'
import Header from '../../components/Header'

import './MainPage.scss'

function MainPage() {
  return (
    <div className="main-page">
      <Header />
      <div className="main-page__content">
        <SideBar />
        <TaskList />
        <TaskBar />
      </div>
    </div>
  )
}

export default MainPage
