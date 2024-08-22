// import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useState, useEffect } from 'react';
import './GenericChart.css'


export default function LineChart(props) {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const [leftData, setleftData] = useState({ })
    useEffect(() => {

        setData(props.data)
        setleftData(props.prop)
        setLoading(true)

    })
    return (
        <div className="main-chart-wrapper">
            <div className="chart-wrapper">
                <div className="left-chart">
                    <h1>{loading ? leftData["header"] : ""}</h1><br />
                    <p>"<em>{loading ? leftData["quote"] : ""}</em> "</p><br />
                    <h4>{loading ? leftData["ul_header"] : ""}:</h4>
                    <ul>
                        {loading ? leftData["ul_data"].map((e) => {
                            return (<li>{e}</li>)
                        }) : ""}
                    </ul>
                </div>
                <div className="generic_chart">
                    <AreaChart
                        width={400}
                        height={300}
                        data={data}
                        margin={{
                            top: 10,
                            right: 30,
                            left: 0,
                            bottom: 0,
                        }}
                    >
                        <CartesianGrid stroke="#07acf2" />
                        <XAxis dataKey="name" stroke="#07acf2" />
                        <YAxis stroke="#07acf2" />
                        <Tooltip />
                        <Area type="monotone" dataKey="income" stroke="#008cffec" fill="#008cffec" />
                        <Area type="monotone" dataKey="expense" stroke="#00EBD6EC" fill="#00EBD6EC" />
                    </AreaChart>
                </div>
            </div>
        </div>
    )
}