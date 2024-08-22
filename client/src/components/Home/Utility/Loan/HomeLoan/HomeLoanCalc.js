function calculatePayments(e) {
    e.preventDefault()
    // console.log(e)
    var homePrice = document.getElementById('homePrice').value
    var loanTerm = document.getElementById('loanTerm').value
    var intRate = document.getElementById('intRate').value
    var downPayment = document.getElementById('downPayment').value
    var tradeValue = document.getElementById('tradeValue').value
    var amount = parseInt(homePrice)
    var months = parseInt(loanTerm)
    var down = parseInt(downPayment)
    var trade = parseInt(tradeValue)
    var totalDown = down + trade
    var annInterest = parseFloat(intRate)
    var monInt = annInterest / 1200;

    if (!amount) {
        alert('Please add a loan amount');
        return;
    }

    if (!months) {
        months = 60;
        loanTerm = document.getElementById('loanTerm').value = '60';
    }

    if (!downPayment) {
        down = 0;
        downPayment = document.getElementById('downPayment').value = '0';
    }

    if (!trade) {
        trade = 0;
        tradeValue = document.getElementById('tradeValue').value = '0';
    }

    if (!annInterest) {
        annInterest = 3.25;
        intRate = document.getElementById('intRate').value = '3.25';
    }

    if (annInterest < 8 || annInterest > 20) {
        alert('Enter Interest Rate in range 8 to 20');
        return;
    }

    var calc = ((monInt + (monInt / (Math.pow((1 + monInt), months) - 1))) * (amount - (totalDown || 0))).toFixed(2);



    var homeLoanPaymentResults = document.getElementById('homeLoanPaymentResults');
    homeLoanPaymentResults.style.display = 'block';
    homeLoanPaymentResults.innerHTML = '';
    var results = document.createElement('div');
    results.innerHTML = (calc < 0) || (annInterest <= 0) ? '<h1 style="text-align:center">Well you can buy yourself you dont need loan</h1>' : '<h1 style="text-align:center">Estimated Monthly Payment is:<br/></h1>' + '<h3 style="text-align:center">₹ ' + calc + '/Month</h3>';

    homeLoanPaymentResults.append(results);

    document.getElementById("homeLoanPaymentResults").style.border = "thick dashed #00d2f7";
}

module.exports = calculatePayments