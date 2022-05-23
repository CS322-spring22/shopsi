import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Logout() {
  const handleSubmit = (event) => {
    event.preventDefault();
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
    <Link to={'/'}>Logout</Link>
  </button>;
}

export default Logout;
