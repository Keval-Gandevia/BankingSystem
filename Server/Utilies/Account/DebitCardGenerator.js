
function getRandomNumber(digit) {
    return Math.random().toFixed(digit).split('.')[1];
}
getRandomNumber(16);
const DebitCardGenerator = async function () {
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
module.exports = DebitCardGenerator