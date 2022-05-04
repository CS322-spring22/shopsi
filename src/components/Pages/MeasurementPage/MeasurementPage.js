import React, { Component } from 'react'
import { useNavigate } from 'react-router-dom'
import './MeasurementPage.css'

 export class MeasurementPage extends Component {
    constructor(props){
        super(props)
        this.state = {
            waist : 0,
            bust : 0,
            inseam : 0,
            armLen : 0,
            neck : 0,
            lowHip : 0,
            status : '',
            navigate : ''
        }
    }

    handleInput = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit = (event) => {
        event.preventDefault()    
        axios.post(`/measureLP`, 
            { 
                'Waist' : this.state.waist,
                'Bust/Chest' : this.state.bust,
                'Inside Leg' : this.state.inseam,
                'Arm Length' : this.state.armLen,
                'Neckline' : this.state.neck,
                'Low Hip' : this.state.lowHip 
            }
        )
        .then(
            (response) => {
                var result = response.data;
                this.state.status = result.status
                console.log(result);
                if (this.state.status === 'Logout'){
                    this.state.navigate = '/'
                }
                else {
                    this.state.navigate = '/measurements'
                }
            },
            (error) => {
                console.log(error);
            }
        );
}
    

    render() {
        return (
            <div className='MeasurementPage'>
            <h1>Shop$i</h1>
            <h3 className="desc">Shop with your size</h3><br></br>
            <div class="measurement">
                <form>
                    <h2>Enter your measurements</h2>
                    <div class="measurements">
                        <div class="box">
                            <label class="mesName">Bust/Chest</label>
                            <div class="sliderBar">
                                <input type="range"  min="0" max ="100" name='bust' value={bust}/>
                                <div class ="value" id="bust-value">0</div>
                            </div>
                        </div>
                        
                        <div class="box">
                            <label class="mesName">Neckline</label>
                            <div class="sliderBar">
                                <input type="range" id="neckSlider" min="0" max ="100" name='neck' value={neck}/>
                                <div class ="value" id="neck-value">0</div>
                            </div>
                        </div>

                        <div class="box">
                            <label class="mesName">Waist</label>
                            <div class="sliderBar">
                                <input type="range" id="waistSlider" min="0" max ="100" name='waist' value={waist}/>
                                <div class ="value" id="waist-value">0</div>
                            </div>
                        </div>

                        <div class="box">
                            <label class="mesName">Low Hip</label>
                            <div class="sliderBar">
                                <input type="range" id="hipSlider" min="0" max ="100" name='lowHip' value={lowHip}/>
                                <div class ="value" id="hip-value">0</div>
                            </div>
                        </div>

                        <div class="box">
                            <label class="mesName">Arm length</label>
                            <div class="sliderBar">
                                <input type="range" id="armSlider" min="0" max ="100" name='armLen' value={armLen}/>
                                <div class ="value" id="arm-value">0</div>
                            </div>
                        </div>

                        <div class="box">
                            <label class="mesName">Inside leg</label>
                            <div class="sliderBar">
                                <input type="range" id="legSlider" min="0" max ="100" name='inseam' value={inseam}/>
                                <div class ="value" id="leg-value">0</div>
                            </div>      
                        </div> 
                    </div>
                    <button type="submit" id="enter-measurement" onClick={this.handleSubmit} onSubmit={async (event) => {useNavigate(this.state.navigate);}}>Submit</button>
                </form>
            </div>
            </div>
        )
    }
}

export default MeasurementPage