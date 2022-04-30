import './index.css';
import Popup from './components/Popup';
import LoginForm from './components/LoginForm';
import {useState} from 'react';
import axios from 'axios';
import MeasurementForm from './components/MeasurementForm';

function App() {
  const [loginPopup, setLoginPopup] = useState(false);
  const [measurementPopup, setMeasurementPopup] = useState(false);
  const [registerPopup, setRegisterPopup] = useState(false);
  const [aboutPopup, setAboutPopup] = useState(false);
  const [helpPopup, setHelpPopup] = useState(false);
  const [profileData, setProfileData] = useState(null)

  function getData() {
    axios({
      method: "GET",
      url:"https://anastatiad.pythonanywhere.com/profile",
    }).then((response) => {
      const res =response.data
      setProfileData(({
        profile_name: res.name,
        about_me: res.about}))
    }).catch((error) => {
      if (error.response) {
        console.log(error.response)
        console.log(error.response.status)
        console.log(error.response.headers)
      }
  })}
  
  return (
    <>
      <div className="header">
        <div className="header-button">
          <button onClick={() => setMeasurementPopup(true)}>Get Started</button>
          <button onClick={() => setLoginPopup(true)}>Login</button>  
        </div>
        <div className="header-text">
          <h2>Shop$i</h2>
          <h1>Your clothes. <br/>Your style. <br/>Your fit.</h1> 
          <p>No more returns. Shopsi automatically selects the size you want based on your preferences. 
          Online shopping has never been easier.</p>
        </div>  
      </div>

      <div className="more">
        <div className="body-text">
            <h2>More about Shop$i</h2>
            {/* new line start*/}
            <p>To get your profile details: </p>
            <button onClick={getData}>Click me</button>
            {profileData && <div>
              <p>Profile name: {profileData.profile_name}</p>
              <p>About me: {profileData.about_me}</p>
            </div>
            }
            {/* end of new line */}
        </div>
      </div>

      <Popup trigger={loginPopup} setTrigger={setLoginPopup}>
        <h1>Login</h1>
        <LoginForm/>
      </Popup>

      <Popup trigger={measurementPopup} setTrigger={setMeasurementPopup}>
        <h1>Enter Your Measurements</h1>
          <MeasurementForm/>
          <button onClick={() => {setRegisterPopup(true); setMeasurementPopup(false);}}>Next</button>      
      </Popup>

      <Popup trigger={registerPopup} setTrigger={setRegisterPopup}>
        <h1>Create Account</h1>
          <LoginForm/>
      </Popup>

      <div className="footer">
        <div className="footer-button">
          <button onClick={() => setAboutPopup(true)} className="button">about </button>
          <button onClick={() => setHelpPopup(true)} className="button">help</button>
        </div>
      </div>

      <Popup trigger={aboutPopup} setTrigger={setAboutPopup}>
        <h1>About Shop$i</h1>
          <div>
              Shop$i is good!
          </div>
      </Popup>

      <Popup trigger={helpPopup} setTrigger={setHelpPopup}>
        <h1>Help</h1>
          <div>
            Help!
          </div>
      </Popup>
    </>
  );
}

export default App;