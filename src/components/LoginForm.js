import React, { Component } from 'react'

class LoginForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: ''
        }
    }

    handleInput = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit = event => {
        alert(` Username: ${this.state.username} 
                Password: ${this.state.password}`)
        event.preventDefault()
    }


  render() {
    return (
        <form onSubmit={this.handleSubmit}>
            <label>Username:
                <input type='text'
                name='username'
                value={this.state.username}
                onChange={this.handleInput}
                />
            </label>
            
            <label>Password:
                <input type='text' 
                name='password'
                value={this.state.password}
                onChange={this.handleInput}
                />
            </label>  

            <button type="submit">Enter</button>  
        </form>
    )
  }
}

export default LoginForm