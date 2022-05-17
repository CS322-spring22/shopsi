import React from "react";
import "./HomePage.css";
import Navbar from "../../NavBar/NavBar";
import { Component } from "react";
import aboutPic from "./about.jpg";
import guide from "./guide.png";

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
              <img src={aboutPic} alt={"return"} />
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

        <div className="how-to-mes" id="how-to-mes">
          <div className="content-header">
            <h2>Taking your measurements</h2>
          </div>
          <div className="how-to-mes-body">
            <div className="guide-steps-head">
              <h2>Use the guide to measure each part of your body</h2>
              <div className="guide-steps-body">
                <p><strong>1. Bust/Chest:</strong> Measure your chest over the fullest part.</p>
                <p><strong>2. Waist:</strong>Measure at the narrowest point.</p>
                <p><strong>3. Low hip:</strong> Measure around the fullest part of your hip.</p>
                <p><strong>4. Inside leg:</strong> Inside leg is measured from the crotch to the floor</p>
                <p><strong>Arm length:</strong> Measure from your shoulder point to your wrist.</p>
                <p><strong>Neckline:</strong> To find the perfect size on shirts when using ties/bows - Measure your neckline, the collar needs to fit properly.</p>
              </div>
            </div>
            <div className="guide-pic">
              <img src={guide} alt={"size guide"} />
            </div>
          </div>
        </div>

        <div className="footer"></div>
      </div>
    );
  }
}
export default HomePage;
