import React from "react";
import "./HomePage.css";
import Navbar from "../../NavBar/NavBar";
import { Component } from "react";

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
              <span className="install-extension-link">Install Extension</span>
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
          </div>
        </div>

        <div className="how-to" id="how-to">
          <div className="content-header">
            <h2>How to use Shop$i</h2>
          </div>
          <div className="measurements"></div>
        </div>

        <div className="footer"></div>
      </div>
    )
  }
}
export default HomePage;
