import React, { Component } from 'react'
import axios from 'axios'
import MeasurementForm from './MeasurementForm'


class LoginForm extends Component {
    constructor(props){
        super(props)
        this.state = {
            status: '',
            username: '',
            password: '',
            measurements: {},
        }
    }

    handleInput = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit = event => {
        event.preventDefault()      
        axios.post(`https://anastatiad.pythonanywhere.com/signupLP`, 
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
                if (this.state.status == 'User does not exist') {
                    //prompt user to sign up
                    //switch to sign up pop up (how do I do that?)
                }
                else {
                    //go to next page (measurements)
                    //switch to measurements pop up
                }
            },
            (error) => {
                console.log(error);
            }
        );
        axios.get('https://anastatiad.pythonanywhere.com/signupLP')
        .then((response) => {
            const res =response.data
            this.state.status = res.status
            
        })
        .catch((error) => {
            if (error.response) {
              console.log(error.response)
              console.log(error.response.status)
              console.log(error.response.headers)
            }
        });
    }


  render() {
    return (
        <form className='login-form' onSubmit={this.handleSubmit}>
            <label>
                <input type='text'
                placeholder='Username'
                name='username'
                value={this.state.Username}
                onChange={this.handleInput}
                />
            </label>
            
            <label>
                <input type='text'
                placeholder='Password' 
                name='password'
                value={this.state.Password}
                onChange={this.handleInput}
                />
            </label>  

            <button type="submit">Enter</button>
        </form>
    )
  }
}


export default LoginForm