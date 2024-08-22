const express = require('express')
const router = express.Router()
const authenticate = require("../Middlewares/Authenticate")
const Account = require("../Collections/AccountModel")
const Transaction = require("../Collections/TransactionModel")
const User = require("../Collections/UserModel")
const verifyDebitCardTransaction = require('../Middlewares/Payment/VerifyDebitCardTransactions')
const OTP = require("../Collections/OTPModel")
var nodemailer = require('nodemailer');
const logger = require("../logger")


const sendMail = function (from, to, otp) {
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'abcxyz1814@gmail.com',
            pass: 'abcxyzpass'
        }
    });
    // console.log("mailOptions")
    var mailOptions = {
        from: from,
        to: to,
        subject: 'Your OTP for Banker Transaction',
        html: '<h1>' + String(otp) + '</h1>'
    }
    // console.log("sending mail")
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
    logger.add_log("Sent mail from:" + from + " to:" + to)
    return "Success"
}

router.post("/payment/debit/:acNumber", [authenticate, verifyDebitCardTransaction], async (req, res) => {
    try {
        // console.log(await req.body)
        if (req.is_authenticated) {
            // verify receiver details
            const { fullName, acNumber, email, amount, reason } = req.body;

            if (!fullName || !acNumber || !email || !amount) {
                logger.add_log("PAYMENT/DEBIT/ACNUM All fields are required!!", "ERROR")
                return res.status(422).json({ Error: "All fields are required!!" });
            }

            try {
                // fullname verification remaining

                const receiverAccount = await Account.findOne({
                    _id: acNumber
                })
                if (!receiverAccount) {
                    logger.add_log("PAYMENT/DEBIT/ACNUM Account number is not valid!", "ERROR")
                    throw "Account number is not valid!"
                }

                if (receiverAccount) {
                    if (parseInt(req.current_ac.accountBalance) < parseInt(amount)) {
                        logger.add_log("PAYMENT/DEBIT/ACNUM Not enough balanace to do transaction!!", "ERROR")
                        return res.status(422).json({ Error: "Not enough balanace to do transaction!!" });
                    }
                    else {
                        // Success code to be written
                        if (req.current_debitcard.cardNumber == acNumber) {
                            logger.add_log("PAYMENT/DEBIT/ACNUM same card number not valid!!", "ERROR")
                            return res.status(422).json({ Error: "same card number not valid!!" });
                        }
                        else {
                            // Add data to transactions
                            const recieverUser = await User.findOne({
                                _id: receiverAccount.accountOwner
                            })

                            receiverAccount.accountBalance = receiverAccount.accountBalance + parseInt(amount)
                            req.current_ac.accountBalance = parseInt(req.current_ac.accountBalance) - parseInt(amount)


                            let st1 = await receiverAccount.save()
                            let st2 = await req.current_ac.save()

                            const trxObj = Transaction({
                                sender: req.current_user,
                                senderAc: req.current_ac,
                                receiverAc: receiverAccount,
                                receiver: recieverUser,
                                amount: amount,
                                transactionDateTime: Date.now(),
                                mode: "CARD",
                                reason: reason,
                                isPending: true
                            })
                            const otpNumber = Math.floor(100000 + Math.random() * 900000)
                            const st4 = OTP({
                                transaction: trxObj,
                                OTP: otpNumber
                            }).save()
                            let st3 = await trxObj.save()
                            sendMail("abcxyz1814@gmail.com", String(req.current_user.emailId), otpNumber)
                            if (!st1 || !st2 || !st3 || !st4) {
                                throw "Error saving your data"
                            }
                            logger.add_log("PAYMENT/DEBIT/ACNUM Initated card transaction", "SUCCESS")
                            return res.json({ "Success:": true, "data": trxObj._id });
                        }
                    }
                }
                else {
                    logger.add_log("PAYMENT/DEBIT/ACNUM Receiver has no account..", "ERROR")
                    return res.status(422).json({ Error: "Receiver has no account.." });
                }
            }

            catch (e) {
                logger.add_log("PAYMENT/DEBIT/ACNUM " + e.toString(), "ERROR")
                // console.log("Error:" + e.toString());
                return res.json({ "Error:": e.toString() })
            }

        }
    }
    catch (e) {
        logger.add_log("PAYMENT/DEBIT/ACNUM " + e.toString(), "ERROR")
        // console.log("Errorooor" + e.toString())
        return res.json({ "Success:": false })
    }
})


router.post("/verifyOtp", [authenticate], async (req, res) => {
    try {
        const { otp, tid } = req.body
        const trx = await Transaction.findOne({
            _id: tid
        })
        const otpObj = await OTP.findOne({
            transaction: trx
        })
        if (trx == null || otpObj == null) {
            throw "Transaction has been redeemed!!!"
        }
        if (otp == otpObj.OTP) {
            trx.isPending = false
            const st1 = await trx.save()
            const st2 = await OTP.deleteOne({
                transaction: trx
            })
            if (!st1 || !st2) {
                logger.add_log("/VERIFYOTP Error saving transaction and deleting otp!", "ERROR")
                return res.json({ "Error:": "Error saving transaction and deleting otp!" })
            }
            logger.add_log("/VERIFYOTP Transaction success" + trx._id, "SUCCESS")
            return res.json({ "Success:": true, "message": "Your transaction is a success!" })
        }
        else {
            throw "OTP is wrong please try again"
        }
    }
    catch (e) {
        logger.add_log("/VERIFYOTP " + e.toString(), "ERROR")
        // console.log(e.toString())
        return res.json({ "Error:": false, "message": e.toString() })
    }
})


router.post("/testmail", async (req, res) => {
    try {


        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'abcxyz1814@gmail.com',
                pass: 'abcxyzpass'
            }
        });
        var mailOptions = {
            from: 'abcxyz1814@gmail.com',
            to: 'jenilgandhi2111@gmail.com',
            subject: 'Your OTP for Banker Transaction',
            html: '<h1>' + "334455" + '</h1>'
        }
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
        return res.send("Jenil")
    }
    catch (e) {
        console.log(e.toString())
    }
})
module.exports = router;