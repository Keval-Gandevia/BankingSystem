const express = require("express");
const router = express.Router()
const logger = require("../logger")

router.post("/admin/logout", (req, res) => {
    // console.log("Hello from logout page");
    res.clearCookie("LoginToken")
    logger.add_log("/admin/logout admin logged out", "ERROR")
    res.status(200).send("user logout!!");
})

module.exports = router