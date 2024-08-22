const express = require("express");
const router = express.Router();
const authenticate = require("../Middlewares/Authenticate");
const LoanInquiry = require("../Collections/LoanInquiryModel")

router.post("/verifyLoanInquiryDetails", [authenticate], async (req, res) => {
    try {
        if (req.is_authenticated) {

            const {fullName, email, occupation, companyName, monthlyIncome, loanAmount,
                loanTenure, address, postCode, phoneNumber, city, 
                userQueries, loanType} = req.body;

            const loanInquiryObj = LoanInquiry({
                userAccount: req.current_user,
                email: email,
                occupation: occupation,
                companyName: companyName,
                monthlyIncome: monthlyIncome,
                loanAmount: loanAmount,
                loanTenure: loanTenure,
                address: address,
                postCode: postCode,
                phoneNumber: phoneNumber,
                city: city,
                userQueries: userQueries,
                loanType: loanType
            })

            let status = await loanInquiryObj.save();
            if(!status) {
                throw "Error saving your data"
            }
            return res.json({ "Success:": true });
        }
    }
    catch (e) {
        // console.log(e.toString())
        return res.json({ "Success:": false })
    }
})



module.exports = router;