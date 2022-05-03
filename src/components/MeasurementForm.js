import React, { Component } from 'react'
import axios from 'axios'

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

    handleSubmit = event => {
        alert(` Bust/Chest: ${this.state.chest} 
                 Neckline: ${this.state.neck}
                 Waist: ${this.state.waist}
                 Low Hip: ${this.state.hip}
                 Arm Length: ${this.state.arm}
                 Inside Leg: ${this.state.leg} `)
        event.preventDefault()      
        axios.post(`/measureLP`, 
            { 
                 "Bust/Chest": this.state.chest, 
                 "Neckline": this.state.neck,
                 "Waist": this.state.waist,
                 "Low Hip": this.state.hip,
                 "Arm Length": this.state.arm,
                 "Inside Leg": this.state.leg
            }
        )
        .then(
            (response) => {
                var result = response.data;
                this.state.status = result.status;
                console.log(result);
                if (this.state.status == 'User does not exist') {
                    //prompt user to sign up
                    //switch to sign up pop up (how do I do that?)
                }
                else {
                    //go to next page (measurements)
                    //switch to measurements pop up
                }
            },
            (error) => {
                console.log(error);
            }
        );
        axios.get('/measureLP')
        .then((response) => {
            const res =response.data
            this.state.status = res.status
        })
        .catch((error) => {
            if (error.response) {
                console.log(error.response)
                console.log(error.response.status)
                console.log(error.response.headers)
            }
        });
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