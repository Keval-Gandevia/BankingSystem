const Admin = require("../../Collections/AdminModel");
const Account = require("../../Collections/AccountModel");
const User = require("../../Collections/UserModel");
const jwt = require("jsonwebtoken");
const logger = require("../../logger")


const authenticateAdmin = async function (req, res, next) {
  try {
    const aid = req.cookies.LoginToken;
    const admin_id = jwt.verify(aid, "SECRETKEY");
    const adminExist = await Admin.findOne({
      _id: admin_id._id,
    });

    if (!adminExist) {
      throw "Admin is not authenticated!!!";
    } else {
      req.isAdminAuthenticated = true;
      req.current_admin = adminExist;
      req.admin_user = await User.findOne({
        _id: "6144bd9a611fe73b388cc553",
      });
      req.admin_account = await Account.findOne({
        _id: "6144c3dc86c0cc08d848aefb",
      });
    }

    next();
  } catch (e) {
    logger.add_log("Problem in admin authentication:" + e.toString(), "ERROR")
    // console.log(e);
    return res.json({ "Error:": "Error authenticating user" });
  }
};
module.exports = authenticateAdmin;
