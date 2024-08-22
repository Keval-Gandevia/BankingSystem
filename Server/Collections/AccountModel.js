const mongoose = require("mongoose")
const Account = mongoose.Schema({
    accountOwner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserModel',
        required: true
    },

    accountType: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'AccountTypeModel',
        required: true
    },

    accountBalance: {
        type: Number,
        required: true
    },

    isEcardIssued: {
        type: Boolean,
        required: true
    }
})
const AccountModel = mongoose.model("ACCOUNT", Account)
module.exports = AccountModel