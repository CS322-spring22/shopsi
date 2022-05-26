import "./SignUpPage.css";
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import logo from "./logo.png";

function SignUpPage() {
  const [isValid, setIsValid] = useState(false);
  const checkValid = () => {
    if (username != "" && password != "") {
      setIsValid(true);
      setNav("/");
    } else {
      setIsValid(false);
      setNav("/sign-up");
    }
  };
  const [status, setStatus] = useState("Existing User");
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
  const [navigate, setNav] = useState("/sign-up");
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
    console.log("is valid:" + isValid);
    console.log(navigate);
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
          setStatus(result.status);
          console.log(result);
          if (status === "Existing User") {
            setNav("/login");
            setLog("false");
          } else {
            setNav("/");
            setLog("true");
          }
          console.log(log);
        },
        (error) => {
          console.log(error);
        }
      );
    if (status === "Existing User") {
      setNav("/login");
    }

    if (!isValid) {
      alert("Please enter username and password");
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
              <input type="text" id="firstNameText" required />
            </div>
          </div>

          <div className="box">
            <div className="infoName">Last Name</div>
            <div className="infoBox">
              <input type="text" id="lastNameText" required />
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
        <button type="submit" onClick={handleSubmit} id="enter-info">
          <Link to={navigate}>Continue</Link>
        </button>
      </div>
    </div>
  );
}

export default SignUpPage;
