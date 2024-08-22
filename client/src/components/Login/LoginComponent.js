import React from 'react'
import { ToastContainer, toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import { injectStyle } from "react-toastify/dist/inject-style";
import './LoginComponent.css'
import img from "./Asset/login_asset.jpg"
import './input_field_animation.css'
import { useState, useEffect } from 'react'
const axios = require('axios');


export default function LoginComponent({ data }) {
    const history = useHistory()
    const styles = {
        "background-color": "#ffffff",
        "height": "705px"
    }


    const [userDetails, setUserDetails] = useState({
        username: '',
        pinNo: ''
    });


    const saveData = async function (e) {
        e.preventDefault()
        var data = JSON.stringify(userDetails)
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");


        var raw = data
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };
        fetch("/user/login_user", requestOptions)
            .then(response => response.text())
            .then((result) => {

                if (result === "Success") {
                    history.push("/home")
                }
                else {
                    toast.error("Provide correct credentials!!")
                    console.log(result)
                    // toast.error("Wrong username or password!!")
                }
            }
            ).catch(error => console.log('error', error));
    }
    return (
        <>
            <div className="row" style={styles}>
                <div>
                    <h2 className="login_header">Bankers</h2>
                </div>
                <div className="col-6">

                    <img className="Login_Image" src={img} />


                </div>
                <div className="col-6">
                    <form>
                        <div class="wrapper">
                            <div className="Login_text">
                                <h2><b>Login</b></h2>
                            </div>
                            <div class="input-data m-4">
                                <input id="username"
                                    type="text"
                                    value={userDetails.username}
                                    onChange={e => setUserDetails({ ...userDetails, username: e.target.value })}
                                    required
                                />
                                <div class="underline"></div>
                                <label>User ID / Account Number</label>
                            </div>
                            <div class="input-data m-4">
                                <input id="pinNo"
                                    type="password"
                                    value={userDetails.pinNo}
                                    onChange={e => setUserDetails({ ...userDetails, pinNo: e.target.value })}
                                    required
                                />
                                <div class="underline"></div>
                                <label>IPIN / Password</label>
                                {/* <div className="login-vertical-bar"></div> */}
                            </div>
                            <button type="submit" class="  loginbtn" onClick={(e) => saveData(e)}>Login</button>
                        </div>
                    </form>
                </div>
            </div>

            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />

        </>
    )
}
