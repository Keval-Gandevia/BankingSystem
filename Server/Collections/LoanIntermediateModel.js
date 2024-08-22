const mongoose = require("mongoose");
const LoanIntermediate = mongoose.Schema({
    receiverAc: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "AccountModel",
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    interestRate: {
        type: Number,
        required: true
    },
    remarks: {
        type: String,
        required: true
    },
    collateral: {
        type: String,
        required: true
    },
    collateralValue: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        required: true
    }
})
const LoanIntermediateModel = mongoose.model("LOANINTERMEDIATE", LoanIntermediate)
module.exports = LoanIntermediateModel