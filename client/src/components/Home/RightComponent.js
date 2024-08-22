import React from 'react'
import HomeComponent from './HomeComponent'
// import QuickTransfer from './QuickTransfer/QuickTransfer'
import TopNavbarComponent from './TopNavbarComponent'
import EcardsComponent from './EcardsComponent'
import DebitCardComponent from '../Home/DebitCard/DebitCardComponent'
import CreditCardComponent from '../Home/CreditCard/CreditCardComponents'
import BalanceComponent from '../Home/Transaction/BalanceComponent'
import AccountComponent from '../Home/Account/AccountComponent'
import MakePayement from '../Home/Payment/MakePayment'
import CarLoan from '../Home/Loan/CarLoan/CarLoan'
import HomeLoan from '../Home/Loan/HomeLoan/HomeLoan'
import ViewFixedDeposits from '../Home/FixedDeposits/ViewFixedDeposits'
import ApplyFixedDeposits from '../Home/FixedDeposits/ApplyFixedDeposits'
import TFAssistanceComponent from '../Home/TFAssistance/TFAssistanceComponent'
import NEFTComponent from './Transfers/NEFT/NEFTComponent'
import RTGSComponent from './Transfers/RTGS/RTGSComponent'
import YourLoans from './YourLoans/YourLoans'
import OTPComponent from "../OTP/OTPComponent"
import LogoutComponent from './LogoutComponent/LogoutComponent'

function RightComponent({ component_name }) {
    const component_mapping = {
        "home": <HomeComponent></HomeComponent>,
        "ecards": <EcardsComponent></EcardsComponent>,
        "ecards/debitcards": <DebitCardComponent></DebitCardComponent>,
        "ecards/creditcards": <CreditCardComponent></CreditCardComponent>,
        "balance": <BalanceComponent></BalanceComponent>,
        "account": <AccountComponent></AccountComponent>,
        "makePayment": <MakePayement></MakePayement>,
        // "quickTransfer": <QuickTransfer></QuickTransfer>,
        "carLoan": <CarLoan></CarLoan>,
        "loanInquiry": <HomeLoan></HomeLoan>,
        "viewfixedDeposits": <ViewFixedDeposits></ViewFixedDeposits>,
        "applyfixedDeposits": <ApplyFixedDeposits></ApplyFixedDeposits>,
        "assistance": <TFAssistanceComponent />,
        "NEFT": <NEFTComponent />,
        "RTGS": <RTGSComponent />,
        "yourLoans": <YourLoans />,
        "otp": <OTPComponent />,
        "logout": <LogoutComponent />
    }
    return (
        <div className="col">
            <div className="row">
                <TopNavbarComponent property_name={component_name}></TopNavbarComponent>
            </div>
            <div className="row">
                {component_mapping[component_name]}

            </div>
        </div>
    )
}

export default RightComponent
