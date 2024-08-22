import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import img from "../Assets/admin.jpg"
import $ from "jquery"
import "./ViewProfile.css"
import useFetch from "../../Home/Utility/General/Usefetch"

export default function ViewProfile() {


    const [userData, setUserData] = useState({
        fullName: ''
    });

    useEffect(() => {
        $.ajax({
            type: "post",
            url: "/admin/viewProfile",
            success: function (response) {
                const data = response["userData"];
                console.log(data);
                setUserData({ fullName: data["firstName"] + " " + data["lastName"] });
            },
        });
    }, []);



    return (
        <>
            <br />
            <div class="container mb-4 p-3 d-flex justify-content-center">
                <div class="card p-4 cardViewProfile">
                    <div class=" imgViewProfile d-flex flex-column justify-content-center align-items-center">
                        <button class="btn btn-secondary btnViewProfile">
                            {/* <img src={img} class="imgViewProfile" height="100" width="100" /> */}
                            <img src={"https://source.unsplash.com/1600x900/?men"} class="imgViewProfile" height="100" width="100" />
                        </button>
                        <span class="name mt-3 nameViewProfile">{userData["fullName"]}</span>
                        {/* <span class="emailIdViewProfile">rikinchauhan@bankers.com</span> */}
                        {/* <div class="d-flex flex-row justify-content-center align-items-center gap-2">
                    <span class="IdViewProfile">ID: 978512365</span>
                </div> */}
                        <NavLink to="/admin/logout" style={{ "textDecoration": "none" }}>
                            <div class=" d-flex mt-2">
                                <button class="btn1 btn-dark logOutBtnViewProfile">Log Out</button>
                            </div>
                        </NavLink>


                        {/* <div class="gap-3 mt-3 icons d-flex flex-row justify-content-center align-items-center">
                    <span><i class="fa fa-twitter"></i></span>
                    <span><i class="fa fa-facebook-f"></i></span>
                    <span><i class="fa fa-instagram"></i></span>
                    <span><i class="fa fa-linkedin"></i></span>
                </div> */}
                        {/* <div class=" px-2 rounded mt-4 dateViewProfile ">
                    <span class="joinViewProfile">Joined June,2021</span>
                </div> */}
                    </div>
                </div>
            </div>
        </>
    )
}
