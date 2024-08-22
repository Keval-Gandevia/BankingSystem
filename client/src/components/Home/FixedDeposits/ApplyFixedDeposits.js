import React, { useState, useEffect } from 'react'
import './ApplyFixedDeposits.css'
import { ToastContainer, toast } from "react-toastify";
import { injectStyle } from "react-toastify/dist/inject-style";
import useFetch from '../Utility/General/Usefetch'
// import cal from '../Utility/FixedDeposit/FixedDepositCalc'
// import checkAll from '../Utility/FixedDeposit/FixedDepositCalc'
// import checkType from '../Utility/FixedDeposit/FixedDepositCalc'
// import checkAmt from '../Utility/FixedDeposit/FixedDepositCalc'
// import checkYears from '../Utility/FixedDeposit/FixedDepositCalc'
// import checkRate from '../Utility/FixedDeposit/FixedDepositCalc'
// import checkFreq from '../Utility/FixedDeposit/FixedDepositCalc'

function cal(e) {
    if (!checkAll(e))
        return;

    var depositType = document.f1.depositType.value;
    if (depositType == "fd" && document.f1.freq.value.length != 0) {
        var amt = parseFloat(document.f1.amt.value);
        var rate = parseFloat(document.f1.rate.value);
        var year = parseInt(document.f1.years.value);
        var freq = parseInt(document.f1.freq.value);
        var maturity = amt * Math.pow((1 + ((rate / 100) / freq)), freq * year);
        // console.log(maturity);
        // console.log(document.getElementById("maturity-1"))
        document.getElementById("maturityAmt").innerText = maturity.toFixed(2);
    } else if (depositType == "rd" && document.f1.freq.value.length != 0) {
        var amt = parseFloat(document.f1.amt.value);
        var rate = parseFloat(document.f1.rate.value);
        var year = parseInt(document.f1.years.value);
        var freq = parseInt(document.f1.freq.value);

        var months = year * 12;
        var maturity = 0;
        // console.log(amt);
        amt = amt / months;
        // console.log(amt);
        for (var i = 1; i <= months; i++) {
            maturity += amt * Math.pow((1 + ((rate / 100) / freq)), freq * ((months - i + 1) / 12));
            // console.log(((months - i + 1) / 12));
            // console.log(maturity);
        }
        // console.log(maturity-1);
        document.getElementById("maturityAmt").innerText = (maturity).toFixed(2);
    } else {
        alert("Select all dropdowns");
    }
}

function checkAll(e) {
    if (checkType(e) && checkAmt(e) && checkYears(e) && checkRate(e) && checkFreq(e))
        return true;
    else
        return false;
}
function checkType(e) {
    if (document.f1.depositType.value.length == 0) {
        document.getElementById("depositTypeErr").innerText = "* Select a deposit type";
        return false;
    } else {
        document.getElementById("depositTypeErr").innerText = "";
        return true;
    }
}

function checkAmt(e) {
    if (isNaN(document.f1.amt.value) || document.f1.amt.value.length == 0) {
        document.getElementById("amtErr").innerText = " * Amount required and should be a number";
        return false;
    } else {
        document.getElementById("amtErr").innerText = "";
        return true;
    }
}

function checkYears(e) {
    if (isNaN(document.f1.years.value) || document.f1.years.value.length == 0) {
        document.getElementById("yearsErr").innerText = " * Year required and should be a number";
        return false;
    } else {
        document.getElementById("yearsErr").innerText = "";
        return true;
    }
}

function checkRate(e) {
    if (isNaN(document.f1.rate.value) || document.f1.rate.value.length == 0) {
        document.getElementById("rateErr").innerText = " * Interest required and should be a number";
        return false;
    } else {
        document.getElementById("rateErr").innerText = "";
        return true;
    }
}

function checkFreq(e) {
    if (document.f1.freq.value.length == 0) {
        document.getElementById("freqErr").innerText = " * Select a compounding freq.";
        return false;
    } else {
        document.getElementById("freqErr").innerText = "";
        return true;
    }
}
export default function ApplyFixedDeposits() {

    const setUserAccounts = function (userData) {
        if (userData) {
            const accounts = userData["data"]
            const allJsx = []
            for (let account in accounts) {
                // console.log(account);
                account = accounts[account]
                let acJsx = <><option value={account._id}>{account["_id"]}, Balance: {account.accountBalance}</option></>
                allJsx.push(acJsx);
            }

            return allJsx;
        }
    }

    const [depositDetails, setDepositDetails] = useState({
        principleAmount: 0,
        maturity: 0,
        acNumber: '',
        depositType: '',
        recurringAmount: 0
    })

    // let final_request = "/account/" + slug["pathname"].split("/")[2];
    const { data, loading } = useFetch("/user/getACDetails/-1");
    // console.log(loading ? "loading..." : data);

    function handleOnSubmit(e) {
        e.preventDefault();
        saveData();
    }



    const saveData = async function () {
        fetch('/fd/addNewFD', {
            method: 'POST',
            body: JSON.stringify(depositDetails),
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            }
        }).then(function (response) {
            // console.log(response);
            if (response.ok) {
                response.json()
                    .then(e => {
                        // console.log(e)
                        
                        if (e["Success:"]) {
                            toast.success("Your Application was successful!!");
                            // history.goBack()
                        }
                        else {
                            
                            toast.error(e["Error"]);
                        }

                    })
                return response.json();
            }
            return Promise.reject(response);
        }).then(function (depositDetails) {
            console.log("Data:", depositDetails)
            if (depositDetails["Success:"]) {
                toast.success("Your Application was successful!!");
                // history.goBack()
            }
            else {
                toast.dark(depositDetails["Error"]);
            }
        }).catch(function (error) {
            // toast.dark("Something went wrong!");
        });
    }

    return (
        <>

            <div>
                <div>
                    <h1 className="fixedDepositHeader">Make Deposit</h1>
                    <hr className="fixedDepositHeader" />
                </div>

                <div>
                    <form className="text-light fixedDepositForm mt-5">
                        <div class="row mb-3 ">
                            <label for="pricipleAmount" class="col-sm-2 col-form-label"><b>Principle Amount</b><span className="home-loan-form-span"> * </span></label>
                            <div class="col-sm-10">
                                <input type="number" class="form-control fixedDepositInps" id="pricipleAmount"
                                    value={depositDetails.principleAmount}
                                    onChange={e => setDepositDetails({ ...depositDetails, principleAmount: e.target.value })}
                                    // setUserDetails()
                                    placeholder="Principle Amount." />
                            </div>
                        </div>

                        <div class="row mb-3 ">
                            <label for="maturity" class="col-sm-2 col-form-label"><b>Maturity Year</b><span className="home-loan-form-span"> * </span></label>
                            <div class="col-sm-10">
                                <input type="number" class="form-control fixedDepositInps" id="maturity"
                                    value={depositDetails.maturity}
                                    onChange={e => setDepositDetails({ ...depositDetails, maturity: e.target.value })}
                                    // setUserDetails()
                                    placeholder="Enter maturity time in years." />
                            </div>
                        </div>

                        <div class="row mb-3 ">
                            <label for="acNumber" class="col-sm-2 col-form-label"><b>Account Number</b><span className="home-loan-form-span"> * </span></label>
                            <div class="col-sm-10">
                                <select class="depositTypeSelectDropDown" name="freq"
                                    onChange={e => setDepositDetails({ ...depositDetails, acNumber: e.target.value })}
                                >
                                    <option value={''}>Select</option>
                                    {loading ? "loading..." :
                                        (setUserAccounts(data)).map((e) => {
                                            return e
                                        })
                                    }

                                </select>
                            </div>
                        </div>

                        <div class="row mb-3 ">
                            <label for="depositType" class="col-sm-2 col-form-label"><b>Deposit Type</b><span className="home-loan-form-span"> * </span></label>
                            <div class="col-sm-10">
                                <select class="depositTypeSelectDropDown" name="freq"
                                    onChange={e => setDepositDetails({ ...depositDetails, depositType: e.target.value })}
                                >
                                    <option value={''}>Select</option>
                                    <option value={'fixedDeposit'}>Fixed Deposit</option>
                                    <option value={'recurringDeposit'}>Recurring Deposit</option>
                                </select>
                            </div>
                        </div>

                        <div class="row mb-3 ">
                            <label for="recurringAmount" class="col-sm-2 col-form-label"><b>Recurring Amount</b></label>
                            <div class="col-sm-10">
                                <input type="number" class="form-control fixedDepositInps" id="recurringAmount"
                                    value={depositDetails.recurringAmount}
                                    onChange={e => setDepositDetails({ ...depositDetails, recurringAmount: e.target.value })}
                                    // setUserDetails()
                                    placeholder="Applied only in case of you have selected recurring deposit option." />
                            </div>
                        </div>


                        <button type="submit" onClick={handleOnSubmit} className="applyDepositBtn">Apply</button>
                    </form>
                </div>
                <br />
                <br />
                <br />
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


            <div>
                <h1 className="fixedDepositHeader">Fixed Deposit Calculator</h1>
                <hr className="fixedDepositHeaderHRL" />
            </div>
            <form className="text-light fixedDepositForm mt-4" name="f1">
                <div class="row mb-3 ">
                    <label class="col-sm-2 col-form-label"><b>Type of deposit</b></label>
                    <div class="col-sm-10">
                        <label class="fixedDepositLabel"><input class="fixedDepositCalcRadioBtns" type="radio" name="depositType" value="fd" onClick={(e) => checkType()} />Fixed deposit</label>
                        <label class="fixedDepositLabel"><input class="fixedDepositCalcRadioBtns" type="radio" name="depositType" value="rd" onClick={(e) => checkType()} />Recurring deposit</label>
                        <span id="depositTypeErr"> * Select a type</span>
                    </div>
                </div>
                <div class="row mb-3 ">
                    <label class="col-sm-2 col-form-label"><b>Principal Amount</b></label>
                    <div class="col-sm-10">
                        <input class="form-control fixedDepositInps" type="text" name="amt" placeholder="Principal Amount" onKeyUp={(e) => checkAmt()} onChange={(e) => checkAmt()} required />
                        <span id="amtErr"> * required</span>
                    </div>
                </div>
                <div class="row mb-3 ">
                    <label class="col-sm-2 col-form-label"><b>Number of Years</b></label>
                    <div class="col-sm-10">
                        <input class="form-control fixedDepositInps" type="text" name="years" placeholder="Number of Years" onKeyUp={(e) => checkYears()} onChange={(e) => checkYears()} required />
                        <span id="yearsErr"> * required</span>
                    </div>
                </div>
                <div class="row mb-3 ">
                    <label class="col-sm-2 col-form-label"><b>Rate of Interest</b></label>
                    <div class="col-sm-10">
                        <input class="form-control fixedDepositInps" type="text" name="rate" placeholder="Rate of Interest" onKeyUp={(e) => checkRate()} onChange={(e) => checkRate()} required />
                        <span id="rateErr"> * required</span>
                    </div>
                </div>
                <div class="row mb-3 ">
                    <label class="col-sm-2 col-form-label"><b>Compounding frequency</b></label>
                    <div class="col-sm-10">
                        <select class="selectTagFixedDeposit" name="freq" onKeyUp={(e) => checkFreq()} onChange={(e) => checkFreq()} required>
                            <option value="">Select</option>
                            <option value={12}>Monthly</option>
                            <option value={4}>Quarterly</option>
                            <option value={2}>Half yearly</option>
                            <option value={1}>Yearly</option>
                        </select>
                        <span id="freqErr"> * required</span>
                    </div>
                </div >
                <div class="row mb-3 ">
                    <label class="col-sm-2 col-form-label"><b>Maturity Amount</b></label>
                    <div class="col-sm-10">
                        <b>Rs. </b><b id="maturityAmt"></b>
                    </div>
                </div>
                <div class="row custCol mb-3">
                    <div class="col-sm-15">
                        <input className="fixedDepositCustBtn1" type="button" value="Calulate" onClick={(e) => cal()} />&nbsp;&nbsp;
                        <input className="fixedDepositCustBtn1" type="reset"
                            value="Clear" />
                    </div>
                </div>
            </form >
        </>
    )
}
