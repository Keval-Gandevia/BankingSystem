const DepositModel = require("../../Collections/DepositModel")
const TransactionModel = require("../../Collections/TransactionModel")
const AccountModel = require("../../Collections/AccountModel")

// deducts amount before transaction
const deductAmount = function (adminAc, userAc, money) {
    // console.log("here", userAc.accountBalance)
    adminAc.accountBalance = adminAc.accountBalance - money
    userAc.accountBalance = userAc.accountBalance + money
    adminAc.save()
    userAc.save()
}

// If it finds a deposit which is expired then it deleted that deposit
// and transfer the maturity amount to the user's A/C
const hasExipredDeposit = async function (userObj, adminUser, adminAccount) {
    const query = { depositOwner: userObj._id }
    const depositObj = await DepositModel.find(query)
    if (depositObj) {
        for (let i = 0; i < depositObj.length; i++) {
            const curDeposit = depositObj[i]
            const curDepositDate = new Date(curDeposit.maturityDate)
            const issuedDate = new Date(curDeposit.dateOfIssue)
            const today = new Date();
            // console.log("today", today)
            // console.log("curdepositDate", curDepositDate)
            if (today.getTime() > curDepositDate.getTime()) {
                // console.log("expired")
                let n_months = Number(today.getFullYear() - issuedDate.getFullYear()) * 12
                n_months += (Number(today.getMonth() - issuedDate.getMonth()))
                const totalInterest = ((Number(curDeposit.interestRate) / 12) * n_months) / 100
                const principle = curDeposit.principleAmount
                // console.log(principle)
                const maturityAmount = principle + (principle * totalInterest)
                // console.log(maturityAmount)
                const userAc = await curDeposit.referenceAccount._id
                const usersAc = await AccountModel.findOne({ _id: userAc })
                // console.log(userAc)
                if (userAc) {
                    deductAmount(adminAccount, usersAc, maturityAmount)
                    // Make the transaction
                    const Transaction = await TransactionModel({
                        sender: adminUser,
                        senderAc: adminAccount,
                        receiver: curDeposit.depositOwner,
                        receiverAc: curDeposit.referenceAccount,
                        amount: maturityAmount,
                        transactionDateTime: new Date(),
                        mode: "CHEQUE",
                        reason: "Maturity FD",
                        isPending: false
                    }).save()

                    // logic to delete deposit at index i
                    const depositDelete = await DepositModel.findOne({ _id: curDeposit._id }).deleteOne()
                }

            }
            else {
                // console.log("hered in elese")
            }
        }
        return 1;
    }
    else {
        return -1;
    }
}
module.exports = hasExipredDeposit