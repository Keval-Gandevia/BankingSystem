const express = require("express")
const router = express.Router()
const User = require("../Collections/UserModel")
const CreditCard = require("../Collections/CreditCardModel")
const DebitCard = require("../Collections/DebitCardModel")
const Account = require("../Collections/AccountModel")
const authenticate = require("../Middlewares/Authenticate")
const debitCardAuthenticate = require("../Middlewares/Account/CreateDebitCard")
const creditCardAuthenticate = require("../Middlewares/Account/CreateDebitCard")
const generateDebitCardDetails = require("../Utilies/Account/DebitCardGenerator")
const generateCreditCardDetails = require("../Utilies/Account/CreditCardGenerator")
const DebitCardModel = require("../Collections/DebitCardModel")
const adminAuthenticate = require("../Middlewares/Admin/authenticateAdmin");

router.post("/cards/getUserCreditCards", [authenticate], async (req, res) => {
    try {
        if (req.is_authenticated) {
            const allAc = await Account.find({
                accountOwner: req.current_user
            })
            var resp = await Promise.all(
                allAc.map(async (e) => {
                    // console.log(e)
                    const creditCard = await CreditCard.findOne({
                        accountAttached: e._id
                    })
                    // creditCard["username"] = req.current_user.firstName + " " + req.current_user.lastName
                    // console.log(creditCard)
                    // console.log(req.current_user.firstName + " " + req.current_user.lastName)
                    return creditCard
                })
            ).then((e) => {
                // console.log(e[1])
                const dat = e.filter((ev) => {
                    // ev["username"] = req.current_user.firstName
                    if (ev == null) {
                        return false
                    }
                    else {
                        return true
                    }
                })
                return dat
            })
            const userlist = []
            const dat1 = resp.map((e) => {
                // console.log(e)
                Object.defineProperty(e, "username", {
                    value: req.current_user
                })
                userlist.push(req.current_user.firstName + " " + req.current_user.lastName)
                // console.log(e)
                return e
            })

            return res.json({ "data": dat1, "ulist": userlist, "Success:": true })

        }
        else {
            return res.json({ "Error": "Hey you are not authenticated", "redirect": "true" })
        }
    }
    catch (e) {
        return res.json({ "Error": "Sorry we are unable to process your request please try again later!" + e.toString() })
    }
})


router.post("/cards/getUserDebitCards/:acNumber", [authenticate], async (req, res) => {
    try {
        if (req.is_authenticated) {
            if (req.params.acNumber == -1) {

                var allAc = await Account.find({
                    accountOwner: req.current_user
                })//[[ac1],[ac2],....]
            }
            else {
                var allAc = await Account.find({
                    _id: req.params.acNumber
                })//[[ac1]]
            }
            var alldebs = []
            var ulist = []
            var resp = await Promise.all(
                allAc.map(async (e) => {
                    const debitCard = await DebitCard.findOne({
                        accountAttached: e._id
                    })
                    // debitCard["username"] = req.current_user.username
                    return debitCard
                })
            ).then((e) => {
                return e
            })
            var ul = await Promise.all(
                allAc.map(async (e) => {
                    ulist.push(req.current_user.firstName + " " + req.current_user.lastName)
                })
            ).then((e) => { return e })
            return res.json({ "data": resp, "acDetails": allAc, "ulist": ulist, "Success:": true })

        }
        else {
            return res.json({ "Error": "Hey you are not authenticated", "redirect": "true" })
        }
    }
    catch (e) {
        return res.json({ "Error": "Sorry we are unable to process your request please try again later!" + e.toString() })
    }
})

// This is to be executed by the admin
router.post("/cards/makeDebitCards/:acNum", [adminAuthenticate, debitCardAuthenticate], async (req, res) => {
    try {
        console.log(req.makeDebitStatus)

        if (req.makeDebitStatus) {

            const ac = req.ac

            console.log(req.body)
            if (ac && req.body.hasOwnProperty("pinNo")) {
                ac.isEcardissued = true
                // Genereate code and create debitcard object.
                const cardDetails = await generateDebitCardDetails()
                const curDate = new Date()
                const expiryDate = new Date(
                    curDate.getFullYear() + 5,
                    curDate.getMonth(),
                    curDate.getDate(),
                    curDate.getHours(),
                    curDate.getMinutes(),
                    curDate.getSeconds()
                );

                const pinNumber = req.body.pinNo
                if (pinNumber.toString().length == 4) {


                    const debitCard = await DebitCard({
                        accountAttached: ac,
                        cardNumber: cardDetails.cardNum,
                        cvvNumber: cardDetails.cvv,
                        pinNumber: pinNumber,
                        serviceProvider: "American Express",
                        expiryDate: expiryDate

                    })
                    const status = debitCard.save()
                    const acStatus = ac.save()
                    if (status && acStatus) {
                        return res.json({ "Success:": "Saved your card successfully" })
                    }
                    else {
                        return res.json({ "Error:": "Failed saving debit card" })
                    }
                }
                else {
                    throw "Pin Number must be of 4 digit Long"
                }

            }
            else {
                return res.json({ "Error:": "No accounts found" })
            }


        }
        else {
            if (!req.makeDebitStatus) {
                throw "Debit card already exists!"
            }
            return res.json({ "Error:": "Sorry you must be authenticated!", "redirect": true })
        }
    }
    catch (e) {
        return res.json({ "Error:": e.toString() })
    }
})

router.post("/cards/makeCreditCards/:acNum", [authenticate, creditCardAuthenticate], async (req, res) => {
    try {
        if (req.is_authenticated) {
            const ac = req.ac;
            // console.log(ac ? "true" : false)
            // console.log(req.body.hasOwnProperty("pinNo") ? "true" : false)

            if (ac && req.body.hasOwnProperty("pinNo")) {
                ac.isEcardIssued = true

                // code genartion and creation of credit card object
                const cardDetails = await generateCreditCardDetails()
                const curDate = new Date()
                const expiryDate = new Date(
                    curDate.getFullYear() + 5,
                    curDate.getMonth(),
                    curDate.getDate(),
                    curDate.getHours(),
                    curDate.getMinutes(),
                    curDate.getSeconds()
                )
                const pinNumber = req.body.pinNo
                if (pinNumber.toString().length == 4) {
                    const creditCard = await CreditCard({
                        accountAttached: ac,
                        cardNumber: cardDetails.cardNum,
                        expiryDate: expiryDate,
                        cvvNumber: cardDetails.cvv,
                        pinNumber: req.body.pinNo,
                        creditScore: 333,
                        serviceProvider: "Rupay",
                        creditLimit: 150000
                    })
                    const status = creditCard.save()
                    const acStatus = ac.save()
                    if (status && acStatus) {
                        return res.json({ "Success:": "Saved your card successfully" })
                    }
                    else {
                        return res.json({ "Error:": "Failed saving credit card" })
                    }
                }
                else {
                    throw "Pin Number must be 4 digit Long"
                }

            }
            else {
                if (req.body.hasOwnProperty("pinNo")) {
                    return res.json({ "Error": "Pin no is not set" })
                }
                return res.json({ "Error:": "No account found" })
            }

        }
        else {
            if (!req.makeCreditStatus) {
                return res.json({ "Error:": "CST false" })
            }
            return res.json({ "Error:": "Sorry you must be authenticated!", "redirect": true })
        }
    }
    catch (e) {
        console.log(e.toString())
        return res.json({ "Error:": e.toString() })

    }
})
module.exports = router;