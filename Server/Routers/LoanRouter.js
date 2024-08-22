const express = require("express");
const router = express.Router();
const authenticate = require("../Middlewares/Authenticate");
const verifyLoan = require("../Middlewares/Loan/verifyLoan")
const LoanModel = require("../Collections/LoanModel")
const LoanIntermediateModel = require("../Collections/LoanIntermediateModel");
const AccountModel = require("../Collections/AccountModel");


// The verifyLoan Middleware is a middleware that decides that the loan is to be 
// granted or not and this is to be done by a composite score parameter.
// The composite score takes in considerations your past transactions
// and your current account balance and the collateral you have.
router.post("/loan/addUserLoan", [authenticate, verifyLoan], async (req, res) => {
    if (req.grantLoan) {
        const userAc = await AccountModel.findOne({ _id: req.body.userAccount })
        if (userAc) {
            const userLoanQuery = await LoanIntermediateModel({
                receiverAc: userAc,
                amount: req.LoanValue,
                interestRate: req.interestRate,
                remarks: "None",
                collateral: "House",
                collateralValue: req.body.colVal,
                status: "pending"
            }).save()
            if (!userLoanQuery) {
                return res.json({ "Error:": "Failed saving your details" })
            }
        }

        return res.json({ "grant": req.grantLoan, "loanValue": req.LoanValue, "interestRate": req.interestRate })
    }
    else {
        return res.json({ "grant": req.grantLoan, "reason": req.reason, "compositeScore": req.compositeScore })
    }
})

router.post("/loan/convertLoan/:lId", [authenticate], async (req, res) => {
    try {
        const loanId = req.params.lId

        // find data from loanIntermediate model and create a loanModel object
        const loanReq = await LoanIntermediateModel.findOne({ _id: loanId })
        if (loanReq) {
            if (loanReq.status == "pending") {
                loanReq.status = "completed"
                await loanReq.save()


                const curDate = new Date()
                const loan = await LoanModel({
                    userAc: req.current_user,
                    receiverAc: loanReq.receiverAc,
                    amount: loanReq.amount,
                    sanctionedDateTime: Date.now(),
                    endingDateTime: new Date(
                        curDate.getFullYear() + 5,
                        curDate.getMonth(),
                        curDate.getDate(),
                        curDate.getHours(),
                        curDate.getMinutes(),
                        curDate.getSeconds()
                    ),
                    interestRate: loanReq.interestRate,
                    paymentDone: 0,
                    remarks: "None",
                    status: "approved",
                    collateral: "House",
                    collateralValue: loanReq.collateralValue
                }).save()
                if (loan) {
                    return res.send({ "Success:": true, "Data": loan })
                }
                else {
                    throw "Error saving details"
                }
            }

            else {
                return res.json({ "Error:": "Loan is already approved with this loan Id" })
            }
        }
        else {
            return res.json({ "Error:": "We could not find a loan request with that name!" })
        }
    }
    catch (e) {
        // console.log("Error:", e.toString())
        return res.json({ "Error:": "Something went so wrong!!!" })
    }
})
router.post("/loans/getAllUserLoans", [authenticate], async (req, res) => {
    try {
        const allLoans = await LoanModel.find({
            userAc: req.current_user
        })
        if (allLoans) {
            const loanMetaData = []
            for (let i = 0; i < allLoans.length; i++) {
                const curLoan = allLoans[i]
                const data = { "summary": "Loan " + String(curLoan._id).slice(20, 24), "lId": curLoan._id }
                loanMetaData.push(data)
            }
            return res.json({ "Success": true, "expandedData": allLoans, "metaData": loanMetaData })
        }
        else {
            return res.send("No loans found")
        }
    }
    catch (e) {
        // console.log(e.toString())
        return res.json({ "Error:": "Something went wrong", "Data": "None" })
    }
})
router.post("/loan/getLoanDetails/:lid", [authenticate], async (req, res) => {
    try {
        // console.log("LID", req.params.lid)
        const loanObj = await LoanModel.findOne({ _id: req.params.lid })
        // console.log(loanObj)
        return res.json({ "Success:": true, "Data": loanObj })
    }
    catch (e) {
        // console.log(e.toString())
        return res.json({ "Error": "Something went really wrong!" })
    }
})
module.exports = router;