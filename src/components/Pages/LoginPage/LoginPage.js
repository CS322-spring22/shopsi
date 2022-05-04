import React, { Component } from 'react'
import { useNavigate } from 'react-router-dom'
import './LoginPage.css'
import axios from 'axios'

class LoginPage  extends Component {
    constructor(props){
      super(props)
      this.state = {
        status: '',
        username: '',
        password: '',
        measurements: {},
        navigate : ''
      }
    }

    handleInput = (event) => {
      this.setState({
        [event.target.name]: event.target.value
      })
    }

    handleSubmit = event => {
      event.preventDefault()      
      axios.post(`/loginLP`, 
        { 
          'username': this.state.username, 
          'password': this.state.password, 
          'measurements' : this.state.measurements 
        }
      )
      .then(
        (response) => {
          var result = response.data;
          this.state.status = result.status;
          console.log(result);
          if (this.state.status == 'User does not exist'){
            this.state.navigate = '/sign-up'
          }
          else {
            this.state.navigate = '/measurements'
          }
        },
        (error) => {
          console.log(error);
        }
      );
      useNavigate(this.state.navigate);
  }

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
                        <input type="text" id="usernameText" name='username' value={this.state.username} onChange={this.handleInput}/>
                      </div>
                  </div>

                  <div className="box">
                    <label className="infoName">Password</label>
                    <div className="infoBox">
                      <input type="text" id="passwordText" name='password' value={this.state.password} onChange={this.handleInput}/>
                    </div>
                  </div>
              </div>
              <button type="submit" onClick={this.handleSubmit} id="enter-info" >Submit</button>
          </form>
        </div>
      </div>
    )
  }
}

export default LoginPage