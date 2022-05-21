import React, { Component } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./MeasurementPage.css";
import axios from "axios";
import logo from "./logo.png";
import Logout from "../../Logout/Logout";
export class MeasurementPage extends Component {
  between(x, min, max) {
    return x >= min && x <= max;
  }
  
  getTopSizeRecommend() {
    if (
      this.between(this.state.bust, 78, 86) ||
      this.between(this.state.waist, 66, 74) ||
      this.between(this.state.neck, 34, 35)
    ) {
      this.state.topSize = "XS";
    } else if (
      this.between(this.state.bust, 86, 94) ||
      this.between(this.state.waist, 74, 82) ||
      this.between(this.state.neck, 36, 37)
    ) {
      this.state.topSize = "S";
    } else if (
      this.between(this.state.bust, 94, 102) ||
      this.between(this.state.waist, 82, 90) ||
      this.between(this.state.neck, 38, 39)
    ) {
      this.state.topSize = "M";
    } else if (
      this.between(this.state.bust, 102, 110) ||
      this.between(this.state.waist, 90, 98) ||
      this.between(this.state.neck, 40, 41)
    ) {
      this.state.topSize = "L";
    } else if (
      this.between(this.state.bust, 110, 118) ||
      this.between(this.state.waist, 98, 107) ||
      this.between(this.state.neck, 42, 43)
    ) {
      this.state.topSize = "XXXL";
    } else if (
      this.between(this.state.bust, 118, 126) ||
      this.between(this.state.waist, 107, 116) ||
      this.between(this.state.neck, 44, 45)
    ) {
      this.state.topSize = "XXL";
    } else if (
      this.between(this.state.bust, 126, 134) ||
      this.between(this.state.waist, 116, 125) ||
      this.between(this.state.neck, 46, 47)
    ) {
      this.state.topSize = "XXXL";
    } else {
      this.state.topSize = "not supported";
    }
  }
  
  getBottomSizeRecommend() {
    if (
      this.between(this.state.waist, 66, 74) ||
      this.between(this.state.lowHip, 85, 91) ||
      this.between(this.state.inseam, 80, 81)
    ) {
      this.state.bottomSize = "XS";
    } else if (
      this.between(this.state.waist, 74, 82) ||
      this.between(this.state.lowHip, 91, 97) ||
      this.between(this.state.inseam, 81, 82)
    ) {
      this.state.bottomSize = "S";
    } else if (
      this.between(this.state.waist, 82, 90) ||
      this.between(this.state.lowHip, 97, 103) ||
      this.between(this.state.inseam, 82, 83)
    ) {
      this.state.bottomSize = "M";
    } else if (
      this.between(this.state.waist, 90, 98) ||
      this.between(this.state.lowHip, 103, 109) ||
      this.between(this.state.inseam, 83, 84)
    ) {
      this.state.bottomSize = "L";
    } else if (
      this.between(this.state.waist, 98, 107) ||
      this.between(this.state.lowHip, 109, 115) ||
      this.between(this.state.inseam, 84, 85)
    ) {
      this.state.bottomSize = "XL";
    } else if (
      this.between(this.state.waist, 107, 116) ||
      this.between(this.state.lowHip, 115, 121) ||
      this.between(this.state.inseam, 85, 86)
    ) {
      this.state.bottomSize = "XXL";
    } else if (
      this.between(this.state.waist, 116, 125) ||
      this.between(this.state.lowHip, 121, 127) ||
      this.between(this.state.inseam, 86, 87)
    ) {
      this.state.bottomSize = "XXXL";
    } else {
      this.state.bottomSize = "not supported";
    }
  }
  
  constructor(props) {
    super(props);
    this.state = {
      bust: 0,
      neck: 0,
      waist: 0,
      lowHip: 0,
      armLen: 0,
      inseam: 0,
      status: "",
      navigate: "",
      isSubmitted: false,
      topSize: "",
      bottomSize: "",
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
      .post(`https://anastatiad.pythonanywhere.com/measureLP`, {
        'Waist': this.state.waist,
        "Bust/Chest": this.state.bust,
        "Inside Leg": this.state.inseam,
        "Arm Length": this.state.armLen,
        "Neckline": this.state.neck,
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
    this.setState({ isSubmitted: true });
    this.getTopSizeRecommend();
    this.getBottomSizeRecommend();
  };
  render() {
    return (
      <div className="MeasurementPage">
        <div className="buttons">
          <Logout />
        </div>
        <a href="/" className="logo">
          <img src={logo} alt="logo" />
        </a>
        <h1>Shop$i</h1>
        <h3 className="desc">Shop with your size</h3>
        <br></br>
        <div class="measurement">
          <form>
            <h2>Enter your measurements(cm)</h2>
            {/* <br />
            <div className="switch">
              <div className="incm-switch">
                IN
                <Switch />
                CM
              </div>
              <div className="mf-switch">
                M
                <Switch />F
              </div>
            </div> */}
            {/* Only appears before submit */}
            {!this.state.isSubmitted && (
              <div class="measurements">
                <div class="box">
                  <label class="mesName">Bust/Chest</label>
                  <div class="sliderBar">
                    <input
                      type="range"
                      id="bust-slider"
                      min="70"
                      max="134"
                      name="bust"
                      value={this.state.bust}
                      onChange={this.handleInput}
                    />
                    <div class="value" id="bust-value">
                      {this.state.bust}
                    </div>
                  </div>
                </div>
                <div class="box">
                  <label class="mesName">Neckline</label>
                  <div class="sliderBar">
                    <input
                      type="range"
                      id="neck-slider"
                      min="30"
                      max="47"
                      name="neck"
                      value={this.state.neck}
                      onChange={this.handleInput}
                    />
                    <div class="value" id="neck-value">
                      {this.state.neck}
                    </div>
                  </div>
                </div>
                <div class="box">
                  <label class="mesName">Waist</label>
                  <div class="sliderBar">
                    <input
                      type="range"
                      id="waist-slider"
                      min="60"
                      max="125"
                      name="waist"
                      value={this.state.waist}
                      onChange={this.handleInput}
                    />
                    <div class="value" id="waist-value">
                      {this.state.waist}
                    </div>
                  </div>
                </div>
                <div class="box">
                  <label class="mesName">Low Hip</label>
                  <div class="sliderBar">
                    <input
                      type="range"
                      id="hip-slider"
                      min="80"
                      max="127"
                      name="lowHip"
                      value={this.state.lowHip}
                      onChange={this.handleInput}
                    />
                    <div class="value" id="hip-value">
                      {this.state.lowHip}
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
                      onChange={this.handleInput}
                    />
                    <div class="value" id="arm-value">
                      {this.state.armLen}
                    </div>
                  </div>
                </div>
                <div class="box">
                  <label class="mesName">Inside leg</label>
                  <div class="sliderBar">
                    <input
                      type="range"
                      id="leg-slider"
                      min="75"
                      max="87"
                      name="inseam"
                      value={this.state.inseam}
                      onChange={this.handleInput}
                    />
                    <div class="value" id="leg-value">
                      {this.state.inseam}
                    </div>
                  </div>
                </div>
              </div>
            )}
            {/* Only appears after submit */}
            {this.state.isSubmitted && (
              <div className="user-size">
                <p>Your top size is {this.state.topSize}</p>
                <p>Your bottom size is {this.state.bottomSize}</p>
              </div>
            )}
            {!this.state.isSubmitted && (
              <div className="buttons">
                <button
                  type="submit"
                  onClick={this.handleSubmit}
                  onSubmit={async (event) => {
                    useNavigate(this.state.navigate);
                  }}
                >
                  {/* <Link to="/">Submit</Link> */}
                  Submit
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    );
  }
}

export default MeasurementPage;