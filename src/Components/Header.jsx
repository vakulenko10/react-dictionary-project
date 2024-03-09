import React from 'react'
import Container from './Container'
import { useTheme } from './themeContext';
import ToggleThemeBtn from './ToggleThemeBtn';

const Header = () => {
const {theme, toggleTheme} = useTheme();
  return (
    <div className={`${theme == 'light'? 'bg-slate-300':'bg-slate-700 text-white'}`}>
        <Container>
            <div className='flex py-5 px-3 md:px-10 justify-between'>
                <h1>translatePlease!</h1>

                <ToggleThemeBtn />
            </div>
        </Container>
    </div>
  )
}

export default Header