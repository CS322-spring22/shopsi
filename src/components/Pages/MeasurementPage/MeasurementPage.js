import React from 'react'
import Slider from '../../Slider'
import './MeasurementPage.css'


export default function MeasurementPage() {

  return (
    <div className='MeasurementPage'>
      <h1>Shop$i</h1>
      <h3 className="desc">Shop with your size</h3><br></br>
      <div class="measurement">
        <form>
            <button id="log-out">Log out</button>
            <h2>Enter your measurements</h2>
            <div class="measurements">
                <div class="box">
                    <label class="mesName">Bust/Chest</label>
                    <div class="sliderBar">
                        <input type="range"  min="0" max ="100" value ="0"/>
                        <div class ="value" id="bust-value">0</div>
                    </div>
                </div>
                
                <div class="box">
                    <label class="mesName">Neckline</label>
                    <div class="sliderBar">
                        <input type="range" id="neckSlider" min="0" max ="100" value ="0"/>
                        <div class ="value" id="neck-value">0</div>
                    </div>
                </div>

                <div class="box">
                    <label class="mesName">Waist</label>
                    <div class="sliderBar">
                        <input type="range" id="waistSlider" min="0" max ="100" value ="0"/>
                        <div class ="value" id="waist-value">0</div>
                    </div>
                </div>

                <div class="box">
                    <label class="mesName">Low Hip</label>
                    <div class="sliderBar">
                        <input type="range" id="hipSlider" min="0" max ="100" value ="0"/>
                        <div class ="value" id="hip-value">0</div>
                    </div>
                </div>

                <div class="box">
                    <label class="mesName">Arm length</label>
                    <div class="sliderBar">
                        <input type="range" id="armSlider" min="0" max ="100" value ="0"/>
                        <div class ="value" id="arm-value">0</div>
                    </div>
                </div>

                <div class="box">
                    <label class="mesName">Inside leg</label>
                    <div class="sliderBar">
                        <input type="range" id="legSlider" min="0" max ="100" value ="0"/>
                        <div class ="value" id="leg-value">0</div>
                    </div>      
                </div> 
            </div>
            <button type="submit" id="enter-measurement" >Submit</button>
        </form>
      </div>
    </div>
  )
}