import React from 'react'
import '/Users/tavianjames/Desktop/shopsi/src/index.css';
import Popup from '../Popup';
import LoginForm from '../LoginForm';
import MeasurementForm from '../MeasurementForm';
import Navbar from '../NavBar';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import {useState, useRef} from 'react';


const Home = () => {
const [loginPopup, setLoginPopup] = useState(false);
const [measurementPopup, setMeasurementPopup] = useState(false);
const [registerPopup, setRegisterPopup] = useState(false);

  return (
    <> 
        <Navbar/>  
        <div className="header">
          <div className="header-title"> 
            <h2>Shop$i</h2>
          </div>
          <div className="header-body">
            <h1>Your clothes. <br/>Your style. <br/>Your fit.</h1> 
            <a  href="https://chrome.google.com/webstore/category/extensions?hl=en">
              <span className= "install-extension-link">
                Install Extension 
              </span>
            </a>
          </div>  
        </div>

        <div className="about" id="about">
          <div className="content-header">
              <h2>About Shop$i</h2>
          </div>
          
          <div className="about-body"> 
          <p>No more returns. Shopsi automatically selects the size you want based on your preferences. 
            Online shopping has never been easier!</p>
          </div>
        </div>

        <div className="how-to" id="how-to">
          <div className='content-header'>
            <h2>How to use Shop$i</h2>
          </div>
          <div className="measurements">
          
          </div>
        </div>

        <div className="footer">
        
        </div>

        <Popup trigger={loginPopup} setTrigger={setLoginPopup}>
          <h1>Login</h1>
          <LoginForm/>
        </Popup>

        <Popup trigger={measurementPopup} setTrigger={setMeasurementPopup}>
          <h1>Enter Your Measurements</h1>
            <MeasurementForm/>
            <div className='measurement-next-button'>
            <button onClick={() => {setRegisterPopup(true); setMeasurementPopup(false);}}>Next</button>  
            </div>    
        </Popup>

        <Popup trigger={registerPopup} setTrigger={setRegisterPopup}>
          <h1>Create Account</h1>
            <LoginForm/>
        </Popup>
    </>
  )
}

export default Home