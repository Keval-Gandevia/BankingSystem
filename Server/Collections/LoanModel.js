const mongoose = require("mongoose");
const LoanModel = mongoose.Schema({
    userAc: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "UserModel",
        required: true
    },
    receiverAc: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "AccountModel",
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    sanctionedDateTime: {
        type: Date,
        required: true
    },
    endingDateTime: {
        type: Date,
        required: true
    },
    interestRate: {
        type: Number,
        required: true
    },
    paymentDone: {
        type: Number,
        required: true
    },
    remarks: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    // Defines the collateral mortgaged by the user
    // This may also be stored in a model
    collateral: {
        type: String,
        required: true
    },
    collateralValue: {
        type: Number,
        required: true
    }

});
const LoanGrantModel = mongoose.model("LOANMODEL", LoanModel)
module.exports = LoanGrantModel