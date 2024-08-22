/******************************************
 * getUserTransaction{
    "account-id","pinNo"
}
 *****************************************/
const express = require("express");
const router = express.Router()
const Transaction = require("../Collections/TransactionModel")
const Account = require("../Collections/AccountModel")
const authenticate = require("../Middlewares/Authenticate")

router.post("/transaction/getUserTransactions/:acNumber", [authenticate], async (req, res) => {
    try {
        if (req.is_authenticated) {
            const acNum = req.params.acNumber
            const ac = await Account.findOne({
                _id: acNum
            })
            const sender = await Transaction.find({
                sender: ac
            })

            const receiver = await Transaction.find({
                receiver: ac
            })
            // Sorting of transactions remaining
        }
        else {

        }
    }
    catch (e) {
        // console.log(e.toString());
        return res.json({ "Error:": e.toString() })
    }
})