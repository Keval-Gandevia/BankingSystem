import React from 'react'
import { useLocation, useParams } from 'react-router-dom/cjs/react-router-dom.min'
// import { ToastContainer, toast } from "react-toastify";
import { ToastContainer, toast } from "react-toastify";
import { useHistory } from "react-router"
import { injectStyle } from "react-toastify/dist/inject-style";
import { useState, useEffect } from 'react'
import './RTGS.css'

export default function NEFTComponent() {

    const history = useHistory()
    const [data, setData] = useState({
        beneficiaryName: "",
        beneficiaryAcNum: "",
        amount: "",
        ifscCode: "",
        reason: ""
    })
    useEffect(() => {

    }, [data])

    function handleOnSubmit(e) {
        e.preventDefault();
        saveData();
    }

    const slug = useLocation();
    // console.log(slug);
    // console.log(slug["pathname"].split("/"));

    const saveData = async function () {

        const acNum = slug["pathname"].split("/")[2];
        fetch('/verifyRTGS/' + acNum, {
            method: 'POST',
            body: JSON.stringify(data),
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
            if (data.hasOwnProperty("Success:")) {
                // console.log(data)
                // const tid = slug["pathname"].split("/")[2]
                const tid = data["data"]["_id"]
                history.push("/otp/"+tid)
                toast.success("Your payment was a success");
                // history.goBack()
            }
            else {
                toast.error(data["Error"]);
                // console.log(data.body)
            }
        }).catch(function (error) {
            // console.log(error.body)
            toast.error("Something went wrong!");
        });

    }

    return (
        <div>

            <div >
                <h1 className="rtgsHeader">Transfer Via RTGS</h1>
                <hr className="rtgsHeader" />
            </div>
            <div>
                <form className="text-light rtgsForm mt-5">
                    <div class="row mb-3 ">
                        <label for="inputEmail3" class="col-sm-2 col-form-label"><b>Beneficiary Name</b><span className="home-loan-form-span"> * </span></label>
                        <div class="col-sm-10">
                            <input type="text" class="form-control rtgsInps" id="inputEmail3"
                                value={data["beneficiaryName"]}
                                onChange={(e) => { setData({ ...data, beneficiaryName: e.target.value }) }}
                                // setUserDetails()
                                placeholder="Beneficiary Name" />
                        </div>
                    </div>
                    <div class="row mb-3 ">
                        <label for="inputEmail3" class="col-sm-2 col-form-label"><b>Beneficiary A/C</b><span className="home-loan-form-span"> * </span></label>
                        <div class="col-sm-10">
                            <input type="text" class="form-control rtgsInps" id="inputEmail3"
                                value={data["beneficiaryAcNum"]}
                                onChange={(e) => { setData({ ...data, beneficiaryAcNum: e.target.value }) }}
                                placeholder="Beneficiary Account Number" />
                        </div>
                    </div>
                    <div class="row mb-3">
                        <label for="inputPassword3" class="col-sm-2 col-form-label"><b>ISFC code</b><span className="home-loan-form-span"> * </span></label>
                        <div class="col-sm-10">
                            <input type="text" class="form-control rtgsInps" placeholder="ISFC code of beneficiary" id="inputPassword3"
                                value={data["ifscCode"]}
                                onChange={(e) => { setData({ ...data, ifscCode: e.target.value }) }}
                            />
                        </div>
                    </div>
                    <div class="row mb-3">
                        <label for="reason" class="col-sm-2 col-form-label"><b>Reason</b>
                            <span className="home-loan-form-span"> * </span> </label>
                        <div class="col-sm-10">
                            <input type="text" class="form-control rtgsInps" placeholder="Reason" id="reason"
                                value={data["reason"]}
                                onChange={(e) => { setData({ ...data, reason: e.target.value }) }}
                            />
                        </div>
                    </div>
                    <div class="row mb-3">
                        <label for="inputPassword3" class="col-sm-2 col-form-label"><b>Amount</b> <span className="home-loan-form-span"> * </span></label>
                        <div class="col-sm-10">
                            <input type="number" class="form-control rtgsInps" placeholder="Amount" id="inputPassword3"
                                value={data["amount"]}
                                onChange={(e) => { setData({ ...data, amount: e.target.value }) }}
                            />
                        </div>
                    </div>
                    <div class="row custCol mb-3">
                        <button onClick={handleOnSubmit} className="custBtnRTGS">Transfer Amount</button>
                    </div>
                </form>
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
        </div>
    )
}
