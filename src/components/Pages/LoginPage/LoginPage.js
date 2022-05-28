import React, { Component } from "react";
import { Link as Redirect } from "react-router-dom";
import "./LoginPage.css";
import axios from "axios";
import logo from "./logo.png";

export class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      // navigate: "/login",
      status: "test",
      isValid: false,
      // isSubmitted: false,
    };
  }

  checkValid() {
    if (this.state.username !== "" && this.state.password !== "") {
      this.state.isValid = true;
      // this.state.navigate = "/";
    } else {
      this.state.isValid = false;
    }
  }

  handleInput = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
    this.checkValid();
  };

  getMeasure = (event) => {
    event.preventDefault();
    axios
      .post("https://anastatiad.pythonanywhere.com/measureLP", {
        username: this.state.username,
        password: this.state.password,
        get: "true",
      })
      .then(
        (response) => {
          var res = response.data;
          this.state.measurements = res;
          console.log(res);
        },
        (error) => {
          console.log(error);
        }
      );
  };

  handleSubmit = (event) => {
    event.preventDefault();
    if (!this.state.isValid) {
      alert("Please enter your username and password");
    }
    localStorage.setItem("curr", this.state.username);
    axios
      .post(`https://anastatiad.pythonanywhere.com/loginLP`, {
        username: this.state.username,
        password: this.state.password,
        measurements: this.state.measurements,
        logged: "",
      })
      .then(
        (response) => {
          var result = response.data;
          localStorage.setItem("gender", result.Gender);
          localStorage.setItem("firstname", result.Firstname);
          this.state.status = result.Status;
          console.log(this.state.status);
          if (
            this.state.isValid &&
            this.state.status === "User does not exist"
          ) {
            alert("You do not have an account. Please sign up.");
            window.location = "/sign-up"
          } else {
            alert(
              "Hello, " + localStorage.getItem("firstname") + " welcome back!"
            );
            localStorage.setItem(
              "measurements",
              JSON.stringify(result.Measurements)
            );
            window.location = "/";
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
        <div className="login-header">
          <a href="/" className="logo">
            <img src={logo} alt="logo" />
          </a>
          <h1>Shop$i</h1>
          <h3 className="desc">Shop with your size</h3>
          <h2>Login</h2>
        </div>
          <div className="login">
            <div className="user-info">
              <div className="box">
                <div className="infoName">Username</div>
                <div className="infoBox">
                  <input
                    type="text"
                    id="usernameText"
                    name="username"
                    value={this.state.username}
                    onChange={this.handleInput}
                  />
                </div>
              </div>

              <div className="box">
                <div className="infoName">Password</div>
                <div className="infoBox">
                  <input
                    type="password"
                    id="passwordText"
                    name="password"
                    value={this.state.password}
                    onChange={this.handleInput}
                  />
                </div>
              </div>
            </div>
            {/* Before submission */}
            {!this.state.isSubmitted && (
              <button
                type="submit"
                onClick={this.handleSubmit}
                className="buttons"
              >
                Login
              </button>
            )}

            {/* After submission
            {this.state.isSubmitted && (
              <button className="buttons">
                <Redirect to={this.state.navigate}>Continue</Redirect>
              </button>
            )} */}
          </div>
      </div>
    );
  }
}

export default LoginPage;
