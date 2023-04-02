import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";


export default function SimpleLineChart(props) {
  return (
    <LineChart
      width={750}
      height={400}
      data={props.data}
      margin={{
        top: 20,
        right: 50,
        left: 0,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line
        type="monotone"
        dataKey="profit"
        stroke="#8884d8"
        activeDot={{ r: 8 }}
      />
    </LineChart>
  );
}
