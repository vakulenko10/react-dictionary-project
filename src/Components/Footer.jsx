import React from 'react'
import Container from './Container'
import { useTheme } from './themeContext';
import { FaLinkedin, FaInstagram, FaFacebookSquare  } from "react-icons/fa";
const Footer = () => {
    const {theme, toggleTheme} = useTheme();

  return (
    <div className={`${theme == 'light'? 'bg-slate-300':'bg-slate-700 text-white'}`}>
        <Container >
            <div className='flex flex-col justify-center items-center md:flex-row py-5 px-3 md:px-10 md:justify-between  '>
            <ul className='links flex gap-1'>
                <li><a href='https://www.instagram.com/vakulenko_10/' ><FaInstagram className={`transition ${theme == 'light'? 'fill-slate-700  hover:fill-slate-600':'fill-slate-300 hover:fill-slate-400 text-white'}`} size={30}  /></a></li>
                {/* <li><a href='https://www.linkedin.com/in/vitalik-vakulenko/'><FaLinkedin className={`transition ${theme == 'light'? 'fill-slate-700  hover:fill-slate-600':'fill-slate-300 hover:fill-slate-400 text-white'}`} size={30}  /></a></li>
                <li><a href='https://www.linkedin.com/in/vitalik-vakulenko/'><FaFacebookSquare  className={`transition ${theme == 'light'? 'fill-slate-700  hover:fill-slate-600':'fill-slate-300 hover:fill-slate-400 text-white'}`} size={30}  /></a></li>
                 */}
                
            </ul>
            <div className='otherInfo flex gap-1'>
                
                <h6>(just a project for portfolio)</h6>
            </div>
            
            </div>
            
        </Container>
    </div>
  )
}

export default Footer