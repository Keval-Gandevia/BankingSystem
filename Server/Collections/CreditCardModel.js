var mongoose = require("mongoose")
const CreditCard = mongoose.Schema({
    accountAttached: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "AccountModel",
        required: true
    },

    cardNumber: {
        type: String,
        required: true
    },

    expiryDate: {
        type: Date,
        required: true
    },

    cvvNumber: {
        type: Number,
        required: true
    },

    pinNumber: {
        type: Number,
        required: true
    },

    creditScore: {
        type: Number,
        required: true
    },

    serviceProvider: {
        type: String,
        required: true
    },

    creditLimit: {
        type: Number,
        required: true
    }
})
const CreditCardModel = mongoose.model("CREDITCARD", CreditCard)
module.exports = CreditCardModel