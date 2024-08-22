function cal(e) {
    if (!checkAll(e))
        return;

    var depositType = document.f1.depositType.value;
    if (depositType == "fd" && document.f1.freq.value.length != 0) {
        var amt = parseFloat(document.f1.amt.value);
        var rate = parseFloat(document.f1.rate.value);
        var year = parseInt(document.f1.years.value);
        var freq = parseInt(document.f1.freq.value);

        var maturity = amt * Math.pow((1 + ((rate / 100) / freq)), freq * year);
        document.getElementById("maturity").innerText = maturity.toFixed(2);
    } else if (depositType == "rd" && document.f1.freq.value.length != 0) {
        var amt = parseFloat(document.f1.amt.value);
        var rate = parseFloat(document.f1.rate.value);
        var year = parseInt(document.f1.years.value);
        var freq = parseInt(document.f1.freq.value);

        var months = year * 12;
        var maturity = 0;
        // console.log(amt);
        amt = amt / months;
        // console.log(amt);
        for (var i = 1; i <= months; i++) {
            maturity += amt * Math.pow((1 + ((rate / 100) / freq)), freq * ((months - i + 1) / 12));
            // console.log(((months - i + 1) / 12));
            // console.log(maturity);
        }
        document.getElementById("maturity").innerText = (maturity).toFixed(2);
    } else {
        alert("Select all dropdowns");
    }
}

function checkAll(e) {
    if (checkType(e) && checkAmt(e) && checkYears(e) && checkRate(e) && checkFreq(e))
        return true;
    else
        return false;
}
function checkType(e) {
    if (document.f1.depositType.value.length == 0) {
        document.getElementById("depositTypeErr").innerText = "* Select a deposit type";
        return false;
    } else {
        document.getElementById("depositTypeErr").innerText = "";
        return true;
    }
}

function checkAmt(e) {
    if (isNaN(document.f1.amt.value) || document.f1.amt.value.length == 0) {
        document.getElementById("amtErr").innerText = " * Amount required and should be a number";
        return false;
    } else {
        document.getElementById("amtErr").innerText = "";
        return true;
    }
}

function checkYears(e) {
    if (isNaN(document.f1.years.value) || document.f1.years.value.length == 0) {
        document.getElementById("yearsErr").innerText = " * Year required and should be a number";
        return false;
    } else {
        document.getElementById("yearsErr").innerText = "";
        return true;
    }
}

function checkRate(e) {
    if (isNaN(document.f1.rate.value) || document.f1.rate.value.length == 0) {
        document.getElementById("rateErr").innerText = " * Interest required and should be a number";
        return false;
    } else {
        document.getElementById("rateErr").innerText = "";
        return true;
    }
}

function checkFreq(e) {
    if (document.f1.freq.value.length == 0) {
        document.getElementById("freqErr").innerText = " * Select a compounding freq.";
        return false;
    } else {
        document.getElementById("freqErr").innerText = "";
        return true;
    }
}
export default {
    cal,
    checkAll,
    checkType,
    checkAmt,
    checkYears,
    checkRate,
    checkFreq
}