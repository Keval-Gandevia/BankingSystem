const express = require("express");
const router = express.Router()
const authenticate = require("../Middlewares/Authenticate")
const logger = require("../logger")

router.post("/logout", authenticate, (req, res) => {
    res.clearCookie("LoginToken")
    // res.cookies.set('LoginToken', {expires: Date.now()})
    logger.add_log("/logout User Logout" + req.current_user.firstName + " " + req.current_user.lastName, "SUCCESS")
    res.status(200).send("user logout!!");
})

module.exports = router