import React, { useState } from 'react'
import { ToastContainer, toast } from "react-toastify";
import { injectStyle } from "react-toastify/dist/inject-style";
import $ from "jquery"
export default function MakeDebitCard() {
    const [data, setData] = useState({
        username: '',
        pinNo: ''
    })
    function handleOnSubmit(e) {
        e.preventDefault()
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify(data);

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("/cards/makeDebitCards/" + data.username, requestOptions)
            .then(response => response.text())
            .then(result => {
                console.log(result)
                result = JSON.parse(result)
                if (result["Success:"]) {
                    toast.success("The Debit Card has been issued for the user!!")
                }
                else {
                    console.log(result["Error:"])
                    toast.error(result["Error:"])
                }
            }
            )
            .catch(error => console.log('error', error));
    }
    return (
        <div>

            <div className="form-wrapper">
                <form className="mt-3" style={{ "width": "32%" }}>
                    <p>Issue Debit Card</p>
                    <div>
                        <input className="ddu-input my-2" placeholder="Enter User's Account Number"
                            value={data["username"]}
                            onChange={(e) => { setData({ ...data, username: e.target.value }) }}
                            required
                        />


                        <input className="ddu-input my-2" placeholder="Enter Admin's PinNo" type="password"
                            value={data["pinNo"]}
                            onChange={(e) => { setData({ ...data, pinNo: e.target.value }) }}
                            required
                        />

                        <button type="submit" className="btn btn-primary subBtn"
                            onClick={handleOnSubmit}
                        >Issue Debit Card</button>
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
