import React from 'react'
import { useHistory } from "react-router-dom";
import { injectStyle } from "react-toastify/dist/inject-style";
import { ToastContainer, toast } from "react-toastify";
import "./AdminLogin.css"
import img from "../Assets/218.jpg"
import { useState, useEffect } from 'react'



export default function AdminLogin() {
    const [userDetails, setUserDetails] = useState({
        username: '',
        pinNo: ''
    });

    const history = useHistory()
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
        fetch("/admin/loginAdmin", requestOptions)
            .then(response => response.text())
            .then((result) => {

                if (result === "Success") {
                    history.push("/admin/home")
                    toast.success("Yay! Admin Welcome")
                }
                else {

                    toast.error("Provide correct credentials!!")


                }
            }
            ).catch(error => console.log('error', error));

    }

    return (
        <>
            <div className="adminLoginWrapper">
                <div className="topNavBar">
                    <a href="/login">Bankers</a>
                </div>
                <div className="row" style={{ "margin-top": "5%" }}>
                    <div className="col-6 brdr-right">
                        <div className="adminImgDiv">
                            <img src={img} />
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="adminLoginDiv">

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
                                        <label>Admin Id</label>
                                    </div>
                                    <div class="input-data m-4">
                                        <input id="pinNo"
                                            type="password"
                                            value={userDetails.pinNo}
                                            onChange={e => setUserDetails({ ...userDetails, pinNo: e.target.value })}
                                            required
                                        />
                                        <div class="underline"></div>
                                        <label>Password</label>
                                    </div>
                                    <button type="submit" class="loginbtn"
                                        onClick={(e) => saveData(e)}
                                    >Login</button>
                                </div>
                            </form>
                        </div>
                    </div>
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
