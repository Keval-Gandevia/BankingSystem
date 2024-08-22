import React, { useState, useEffect } from 'react'
import { ToastContainer, toast } from "react-toastify";
import { injectStyle } from "react-toastify/dist/inject-style";
import "./AddCashToUser.css"


export default function AddCash() {

    const [cashDetails, setCashDetails] = useState({
        acNum: '',
        amount: '',
        pinNo: ''
    });

    useEffect(() => {

    }, [cashDetails])

    function handleOnSubmit(e) {
        e.preventDefault();
        saveData();
    }

    const saveData = async function () {
        fetch('/admin/addCashToUser', {
            method: 'POST',
            body: JSON.stringify(cashDetails),
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            }
        }).then(function (response) {
            // console.log(response)
            if (response.ok) {
                return response.json();
            }
            return Promise.reject(response);
        }).then(function (data) {
            if (data.hasOwnProperty("Success")) {

                toast.success("Cash is added successfully!!");
            }
            else {
                toast.error(data["Error:"]);
                // console.log(data.body)
            }
        }).catch(function (error) {
            // console.log(error.body)
            toast.error("Something went wrong!");
        });
    }
    return (
        <div>
            <div className="add-cash-form-wrapper container">
                <form className="mt-3">
                    <p>Add Cash to User</p>
                    <div>
                        <input className="add-cash-input my-2" placeholder="Enter User Account Number"
                            value={cashDetails["acNum"]}
                            onChange={(e) => { setCashDetails({ ...cashDetails, acNum: e.target.value }) }}
                            required
                        />
                        <input className="add-cash-input my-2" type="number" placeholder="Enter Amount"
                            value={cashDetails["amount"]}
                            onChange={(e) => { setCashDetails({ ...cashDetails, amount: e.target.value }) }}
                            required
                        />
                        <input className="ddu-input my-2" placeholder="Enter Admin PinNo" type="password"
                            value={cashDetails["pinNo"]}
                            onChange={(e) => { setCashDetails({ ...cashDetails, pinNo: e.target.value }) }}
                            required
                        />
                        <button type="submit" className="btn btn-primary add-cash-subBtn" onClick={handleOnSubmit}>Add Cash</button>
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


