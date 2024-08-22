var mongoose = require("mongoose")
const DebitCard = mongoose.Schema({
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

    serviceProvider: {
        type: String,
        required: true
    }
})

const DebitCardModel = mongoose.model("DEBITCARD", DebitCard)
module.exports = DebitCardModel