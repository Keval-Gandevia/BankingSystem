const mongoose = require("mongoose")

const RecurringDepossit = mongoose.Schema({
    deposit: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'DepositModel',
        required: true
    },
    recurringDepositAmount: {
        type: Number,
        required: true
    }
})

const RecurringDepositModel = mongoose.model("RECURRINGDEPOSIT", RecurringDepossit)
module.exports = RecurringDepositModel