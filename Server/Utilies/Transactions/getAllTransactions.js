const Transaction = require("../../Collections/TransactionModel")
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
        // console.log(String(transaction.receiver._id), String(ac._id))
        if (String(transaction.receiver._id) != String(ac._id)) {
            // console.log("jsbnj")
            debit = debit + Number(transaction.amount)
        }
        else {
            // console.log("ooooooooooooooo")
            credit = credit + Number(transaction.amount)
        }

        months[month] = true
    }

    return { "debit": debit, "credit": credit, "netAcBal": credit - debit }
}










function compDate(a, b) {
    return Date.parse(String(b["transactionDateTime"])) - Date.parse(String(a["transactionDateTime"]));
}
function sortByDate(transactions) {
    return transactions.sort(compDate)
    // setTransactions(transactions.map((e) => { return e }));
}
const isDebit = function (e, curAc) {
    console.log(
        e["sender"]._id, curAc._id
    )
    if (String(e["sender"]._id) == String(curAc._id) && (String(e["receiver"]._id) != String(curAc._id))) {
        // console.log(
        //     "called true"
        // )
        return true
    }
    else {
        // console.log(
        //     "called false"
        // )
        return false
    }
}
function makeTransactionData(transaction_data, curAc) {
    transaction_data = sortByDate(transaction_data)
    var returnArray = []
    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"];
    // console.log(transaction_data)

    // Logic is we keep adding for a particular month 
    // until it is changed
    let takenMonth = {}
    for (let i = 0; i < transaction_data.length; i++) {
        const amount = transaction_data[i]["amount"]
        const trxDate = new Date(transaction_data[i]["transactionDateTime"])
        const trxMonth = String(trxDate.getMonth())
        const trxYear = String(trxDate.getFullYear())
        const key = trxMonth + " " + trxYear
        // console.log(key)
        const mode = isDebit(transaction_data[i], curAc) ? "expense" : "income"
        if (takenMonth[key] == null) {
            takenMonth[key] = {}
            takenMonth[key]["expense"] = 0;
            takenMonth[key]["income"] = 0;
            takenMonth[key][mode] += amount
        }
        else {
            takenMonth[key][mode] += amount
        }
        returnArray.push({ Amount: transaction_data[i]["amount"] })

    }
    let finalReturnData = []
    for (let key in takenMonth) {
        const data = { "name": monthNames[(key.split(" "))[0]].slice(0, 3), "income": takenMonth[key]["income"], "expense": takenMonth[key]["expense"] }
        finalReturnData.push(data)
    }
    if (finalReturnData.length != 6) {
        let len = (Object.keys(finalReturnData).length)
        let mnth = (6 - len);
        let temp = []
        for (let j = 0; j < mnth; j++) {
            temp.push({ "name": "N/A", "income": 0, "expense": 0 })
        }
        // finalReturnData.concat(temp)
        finalReturnData.reverse()
        finalReturnData = temp.concat(finalReturnData)
        // finalReturnData = finalReturnData.concat(temp)
    }
    else {
        console.log("in here")
    }
    // console.log(finalReturnData)
    return finalReturnData

}









const getTransactionData = async function (current_user) {
    // Now fetch data from transaction table
    const transactions = await Transaction.find({
        $or: [
            { sender: current_user },
            { receiver: current_user },

        ]
    }).sort({ "date": "descending" })
    x = getPastTransactionsAnalytics(transactions, current_user)
    // console.log(x)
    const graphData = makeTransactionData(transactions, current_user)
    // console.log({ "graphData": graphData, "headerData": x })
    return { "graphData": graphData, "headerData": x }


}
module.exports = getTransactionData