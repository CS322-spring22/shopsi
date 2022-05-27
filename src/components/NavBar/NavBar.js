import "./NavBar.css";
import React, { useState } from "react";
import { Link } from "react-scroll";
import { Link as Redirect } from "react-router-dom";
import Logout from "../Logout/Logout";
import logo from "./logo.png";

const Navbar = () => {
  const [click, setClick] = useState(false);
  const closeMenu = () => setClick(false);

  return (
    <div className="navheader">
      <nav className="navbar">
        {localStorage.getItem('firstname') === null && (
          <a href="/" className="logo">
            <img src={logo} alt="logo" />
          </a>
        )}
        {localStorage.getItem('firstname') != null && (
          <a href="/" className="logo">
            <img src={logo} alt="logo" />
            <p> Welcome Back, {localStorage.getItem('firstname')}</p>
          </a>
        )}
        <ul className={"nav-menu"}>
          <li className="nav-item">
            <Link
              to="about"
              spy={true}
              smooth={true}
              offset={-90}
              duration={500}
              onClick={closeMenu}
            >
              About
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="how-to"
              spy={true}
              smooth={true}
              offset={-90}
              duration={500}
              onClick={closeMenu}
            >
              Using
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="how-to-mes"
              spy={true}
              smooth={true}
              offset={-90}
              duration={500}
              onClick={closeMenu}
            >
              Measuring
            </Link>
          </li>
          {/*if no user is logged in*/}
          {localStorage.getItem('firstname') === null && (
            <li className="nav-item">
              <Redirect to="/sign-up" onClick={closeMenu}>
                Sign Up
              </Redirect>
            </li>
          )}
          {/*if user is logged in*/}
          {localStorage.getItem('firstname') != null && (
            <li className="nav-item">
              <Redirect to="/measurements" onClick={closeMenu}>
                Update Measurements
              </Redirect>
            </li>
          )}
          {/*if no user is logged in*/}
          {localStorage.getItem('firstname') === null && (
            <li className="nav-item">
              <Redirect to="/login" onClick={closeMenu}>
                Login
              </Redirect>
            </li>
          )}
          {/*if user is logged in*/}
          {localStorage.getItem('firstname') != null && (
            <li className="nav-item">
              <Logout />
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
