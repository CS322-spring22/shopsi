import React from "react";
import styled from "styled-components";

export default class Slider extends React.Component {
    constructor(props) {
        super(props)
        this.state = "0"
        
      }

    handleInput = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    render() {
        return (
            <>
                <input type="range" min={0} max={100} value={this.state.value} className="slider" onChange={this.handleInput} />
                <div className="value"> {this.state.value}</div>
            </>
        )
    }
}