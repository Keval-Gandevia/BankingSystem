const express = require("express");
const router = express.Router()
const verifyDetails = require("../Middlewares/VerifyDetails")
const authenticate = require("../Middlewares/Authenticate")
const User = require("../Collections/UserModel")
var SHA256 = require("crypto-js/sha256")
const logger = require("../logger")
const AdminAuthenticate = require("../Middlewares/Admin/authenticateAdmin")

router.post("/user/add_user", [AdminAuthenticate, verifyDetails], async (req, res) => {
    // console.log(req.create_user)
    if (req.create_user) {
        // console.log(req.body)
        const new_user = await User(req.body).save()
        return res.json({ "Success": "Success" })
    }
    else {
        return res.json({ "Error:": "user already exists" })
    }
})


router.post("/user/login_user", async (req, res) => {
    try {
        const { username, pinNo } = req.body;
        // console.log(req.body)
        if (!username || !pinNo) {
            return res.json({ "Error": "Fields cannot be empty!" })
        }
        else {
            // your username is firstname_middlename_lastname

            const user_names = username.split("_")
            // console.log(req.body.pinNo)
            // console.log(user_names)
            const user = await User.findOne({
                firstName: user_names[0],
                middleName: user_names[1],
                lastName: user_names[2],
                pinNo: req.body.pinNo
            })
            if (!user) {
                logger.add_log("Username: " + username + " not found", "ERROR")
                return res.json({ "Error:": "No user found" })
            }
            else {

                // console.log("Current user:" + user.firstName + " " + user.middleName + " " + user.lastName);
                const token = await user.generateAuthToken()

                // Saving current users session

                const savedCookie = await res.cookie("LoginToken", token, {
                    expires: new Date(Date.now() + 2589200000),
                    httpOnly: true,
                });
                const userCookie = await res.cookie("UserId", user._id, {
                    expires: new Date(Date.now() + 2589200000),
                    httpOnly: true,
                });
                // End of saving session.post
                logger.add_log("User logged in name: " + username, "INFO")
                res.send("Success")
            }
        }
    }
    catch (e) {
        logger.add_log(e.toString(), "ERROR")
        // console.log("Error:" + e.toString())
    }

})

router.post("/user/testing", [authenticate], async (req, res) => {
    if (req.is_authenticated) {
        console.log("Authenticated!")
    }
    else {
        console.log("Not authenticated")
    }
    return res.send("Jenil")
})

module.exports = router;