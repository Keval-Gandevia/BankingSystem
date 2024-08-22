const express = require("express");
const router = express.Router()
const authenticate = require("../Middlewares/Authenticate")
const getAllTransaction = require("../Utilies/Transactions/getAllTransactions")
const logger = require("../logger")
// const 

router.post("/home/getDetails", [authenticate], async (req, res) => {
    try {

        if (req.is_authenticated) {

            // console.log("Getting details")
            return res.json({ "Success": true, "data": req.current_user })
        }
        else {
            return res.json({ "Error:": "You must be authenticated", "redirect": true })
        }
    }
    catch (e) {
        return res.json({ "Error:": e.toString() })
    }
})

router.post("/home/index", [authenticate], async (req, res) => {
    try {
        if (req.is_authenticated) {
            const data = await getAllTransaction(req.current_user)
            logger.add_log("Serving data for home page" + req.current_user.firstName + " " + req.current_user.lastName, "SUCCESS")
            return res.json({ "Success": true, "data": req.current_user, "userData": data })
        }
        else {
            logger.add_log("Home page error authenticating user!", "ERROR")
            return res.json({ "Error:": "You must be authenticated" })
        }
    }
    catch (e) {
        // console.log(e.toString())
        logger.add_log("HomeRouter" + e.toString(), "ERROR")
        return res.json({ "Error:": e.toString() })
    }
})

module.exports = router;