import React, { useState, useEffect } from 'react'
import './TransactionTable.css'
import GREEN_DOWN_ARROW_LOGO from '../Asset/green_down_arrow_for_transaction.svg'
import RED_UP_ARROW_LOGO from '../Asset/red_up_arrow_for_transaction.svg'

function TransactionTable(props) {
    const NUMTRX = 10

    const [transactions, setTransactions] = useState(props.trxdata);
    const [income, setIncome] = useState({ "credit": 0, "debit": 0 })
    var [numQuery, setNumQuery] = useState(1)

    // function used for sorting the transactions by amount
    function sortByProperty(property) {
        return function (a, b) {
            if (a[property] < b[property]) {
                return 1;
            }
            else if (a[property] > b[property]) {
                return -1;
            }
            return 0;
        }
    }

    // used to sort the transaction according to date
    function compDate(a, b) {
        return Date.parse(String(b["transactionDateTime"])) - Date.parse(String(a["transactionDateTime"]));
    }

    // this is an onclick method to sort the transaction by the date
    function sortByDate() {
        transactions.sort(compDate)
        setTransactions(transactions.map((e) => { return e }));
    }

    // this is an onclick method to sort the transaction by the amounts
    function sortByAmount() {
        transactions.sort(sortByProperty("amount"))
        setTransactions(transactions.map((e) => { return e }));
        // console.log(transactions);
    }

    function getTotalByAmount() {
        // transactions must be initialized
        var credit = 0
        var debit = 0
        const curAc = props.curAc
        transactions.map((e) => {
            // e["type"] == "debit" ? debit += e["amount"] : credit += e["amount"]
            e["senderAc"] == curAc ? debit += e["amount"] : credit += e["amount"]
        })
        setIncome({ "credit": credit, "debit": debit })
    }
    const increment = function () {
        if (Math.ceil(transactions.length / NUMTRX) != numQuery) {
            numQuery++
            setNumQuery(numQuery)
        }
        // console.log(numQuery)
    }
    const isDebit = function (e) {
        const curAc = props.curAc
        if (e["senderAc"] == curAc) {
            return true
        }
        else {
            return false
        }
    }
    const decrement = function () {
        // console.log(numQuery)
        if (numQuery == 1) {
            // setNumQuery(1)
        }
        else {
            numQuery -= 1;
            setNumQuery(numQuery)
        }
    }

    useEffect(() => {
    }, [transactions]);

    useEffect(() => {
        getTotalByAmount()
    }, [])


    const printPassbook = (elem) => {
        var mywindow = window.open('', 'PRINT', 'height=400,width=600');
        var mycss = "<style>.allTable{margin-left:130px;}</style>"
        mywindow.document.write('<html><head><title>' + document.title + '</title>');
        mywindow.document.write(mycss)
        mywindow.document.write('</head><body >');
        mywindow.document.write("<h1>Bankers</h1>")
        sortByDate()
        mywindow.document.write("<table class='allTable' style='border:1px solid red'> <thead style='border:1px solid red'><tr><th style='border:4px solid red'>S.No</th><th style='border:4px solid red'>Activity</th><th style='border:4px solid red'>Debit/Credit</th><th style='border:4px solid red'>Date</th><th style='border:4px solid red'>Amount</th></tr></thead>")
        mywindow.document.write("<tbody>")
        transactions.map((e, key) => {
            mywindow.document.write("<tr><th style='border:1px solid black'>" + (key + 1) + "</th><th style='border:1px solid black'>" + e["reason"] + "</th><th style='border:1px solid black'>" + (e["senderAc"] == curAc ? "Debit" : "Credit") + "</th><th style='border:1px solid black'>" + new Date(e["transactionDateTime"]).getDate() + "/" +
                new Date(e["transactionDateTime"]).getMonth() + "/" +
                new Date(e["transactionDateTime"]).getFullYear() + " " +
                new Date(e["transactionDateTime"]).getHours()
                + ":" +
                new Date(e["transactionDateTime"]).getMinutes()
                + ":" +
                new Date(e["transactionDateTime"]).getSeconds() + "</th><th style='border:1px solid black'>$" + e["amount"] + "</th></tr>")
        })

        mywindow.document.write('</tbody></table></body >');
        // mywindow.focus(); // necessary for IE >= 10*/

        mywindow.print();
        mywindow.close();
    }
    let curAc = props.curAc
    return (
        <div>
            <div class="trx-wrapper rounded">
                <nav style={{ "background-color": "#2f3438" }} class="navbar topnavigation navbar-expand-lg navbar-dark dark d-lg-flex align-items-lg-start"> <a class="navbar-brand" href="#">{props.heading}<p class="text-muted pl-1">{props.lowerheading}</p> </a> <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation"> <span class="navbar-toggler-icon"></span> </button>
                    <div class="collapse navbar-collapse printPassbook" id="navbarNav">
                        {/* <ul class="navbar-nav ml-lg-auto">
                            <li class="nav-item "> <a href="#"><span class="fa fa-search"></span></a> <input type="search" class="dark" placeholder="Search" /></li>
                        </ul> */}
                        <button className="btn print-passbook" onClick={(e) => {
                            printPassbook(e)
                        }}>Print Passbook</button>
                    </div>
                </nav>
                <br />
                <div class="row mt-2 pt-2">
                    <div class="col-md-6" id="income">
                        <div class="d-flex justify-content-start align-items-center">
                            {/* <p class="fa fa-long-arrow-down"></p> */}
                            <img className="GREEN_DOWN_ARROW_LOGO" src={GREEN_DOWN_ARROW_LOGO} />
                            <p class="text mx-3">Income</p>
                            <p class="text-white ml-4 money">${income["credit"]}</p>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="d-flex justify-content-md-end align-items-center">
                            {/* <div class="fa fa-long-arrow-up"></div> */}
                            <img className="RED_UP_ARROW_LOGO" src={RED_UP_ARROW_LOGO} />
                            <div class="text mx-3">Expense</div>
                            <div class="text-white ml-4 money">${income["debit"]}</div>
                        </div>
                    </div>
                </div>
                <div class="d-flex justify-content-between align-items-center mt-3">
                    <ul class="nav nav-tabs w-75">
                        <li class="nav-item"> <a class="nav-link active" href="#history">History</a> </li>
                    </ul>
                </div>
                <div class="table-responsive mt-3">
                    <table class="table table-dark table-borderless">
                        <thead>
                            <tr>
                                <th scope="col">
                                    <button class="sort-btns">
                                        Activity
                                    </button>
                                </th>
                                <th scope="col">
                                    <button class="sort-btns">
                                        Account
                                    </button>
                                </th>
                                <th scope="col">
                                    <button class="sort-btns" onClick={() => sortByDate()}>
                                        Date <i class="fas fa-sort"></i>
                                    </button>
                                </th>
                                <th scope="col">
                                    <button class="sort-btns">
                                        Mode
                                    </button>
                                </th>
                                <th scope="col" class="text-right">
                                    <button class="sort-btns" onClick={() => sortByAmount()}>
                                        Amount <i class="fas fa-sort"></i>
                                    </button>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {transactions.map((e, key) => {
                                // console.log("NumQuery" + numQuery)
                                if (key >= (numQuery - 1) * NUMTRX && key < numQuery * NUMTRX) {

                                    // console.log(key)
                                    return (
                                        <tr>
                                            <td scope="row"> <span class="fa fa-briefcase mr-1"></span> {e["reason"]} </td>
                                            <td>{e["senderAc"] == curAc ? "to " + e["receiverAc"] : "from " + e["senderAc"]}</td>
                                            <td class="text-muted">{new Date(e["transactionDateTime"]).getDate() + "/" +
                                                new Date(e["transactionDateTime"]).getMonth() + "/" +
                                                new Date(e["transactionDateTime"]).getFullYear() + " " +
                                                new Date(e["transactionDateTime"]).getHours()
                                                + ":" +
                                                new Date(e["transactionDateTime"]).getMinutes()
                                                + ":" +
                                                new Date(e["transactionDateTime"]).getSeconds()
                                            }</td>
                                            <td class="text-muted">{e["mode"]}</td>
                                            <td class="d-flex justify-content-end align-items-center"> {e["senderAc"] == curAc ? <img className="RED_UP_ARROW_LOGO" src={RED_UP_ARROW_LOGO} /> : <img className="GREEN_DOWN_ARROW_LOGO" src={GREEN_DOWN_ARROW_LOGO} />} ${e["amount"]} </td>
                                        </tr>
                                    )
                                }
                            })

                            }
                            {/* {populateData} */}
                        </tbody>
                    </table>
                </div>
                <div class="d-flex justify-content-between align-items-center results"> <span class="pl-md-3">Showing<b class="text-white"> {numQuery} 0f {Math.ceil(transactions.length / NUMTRX)} </b> trasactions</span>
                    <div class="pt-3">
                        <nav aria-label="Page navigation example">
                            <ul class="pagination">
                                <button className="incdec btn1 btnl" onClick={() => decrement()}>&lt;</button>
                                <button className="incdec btn1" onClick={() => increment()}>&gt;</button>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TransactionTable