import { useTheme } from './themeContext'
import './toggleThemeBtn.css'
import React from 'react'

const ToggleThemeBtn = () => {
    const {theme, toggleTheme} = useTheme();
  return (
    <label className="ui-switch" >
        <input type="checkbox" checked={theme === 'dark'} onChange={toggleTheme}/>
        <div className="slider"> 
            <div className="circle"></div>
        </div>
    </label>

  )
}

export default ToggleThemeBtn