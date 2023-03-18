import React from 'react'
import Typography from '../../components/Typography'
import Button from '../../components/Button'
import './LoginPage.scss'

function LoginPage() {
  return (
    <div className="login-page">
      <div className="login-page__wrapper">
        <Typography
          className="login-page__title"
          variant="title-h2-medium"
        >
          Log in
        </Typography>

        <form className="login-page__form">
          <input
            placeholder="email"
            type="text"
          />
          <input
            placeholder="password"
            type="password"
          />
          <Button
            className="login-page__button"
            type="primary"
          >
            Button
          </Button>
        </form>
      </div>
    </div>
  )
}

export default LoginPage
