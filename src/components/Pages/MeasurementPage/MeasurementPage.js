import React, { Component } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import "./MeasurementPage.css";
import axios from "axios";
import logo from "./logo.png";

export class MeasurementPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      waist: 0,
      bust: 0,
      inseam: 0,
      armLen: 0,
      neck: 0,
      lowHip: 0,
      status: "",
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
      .post(`/measureLP`, {
        Waist: this.state.waist,
        "Bust/Chest": this.state.bust,
        "Inside Leg": this.state.inseam,
        "Arm Length": this.state.armLen,
        Neckline: this.state.neck,
        "Low Hip": this.state.lowHip,
      })
      .then(
        (response) => {
          var result = response.data;
          this.state.status = result.status;
          console.log(result);
          if (this.state.status === "Logout") {
            this.state.navigate = "/";
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
      <div className="MeasurementPage">
        <a href="/" className="logo">
          <img src={logo} alt="logo" />
        </a>
        <h1>Shop$i</h1>
        <h3 className="desc">Shop with your size</h3>
        <br></br>
        <div class="measurement">
          <form>
            <h2>Enter your measurements</h2>
            <div class="measurements">
              <div class="box">
                <label class="mesName">Bust/Chest</label>
                <div class="sliderBar">
                  <input
                    type="range"
                    id="bust-slider"
                    min="0"
                    max="100"
                    name="bust"
                    value={this.state.bust}
                  />
                  <div onChange="{handleInput}" class="value" id="bust-value">
                    0
                  </div>
                </div>
              </div>

              <div class="box">
                <label class="mesName">Neckline</label>
                <div class="sliderBar">
                  <input
                    type="range"
                    id="neck-slider"
                    min="0"
                    max="100"
                    name="neck"
                    value={this.state.neck}
                  />
                  <div class="value" id="neck-value">
                    0
                  </div>
                </div>
              </div>

              <div class="box">
                <label class="mesName">Waist</label>
                <div class="sliderBar">
                  <input
                    type="range"
                    id="waist-slider"
                    min="0"
                    max="100"
                    name="waist"
                    value={this.state.waist}
                  />
                  <div class="value" id="waist-value">
                    0
                  </div>
                </div>
              </div>

              <div class="box">
                <label class="mesName">Low Hip</label>
                <div class="sliderBar">
                  <input
                    type="range"
                    id="hip-slider"
                    min="0"
                    max="100"
                    name="lowHip"
                    value={this.state.lowHip}
                  />
                  <div class="value" id="hip-value">
                    0
                  </div>
                </div>
              </div>

              <div class="box">
                <label class="mesName">Arm length</label>
                <div class="sliderBar">
                  <input
                    type="range"
                    id="arm-slider"
                    min="0"
                    max="100"
                    name="armLen"
                    value={this.state.armLen}
                  />
                  <div class="value" id="arm-value">
                    0
                  </div>
                </div>
              </div>

              <div class="box">
                <label class="mesName">Inside leg</label>
                <div class="sliderBar">
                  <input
                    type="range"
                    id="leg-slider"
                    min="0"
                    max="100"
                    name="inseam"
                    value={this.state.inseam}
                  />
                  <div class="value" id="leg-value">
                    0
                  </div>
                </div>
              </div>
            </div>
            <button
              type="submit"
              id="enter-measurement"
              onClick={this.handleSubmit}
              onSubmit={async (event) => {
                useNavigate(this.state.navigate);
              }}
            >
              <Link to="/">Submit</Link>
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default MeasurementPage;
