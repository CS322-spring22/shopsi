import './index.css';
import Home from './components/Pages/Home'
import LoginPage from './components/Pages/LoginPage';
import SignUpPage from './components/Pages/SignUpPage';
import MeasurementPage from './components/Pages/MeasurementPage/MeasurementPage'
import ErrorPage from './components/Pages/ErrorPage';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import {useState, useRef} from 'react';

function App() {
  const [loginPopup, setLoginPopup] = useState(false);
  const [measurementPopup, setMeasurementPopup] = useState(false);
  const [registerPopup, setRegisterPopup] = useState(false);
  
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<LoginPage/>}/>
        <Route path='/sign-up' element={<SignUpPage/>}/>
        <Route path='/measurements' element={<MeasurementPage/>}/>
        <Route path='*' element={<ErrorPage/>}/>
      </Routes> 
    </Router>
  );
}

export default App;