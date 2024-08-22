import React, { useState, useEffect } from 'react'
import { ToastContainer, toast } from "react-toastify";
import { injectStyle } from "react-toastify/dist/inject-style";
import "./CreateUser.css"

export default function CreateUser() {

    const [userDetails, setUserDetails] = useState({
        firstName: '',
        middleName: '',
        lastName: '',
        emailId: '',
        pinNo: '',
        address: '',
        aadharNo: '',
        panCardNo: '',
        DOB: '',
        mobileNo: '',
        nodeName: 'block chain'
    });

    useEffect(() => {

    }, [userDetails])

    function handleOnSubmit(e) {
        e.preventDefault();
        saveData();
    }

    const saveData = async function () {
        fetch('/user/add_user', {
            method: 'POST',
            body: JSON.stringify(userDetails),
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            }
        }).then(function (response) {
            console.log(response)
            if (response.ok) {
                response.json().then((e) => {
                    if (e["Error:"]) {
                        toast.error(e["Error:"])
                    }
                    else {
                        toast.success(e["Success"])
                    }
                })
                return response.json();
            }
            return Promise.reject(response);
        }).then(function (data) {
            if (data.hasOwnProperty("Success")) {
                console.log(data)
                toast.success("User Created Successfully!!");
                // history.goBack()
            }
            else {

                // console.log(data.body)
            }
        }).catch(function (error) {
            // console.log(error.body)

        });
    }



    return (
        <div className="form-wrapper container">
            <form className="mt-3" style={{ "width": "52%" }}>
                <p>Make New User</p>
                <div>
                    <input className="ddu-input my-2" placeholder="Enter First Name"
                        value={userDetails["firstName"]}
                        onChange={(e) => { setUserDetails({ ...userDetails, firstName: e.target.value }) }}
                        required
                    />
                    <input className="ddu-input my-2" placeholder="Enter Middle Name"
                        value={userDetails["middleName"]}
                        onChange={(e) => { setUserDetails({ ...userDetails, middleName: e.target.value }) }}
                        required
                    />
                    <input className="ddu-input my-2" placeholder="Enter Last Name"
                        value={userDetails["lastName"]}
                        onChange={(e) => { setUserDetails({ ...userDetails, lastName: e.target.value }) }}
                        required
                    />
                    <input className="ddu-input my-2" placeholder="Enter your email"
                        value={userDetails["emailId"]}
                        onChange={(e) => { setUserDetails({ ...userDetails, emailId: e.target.value }) }}
                        required
                    />
                    <input className="ddu-input my-2" placeholder="Enter Pin Number" type="text" maxlength="4"
                        value={userDetails["pinNo"]}
                        onChange={(e) => { setUserDetails({ ...userDetails, pinNo: e.target.value }) }}
                        required

                    />
                    <input className="ddu-input my-2" placeholder="Enter Address"
                        value={userDetails["address"]}
                        onChange={(e) => { setUserDetails({ ...userDetails, address: e.target.value }) }}
                        required
                    />
                    <input className="ddu-input my-2" placeholder="Enter Aadhar card number"
                        value={userDetails["aadharNo"]}
                        onChange={(e) => { setUserDetails({ ...userDetails, aadharNo: e.target.value }) }}
                        required
                    />
                    <input className="ddu-input my-2" placeholder="Enter Pan card number"
                        value={userDetails["panCardNo"]}
                        onChange={(e) => { setUserDetails({ ...userDetails, panCardNo: e.target.value }) }}
                        required
                    />
                    <input className="ddu-input my-2" placeholder="Enter Mobile Number"
                        value={userDetails["mobileNo"]}
                        onChange={(e) => { setUserDetails({ ...userDetails, mobileNo: e.target.value }) }}
                        required
                    />


                    <input className="ddu-input my-2" placeholder="Enter DOB"
                        type="date"
                        value={userDetails["DOB"]}
                        onChange={(e) => { setUserDetails({ ...userDetails, DOB: e.target.value }) }}
                        required
                    /><br />
                    <button type="submit" className="btn btn-primary subBtn"
                        onClick={handleOnSubmit}
                    >Add User</button>
                </div>
            </form>
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
