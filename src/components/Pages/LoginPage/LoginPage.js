import React, { Component } from 'react'
import './LoginPage.css'

export class LoginPage extends Component {
  render() {
    return (
      <div className='LoginPage'>
        <h1>Shop$i</h1>
        <h3 className="desc">Shop with your size</h3><br></br>
        <div className="login">
          <form>
              <h2>Login</h2>
              <div className="user-info">              
                  <div className="box">
                      <label className="infoName">Username</label>
                      <div className="infoBox">
                          <input type="text" id="usernameText"/>
                      </div>
                  </div>

                  <div className="box">
                      <label className="infoName">Password</label>
                      <div className="infoBox">
                          <input type="text" id="passwordText"/>
                      </div>
                  </div>
              </div>
              <button type="submit" id="enter-info" >Submit</button>
          </form>
        </div>
    </div>
    )
  }
}
export default LoginPage