import React from "react";
import { CartesianGrid, Label, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { TActiveCartProduct } from "../../types";

type Props = {
  data: TActiveCartProduct[];
};

function DoubleLineCartChart({ data }: Props) {
  const tickFormatter = (title: string) => {
    const limit = 10;
    if (title.length < limit) {
      const spaces = limit - title.length;
      return `${title}${" ".repeat(spaces)}`;
    }
    return `${title.substring(0, limit)}...`;
  };

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data} margin={{ top: 10, right: 10, bottom: 50, left: 10 }}>
        <Line type="monotone" dataKey="price" stroke="#8884d8" strokeWidth={2} />
        <Line type="monotone" dataKey="discountedPrice" stroke="#82ca9d" strokeWidth={2} />
        <CartesianGrid stroke="#ccc" />
        <XAxis
          name="Products"
          dataKey="title"
          fontSize={12}
          dy={35}
          padding={{ left: 10, right: 10 }}
          interval={0}
          tickFormatter={tickFormatter}
          angle={90}
        />
        <YAxis>
          <Label value="Price" offset={0} position="insideTopLeft" angle={-90} />
        </YAxis>
        <Legend verticalAlign="top" height={36} />
        <Tooltip />
      </LineChart>
    </ResponsiveContainer>
  );
}

export default DoubleLineCartChart;
