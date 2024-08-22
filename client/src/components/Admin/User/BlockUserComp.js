import React, { useState, useEffect } from 'react'
import { ToastContainer, toast } from "react-toastify";
import { injectStyle } from "react-toastify/dist/inject-style";
import "./CreateUser.css"

export default function BlockUserComp() {

    const [data, setData] = useState({
        username: '',
        pinNo: ''
    })

    useEffect(() => {

    }, [data])

    function handleOnSubmit(e) {
        e.preventDefault();
        saveData();
    }

    const saveData = async function () {
        fetch('/admin/block_user', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            }
        }).then(function (response) {
            console.log(response)
            if (response.ok) {
                return response.json();
            }
            return Promise.reject(response);
        }).then(function (data) {
            if (data.hasOwnProperty("Success")) {
                // console.log(data)
                toast.success("User Blocked Successfully!!");
                // history.goBack()
            }
            else {
                toast.error("Something went wrong!");
                // console.log(data.body)
            }
        }).catch(function (error) {
            // console.log(error.body)
            toast.error("Something went wrong!");
        });
    }


    return (
        <div>
            <div className="form-wrapper">
                <form className="mt-3" style={{ "width": "32%" }}>
                    <p>Block User</p>
                    <div>
                        <input className="ddu-input my-2" placeholder="Enter Full Name"
                            value={data["username"]}
                            onChange={(e) => { setData({ ...data, username: e.target.value }) }}
                            required
                        />

                        <div>
                            {/* <h5>Result:</h5> */}
                        </div>
                        <input className="ddu-input my-2" placeholder="Enter PinNo" type="password"
                            value={data["pinNo"]}
                            onChange={(e) => { setData({ ...data, pinNo: e.target.value }) }}
                            required
                        />

                        <button type="submit" className="btn btn-primary subBtn"
                            onClick={handleOnSubmit}
                        >Block User</button>
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
        </div>
    )
}
