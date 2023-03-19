import React from 'react'
import Typography from '../../UIkit/Typography'
import Button from '../../UIkit/Button'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import './RegisterPage.scss'

interface IRegisterFields {
  email: string
  password: string
  confirm_password: string
}
function RegisterPage() {
  const { register, handleSubmit } = useForm<IRegisterFields>()

  const onSubmit: SubmitHandler<IRegisterFields> = (data, e) => {
    console.log(data, e)
  }

  return (
    <div className="register-page">
      <div className="register-page__wrapper">
        <Typography
          className="register-page__title"
          variant="title-h2-medium"
        >
          Register
        </Typography>

        <form
          className="register-page__form"
          onSubmit={handleSubmit(onSubmit)}
        >
          <input
            placeholder="email"
            type="text"
            {...(register('email'),
            {
              required: true,
            })}
          />
          <input
            placeholder="password"
            type="text"
            {...(register('password'),
            {
              required: true,
            })}
          />
          <input
            placeholder="confirm password"
            type="text"
            {...(register('confirm_password'),
            {
              required: true,
            })}
          />
          <Button
            className="register-page__button"
            variant="primary"
            type="submit"
          >
            Submit
          </Button>
        </form>
        <Link to="/login">
          <Typography className="register-page__subtitle">Already have an account?</Typography>
        </Link>
      </div>
    </div>
  )
}

export default RegisterPage
