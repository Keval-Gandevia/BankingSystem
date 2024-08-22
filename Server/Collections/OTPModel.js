const mongoose = require("mongoose")
const OTP = mongoose.Schema({
    transaction: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'TransactionModel',
        required: true
    },
    OTP:{
        type:Number,
        required:true
    },
})
const OTPModel = mongoose.model("OTP", OTP)
module.exports = OTPModel