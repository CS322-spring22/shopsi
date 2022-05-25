import React from "react";
import axios from "axios";
import { Link as Redirect } from "react-router-dom";

function Logout() {
  const handleSubmit = (event) => {
    event.preventDefault();
    localStorage.setItem('firstname', '');
    localStorage.setItem('curr', '');
    localStorage.setItem('measurements', '');
    localStorage.setItem('gender', '');
    window.location.reload(true);
    axios.post('https://anastatiad.pythonanywhere.com/logoutLP', {
      'Status' : 'logout',
      'curr': localStorage.getItem('curr')
    }).then(
      (response) => {
        var res = response.data
        console.log(res)
      }, (error) => {
        console.log(error)
      }
    )
  }

  return <button type='submit' onClick={handleSubmit} className="logout">
    <Redirect to={'/'}>Logout</Redirect>
  </button>;
}

export default Logout;
