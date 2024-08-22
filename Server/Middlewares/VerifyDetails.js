const User = require("../Collections/UserModel")
const verifyDetails = async function (req, res, next) {
    try {

        // console.log(req.body["DOB"])
        let firstName = req.body["firstName"].toLowerCase()
        let middleName = req.body["middleName"].toLowerCase()
        let lastName = req.body["lastName"].toLowerCase()
        let aadharNo = req.body["aadharNo"]
        let email = req.body["emailId"]
        let panCardNo = req.body["panCardNo"]
        let mobileNo = req.body["mobileNo"]
        let pinNo = req.body["pinNo"]

        if (!firstName) {
            throw ("Provide a firstname")
        }
        if (!middleName) {
            throw ("Provide a middlename")
        }
        if (!lastName) {
            throw ("Provide a lastname")
        }
        if (!email) {
            throw ("Provide a email")
        }
        if (!pinNo) {
            throw ("Provide a pin number")
        }
        if (!aadharNo) {
            throw ("Provide a aadharNo")
        }
        if (!panCardNo) {
            throw ("Provide a panCardNo")
        }
        if (!mobileNo) {
            throw ("Provide a mobile number")
        }
        req.body["firstName"] = req.body["firstName"].toLowerCase()
        req.body["middleName"] = req.body["middleName"].toLowerCase()
        req.body["lastName"] = req.body["lastName"].toLowerCase()
        const userno = await User.find({
            //here
            firstName,
            middleName,
            lastName,
            aadharNo,
            panCardNo

        }).count()

        if (userno == 0) {
            req.create_user = true;
        }
        else {
            req.create_user = false;
        }
        next()
    }
    catch (e) {
        return res.json({ "Error:": e.toString() })
    }
}
module.exports = verifyDetails