import React,{useState,useEffect} from 'react'
import { ToastContainer, toast } from "react-toastify";
import { useHistory } from 'react-router';
import { injectStyle } from "react-toastify/dist/inject-style";
import $ from "jquery"
import {useLocation} from "react-router"


export default function OTPComponent() {
    let slug = useLocation().pathname.split("/")[2]
    const [otp, setotp] = useState({"otp":0})
    function handleSubmit(e)
    {
        e.preventDefault()
        // console.log(otp.otp,slug);
        $.ajax({
            type: "post",
            url: "/verifyOtp",
            data: JSON.stringify({otp:otp["otp"],tid:slug}),
            dataType: 'json',
            contentType: 'application/json',
            success: function (response) {
                if(response["Success:"])
                {
                    toast.success(response["message"])
                }
                else
                {
                    toast.error(response["message"])
                }
            },
        })
    }
    return (
        <div>
            <h2 className="neftHeader">Enter your OTP</h2>
            <input type="text" class="mt-4 form-control neftInps" id="inputEmail3"
                type="number"
                value={otp["otp"]}
                onChange={(e) => { setotp({ ...otp, otp: e.target.value }) }}
                placeholder="Enter Your OTP" />
            <p style={{ "color": "white" }}>Your OTP has been sent to your registered email id and phone number</p>
            <button onClick={(e)=>{handleSubmit(e)}} className="btn btn-info mt-2" style={{"width":"100%","height":"20%","padding":"0px"}}>Submit</button>
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
        </div>
    )
}
