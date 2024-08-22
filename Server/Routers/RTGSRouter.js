const express = require("express");
const router = express.Router();
const verifyRTGSDetails = require("../Middlewares/RTGS/verifyRTGSDetails");
const authenticate = require("../Middlewares/Authenticate")
const Transaction = require("../Collections/TransactionModel")
const User = require("../Collections/UserModel")
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
router.post("/verifyRTGS/:acNum", [authenticate, verifyRTGSDetails], async (req, res) => {
    try {
        const { beneficiaryName, beneficiaryAcNum, ifscCode, amount, reason } = req.body;

        if (!beneficiaryName || !beneficiaryAcNum || !ifscCode || !amount || !reason) {
            logger.add_log("RTGS all fields are required", "ERROR")
            return res.status(200).json({ Error: "All fields are required!!" });
        }

        if (req.current_ac.accountBalance < amount) {
            logger.add_log("RTGS Not enough amount to do RTGS!!", "ERROR")
            return res.status(200).json({ Error: "Not enough amount to do RTGS!!" });
        }
        else if (amount < 0 || amount == 0) {
            logger.add_log("RTGS Please enter valid amount to do RTGS!!", "ERROR")
            return res.status(200).json({ Error: "Please enter valid amount to do RTGS!!" });

        }
        else {

            const beneficiaryUser = await User.findOne({
                _id: req.beneficiaryAc.accountOwner
            })



            req.beneficiaryAc.accountBalance = req.beneficiaryAc.accountBalance + parseInt(amount);
            req.current_ac.accountBalance = req.current_ac.accountBalance - parseInt(amount);

            let st1 = await req.beneficiaryAc.save();
            let st2 = await req.current_ac.save();

            const trxObj = await Transaction({
                sender: req.current_user,
                senderAc: req.current_ac,
                receiverAc: req.beneficiaryAc,
                receiver: beneficiaryUser,
                amount: amount,
                transactionDateTime: Date.now(),
                mode: "RTGS",
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
            logger.add_log("RTGS transaction initated otp sent", "SUCCESS")
            return res.json({ "Success:": true, "data": trxObj });
        }
    }
    catch (e) {
        logger.add_log(e.toString(), "ERROR")
        // console.log(e.toString())
        return res.json({ "Success:": false })
    }
})

module.exports = router;