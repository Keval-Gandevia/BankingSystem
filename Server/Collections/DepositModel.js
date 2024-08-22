const mongoose = require("mongoose")

const Deposit = mongoose.Schema({
    dateOfIssue: {
        type: Date,
        required: true
    },
    maturityDate: {
        type: Date,
        required: true
    },
    interestRate: {
        type: Number,
        required: true
    },
    principleAmount: {
        type: Number,
        required: true
    },
    depositOwner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserModel',
        required: true
    },
    referenceAccount: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'AccountModel',
        required: true
    }

})

const DepositModel = mongoose.model("DEPOSIT", Deposit)
module.exports = DepositModel