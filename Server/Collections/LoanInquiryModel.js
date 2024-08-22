const mongoose = require("mongoose")

const LoanInquiry = mongoose.Schema({
    userAccount: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "AccountModel",
        required: true
    },
    email: {
        type: String,
        required: true
    },
    occupation: {
        type: String,
        required: true
    },
    companyName: {
        type: String,
        required: true
    },
    monthlyIncome: {
        type: Number,
        required: true
    },
    loanAmount: {
        type: Number,
        required: true
    },
    loanTenure: {
        type: Number,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    postCode: {
        type: Number,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    userQueries: {
        type: String,
        required: true
    },
    loanType: {
        type: String,
        required: true
    }
})

const LoanInquiryModel = mongoose.model("LOANINQUIRY", LoanInquiry)
module.exports = LoanInquiryModel