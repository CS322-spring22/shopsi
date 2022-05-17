import React from "react";
import "./HomePage.css";
import Navbar from "../../NavBar/NavBar";
import { Component } from "react";
import aboutPic from "./about.jpg";

export class HomePage extends Component {
  render() {
    return (
      <div className="homepage">
        <Navbar />
        <div className="header">
          <div className="header-title">
            <h2>Shop$i</h2>
          </div>
          <div className="header-body">
            <h1>
              Your clothes. <br />
              Your style. <br />
              Your fit.
            </h1>
            <a href="https://chrome.google.com/webstore/category/extensions?hl=en">
              Install Extension
            </a>
          </div>
        </div>

        <div className="about" id="about">
          <div className="content-header">
            <h2>About Shop$i</h2>
          </div>

          <div className="about-body">
            <p>
              No more returns. Shopsi automatically selects the size you want
              based on your preferences. Online shopping has never been easier!
            </p>
            <div className="image-wrapper">
              <img src={aboutPic} alt={"about"} />
            </div>
          </div>
        </div>

        <div className="how-to" id="how-to">
          <div className="content-header">
            <h2>How to use Shop$i</h2>
          </div>
          <div className="how-to-body">
            <h3 id="step1">Step 1. Install the extension</h3>
            <h3 id="step2">Step 2. Sign up / Login</h3>
            <h3 id="step3">Step 3. Update your measurements</h3>
            <h3 id="step4">Step 4. Shop!</h3>
          </div>
        </div>

        <div className="footer"></div>
      </div>
    );
  }
}
export default HomePage;
