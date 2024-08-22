const Account = require("../../Collections/AccountModel");
const logger = require("../../logger")
const createCreditCardMiddleware = async function (req, res, next) {
    try {
        const acNum = req.params.acNum
        const ac = await Account({
            _id: acNum
        })

        if (ac && !ac.isEcardIssued) {

            req.ac = ac;
            req.makeCreditStatus = true;
        }
        else {
            throw "No account found"
        }
        next()
    } catch (error) {
        logger.add_log("Problem in creditcard middleware " + e.toString(), "ERROR")
        return res.json({ "Error:": "In Create Credit Card middleware" + error.toString() })
    }
}

module.exports = createCreditCardMiddleware