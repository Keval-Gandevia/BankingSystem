const verifyDetails = async function (data) {
    if (data["accountBalance"] == -1) {
        return "please wait while details loads"
    }

    // Check for name
    const name = data["fullName"]
    if (name == "") {
        return "Name cannot be empty"
    }


    // Account Number must be of 24 length
    const acNum = data["acNumber"]
    if (acNum.length != 24) {
        return "Account Number must be 24 Digits long"
    }
    // Now check to backend if the account exists or not





    // Check for email
    const email = data["email"];
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!email.match(mailformat)) {
        return "Please enter valid email address!";
    }



    // Amount < Your Balance
    const amount = data["amount"] == "" ? 0 : Number(data["amount"])
    const accountBalance = data["accountBalance"]
    if (amount <= 0) {
        return "Enter a valid amount"
    }
    else if (amount > accountBalance) {
        return "Amount to be transfer must be less than available balance";
    }


    return "Your Details are verified please be patient while we process your request"
}

module.exports = verifyDetails