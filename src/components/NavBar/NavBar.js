import './NavBar.css';
import React, { useState } from 'react'
import { Link } from 'react-scroll'
import { Link as Redirect } from 'react-router-dom'
import logo from './logo.png'

const Navbar = () => {
  const [click, setClick] = useState(false)
  const handleClick = () => setClick(!click)
  const closeMenu = () => setClick(false)

  return (
    <div className='navheader'>
        <nav className='navbar'>
            <a href='/' className='logo'>
                <img src={logo} alt='logo' />
            </a>
            <ul className={click ? "nav-menu active" : "nav-menu"}>
                <li className='nav-item'>
                  <Link to='about' spy={true} smooth={true} offset={50} duration={500} onClick={closeMenu}>About</Link>
                </li>
                <li className='nav-item'>
                  <Link to='how-to' spy={true} smooth={true} offset={50} duration={500} onClick={closeMenu}>How To</Link>
                </li>
                <li className='nav-item'>
                  <Redirect to='/sign-up'onClick={closeMenu}>Get Started</Redirect>
                </li>
                <li className='nav-item'>
                  <Redirect to='/login'onClick={closeMenu}>Login</Redirect>
                </li>
            </ul>
        </nav>
    </div>
  )
}

export default Navbar