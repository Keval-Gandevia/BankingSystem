const Account = require("../../Collections/AccountModel");
const logger = require("../../logger")

const verifyDeposit = async function (req, res, next) {
    try {

        const acNum = req.body.acNumber;
        // console.log("Acnum:::", req.body);

        if (req.body.acNumber == '') {
            throw "A/C number cannot be empty!"
        }
        const accountExist = await Account.findOne({
            _id: acNum,
            accountOwner: req.current_user
        })


        if (accountExist) {
            // success
            req.current_ac = accountExist;
            req.accountAttchedWithUser = true;
            // console.log("account balance: ", req.current_ac.accountBalance)
            // console.log("principle amount: ", req.body.principleAmount)
            if (req.body.principleAmount > req.current_ac.accountBalance) {
                throw "Insufficient account balance!!"
            }
            else if (req.body.principleAmount <= 0) {
                throw "Enter valid amount!!"
            }

        }
        else {
            // fail
            // req.accountAttchedWithUser = false;
            throw "This is not your A/C!!"
        }


        next();
    }

    catch (e) {
        logger.add_log("Problem in verifydeposit middleware " + e.toString(), "ERROR")
        // console.log(e.toString())
        return res.json({ "Error": e.toString(), "Success:": false })
    }
}

module.exports = verifyDeposit