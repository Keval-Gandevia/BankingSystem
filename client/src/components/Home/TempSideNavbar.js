import React from 'react'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import './TempSideNavbar.css'
import TRX_SVG from "./Asset/trx_icon.svg";
import ACD_SVG from "./Asset/account_details.svg";
import E_CARD_SVG from "./Asset/e_cards_icon.svg";
import Q_T_SVG from "./Asset/quick_transfer.svg";
import H_ASSIT from "./Asset/24_7_assistance.svg";
import BANK_LOGO from "./Asset/Bankers_logo.svg";
import { NavLink, Link } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
// import BANK_LOGO from './Asset/Bankers_logo.svg'

function TempSideNavbar() {
  const [navlist, setNavlist] = useState([
    // {
    //   "id": "Transfer",
    //   "text": "Transfer Money",
    //   "vector-asset": TRX_SVG,
    //   "vector-asset-color": "#ccff00",
    //   "background-color": "purple",
    //   "text-color": "purpleText",
    //   "is_drop": true,
    //   "href": "/home",
    //   "dropdown_menu": [
    //     {
    //       "text": "RTGS",
    //       "vector-asset": "link",
    //       "text-color": "green",
    //       "background-color": "purple",
    //       "href": "/quickTransfer/RTGS"
    //     },
    //     {
    //       "text": "NEFT",
    //       "vector-asset": "link",
    //       "text-color": "green",
    //       "background-color": "purple",
    //       "href": "/quickTransfer/NEFT"
    //     }
    //   ]
    // },
    {
      "id": "SavingsAc",
      "text": "Your saving Accounts",
      "vector-asset": ACD_SVG,
      "vector-asset-color": "#ccff00",
      "background-color": "blue",
      "text-color": "blueText",
      "href": "/home",
      "is_drop": true,
      "dropdown_menu": []
    },
    // {
    //   "id": "ACDetails",
    //   "text": "Your Saving Accounts",
    //   "vector-asset": ACD_SVG,
    //   "vector-asset-color": "#ccff00",
    //   "background-color": "blue",
    //   "text-color": "blueText",
    //   "href": "",
    //   "is_drop": true,
    //   "dropdown_menu": []
    // },
    {
      "id": "TermDeposit",
      "text": "Fixed Deposits",
      "vector-asset": ACD_SVG,
      "vector-asset-color": "#ccff00",
      "background-color": "blue",
      "text-color": "blueText",
      "href": "",
      "is_drop": true,
      "dropdown_menu": [
        {
          "text": "View your FD",
          "vector-asset": "",
          "text-color": "green",
          "background-color": "purple",
          "href": "/viewfixedDeposits"
        },
        {
          "text": "Apply for New FD",
          "vector-asset": "",
          "text-color": "green",
          "background-color": "purple",
          "href": "/applyfixedDeposits"
        },

      ]
    }
    ,
    {
      "id": "loan",
      "text": "Apply for loan",
      "vector-asset": E_CARD_SVG,
      "vector-asset-color": "#ccff00",
      "background-color": "purple",
      "text-color": "purpleText",
      "href": "",
      "is_drop": true,
      "dropdown_menu": [
        {
          "text": "Loan Inquiry",
          "vector-asset": "",
          "text-color": "green",
          "background-color": "purple",
          "href": "/loan/loanInquiry"
        },
        {
          "text": "Offers for Loan",
          "vector-asset": "",
          "text-color": "green",
          "background-color": "purple",
          "href": "/loan/carloan"
        }
      ]
    },
    {
      "id": "yourLoans",
      "text": "Your Loans",
      "vector-asset": E_CARD_SVG,
      "vector-asset-color": "#ccff00",
      "background-color": "purple",
      "text-color": "purpleText",
      "href": "",
      "is_drop": true,
      "dropdown_menu": [

      ]
    },
    {
      "id": "assistance",
      "text": "24 X 7 Assistance",
      "vector-asset": H_ASSIT,
      "vector-asset-color": "#ccff00",
      "background-color": "purple",
      "text-color": "purpleText",
      "href": "/assistance",
      "is_drop": false,
      "dropdown_menu": []
    }

  ]);
  const history = useHistory()
  const uri = "/user/getACDetails/-1"


  const callBack1 = data => {

    const tplist = []
    for (var i = 0; i < data["data"].length; i++) {
      var obj1 = data["data"][i]
      data["data"][i]["text"] = data["ulist"][i]
      data["data"][i]["href"] = "/Account/" + obj1["_id"]
    }
    navlist[0]["dropdown_menu"] = data["data"]
    // navlist[1]["dropdown_menu"]["data"]["link"] = "/Account/"
    // console.log("Data", data)
    setNavlist(navlist)
    // console.log(navlist)
    // console.log(data)
  }

  const callBack2 = data => {
    // console.log("ohh", data["metaData"])

    if (data["metaData"]) {
      for (let i = 0; i < data["metaData"].length; i++) {
        // console.log("ohh", data["metaData"][i].summary)
        const dat = data["metaData"][i].summary
        const link = data["metaData"][i].lId
        const dat1 = { "text": dat, "href": "/yourLoans/" + link }
        // console.log("ohh1", dat1)
        // console.log("ohh2", navlist[4]["dropdown_menu"])
        const dat2 = navlist[3]["dropdown_menu"]
        dat2.push(dat1)
      }
    }


  }

  const useFetch = (url, callBack) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    // Similar to componentDidMount and componentDidUpdate:
    useEffect(async () => {
      const response = await fetch(url, { method: "POST" });
      // console.log("her")
      const data = await response.json();
      setData(data);
      // console.log(data)
      if (callBack != null) {
        callBack(data)
      }
      setLoading(false);
    }, []);

    return { data, loading };
  };
  const loansUri = "/loans/getAllUserLoans"
  const { data, loading } = useFetch(uri, callBack1)
  const { data1, loading1 } = useFetch(loansUri, callBack2)
  // console.log(loading ? "" : data)
  // const [loading, setLoading] = useState(true);

  function getLastAcNo(e, n = 5) {
    var length = e.length
    return e.slice(length - n, length)
  }

  useEffect(() => {
    // setNavlist(navbar_json)

  }, []);
  const styles = {
    "accordian": {
      // "background-color": "#212121",
      "background-color": "#3A3B3C",
      "color": "#d7d9db",
      "border": "0px solid black",
      "padding": "",
      "text-decoration": "none",
      "display": "block",
      "outline": "0px solid #111",
      "border-radius": "0px",
      "width": "100%",
      "text-align": "left",
      "cursor": "pointer",
      "font-size": "16px",
      "font-weight": "lighter"      // "outline": "none"
    },
    "acc-border": {
      "border": "0px solid black"
    }, "dropbtn": {
      "float": "right"
    },
    "accordian-item": {
      "border": "0px",
      "font-size": "14px",
      "font-weight": "lighter"
    }
  }

  return (
    <div className="sidenav">
      <div className="headofNav">
        <a href="/home" class="d-flex heading_logo align-items-center mb-3 mb-md-0 me-md-auto  text-decoration-none">
          <img className="Headlogo" src={BANK_LOGO} />
          <span class="fs-3 heading_sidenav">Bankers</span>
        </a>
      </div>
      {navlist.map((e) => {
        return (
          <div class="accordion accordian-flush" id="accordionFlushExample" >
            <div class="accordion-item" style={styles["accordian-item"]}>
              <h3 class="accordion-header" id="flush-headingOne">
                <button
                  class="accordion-button collapsed"
                  type="button"
                  data-bs-toggle={e["is_drop"] ? "collapse" : "tp"}
                  data-bs-target={"#" + e["id"]}
                  aria-expanded="false"
                  aria-controls="flush-collapseOne"
                  style={styles["accordian"]}
                >
                  {e["is_drop"] ?

                    <>
                      <Link style={{ "font-size": "1.1em" }}>
                        {e["text"]}

                        <i
                          class="fas fa-chevron-down float-right"
                          style={styles["dropbtn"]}
                        ></i>
                      </Link>


                    </>
                    : <Link to={e["href"]} style={{ "font-size": "1.1em" }}>
                      {e["text"]}

                    </Link>}
                  {/* <Link to={e["href"]} style={{ "font-size": "1.1em" }}>
                    {e["text"]}
                    {e["is_drop"] ?
                      <i
                        class="fas fa-chevron-down float-right"
                        style={styles["dropbtn"]}
                      ></i> : ""
                    }
                  </Link> */}
                </button>

              </h3>
              <div
                id={e["id"]}
                class="accordion-collapse collapse"
                aria-labelledby="flush-headingOne"
                data-bs-parent="#accordionFlushExample"
              >

                {/* <ul> */}
                <div class="accordion-body">
                  {e["dropdown_menu"].map((e1) => {
                    return (<>
                      {e.id == "SavingsAc" ?
                        <a href={loading ? "" : e1["href"]}>

                          <div className="partition">
                            {loading ? "" : e1["text"] + " " + (String)(e1["_id"]).slice(19, 24)}< br />
                          </div>

                        </a>
                        :
                        <Link to={e1["href"]}>
                          <div className="partition">
                            {loading ? "" : e1["text"] + " " + (String)(e1["_id"]).slice(19, 24)}< br />
                          </div>
                        </Link>}
                    </>)
                  })}
                </div>
                {/* </ul> */}


              </div>
            </div>
          </div>);
      })}
      {/* <a href="#contact">Search</a> */}
    </div >
  );
}

export default TempSideNavbar
