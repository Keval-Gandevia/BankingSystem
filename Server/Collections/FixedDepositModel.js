const mongoose = require("mongoose")

const FixedDeposit = mongoose.Schema({
    deposit: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'DepositModel',
        required: true
    },
    FixedDepositAmount: {
        type: Number,
        required: true
    }
})

const FixedDepositModel = mongoose.model("FIXEDDEPOSIT", FixedDeposit)
module.exports = FixedDepositModel