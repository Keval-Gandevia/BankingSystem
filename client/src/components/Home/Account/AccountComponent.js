import React, { useState, useEffect } from 'react'
import { useLocation, useParams } from 'react-router-dom/cjs/react-router-dom.min'
import { NavLink } from 'react-router-dom/cjs/react-router-dom.min'
import DebitCardComponent from '../DebitCard/DebitCardComponent'
import './AccountStyles.css'
import '../Transaction/TransactionTable.css'
import GREEN_DOWN_ARROW_LOGO from '../Asset/green_down_arrow_for_transaction.svg'
import RED_UP_ARROW_LOGO from '../Asset/red_up_arrow_for_transaction.svg'
import TransactionTable from '../Transaction/TransactionTable'
import LineChart from '../Chart_test_comp'
import useFetch from '../Utility/General/Usefetch'
import makeTransactionData from '../Utility/AccountHandling/TransactionData'


export default function AccountComponent() {
    const location = useLocation()
    const [uril, setUril] = useState(null)





    const capitalize = (str) => {

        return str[0].toUpperCase() + str.slice(1, str.length)
    }
    const parseCardnum = (data) => {
        data = String(data)
        let str1 = ""
        str1 += data.substring(0, 4) + "-"
        str1 += data.substring(4, 8) + "-"
        str1 += data.substring(8, 12) + "-"
        str1 += data.substring(12, 16)
        return str1
    }


    let slug = useLocation()
    let final_request = "/account/" + slug["pathname"].split("/")[2];
    const { data, loading } = useFetch(final_request);
    let make_payment_req_url = "/makePayment/" + slug["pathname"].split("/")[2];
    let make_neft_payment_req_url = "/NEFT/" + slug["pathname"].split("/")[2];
    let make_rtgs_payment_req_url = "/RTGS/" + slug["pathname"].split("/")[2];
    // console.log(loading ? "....." : data)
    // console.log(make_payment_req_url);
    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"];
    const expiryDate = loading ? "cancel" : data["cardData"]["expiryDate"];
    const expiryMonth = String((new Date(expiryDate)).getMonth()).length == 1 ? " 0" + String((new Date(expiryDate)).getMonth()) : (new Date(expiryDate)).getMonth();
    const expiryYear = String((new Date(expiryDate)).getFullYear()).slice(2, 4);
    makeTransactionData(loading ? [] : data["transaction"], slug["pathname"].split("/")[2])
    const left_data = {
        "header": "Income Expense Chart",
        "quote": "Spend as much as you have! - John Mckinzey",
        "ul_header": "Insights",
        "ul_data": [
            "Try increasing your credit score",
            "You are in a lot of debt",
            "You could apply for Bankers exclusive loan",
            "Overall Profile Rating (OPR): Average"
        ]
    }
    return (
      <div className="Account-page-wrapper ">
        <div className="col bord">
          <div className="row topDetails">
            <div className="col-7 ">
              {loading ? (
                ""
              ) : data["cardData"]==-1 ? (
                <div style={{"display":"flex","justify-content":"center","align-items":"center","border":"1px solid white","height":"300px"}}>
                    <h2 style={{"color":"white"}}>Request for Debit Card</h2>
                </div>
              ) : (
                <DebitCardComponent
                  cvv={loading ? "" : data["cardData"]["cvvNumber"]}
                  className="col-6"
                  type_card="credit"
                  valid_thru={loading ? "" : expiryMonth + "/" + expiryYear}
                  name={
                    loading ? (
                      <div
                        className="spinner-border text-warning"
                        role="status"
                      >
                        <span className="sr-only">Loading...</span>
                      </div>
                    ) : (
                      capitalize(data["userList"]["firstName"]) +
                      " " +
                      capitalize(data["userList"]["lastName"])
                    )
                  }
                  cardnumber={
                    loading
                      ? "1234-5555-2234-9900"
                      : parseCardnum(data["cardData"]["cardNumber"])
                  }
                ></DebitCardComponent>
              )}
            </div>
            <div className="col-5 leftDetails ">
              <div className="detailsHeader ">
                <h1 className="name-header">
                  {loading ? (
                    <div className="spinner-border text-warning" role="status">
                      <span className="sr-only">Loading...</span>
                    </div>
                  ) : (
                    capitalize(data["userList"]["firstName"]) +
                    " " +
                    capitalize(data["userList"]["lastName"])
                  )}
                </h1>
              </div>
              <div className="acDetails">
                <h2 className="left-money">
                  {" "}
                  Balance:
                  <span className="money">
                    {" "}
                    $
                    {loading ? (
                      <div
                        className="spinner-border text-warning"
                        role="status"
                      >
                        <span className="sr-only">Loading...</span>
                      </div>
                    ) : (
                      data["data"]["accountBalance"]
                    )}
                  </span>
                </h2>
              </div>
              <div className="acDetails">
                <div className="row">
                  <h2 className="left-money col">Holders:</h2>
                  <span className="holder col">
                    {" "}
                    {loading ? (
                      <div
                        className="spinner-border text-warning"
                        role="status"
                      >
                        <span className="sr-only">Loading...</span>
                      </div>
                    ) : (
                      capitalize(data["userList"]["firstName"])
                    )}
                  </span>
                </div>
              </div>
              <div className="row mt-4">
                {loading?"":data["cardData"]==-1?"":<NavLink
                  className="col-5 mr-1"
                  style={{ "margin-left": "-13px" }}
                  to={make_payment_req_url}
                >
                  <button className="btn  payment">Card Transfer</button>
                </NavLink>}
                <br />
                <NavLink className="col-3 mr-1" to={make_rtgs_payment_req_url}>
                  <button className=" btn payment ">RTGS</button>
                </NavLink>
                <br />
                <NavLink
                  className="col-3 "
                  style={{ padding: "0px" }}
                  to={make_neft_payment_req_url}
                >
                  <button className=" btn payment ">NEFT</button>
                </NavLink>
                <br />

                {/* <NavLink className="col-3 " to={make_neft_payment_req_url}><button className="btn payment ">NEFT</button></NavLink> */}
              </div>
            </div>
          </div>
          <br />
          <div className="row">
            {loading ? (
              ""
            ) : (
              <TransactionTable
                heading="Latest Transactions"
                lowerheading="Transactions can be sorted by date or amount."
                curAc={slug["pathname"].split("/")[2]}
                trxdata={data["transaction"]}
              ></TransactionTable>
            )}
          </div>
          <br />

          <div className="row">
            <LineChart
              data={
                loading
                  ? [
                      { name: "Jan", income: 400, expense: 600 },
                      { name: "Feb", income: 400, expense: 200 },
                      { name: "Mar", income: 600, expense: 700 },
                      { name: "Apr", income: 900, expense: 400 },
                      { name: "May", income: 1200, expense: 900 },
                      { name: "Jun", income: 500, expense: 700 },
                    ]
                  : makeTransactionData(
                      loading ? [] : data["transaction"],
                      slug["pathname"].split("/")[2]
                    )
              }
              prop={left_data}
            />
          </div>
        </div>
      </div>
    );
}
