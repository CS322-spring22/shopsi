import React, { useState } from 'react'
import { FaBars, FaTimes } from 'react-icons/fa'
import { Link } from 'react-scroll'
import { Link as rLink} from 'react-router-dom'


const Navbar = () => {
  const [click, setClick] = useState(false)
  const handleClick = () => setClick(!click)
  const closeMenu = () => setClick(false)
  const [loginPopup, setLoginPopup] = useState(false);

  return (
    <div className='navheader'>
        <nav className='navbar'>
            <a href='/' className='logo'>
                <img  alt='logo' />
            </a>
            <ul className={click ? "nav-menu active" : "nav-menu"}>
                <li className='nav-item'>
                  <Link to='about' spy={true} smooth={true} offset={50} duration={500} onClick={closeMenu}>About</Link>
                </li>
                <li className='nav-item'>
                  <Link to='how-to' spy={true} smooth={true} offset={50} duration={500} onClick={closeMenu}>How To</Link>
                </li>
                <li className='nav-item'>
                  <Link to='/measurements'onClick={closeMenu}>Get Started</Link>
                </li>
                <li className='nav-item'>
                  <Link  onClick={() => {closeMenu(); setLoginPopup(true);}}>Login</Link>
                </li>
            </ul>
        </nav>
    </div>
  )
}

export default Navbar