import React, { Component } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./LoginPage.css";
import axios from "axios";
import logo from "./logo.png";

export class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      navigate: "/measurements",
    };
  }

  handleInput = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post(`https://anastatiad.pythonanywhere.com/loginLP`, {
        username: this.state.username,
        password: this.state.password
      })
      .then(
        (response) => {
          var result = response.data;
          this.state.status = result.status;
          console.log(result);
          if (this.state.status === "User does not exist") {
            this.state.navigate = "/sign-up";
          } else {
            this.state.navigate = "/measurements";
          }
        },
        (error) => {
          console.log(error);
        }
      );
  };

  render() {
    return (
      <div className="LoginPage">
        <a href="/" className="logo">
          <img src={logo} alt="logo" />
        </a>
        <h1>Shop$i</h1>
        <h3 className="desc">Shop with your size</h3>
        <br></br>
        <div className="login">
          <form>
            <h2>Login</h2>
            <div className="user-info">
              <div className="box">
                <label className="infoName">Username</label>
                <div className="infoBox">
                  <input type="text" id="usernameText" name='username' value={this.state.username} onChange={this.handleInput} required />
                </div>
              </div>

              <div className="box">
                <label className="infoName">Password</label>
                <div className="infoBox">
                  <input type="password" id="passwordText" name='password' value={this.state.password} onChange={this.handleInput} required />
                </div>
              </div>
            </div>
            <button
              type="submit"
              onClick={this.handleSubmit}
              onSubmit={async (event) => {
                useNavigate(this.state.navigate);
              }}
              id="enter-info"
            >
              <Link to={this.state.navigate}>Login</Link>
            </button>
          </form>
        </div>
      </div>
    );
  }
}
export default LoginPage;
