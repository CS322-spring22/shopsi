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
        <form onSubmit={this.handleSubmit}>
            <label>Bust/Chest:
                <input type='text'
                name='chest'
                value={this.state.chest}
                onChange={this.handleInput}
                />
            </label>
            
            <label> Neckline:
                <input type='text' 
                name='neck'
                value={this.state.neck}
                onChange={this.handleInput}
                />
            </label>  
            <label> Waist:
                <input type='text' 
                name='waist'
                value={this.state.waist}
                onChange={this.handleInput}
                />
            </label>  
            <label> Low Hip:
                <input type='text' 
                name='hip'
                value={this.state.hip}
                onChange={this.handleInput}
                />
            </label>  
            <label> Arm Length:
                <input type='text' 
                name='arm'
                value={this.state.arm}
                onChange={this.handleInput}
                />
            </label>  
            <label> Inside Leg:
                <input type='text' 
                name='leg'
                value={this.state.leg}
                onChange={this.handleInput}
                />
            </label>  
            {/* <button type="submit">Submit</button>     */}
    </form>
    )
  }
}

export default MeasurementForm