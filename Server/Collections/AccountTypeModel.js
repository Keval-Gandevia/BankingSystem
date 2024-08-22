const mongoose = require("mongoose")
const AccountType = mongoose.Schema({
    accountTypeName: {
        type: String,
        required: true
    },

    minimumAccountBalance: {
        type: Number,
        required: true
    }


})
const AccountTypeModel = mongoose.model("ACCOUNTTYPE", AccountType)
module.exports = AccountTypeModel