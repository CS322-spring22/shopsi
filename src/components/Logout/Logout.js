import React from "react";
import axios from "axios";

function Logout() {
  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('/logoutLP', {
      'Status' : 'logout'
    }).then(
      (response) => {
        console.log(response)
      }, (error) => {
        console.log(error)
      }
    )
  }

  return <button type='submit' onClick={handleSubmit} className="logout">Logout</button>;
}

export default Logout
