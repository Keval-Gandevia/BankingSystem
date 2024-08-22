const User = require("../Collections/UserModel")
const Account = require("../Collections/AccountModel")
const jwt = require("jsonwebtoken")
const logger = require("../logger")
const authenticate = async function (req, res, next) {
    // console.log(req.body)
    try {
        const uid = req.cookies.LoginToken
        const user_id = jwt.verify(uid, "SECRETKEY")
        // console.log(user_id._id)
        const user = await User.findOne({
            _id: user_id._id
        })
        if (!user) {
            req.is_authenticated = false;
        }
        else {
            req.is_authenticated = true;
            req.current_user = user;
            req.admin_user = await User.findOne({
                _id: "6144bd9a611fe73b388cc553"
            })
            req.admin_account = await Account.findOne({
                _id: "6144c3dc86c0cc08d848aefb"
            })
        }
        next()

    }
    catch (e) {
        logger.add_log("Error in authentication middleware with uid:" + uid)
        return res.json({ "Error:": "Error authenticating user" })
    }

}
module.exports = authenticate