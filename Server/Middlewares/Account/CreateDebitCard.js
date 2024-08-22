const Account = require("../../Collections/AccountModel")
const logger = require("../../logger")
const createDebitCardMiddleware = async function (req, res, next) {
    try {

        const acNum = req.params.acNum

        const ac = await Account.findOne({
            _id: acNum
        })


        if (ac && !ac.isEcardIssued) {
            console.log("JKemno")
            ac.isEcardIssued = true
            req.ac = ac

            req.makeDebitStatus = true
        }
        else {
            if (ac.isEcardIssued) {
                // throw "Ecard already issued"
                return res.json({ "Error:": "The Debit card is already issued for this account!!" })
            }
            else {
                throw "No account found"
            }
        }
        next()
    }
    catch (e) {
        logger.add_log("Problem in create debit card! " + e.toString(), "ERROR")
        return res.json({ "Error:": "Your Details are invalid!!" })
    }
}
module.exports = createDebitCardMiddleware