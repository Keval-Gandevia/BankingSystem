import React, { useState, useEffect } from 'react'
import './MakePayment.css'
import { useLocation, useParams } from 'react-router-dom/cjs/react-router-dom.min'
import { injectStyle } from "react-toastify/dist/inject-style";
import { ToastContainer, toast } from "react-toastify";
import { useHistory } from 'react-router';
import verifyPayment from '../Utility/VerifyPayment'
import useFetch from '../Utility/General/Usefetch';

function MakePayment() {
    const history = useHistory()

    const [userDetails, setUserDetails] = useState({
        fullName: '',
        acNumber: '',
        email: '',
        amount: '',
        reason: ''
    });

    function handleOnSubmit(e) {

        e.preventDefault()
        userDetails["accountBalance"] = loading ? -1 : data["acDetails"][0]["accountBalance"]
        const msg = verifyPayment(userDetails).then((e) => {
            if (e == "Your Details are verified please be patient while we process your request") {
                toast.info(e);
                saveData();
            }
            else {

                toast.error(e);
            }
        })
    }
    // function that used to display string in formatted method
    const capitalize = (str) => {
        const names = str.split(" ")
        let str1 = ""
        names.map((e) => {
            str1 += e[0].toUpperCase() + e.slice(1, e.lengh) + " "
        })
        return str1
    }

    // display card in some manner
    const parseCardnum = (data) => {
        data = String(data)
        let str1 = ""
        str1 += data.substring(0, 4) + "-"
        str1 += data.substring(4, 8) + "-"
        str1 += data.substring(8, 12) + "-"
        str1 += data.substring(12, 16)
        return str1
    }
    let slug = useLocation()
    let make_payement_req = "/cards/getUserDebitCards/" + slug["pathname"].split("/")[2];


    const { data, loading } = useFetch(make_payement_req);

    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"];
    const expiryDate = loading ? "cancel" : data["data"][0]["expiryDate"];
    const expiryMonth = monthNames[(new Date(expiryDate)).getMonth()];
    const expiryYear = (new Date(expiryDate)).getFullYear();;


    const saveData = async function () {
        fetch('/payment/debit/' + slug["pathname"].split("/")[2], {
            method: 'POST',
            body: JSON.stringify(userDetails),
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            }
        }).then(function (response) {
            if (response.ok) {
                return response.json();
            }
            return Promise.reject(response);
        }).then(function (data) {
            // console.log(data)
            if (data.hasOwnProperty("Success:")) {
                // console.log(data.data)
                history.push("/otp/"+data.data)
                toast.success("Your Transaction has been initiated!");
                // history.goBack()
            }
            else
            {
                toast.error("Something went wrong!")
            }
        }).catch(function (error) {
            toast.error("Something went wrong!");
        });
    }
    // const Loading... = <><h1>Jenil</h1></>
    return (
        <>
            <div>
                {/* <div class="make-payment-col-75 "> */}
                {/* <div class="make-payment-container make-payment-wrapper"> */}
                <form>
                    <div class="make-payment-row">
                        <div class="make-payment-col-50">
                            <h1 className="make-payment-sender-details">
                                Sender Details
                            </h1>
                            <hr className="make-payment-sender-details" />
                            <br />
                            <div className="row mb-4">
                                <label class="make-payment-label" for="fname">
                                    <i class="fa fa-user"></i> Full Name
                                </label>
                                <div className="col-sm-11">
                                    <input
                                        disabled
                                        class="make-payment-input"
                                        type="text"
                                        id="fname"
                                        value={
                                            loading ? (
                                                "Loading..."
                                            ) : (
                                                capitalize(data["ulist"][0])
                                            )
                                        }
                                    />
                                </div>
                            </div>

                            <div className="row mb-4">
                                <label class="make-payment-label" for="ccnum">
                                    <i class="fa fa-address-card-o"></i> Debit card number{" "}
                                </label>
                                <div className="col-sm-11">
                                    <input
                                        disabled
                                        class="make-payment-input"
                                        type="text"
                                        id="ccnum"
                                        name="cardnumber"
                                        placeholder="1111-2222-3333-4444"
                                        value={
                                            loading
                                                ? "Loading...."
                                                : parseCardnum(data["data"][0]["cardNumber"])
                                        }
                                    />
                                </div>
                            </div>

                            <div className="row mb-4">
                                <div className="col-sm-5">
                                    <label class="make-payment-label" for="expmonth">
                                        Expiry Month
                                    </label>
                                    <input
                                        disabled
                                        class="make-payment-input"
                                        type="text"
                                        id="expmonth"
                                        name="expmonth"
                                        placeholder="September"
                                        value={
                                            loading
                                                ? "Loading..."
                                                : expiryMonth
                                        }
                                    />
                                </div>

                                <div className="col-sm-5">
                                    <label class="make-payment-label" for="expyear">
                                        Expiry Year
                                    </label>
                                    <input
                                        disabled
                                        class="make-payment-input"
                                        type="text"
                                        id="expyear"
                                        name="expyear"
                                        placeholder="2018"
                                        value={
                                            loading
                                                ? "Loading..."
                                                : expiryYear
                                        }
                                    />
                                </div>
                            </div>


                            <div className="row mb-4">
                                <label class="make-payment-label" for="cvv">
                                    CVV
                                </label>
                                <div className="col-sm-11">
                                    <input
                                        disabled
                                        class="make-payment-input"
                                        type="text"
                                        id="cvv"
                                        name="cvv"
                                        placeholder="352"
                                        value={loading ? "Loading..." : data["data"][0]["cvvNumber"]}
                                    />
                                </div>
                            </div>

                            <div className="row mb-4">
                                <label class="make-payment-label" for="acnum">
                                    Your Balance:
                                </label>
                                <div className="col-sm-11">
                                    <input
                                        disabled
                                        class="make-payment-input"
                                        type="text"
                                        id="acnum"
                                        name="acnum"
                                        value={loading ? "Loading..." : data["acDetails"][0]["accountBalance"]}
                                    />
                                </div>
                            </div>

                        </div>

                        {/* Reciever's part */}

                        <div class="make-payment-col-50">
                            <h1 className="make-payment-receiver-details">
                                Receiver Details
                            </h1>
                            <hr className="make-payment-receiver-details" />
                            <br />

                            <div className="row mb-4">
                                <label class="make-payment-label" for="fname">
                                    <i class="fa fa-user"></i> Full Name
                                    <span className="home-loan-form-span"> * </span>
                                </label>
                                <div className="col-sm-11">
                                    <input
                                        class="make-payment-input"
                                        type="text"
                                        id="fname"
                                        value={userDetails.fullName}
                                        name="fullname"
                                        placeholder="Jenil Gandhi"
                                        onChange={e => setUserDetails({ ...userDetails, fullName: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="row mb-4">
                                <label class="make-payment-label" for="acnum">
                                    <i class="fa fa-address-card-o"></i> Account Number
                                    <span className="home-loan-form-span"> * </span>
                                </label>
                                <div className="col-sm-11">
                                    <input
                                        class="make-payment-input"
                                        type="text"
                                        id="acnum"
                                        name="acnum"
                                        minlength="24"
                                        maxLength="24"
                                        value={userDetails.acNumber}
                                        placeholder="24 Digits"
                                        onChange={(e) => {
                                            setUserDetails({ ...userDetails, acNumber: e.target.value })
                                        }}
                                    />
                                </div>
                            </div>

                            <div className="row mb-4">
                                <label class="make-payment-label" for="email">
                                    <i class="fa fa-envelope"></i> Email
                                    <span className="home-loan-form-span"> * </span>
                                </label>
                                <div className="col-sm-11">
                                    <input
                                        class="make-payment-input"
                                        type="email"
                                        pattern="/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/"
                                        id="email"
                                        name="email"
                                        value={userDetails.email}
                                        placeholder="jenil@gmail.com"
                                        onChange={e => setUserDetails({ ...userDetails, email: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="row mb-4">
                                <label class="make-payment-label" for="amount">
                                    Amount<span className="home-loan-form-span"> * </span>
                                </label>
                                <div className="col-sm-11">
                                    <input
                                        class="make-payment-input"
                                        type="number"
                                        id="amount"
                                        name="amount"
                                        value={userDetails.amount}
                                        placeholder="1000"
                                        onChange={e => setUserDetails({ ...userDetails, amount: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="row mb-4">
                                <label class="make-payment-label" for="reason">
                                    Reason<span className="home-loan-form-span"> * </span>
                                </label>
                                <div className="col-sm-11">
                                    <input
                                        class="make-payment-input"
                                        type="text"
                                        id="reason"
                                        name="reason"
                                        value={userDetails.reason}
                                        placeholder="For car insurance"
                                        onChange={e => setUserDetails({ ...userDetails, reason: e.target.value })}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <button onClick={handleOnSubmit} type="button" class="make-payment-btn">Send Money</button>
                    {/* <input

                                type="submit"
                                value="Make Payment"
                                class="make-payment-btn"
                            /> */}
                </form>
                {/* </div> */}
                {/* </div> */}
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
    );
}
export default MakePayment
