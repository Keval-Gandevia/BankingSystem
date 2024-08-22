const express = require("express")
const router = express.Router()
const authenticate = require("../Middlewares/Authenticate")
const verifyDeposit = require("../Middlewares/Deposit/verifyDeposit");
const Deposit = require("../Collections/DepositModel");
const FixedDeposit = require("../Collections/FixedDepositModel")
const RecurringDeposit = require("../Collections/RecurringDepositModel")
const Transaction = require("../Collections/TransactionModel")
const ReccuringDeposit = require("../Collections/RecurringDepositModel")
const hasExipredDeposit = require("../Utilies/Deposit/hasExipredDeposits")
const logger = require("../logger")

router.post("/fd/addNewFD", [authenticate, verifyDeposit], async (req, res) => {

    try {
        if (req.is_authenticated && req.accountAttchedWithUser) {
            const { principleAmount, maturity, acNumber, depositType, recurringAmount } = req.body;

            if (!principleAmount || !maturity || !acNumber || !depositType) {
                throw "All fields are required!!";
            }

            const curDate = new Date();
            const maturityDate = new Date(
                curDate.getFullYear() + Number(maturity),
                curDate.getMonth(),
                curDate.getDate(),
                curDate.getHours(),
                curDate.getMinutes(),
                curDate.getSeconds()
            );

            // check validation related to recurring amount
            if (depositType === "recurringDeposit") {
                if (!recurringAmount) {
                    throw "Please provide recurring amount";
                }
            }

            const depositobj = await Deposit({
                dateOfIssue: new Date(),
                maturityDate: maturityDate,
                interestRate: 8,
                principleAmount: principleAmount,
                depositOwner: req.current_user,
                referenceAccount: req.current_ac
            })

            const depositStatus = await depositobj.save();

            if (!depositStatus) {
                throw "Error while creating Deposit Object";
            }
            else {
                req.current_ac.accountBalance -= principleAmount;
                req.current_ac.save();
                const trxObj = await Transaction({
                    sender: req.current_user,
                    senderAc: req.current_ac,
                    receiverAc: req.admin_account,
                    receiver: req.admin_user,
                    amount: principleAmount,
                    transactionDateTime: Date.now(),
                    mode: "FD",
                    reason: "FD:" + String(depositobj._id).substr(21, 24),
                    isPending: false

                })

                const trxStatus = await trxObj.save();

                if (!trxStatus) {
                    throw "Error while saving data!!"
                }

            }

            if (depositType === "recurringDeposit") {

                // create RecurringDeposit object

                const recurObj = await RecurringDeposit({
                    deposit: depositobj,
                    recurringDepositAmount: recurringAmount
                })

                const recurringStatus = await recurObj.save();

                if (!recurringStatus) {
                    throw "Error while creating RecurringObject!!";
                }

            }
            else {
                // create FixedDeposit object
                const fixedObj = await FixedDeposit({
                    deposit: depositobj,
                    FixedDepositAmount: principleAmount
                })

                const fixedStatus = await fixedObj.save();

                if (!fixedStatus) {
                    throw "Error while creating FixedDeposit Object!!";
                }
                logger.add_log("New FD added!" + fixedObj._id, "SUCCESS")
            }

            return res.json({ "Success:": true });
        }
    }
    catch (e) {
        logger.add_log("/fd/addnewfd " + e.toString(), "ERROR")
        console.log(e.toString())
        return res.json({ "Error": e.toString(), "Success:": false })
    }
})

router.post("/fd/getFDDetails", [authenticate], async (req, res) => {
    try {
        // current user fid all deposit object
        // make a list of deposit objects

        var status = await hasExipredDeposit(req.current_user, req.admin_user, req.admin_account)
        // console.log("status" + status)
        const allDeposits = await Deposit.find({
            depositOwner: req.current_user
        })


        rcr = []
        // Now iterate through all user Deposits and find if any of it is recuuring.
        for (var depo in allDeposits) {
            // console.log(depo)
            const recur = await ReccuringDeposit.findOne({
                deposit: allDeposits[depo]
            })
            if (recur == null) {
                rcr.push(false)
            }
            else {
                rcr.push(recur)
            }
        }
        // console.log(rcr)
        const username = {
            "firstName": req.current_user.firstName,
            "lastName": req.current_user.lastName
        }
        logger.add_log("/fd/getDetails serving data for fixed deposit to user " + req.current_user.firstName + " " + req.current_user.lastName, "SUCCESS")
        // console.log({ "depositData": allDeposits, "username": username, "Success:": true })
        return res.json({ "depositData": allDeposits, "username": username, "Success:": true, "recurringData": rcr });

        // console.log(allDeposits);

        // return res.json("Success:", true)
    }
    catch (e) {
        logger.add_log("/fd/getFDdetails " + e.toString(), "ERROR")
        console.log(e.toString())
        return res.json({ "Error": e.toString(), "Success:": false })
    }
})

module.exports = router;