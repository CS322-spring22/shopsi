import React, { Component } from 'react'

export class MeasurementForm extends Component {
    constructor(props) {
      super(props)
      this.state = {
         chest: '',
         neck: '',
         waist: '',
         hip: '',
         arm: '',
         leg: ''
      }
    }

    handleInput = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }


  render() {
    return (
        <form className="measurement-form" onSubmit={this.handleSubmit}>
            <label>
                Chest:
                <input type='range'
                name='chest'
                value={this.state.chest}
                onChange={this.handleInput}
                />
            </label>
            
            <label> 
                Neck:
                <input type='range' 
                name='neck'
                value={this.state.neck}
                onChange={this.handleInput}
                />
            </label>  
            <label> 
                Waist:
                <input type='range' 
                name='waist'
                value={this.state.waist}
                onChange={this.handleInput}
                />
            </label>  
            <label>
                Low Hip:
                <input type='range' 
                name='hip'
                value={this.state.hip}
                onChange={this.handleInput}
                />
            </label>  
            <label> 
                Arm:
                <input type='range' 
                name='arm'
                value={this.state.arm}
                onChange={this.handleInput}
                />
            </label>  
            <label> 
                Inside Leg:
                <input type='range' 
                name='leg'
                value={this.state.leg}
                onChange={this.handleInput}
                />
            </label>  
    </form>
    )
  }
}

export default MeasurementForm