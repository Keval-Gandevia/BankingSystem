import React from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useState, useEffect } from 'react';


export default function HeadLineChartComponent({ data, width, height, strokecolor, fillcolor, datakey }) {
    const styles = {
        "padding": "-10%"
    }
    return (
        <div style={styles}>
            <AreaChart
                width={width}
                height={height}
                data={data}
                margin={{
                    top: 10,
                    right: 30,
                    left: 0,
                    bottom: 0,
                }}
            >
                {/* <CartesianGrid stroke="#07acf2" /> */}
                {/* <XAxis dataKey="name" stroke="#07acf2" /> */}
                {/* <YAxis stroke="#07acf2" /> */}
                <Tooltip />
                <Area type="monotone" dataKey={datakey} stroke={strokecolor}
                    fill={fillcolor} />
                {/* <Area type="monotone" dataKey={datakey} stroke="#ccff00" fill="rgba(204, 255, 0,0.5)" /> */}
            </AreaChart>
        </div>
    )
}
