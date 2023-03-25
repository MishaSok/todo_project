import React from 'react'
import SortPopUpProps from './SortPopUp.types'
import Typography from '../../UIkit/Typography'

import './SortPopUp.scss'

function SortPopUp({ className }: SortPopUpProps) {
  return (
    <div className={className}>
      <div className="sort-popup">
        <Typography
          variant="title-h2-medium"
          color="primary-color"
          className="sort-popup__title"
        >
          Сортировка
        </Typography>
        <div className="sort-popup__items">
          <div className="sort-popup__items__item">
            <input type="radio" />
            <Typography
              variant="text-regular"
              color="gray-color-100"
            >
              По дате
            </Typography>
          </div>
          <div className="sort-popup__items__item">
            <input type="radio" />
            <Typography
              variant="text-regular"
              color="gray-color-100"
            >
              По Затреканному времени
            </Typography>
          </div>
          <div className="sort-popup__items__item">
            <input type="radio" />
            <Typography
              variant="text-regular"
              color="gray-color-100"
            >
              По статусу
            </Typography>
          </div>
          <div className="sort-popup__items__item">
            <input type="radio" />
            <Typography
              variant="text-regular"
              color="gray-color-100"
            >
              По алфавиту
            </Typography>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SortPopUp
