const Transactions = require("../../Collections/TransactionModel")
const Account = require("../../Collections/AccountModel")

const getPastTransactionsAnalytics = function (transactions, ac) {
    var debit = 0;
    var credit = 0;
    var months = {}
    for (let i = 0; i < transactions.length; i++) {
        let transaction = transactions[i];
        if (Object.keys(months).length == 12) {
            break;
        }

        const month = new Date(
            transaction.transactionDateTime
        ).getMonth();
        // console.log(String(transaction.receiverAc._id), String(ac._id))
        if (String(transaction.receiverAc._id) != String(ac._id)) {
            debit = debit + Number(transaction.amount)
        }
        else {
            credit = credit + Number(transaction.amount)
        }

        months[month] = true
    }
    // console.log({ "debit": debit, "credit": credit, "netAcBal": credit - debit })
    return { "debit": debit, "credit": credit, "netAcBal": credit - debit }
}
const calculateCreditScore = function (transactions, account) {
    // All params must always total to 100%
    var transactionsWeight = 50, accountMoney = 50;
    const trxData = getPastTransactionsAnalytics(transactions, account);
    const acBal = account.accountBalance;
    const creditScore = transactionsWeight * trxData["netAcBal"] + accountMoney * acBal;

    // Credit Score would be calculated on average income of the country
    // Like for india we consider amount to be 10000(scaling factor) 
    return creditScore / 10000;
}
const verifyLoan = async function (req, res, next) {
    // Now we should calculate credit score here -done
    // depending on the account balance the user has
    // also we see the user's existing loans -left
    // also we see the value of the collateral -done
    // we also need to check the debit and credit of the user in past 6 months -done
    // also we need to see the income -done

    // for the following we must require user account
    try {


        const accountReq = await Account.findOne({ _id: req.body.userAccount });

        // we need to get the transactions of the user
        const userTransactions = await Transactions.find({
            $or: [{ senderAc: req.body.userAccount }, { receiverAc: req.body.userAccount }],
        }).sort({ date: "descending" });

        const collateralValue = Number(req.body.colVal) / 10000;
        const creditScore = calculateCreditScore(userTransactions, accountReq)
        // console.log("Credit Score:", creditScore)
        // console.log("Collateral Score:", collateralValue)
        // console.log("cs*0.6 + cv*0.4:", 0.6 * creditScore + 0.4 * collateralValue)
        const compositeScore = 0.6 * creditScore + 0.4 * collateralValue

        // Write logic for granting loan and loanvalue also for interestRate
        if (compositeScore < 0) {
            req.grantLoan = false
            req.compositeScore = compositeScore
            req.reason = "We very sorry we cannot give you the loan because your composite score is below average."
        }
        else {

            req.grantLoan = true
            req.LoanValue = compositeScore * 7000;
            req.interestRate = 9 - compositeScore / 1000
            if (req.interestRate < 5) {
                req.interestRate = 5
            }
        }
        next()
    }
    catch (e) {
        console.log(e.toString())
    }

}
module.exports = verifyLoan