import './SignUpPage.css'
import React, { Component } from 'react'
import { useNavigate } from "react-router-dom"

export function SignUpPage(){
    let navigate = useNavigate(); 
    return (
        <div className='SignUpPage'>
        <h1>Shop$i</h1>
        <h3 className="desc">Shop with your size</h3><br></br>
        <div className="signup">
            <form>
                <h2>Sign Up</h2>
                <div className="user-info">
                    <div className="box">
                        <label className="infoName">First Name</label>
                        <div className="infoBox">
                            <input type="text" id="firstNameText"/>
                        </div>
                    </div>
                    
                    <div className="box">
                        <label className="infoName">Last Name</label>
                        <div className="infoBox">
                            <input type="text" id="lastNameText"/>
                        </div>
                    </div>

                    <div className="box">
                        <label className="infoName">Username</label>
                        <div className="infoBox">
                            <input type="text" id="usernameText"/>
                        </div>
                    </div>

                    <div className="box">
                        <label className="infoName">Password</label>
                        <div className="infoBox">
                            <input type="text" id="passwordText"/>
                        </div>
                    </div>
                </div>
                <button type="submit" id="enter-info" onClick={() => {navigate("/")}}>Submit</button>
                </form>
            </div>
        </div>
    )
}

export default SignUpPage