const verifyLoanInquiry = async function (data) {

    // Check for name
    const name = data["fullName"]
    // console.log(data);
    if (name == "") {
        return "Name cannot be empty!!"
    }

    // Check for email
    const email = data["email"];
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!email.match(mailformat)) {
        return "You have entered an invalid email address!!";
    }
    
    const occupation = data["occupation"];
    const companyName = data["companyName"];
    const monthlyIncome = data["monthlyIncome"];
    const loanAmount = data["loanAmount"];
    const loanTenure = data["loanTenure"];
    const address = data["address"];
    const city = data["city"];
    const userQueries = data["userQueries"];

    if (occupation === "" || companyName === "" || monthlyIncome === ""
        || loanAmount === "" || loanTenure === "" || address === ""
        || city === "" || userQueries === "") {
        return "All fiels are required!!"
    }

    // check for phone number
    const phoneNumber = data["phoneNumber"];
    let isNum = /^\d+$/.test(phoneNumber);
    var phoneNumberLengthFormat = /^(\s*\d{10}\s*)(,\s*\d{10}\s*)*,?\s*$/;
    if (!isNum || !phoneNumber.match(phoneNumberLengthFormat)) {
        return "Please enter valid phone number!!"
    }

    // check for postCode
    const postCode = data["postCode"];
    var postCodeformat = /^(\s*\d{6}\s*)(,\s*\d{6}\s*)*,?\s*$/;
    if (!postCode.match(postCodeformat)) {
        return "Please enter valid postCode!!"
    }

    // check for selected loan type
    const loanType = data["loanType"];
    if (loanType === "") {
        return "Please select loan type!!"
    }

   
    return "Your Details are verified please be patient while we process your request";

}

module.exports = verifyLoanInquiry