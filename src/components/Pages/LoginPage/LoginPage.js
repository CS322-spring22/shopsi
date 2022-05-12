import React, { Component } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./LoginPage.css";
import axios from "axios";
import logo from "./logo.png";

export class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: "",
      username: "",
      password: "",
      measurements: {},
      navigate: "",
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
      .post(`/loginLP`, {
        username: this.state.username,
        password: this.state.password,
        measurements: this.state.measurements,
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
                  <input type="text" id="usernameText" />
                </div>
              </div>

              <div className="box">
                <label className="infoName">Password</label>
                <div className="infoBox">
                  <input type="password" id="passwordText" />
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
              <Link to={this.state.navigate}>Submit</Link>
            </button>
          </form>
        </div>
      </div>
    );
  }
}
export default LoginPage;
