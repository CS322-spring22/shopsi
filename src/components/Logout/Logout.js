import React from "react";

function Logout() {
  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('https://anastatiad.pythonanywhere.com/logoutLP', {
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
