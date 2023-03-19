import React from 'react'
import Typography from '../../UIkit/Typography'
import Logo from '../../assets/images/logo.svg'
import './Header.scss'
import Icon from '../../UIkit/Icon'

function Header() {
  return (
    <div className="header">
      <div className="header__logo">
        <img
          src={Logo}
          alt="logo"
        />
        <Typography
          variant="title-h1-medium"
          className="header__logo-title"
          color="primary-color"
        >
          LifeTest
        </Typography>
      </div>
      <div className="header__wrapper">
        <div className="header__task">
          <Typography
            variant="text-regular"
            color="gray-color-100"
          >
            Сделать UI-kit
          </Typography>
          <Icon
            iconName="stop"
            color="primary-color"
          />
        </div>
        <div className="header__task-time">
          <Typography
            color="gray-color-80"
            variant="text-regular"
          >
            Сегодня:{' '}
          </Typography>
          <Typography
            color="gray-color-80"
            variant="time-regular"
          >
            0:20:42
          </Typography>
        </div>
      </div>
    </div>
  )
}

export default Header
