import React from 'react'
import Typography from '../../components/Typography'
import Button from '../../components/Button'
import './RegisterPage.scss'

function RegisterPage() {
  return (
    <div className="register-page">
      <div className="register-page__wrapper">
        <Typography
          className="register-page__title"
          variant="title-h2-medium"
        >
          Register
        </Typography>

        <form className="register-page__form">
          <input
            placeholder="email"
            type="text"
          />
          <input
            placeholder="password"
            type="text"
          />
          <input
            placeholder="confirm password"
            type="text"
          />
          <Button
            className="register-page__button"
            type="primary"
          >
            Button
          </Button>
        </form>
        <Typography>Already have an account?</Typography>
      </div>
    </div>
  )
}

export default RegisterPage
