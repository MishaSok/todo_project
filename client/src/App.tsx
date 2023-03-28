import React from 'react'
import { Route, Routes } from 'react-router-dom'
import RegisterPage from './pages/RegisterPage'
import LoginPage from './pages/LoginPage'
import MainPage from './pages/MainPage'
import './App.css'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={<MainPage />}
        />
        <Route
          path="/register"
          element={<RegisterPage />}
        />
        <Route
          path="/login"
          element={<LoginPage />}
        />
      </Routes>
    </div>
  )
}

export default App
