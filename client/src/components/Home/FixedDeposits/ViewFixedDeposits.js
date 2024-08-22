import React from "react";
import './ViewFixedDeposits.css'
import useFetch from '../Utility/General/Usefetch'
export default function FixedDeposits() {

  const capitalize = function (str) {
    var str1 = str[0].toUpperCase()
    str1 += str.slice(1, str.length);
    return str1
  }

  const parseDate = function (dateStr) {
    const curDate = new Date(dateStr)
    return curDate.getDate() + "/" + curDate.getMonth() + "/" + curDate.getFullYear()
  }
  const getFinalAmount = function (metaData, depositData, idx) {
    // console.log(depositData["depositData"])
    var principle = depositData["depositData"][idx]["principleAmount"]
    var interest = depositData["depositData"][idx]["interestRate"]
    var maturityDate = depositData["depositData"][idx]["maturityDate"]
    var dateOfIssue = depositData["depositData"][idx]["dateOfIssue"]
    var maturityMonths = 12 * ((new Date(maturityDate)).getFullYear() - (new Date(dateOfIssue)).getFullYear())
    // console.log(principle, interest, maturityDate, dateOfIssue)
    // console.log("meta", metaData)
    if (metaData === false) {
      // it is a fixed deposit
      maturityMonths += ((new Date(maturityDate)).getMonth() - (new Date(dateOfIssue)).getMonth())
      // maturity months denotes no of months remaining
      var monthlyInterest = interest / 12
      var totalInterest = (monthlyInterest * maturityMonths) / 100;
      var finalAmount = principle + (principle * totalInterest);
      return finalAmount.toFixed(2);
    }
    else {
      var recurringAmount = metaData["recurringDepositAmount"]
      var total = principle
      var years = maturityMonths / 12;
      for (let i = 0; i < years; i++) {
        if (i == 0) {
          total += (total * (interest / 100))
        }
        else {
          total += (total + recurringAmount) * (interest / 100)
        }
        // console.log(total)
      }
      // console.log("total", total)
      return total.toFixed(2)

    }
  }
  const { data, loading } = useFetch("/fd/getFDDetails");

  // console.log(data["depositData"][0]["principleAmount"]);

  const setDepositDetails = function (depositData) {
    // console.log(depositData)
    if (depositData) {
      const deposits = depositData["depositData"];
      const recurData = depositData["recurringData"]
      // console.log(recurData)
      const allJsx = []
      const userFirstName = capitalize(depositData["username"]["firstName"])
      const userLastName = capitalize(depositData["username"]["lastName"])
      // console.log(deposits);
      for (let deposit in deposits) {
        let counter = deposit
        // console.log(counter)
        deposit = deposits[deposit];
        // console.log(deposit);
        let depositJsx = <>
          <div class="col-sm-6 mb-3">
            <div class="card" style={{ width: "103%" }}>
              <div class="card-body">
                <h3 class="card-title">{userFirstName} {userLastName}</h3>
                <label>Deposit Number: {deposit._id}</label><br />
                <label>Deposit Amount: ${deposit.principleAmount} {recurData[counter] ?
                  <>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Recurring Amount: ${recurData[counter]["recurringDepositAmount"]}</> : ""}</label><br />

                <label>Interest Rate: {deposit.interestRate} pa</label><br />
                <label>Maturity Date: {loading ? "Loading..." : parseDate(deposit.maturityDate)}</label><br />
                <label>Maturity Amount:{loading ? "Loading..." : " $" + getFinalAmount(recurData[counter], depositData, counter)}</label><br />
                {/* <button type="button" style={{ "width": "97%" }} className="applyDepositBtn">View Full FD</button> */}
              </div>
            </div>
          </div>
        </>

        allJsx.push(depositJsx);

      }

      return allJsx;
    }
  }

  // setDepositDetails(data);

  return (
    <>

      <div class="row">
        {loading ? "loading..." :
          data["depositData"].length == 0 ? <>
            <div>
              <h1 style={{ "color": "#00d2f7" }}>No fixed deposits as of now</h1>
            </div>

          </> :
            (setDepositDetails(data)).map((e) => { return e })
        }

      </div>
    </>
  );
}
