function getRandomNumber(digit) {
    return Math.random().toFixed(digit).split('.')[1];
}
const CreditCardGenerator = async function () {
    try {
        const cardDetails = {}
        cardDetails["cardNum"] = getRandomNumber(16)
        cardDetails["cvv"] = getRandomNumber(3)
        // console.log(cardDetails)
        return cardDetails
    }
    catch (e) {
        console.log({ "Error:": e.toString() })
    }
}
// CreditCardGenerator(333)
module.exports = CreditCardGenerator