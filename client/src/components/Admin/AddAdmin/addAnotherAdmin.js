import React, { useState, useEffect } from 'react'
import { ToastContainer, toast } from "react-toastify";
import { injectStyle } from "react-toastify/dist/inject-style";
import './addAnotherAdmin.css'



function AddAnotherAdmin() {

    const [adminDetails, setAdminDetails] = useState({
        firstName: '',
        middleName: '',
        lastName: '',
        pinNo: ''
    });

    useEffect(() => {

    }, [adminDetails])

    function handleOnSubmit(e) {
        e.preventDefault();
        saveData();
    }

    const saveData = async function () {
        fetch('/admin/addAnotherAdmin', {
            method: 'POST',
            body: JSON.stringify(adminDetails),
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

                toast.success("Admin is created successfully!!");
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
            <div className="add-admin-form-wrapper container">
                <form className="mt-3">
                    <p>Add Another Admin</p>
                    <div>
                        <input className="add-admin-input my-2" placeholder="Enter First Name"
                            value={adminDetails["firstName"]}
                            onChange={(e) => { setAdminDetails({ ...adminDetails, firstName: e.target.value }) }}
                            required
                        />
                        <input className="add-admin-input my-2" placeholder="Enter Middle Name"
                            value={adminDetails["middleName"]}
                            onChange={(e) => { setAdminDetails({ ...adminDetails, middleName: e.target.value }) }}
                            required
                        />
                        <input className="add-admin-input my-2" placeholder="Enter Last Name"
                            value={adminDetails["lastName"]}
                            onChange={(e) => { setAdminDetails({ ...adminDetails, lastName: e.target.value }) }}
                            required
                        />
                        <input className="add-admin-input my-2" placeholder="Enter Admin PinNo" type="password"
                            value={adminDetails["pinNo"]}
                            onChange={(e) => { setAdminDetails({ ...adminDetails, pinNo: e.target.value }) }}
                            required
                        />
                        <button type="submit" className="btn btn-primary add-admin-subBtn" onClick={handleOnSubmit}>Add Admin</button>
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

export default AddAnotherAdmin
