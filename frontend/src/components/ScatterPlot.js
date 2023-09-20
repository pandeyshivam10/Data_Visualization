import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

const ScatterPlot = ({ data }) => {
  const svgRef = useRef();

  useEffect(() => {
    if (!data) {
      return;
    }

    d3.select(svgRef.current).selectAll("*").remove();

    const margin = { top: 20, right: 30, bottom: 60, left: 60 }; // Increased bottom margin for labels
    const width = 600 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    const svg = d3
      .select(svgRef.current)
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const intensityData = data.map((d) => d.intensity);
    const likelihoodData = data.map((d) => d.likelihood);

    const xScale = d3
      .scaleLinear()
      .domain([0, d3.max(intensityData)])
      .nice()
      .range([0, width]);
    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(likelihoodData)])
      .nice()
      .range([height, 0]);

    svg
      .append("g")
      .attr("class", "x-axis")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(xScale).ticks(5));

    svg
      .append("text") // x-axis label
      .attr("class", "axis-label")
      .attr("x", width / 2)
      .attr("y", height + margin.bottom - 10) // Adjust the position as needed
      .style("text-anchor", "middle")
      .text("Intensity"); // Replace with your x-axis label

    svg
      .append("g")
      .attr("class", "y-axis")
      .call(d3.axisLeft(yScale).ticks(5));

    svg
      .append("text") // y-axis label
      .attr("class", "axis-label")
      .attr("x", -height / 2)
      .attr("y", -margin.left + 10) // Adjust the position as needed
      .attr("transform", "rotate(-90)")
      .style("text-anchor", "middle")
      .text("Likelihood"); // Replace with your y-axis label

    svg
      .selectAll("circle")
      .data(data)
      .enter()
      .append("circle")
      .attr("cx", (d) => xScale(d.intensity))
      .attr("cy", (d) => yScale(d.likelihood))
      .attr("r", 6)
      .style("fill", "blue")
      .style("opacity", 0.7)
      .on("mouseover", (event, d) => {
        // Show tooltip on mouseover
        const tooltip = d3.select(".tooltip");
        if (!tooltip.empty()) {
          tooltip.transition().duration(200).style("opacity", 0.9);
          tooltip
            .html(
              `<strong>Intensity:</strong> ${d.intensity}<br/><strong>Likelihood:</strong> ${d.likelihood}<br/><strong>Relevance:</strong> ${d.relevance}`
            )
            .style("left", event.pageX + "px")
            .style("top", event.pageY - 28 + "px");
        }
      })
      .on("mouseout", () => {
        // Hide tooltip on mouseout
        const tooltip = d3.select(".tooltip");
        if (!tooltip.empty()) {
          tooltip.transition().duration(500).style("opacity", 0);
        }
      });

    d3.select(svgRef.current)
      .append("div")
      .attr("class", "tooltip")
      .style("opacity", 0);
  }, [data]);

  return (
    <div className="scatter-plot border-2 mt-2 border-indigo-500 p-5">
      <svg ref={svgRef}></svg>
    </div>
  );
};

export default ScatterPlot;
