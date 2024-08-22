const mongoose = require("mongoose")
const jwt = require("jsonwebtoken")
const Admin = mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    middleName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    pinNo: {
        type: String,
        required: true
    },
    loginTokens: [
        {
            token: {
                type: String,
                required: true
            }
        }
    ]
})
Admin.methods.generateAuthToken = async function () {
    try {
        const adminToken = jwt.sign({ _id: this._id }, "SECRETKEY")
        this.loginTokens = this.loginTokens.concat({ token: adminToken })
        let is_saved = this.save()
        if (is_saved) {
            return adminToken
        }
        else {
            console.log("Error saving token");
        }
    }
    catch (e) {
        console.log(e.toString())
    }
}

const AdminModel = mongoose.model("ADMIN", Admin)
module.exports = AdminModel