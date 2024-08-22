function compDate(a, b) {
    return Date.parse(String(b["transactionDateTime"])) - Date.parse(String(a["transactionDateTime"]));
}
function sortByDate(transactions) {
    return transactions.sort(compDate)
    // setTransactions(transactions.map((e) => { return e }));
}
const isDebit = function (e, curAc) {

    if (e["senderAc"] == curAc) {
        return true
    }
    else {
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

        // const expiryMonth = String((new Date(expiryDate)).getMonth()).length == 1 ? " 0" + String((new Date(expiryDate)).getMonth()) : (new Date(expiryDate)).getMonth();
        // const expiryYear = String((new Date(expiryDate)).getFullYear()).slice(2, 4);
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
            // console.log(mnth)
            temp.push({ "name": "N/A", "income": 0, "expense": 0 })
        }
        // finalReturnData.concat(temp)
        finalReturnData.reverse()
        finalReturnData = temp.concat(finalReturnData)
        // finalReturnData = finalReturnData.concat(temp)
    }
    else {
        // console.log("in here")
    }
    // console.log(finalReturnData)
    return finalReturnData

}
export default makeTransactionData