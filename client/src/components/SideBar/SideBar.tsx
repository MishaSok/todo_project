import React, { useRef, useState } from 'react'
import './SideBar.scss'

function SideBar() {
  const [inputValue, setInputValue] = useState('Добавить папку')
  const [inputOpened, setInputOpened] = useState(false)
  const inputRef = useRef(null)

  const handleOnSubmit = () => {
    setInputOpened(false)
    setInputValue('Добавить папку')
  }
  const handleOnClick = () => {
    setInputOpened(true)
    setInputValue('')
  }

  return (
    <div className="sidebar">
      <div className="sidebar__top ">
        {/*<FeatherIcon*/}
        {/*    icon="folder-plus"*/}
        {/*    stroke="#787878"*/}
        {/*/>*/}
        {inputOpened ? (
          <div className="sidebar__top-input">
            <form onSubmit={handleOnSubmit}>
              <input
                type="text"
                onChange={(e) => setInputValue(e.target.value)}
                value={inputValue}
                ref={inputRef}
                maxLength={32}
              />
            </form>
          </div>
        ) : (
          <div onClick={handleOnClick}>{inputValue}</div>
        )}
      </div>
      <div className="sidebar__items">
        <div>folder</div>
        <div>folder</div>
        <div>folder</div>
        <div>folder</div>
      </div>
    </div>
  )
}

export default SideBar
