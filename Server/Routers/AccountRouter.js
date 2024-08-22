/*********************************************
 * getAccountDetails:{
    "account_id",
    "pin"
},cookie->Imp 
  
 * craeteAccount:{
    "ac_type","user_id","ac_bal"
 }
********************************************/

const express = require("express");
const axios = require("axios").create({ baseUrl: "http://localhost:8000" })
const router = express.Router()
const Account = require("../Collections/AccountModel")
const AccountType = require("../Collections/AccountTypeModel")
const User = require("../Collections/UserModel")
const Transaction = require("../Collections/TransactionModel")
const DebitCard = require("../Collections/DebitCardModel")
const authenticate = require("../Middlewares/Authenticate")
const createACMiddleware = require("../Middlewares/Account/CreateAccount")
const logger = require("../logger")
// const AccountType = require("../Collections/AccountTypeModel")



router.post("/user/checkExists/:acNumber", [authenticate], async (req, res) => {
    try {
        if (req.is_authenticated) {
            const acNum = req.params.acNumber;

            const accountExist = await Account.findOne({
                _id: acNum
            })

            if (accountExist) {

                return res.json({ "Success:": true })
            }
            else {
                return res.json({ "Success:": false })
            }
        }
        else {

        }
    }
    catch (e) {
        console.log(e.toString())
        return res.json({ "Success:": false })
    }
})


router.post("/user/getACDetails/:acNumber", [authenticate], async (req, res) => {
    try {

        if (req.is_authenticated) {
            const acnum = req.params.acNumber;
            if (acnum == -1) {
                // all account details
                const allAc = await Account.find({
                    accountOwner: req.current_user
                })
                // console.log(req.current_user.firstName + " " + req.current_user.lastName)
                var ulist = []
                const user_list = Promise.all(allAc.map(async (e) => {
                    // console.log(e["accountOwner"]["_id"])
                    const user = await User.findOne({ _id: e["accountOwner"]["_id"] })
                    // console.log(user)
                    ulist.push(user)
                    return user["firstName"]
                })).then((e) => {
                    ulist = e
                    // console.log(e)
                    logger.add_log("/user/getACDetails/:acNumber Serving user details for " + req.current_user.firstName + " " + req.current_user.lastName, "INFO")
                    return res.json({ "data": allAc, "ulist": ulist, "Success": true });
                })

            }
            else {
                // particular account details
                if (acnum.length != 24) {
                    logger.add_log("/user/getACDetails/:acNumber AC number error for user: " + req.current_user.firstName + " " + req.current_user.lastName, "ERROR")
                    return res.json({ "Error:": "Account number must be 24 characters long" })
                }
                const ac = await Account.findOne({
                    _id: acnum
                })
                logger.add_log("/user/getACDetails/:acNumber Served user: " + req.current_user.firstName + " " + req.current_user.lastName, "SUCCESS")
                return res.json({ "data": ac, "Success": true });

            }
        }
        else {

        }
    }
    catch (e) {
        logger.add_log("/user/getAcDetails/:acNumber " + e.toString(), "ERROR")
        return res.json({ "Error:": e.toString() })
    }
})


// Creating test account API
// This must have a parameter named
// -> acType:String
// -> acInitBal: Number
// -> isEcard: Boolean
// Currently we donot require the user id but
// in general case we would as admin would use it.
router.post("/account/createTestAccount", [authenticate, createACMiddleware], async (req, res) => {
    try {
        if (req.is_authenticated) {

            if (req.create_account) {
                const ac = await Account({
                    accountOwner: req.current_user,
                    accountType: req.acType,
                    accountBalance: req.body.acInitBal,
                    isEcardIssued: req.body.isEcard
                }).save()
                if (!ac) {
                    return res.json({ "Error:": "Failed saving your account to DB" })
                }
                else {
                    return res.json({ "Success:": "Account created successfully!" })
                }
            }
            else {
                return res.json({ "Error:": "create ac is set to false" })
            }


        }
        else {
            return res.json({ "Error": "Hey you are not authenticated", "redirect": "true" })
        }
    }
    catch (e) {
        return res.json({ "Error:": e.toString })
    }
})

// API for making different account type
// This also must be used by an admin
router.post("/account/createAccountType", [authenticate], async (req, res) => {
    try {
        if (req.is_authenticated) {
            const actype = await AccountType({
                accountTypeName: "joint",
                minimumAccountBalance: 100
            }).save()
            if (!actype) {
                return res.json({ "Error:": "Error creating a new account type" })
            }
            else {
                return res.json({ "Success:": "ACType created successfully" })
            }
        }
        else {

        }
    }
    catch (e) {
        return res.json({ "Error:": e.toString() })
    }
})

router.post("/account/:acNum", [authenticate], async (req, res) => {
    try {
        if (req.is_authenticated) {
            const acnum = req.params.acNum;
            if (acnum == -1) {
                // all account details
                const allAc = await Account.find({
                    accountOwner: req.current_user
                })

                return res.json({ "data": allAc, "Success": true });
            }
            else {
                // particular account details
                // console.log(acnum)
                // console.log(String(acnum).length)
                if (String(acnum).length != 24) {
                    logger.add_log("/account/:acNum " + "Account number must be 24 characters long", "ERROR")
                    return res.json({ "Error:": "Account number must be 24 characters long" })
                }
                const ac = await Account.findOne({
                    _id: acnum
                })
                const transactions = await Transaction.find({
                    $or: [
                        { senderAc: ac },
                        { receiverAc: ac },
                    ],
                    $and: [
                        { isPending: false }
                    ]
                }).sort({ "date": "descending" })


                var cardData = await DebitCard.findOne({ accountAttached: acnum })
                if (!cardData) {
                    cardData = -1
                }
                logger.add_log("/account/:acNum Serving accounts page data for user" + req.current_user.firstName + " " + req.current_user.lastName, "SUCCESS")
                return res.json({ "cardData": cardData, "data": ac, "transaction": transactions, "Success": true, "userList": req.current_user });
            }
        }
        else {
            return res.json({ "Error": "Hey you are not authenticated", "redirect": "true" })
        }
    }
    catch (e) {
        return res.json({ "Error:": e.toString() })
    }
})

router.post("/account/addCash/:acNumber", [authenticate], async (req, res) => {
    try {
        if (req.is_authenticated) {
            // logic to add cash 
            // here it is kept as a request but this mustbe only done by admin
            const cashAmount = req.body.cash;

            // create a transaction
            const adminModel = await User.findOne({
                firstName: "admin",
                middleName: "admin",
                lastName: "admin"
            })
            const adminAc = await Account.findOne({
                _id: "6144c3dc86c0cc08d848aefb"
            })
            const userAc = await Account.findOne({
                _id: req.params.acNumber
            })
            const trx = await Transaction({
                sender: adminModel,
                senderAc: adminAc,
                receiver: req.current_user,
                receiverAc: userAc,
                amount: cashAmount,
                transactionDateTime: new Date(),
                mode: "CASH",
                reason: "CASH",
                isPending: false
            }).save()
            userAc.accountBalance += cashAmount
            userAc.save()
            adminAc.accountBalance -= cashAmount
            adminAc.save()
            if (trx) {
                return res.json({ "Success:": true, "Message": "Money was deposited successfully!" })
            }
        }
        else {
            throw "You must be authenticated"
        }
    }
    catch (e) {
        console.log("Error: addcash " + e.toString())
        return res.json({ "Error:": "Something went seriously wrong!!" })
    }
})



module.exports = router;