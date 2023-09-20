import React from "react";
import ScatterPlot from "./ScatterPlot";
import StackedBarChart from "./StackedBar";

export default function Layout1({ data }) {
  return (
    <div>
      <ScatterPlot data={data} />
      <StackedBarChart data={data} />
    </div>
  );
}
