const Admin = require("../../Collections/AdminModel")
const logger = require("../../logger")
const verifyAdminDetails = async function (req, res, next) {
    try {

        let firstName = req.body["firstName"].toLowerCase()
        let middleName = req.body["middleName"].toLowerCase()
        let lastName = req.body["lastName"].toLowerCase()
        const admin = await Admin.findOne({
            firstName,
            middleName,
            lastName
        })
        if (!admin) {
            req.create_admin = true;
        }
        else {
            throw "Error Admin with this name already exists!";
        }

        next();
    }
    catch (e) {
        logger.add_log("Problem in verifyAdminDetails " + e.toString(), "ERROR")
        // console.log(e.toString())
        return res.send({ "Error:": e.toString() })
    }
}

module.exports = verifyAdminDetails;