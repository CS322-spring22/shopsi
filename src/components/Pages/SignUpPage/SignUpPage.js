import "./SignUpPage.css";
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import logo from "./logo.png";

function SignUpPage() {
  const [isValid, setIsValid] = useState(false);
  const checkValid = () => {
    if (username != "" && password != "" && firstname != "" && lastname != "") {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  };
  const [status, setStatus] = useState("");
  const [username, setUser] = useState("");
  const [password, setPass] = useState("");
  const [gender, setGender] = useState("");
  const [measurements, setMeasure] = useState({
    Waist: 58,
    "Bust/Chest": 74,
    Inseam: 78,
    "Arm Length": 61,
    Neckline: 34,
    "Low Hip": 82,
  });
  const [log, setLog] = useState("");
  const [firstname, setFirst] = useState("");
  const [lastname, setLast] = useState("");
  let nav = useNavigate();

  const handleInput = (event) => {
    if (event.target.name === "username") {
      setUser(event.target.value);
    } else if (event.target.name === "password") {
      setPass(event.target.value);
    } else if (event.target.name === "gender") {
      setGender(event.target.value);
    } else if (event.target.name === "firstname") {
      localStorage.setItem("firstname", event.target.value);
      setFirst(event.target.value);
    } else if (event.target.name === "lastname") {
      setLast(event.target.value);
    } else {
      setMeasure({
        Waist: 58,
        "Bust/Chest": 74,
        Inseam: 78,
        "Arm Length": 61,
        Neckline: 34,
        "Low Hip": 82,
      });
    }
    checkValid();
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    localStorage.setItem("curr", username);
    localStorage.setItem("gender", gender);
    localStorage.setItem("measurements", JSON.stringify(measurements));

    axios
      .post(`https://anastatiad.pythonanywhere.com/signupLP`, {
        username: username,
        password: password,
        measurements: measurements,
        firstname: firstname,
        lastname: lastname,
        logged: log,
        gender: gender,
      })
      .then(
        (response) => {
          var result = response.data;
          setStatus(result.Status);
          console.log(status);
          if (isValid && status === "User already exists") {
            alert("You already have an account. Please log in");
            window.location = "/login";
            setLog("false");
          } else {
            setLog("true");
          }
        },
        (error) => {
          console.log(error);
        }
      );

    if (!isValid) {
      alert("Please complete all fields");
    } else if (status != "User already exists") {
      alert("Welcome to Shop$i! Please Log in");
      window.location = "/login";
    }
  };

  return (
    <div className="SignUpPage">
      <div className="signup-header">
        <a href="/" className="logo">
          <img src={logo} alt="logo" />
        </a>
        <h1>Shop$i</h1>
        <h3 className="desc">Shop with your size</h3>
        <h2>Sign Up</h2>
      </div>
      <div className="signup">
        <div className="user-info">
          <div className="box">
            <div className="infoName">Gender</div>
            <div className="infoBox">
              <select name="gender" value={gender} onChange={handleInput}>
                <option disabled selected hidden>
                  Select Gender
                </option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="nonbinary">Non-binary</option>
              </select>
            </div>
          </div>

          <div className="box">
            <div className="infoName">First Name</div>
            <div className="infoBox">
              <input
                type="text"
                id="firstNameText"
                name="firstname"
                value={firstname}
                onChange={handleInput}
                required
              />
            </div>
          </div>

          <div className="box">
            <div className="infoName">Last Name</div>
            <div className="infoBox">
              <input
                type="text"
                id="lastNameText"
                name="lastname"
                value={lastname}
                onChange={handleInput}
                required
              />
            </div>
          </div>

          <div className="box">
            <div className="infoName">Username</div>
            <div className="infoBox">
              <input
                type="text"
                id="usernameText"
                name="username"
                value={username}
                onChange={handleInput}
                required
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
                value={password}
                onChange={handleInput}
                required
              />
            </div>
          </div>
        </div>
        <button type="submit" onClick={handleSubmit} className="buttons">
          Sign Up
        </button>
      </div>
    </div>
  );
}

export default SignUpPage;
