import React from "react";
import axios from "axios";

function Logout() {
  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('https://anastatiad.pythonanywhere.com/logoutLP', {
      'Status' : 'logout'
    }).then(
      (response) => {
        var res = response.data
        console.log(res)
      }, (error) => {
        console.log(error)
      }
    )
  }

  return <button type='submit' onClick={handleSubmit} className="logout">Logout</button>;
}

export default Logout
