import React, { useState, useEffect } from 'react'
import { ToastContainer, toast } from "react-toastify";
import { injectStyle } from "react-toastify/dist/inject-style";
import verifyLoanInquiry from '../../Utility/Loan/verifyLoanInquiry'
import calculatePayments from '../../Utility/Loan/HomeLoan/HomeLoanCalc'
import './HomeLoan1.css'


export default function HomeLoan() {

    const [userDetails, setUserDetails] = useState({
        fullName: '',
        email: '',
        occupation: '',
        companyName: '',
        monthlyIncome: '',
        loanAmount: '',
        loanTenure: '',
        address: '',
        postCode: '',
        phoneNumber: '',
        city: '',
        userQueries: '',
        loanType: ''
    });

    function handleOnSubmit(e) {

        e.preventDefault()
        const msg = verifyLoanInquiry(userDetails).then((e) => {
            if (e == "Your Details are verified please be patient while we process your request") {
                toast.info(e);
                // console.log("before save data");
                saveData();
            }
            else {

                toast.error(e);
            }
        })
    }


    const saveData = async function () {
        // console.log("save data");
        fetch('/verifyLoanInquiryDetails', {
            method: 'POST',
            body: JSON.stringify(userDetails),
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            }
        }).then(function (response) {
            // console.log(response);
            if (response.ok) {
                return response.json();
            }
            return Promise.reject(response);
        }).then(function (data) {
            if (data.hasOwnProperty("Success:")) {
                toast.success("Your Loan inquiry was successful!!");
                // history.goBack()
            }
        }).catch(function (error) {
            toast.error("Something went wrong!");
        });
    }

    return (
        <>

            <div>
                <h1 className="homeLoanHeader">Apply For Loan Now</h1>
                <hr className="homeLoanHeader" />
            </div>

            <div>
                <form className="text-light homeLoanForm mt-4">

                    {/* <div class="left-home-loan-form"> */}


                    <div className="row mb-3 ">
                        <label for="fullName" className="col-sm-2 col-form-label"><b>Full Name</b>
                            <span className="home-loan-form-span"> * </span></label>
                        {/* <span class="home-loan-form-icon-case"><i class="fa fa-male"></i></span> */}
                        <div className="col-sm-10">
                            <input type="text" className="form-control homeLoanInps" id="fullname"
                                placeholder="Full Name"
                                value={userDetails.fullName}
                                onChange={e => setUserDetails({ ...userDetails, fullName: e.target.value })}
                                required />
                        </div>
                    </div>

                    <div className="row mb-3 ">
                        <label for="email" className="col-sm-2 col-form-label"><b>Email</b>
                            <span className="home-loan-form-span"> * </span></label>
                        {/* <span class="home-loan-form-icon-case"><i class="fa fa-envelope-o"></i></span> */}
                        <div className="col-sm-10">
                            <input type="email" className="form-control homeLoanInps" id="email"
                                placeholder="Email"
                                value={userDetails.email}
                                onChange={e => setUserDetails({ ...userDetails, email: e.target.value })}
                                required />
                        </div>
                    </div>

                    <div className="row mb-3 ">
                        <label for="occupation" className="col-sm-2 col-form-label"><b>Occupation</b>
                            <span className="home-loan-form-span"> * </span></label>
                        {/* <span class="home-loan-form-icon-case"><i class="fa fa-user"></i></span> */}
                        <div className="col-sm-10">
                            <input type="text" className="form-control homeLoanInps" id="occupation"
                                placeholder="Occupation"
                                value={userDetails.occupation}
                                onChange={e => setUserDetails({ ...userDetails, occupation: e.target.value })}
                                required />
                        </div>
                    </div>

                    <div className="row mb-3 ">
                        <label for="cmpname" className="col-sm-2 col-form-label"><b>Company Name</b>
                            <span className="home-loan-form-span"> * </span></label>
                        {/* <span class="home-loan-form-icon-case"><i class="far fa-building"></i></span> */}
                        <div className="col-sm-10">
                            <input type="text" className="form-control homeLoanInps" id="cmpname"
                                placeholder="Company Name"
                                value={userDetails.companyName}
                                onChange={e => setUserDetails({ ...userDetails, companyName: e.target.value })}
                                required />
                        </div>
                    </div>

                    <div className="row mb-3 ">
                        <label for="monthlyincome" className="col-sm-2 col-form-label"><b>Monthy Income</b>
                            <span className="home-loan-form-span"> * </span></label>
                        {/* <span class="home-loan-form-icon-case"><i class="fas fa-rupee-sign"></i></span> */}
                        <div className="col-sm-10">
                            <input type="number" className="form-control homeLoanInps" id="monthlyincome"
                                placeholder="Monthy Income"
                                value={userDetails.monthlyIncome}
                                onChange={e => setUserDetails({ ...userDetails, monthlyIncome: e.target.value })}
                                required />
                        </div>
                    </div>

                    <div className="row mb-3 ">
                        <label for="loanamount" className="col-sm-2 col-form-label"><b>Loan Amount</b>
                            <span className="home-loan-form-span"> * </span></label>
                        {/* <span class="home-loan-form-icon-case"><i class="fas fa-rupee-sign"></i></span> */}
                        <div className="col-sm-10">
                            <input type="number" className="form-control homeLoanInps" id="loanamount"
                                placeholder="Loan Amount"
                                value={userDetails.loanAmount}
                                onChange={e => setUserDetails({ ...userDetails, loanAmount: e.target.value })}
                                required />
                        </div>
                    </div>

                    <div className="row mb-3 ">
                        <label for="loantenure" className="col-sm-2 col-form-label"><b>Loan Tenure</b>
                            <span className="home-loan-form-span"> * </span></label>
                        {/* <span class="home-loan-form-icon-case"><i class="fa fa-info"></i></span> */}
                        <div className="col-sm-10">
                            <input type="number" className="form-control homeLoanInps" id="loantenure"
                                placeholder="Loan Tenure"
                                value={userDetails.loanTenure}
                                onChange={e => setUserDetails({ ...userDetails, loanTenure: e.target.value })}
                                required />
                        </div>
                    </div>


                    {/* </div> */}

                    {/* <div class="right-home-loan-form"> */}

                    <div className="row mb-3 ">
                        <label for="address" className="col-sm-2 col-form-label"><b>Address</b>
                            <span className="home-loan-form-span"> * </span></label>
                        {/* <span class="home-loan-form-icon-case"><i class="fa fa-location-arrow"></i></span> */}
                        <div className="col-sm-10">
                            <input type="text" className="form-control homeLoanInps" id="address"
                                placeholder="Address"
                                value={userDetails.address}
                                onChange={e => setUserDetails({ ...userDetails, address: e.target.value })}
                                required />
                        </div>
                    </div>

                    <div className="row mb-3 ">
                        <label for="postal" className="col-sm-2 col-form-label"><b>Postcode</b>
                            <span className="home-loan-form-span"> * </span></label>
                        {/* <span class="home-loan-form-icon-case"><i class="fa fa-map-marker"></i></span> */}
                        <div className="col-sm-10">
                            <input type="number" className="form-control homeLoanInps" id="postal"
                                placeholder="Ex. 394160"
                                value={userDetails.postCode}
                                onChange={e => setUserDetails({ ...userDetails, postCode: e.target.value })}
                                required />
                        </div>
                    </div>

                    <div className="row mb-3 ">
                        <label for="ville" className="col-sm-2 col-form-label"><b>City</b>
                            <span className="home-loan-form-span"> * </span></label>
                        {/* <span class="home-loan-form-icon-case"><i class="fa fa-building-o"></i></span> */}
                        <div className="col-sm-10">
                            <input type="text" className="form-control homeLoanInps" id="postal"
                                placeholder="City"
                                value={userDetails.city}
                                onChange={e => setUserDetails({ ...userDetails, city: e.target.value })}
                                required />
                        </div>
                    </div>

                    <div className="row mb-3 ">
                        <label for="phone" className="col-sm-2 col-form-label"><b>Phone Number</b>
                            <span className="home-loan-form-span"> * </span></label>
                        {/* <span class="home-loan-form-icon-case"><i class="fa fa-phone"></i></span> */}
                        <div className="col-sm-10">
                            <input type="text" className="form-control homeLoanInps" id="phone"
                                placeholder="Ex. 9345289765"
                                value={userDetails.phoneNumber}
                                onChange={e => setUserDetails({ ...userDetails, phoneNumber: e.target.value })}
                                required />
                        </div>
                    </div>

                    {/* <div className="row mb-3 ">
                        <label for="subject" className="col-sm-2 col-form-label">Subject
                            <span className="home-loan-form-span"> * </span></label>
                        <span class="home-loan-form-icon-case"><i class="fa fa-comment-o"></i></span>
                        <div className="col-sm-10">
                            <input type="text" className="form-control homeLoanInps" id="subject"
                                placeholder="Subject" required />
                        </div>
                    </div> */}

                    <div className="row mb-3 ">
                        <label for="message" className="col-sm-2 col-form-label"><b>Your Queries</b>
                            <span className="home-loan-form-span"> * </span></label>
                        {/* <span class="home-loan-form-icon-case"><i class="fa fa-comments-o"></i></span> */}
                        <div className="col-sm-10">
                            <input type="text" className="form-control homeLoanInps" id="message"
                                placeholder="Put Your questions here.."
                                value={userDetails.userQueries}
                                onChange={e => setUserDetails({ ...userDetails, userQueries: e.target.value })}
                                required />
                        </div>
                    </div>

                    <div className="row mb-3 ">
                        <label for="loanType" className="col-sm-2 col-form-label"><b>Loan Type</b>
                            <span className="home-loan-form-span"> * </span></label>
                        {/* <span class="home-loan-form-icon-case"><i class="fa fa-comments-o"></i></span> */}
                        <div className="col-sm-10">
                            <select class="loanTypeSelectDropDown" name="freq"
                                onChange={e => setUserDetails({ ...userDetails, loanType: e.target.value })}
                                required>
                                <option value={''}>Select</option>
                                <option value={'homeLoan'}>Home Loan</option>
                                <option value={'carLoan'}>Car Loan</option>
                                <option value={'studentLoan'}>Stduent Loan</option>
                                <option value={'goldLoan'}>Gold Loan</option>
                            </select>
                        </div>
                    </div>
                    {/* </div> */}

                    <button type="submit" onClick={handleOnSubmit} className="homeLoancustBtn1">Send</button>

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
            <br />
            <br />
            <div>
                <h1 className="loanPaymentHeader">Calculate your Home Loan Payment</h1>
                <hr className="loanPaymentHeaderHRL" />
            </div>
            <div>
                <form className="text-light fixedDepositForm mt-4">
                    <div class="row mb-3 ">
                        <label className="col-sm-2 col-form-label" for="homePrice"><b>Home Price</b>
                            <span className="home-loan-form-span"> * </span></label>
                        <div class="col-sm-10">
                            <input className="form-control homeLoanInps" type="text"
                                oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '1');" className="form-control"
                                id="homePrice" placeholder="Home Price" />
                        </div>
                    </div>
                    <div class="row mb-3 ">
                        <label className="col-sm-2 col-form-label" for="downPayment"><b>Down Payment</b>
                            <span className="home-loan-form-span"> * </span></label>
                        <div class="col-sm-10">
                            <input className="form-control homeLoanInps" type="text"
                                oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '1');" className="form-control"
                                id="downPayment" placeholder="Down Payment" />
                        </div>
                    </div>
                    <div class="row mb-3 ">
                        <label className="col-sm-2 col-form-label" for="tradeValue"><b>Trade In Value</b>
                            <span className="home-loan-form-span"> * </span></label>
                        <div class="col-sm-10">
                            <input className="form-control homeLoanInps" type="text"
                                oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '1');" className="form-control"
                                id="tradeValue" placeholder="Trade In Value" /*value="0"*/ />
                        </div>
                    </div>
                    <div class="row mb-3 ">
                        <label className="col-sm-2 col-form-label" for="intRate"><b>Interest Rate</b>
                            <span className="home-loan-form-span"> * </span></label>
                        <div class="col-sm-10">
                            <input className="form-control homeLoanInps" type="text"
                                oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '1');" className="form-control"
                                id="intRate" placeholder="Interest Rate" />
                        </div>
                    </div>
                    <div class="row mb-3 ">
                        <label className="col-sm-2 col-form-label" for="loanTerm"><b>Loan Term</b>
                            <span className="home-loan-form-span"> * </span></label>
                        <div class="col-sm-10">
                            <input className="form-control homeLoanInps" type="text"
                                oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '1');" className="form-control"
                                id="loanTerm" placeholder="Loan Term (ex: 36 Months)" />
                        </div>
                    </div>
                    <div className="homeLoanClearFix"></div>
                    <div class="row custCol mb-3">
                        <button className="homeLoanCalcBtn" onClick={(e) => { calculatePayments(e) }} id="calculate" value="Calulate">Calculate</button>
                    </div>
                </form>
            </div>
            <div className="homeLoanPaymentResults">
                <div id="homeLoanPaymentResults">

                </div>
            </div>
        </>
    )
}