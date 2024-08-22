import React from 'react'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import CardComponent from './CardComponent'
// import Line from './Chart_test_comp'
// import ChartContainer from './Chart_test_comp'
import LineChart from './Chart_test_comp'
import { useState, useEffect } from 'react'
import CarouselComponent from './CarouselComponent'
import HeadLineChartComponent from './HeadLineChartComponent'
import TestComponent from './TempComponent'
const axios = require("axios")


export default function HomeComponent() {

    const history = useHistory()

    const useFetch = url => {
        const [data, setData] = useState(null);
        const [loading, setLoading] = useState(true);

        // Similar to componentDidMount and componentDidUpdate:
        useEffect(async () => {
            const response = await fetch(url, { method: "POST" });
            // console.log("her")
            const data = await response.json();
            setData(data);
            // console.log(data)
            setLoading(false);
        }, []);

        return { data, loading };
    };

    const { data, loading } = useFetch("/home/index");
    // console.log(loading ? "jenil" : data["data"])
    if (!loading) {

        if (data["data"].hasOwnProperty("Error:")) {
            history.push("/login")
        }
    }

    const capitalize = function (str) {
        var str1 = str[0].toUpperCase()
        str1 += str.slice(1, str.length);
        return str1
    }
    //set user data
    const evaluateProfile = function (amount) {
        if (amount < 0) {
            return "Poor"
        }
        else if (amount >= 0 && amount <= 5000) {
            return "Average"
        }
        else if (amount > 5000 && amount <= 100000) {
            return "Good"
        }
        else {
            return "Excellent!"
        }
    }

    const left_data = {
        "header": "Income Expense Chart",
        "quote": "Spend as much as you have!",
        "ul_header": "Insights",
        "ul_data": [
            "Your Credits are: $" + (loading ? "Loading..." : data["userData"]["headerData"]["credit"]),
            "Your Debits are: $" + (loading ? "Loading..." : data["userData"]["headerData"]["debit"]),
            "Your net Income is: $" + (loading ? "Loading..." : data["userData"]["headerData"]["netAcBal"]),
            "Overall Profile Rating (OPR):" + (loading ? "Loading..." : evaluateProfile(data["userData"]["headerData"]["netAcBal"]))
        ]
    }

    // Data for card 1
    const header1 = <>
        <p className="display-6"><b>Welcome back,</b></p>
    </>

    // Data for card 2
    const lowerjsx1 = <><br /><br />
        <HeadLineChartComponent
            width={355}
            height={110}
            datakey={"income"}
            data={loading ? [] : data["userData"]["graphData"]}
        ></HeadLineChartComponent>

    </>
    const topJSX1 = <>
        <h1><b>Income</b></h1>
        <h3><b>${loading ? "" : data["userData"]["headerData"]["credit"]}</b></h3>
    </>

    // Data for Card 3
    const lowerjsx2 = <><br /><br />
        <HeadLineChartComponent
            width={355}
            height={110}
            datakey={"expense"}
            data={loading ? [] : data["userData"]["graphData"]}
        ></HeadLineChartComponent>

    </>
    const topJSX2 = <>
        <h1><b>Expense</b></h1>
        <h3><b>${loading ? "" : data["userData"]["headerData"]["debit"]}</b></h3>
    </>
    return (<>
        <div className="row mt-3">

            <CardComponent
                className="col-4"
                username={loading ? "" :
                    capitalize(data["data"]["firstName"])
                    + " " +
                    capitalize(data["data"]["lastName"])}
                myjsx={header1}
            >

            </CardComponent>
            <CardComponent className="col-4" strokecolor={"rgba(204, 255, 0,0.5)"} fillcolor={"rgba(204, 255, 0,0.5)"} topJSX={topJSX1} isGraph={true} lowerjsx={lowerjsx1} info="Income"></CardComponent>
            <CardComponent className="col-4" topJSX={topJSX2} isGraph={true} lowerjsx={lowerjsx2} info="Expense"></CardComponent>


        </div>
        <div className="row">
            <LineChart
                // data={[{ name: 'Jan', income: 400, expense: 600 },
                // { name: 'Feb', income: 400, expense: 200 },
                // { name: 'Mar', income: 600, expense: 700 },
                // { name: 'Apr', income: 900, expense: 400 },
                // { name: 'May', income: 1200, expense: 900 },
                // { name: 'Jun', income: 500, expense: 700 }]}
                data={loading ? [] : data["userData"]["graphData"]}
                prop={left_data}
            />
        </div>
        {/* <TestComponent></TestComponent> */}
        {/* <CarouselComponent></CarouselComponent> */}
    </>
    )
}