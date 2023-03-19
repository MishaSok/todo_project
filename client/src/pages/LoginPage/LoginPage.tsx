import React from 'react'
import Typography from '../../UIkit/Typography'
import Button from '../../UIkit/Button'
import './LoginPage.scss'
import { SubmitHandler, useForm } from 'react-hook-form'

interface IRegisterFields {
  email: string
  password: string
}

function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IRegisterFields>()

  const onSubmit: SubmitHandler<IRegisterFields> = (data, e) => {
    console.log(data, e)
  }
  console.log(errors)
  return (
    <div className="login-page">
      <div className="login-page__wrapper">
        <Typography
          className="login-page__title"
          variant="title-h2-medium"
        >
          Log in
        </Typography>

        <form
          className="login-page__form"
          onSubmit={handleSubmit(onSubmit)}
        >
          <input
            placeholder="email"
            type="text"
            {...register('email', {
              required: 'email is required field',
            })}
          />
          <input
            placeholder="password"
            type="password"
            {...register('password', {
              required: 'email is required field',
            })}
          />
          <Button
            className="login-page__button"
            variant="primary"
          >
            Submit
          </Button>
        </form>
        {errors?.email && <Typography color="error-color">{errors.email.message}</Typography>}
      </div>
    </div>
  )
}

export default LoginPage
