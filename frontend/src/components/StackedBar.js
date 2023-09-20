import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const StackedBarChart = ({ data }) => {
  const svgRef = useRef();

  useEffect(() => {
    if (!data) {
      return;
    }
    d3.select(svgRef.current).selectAll('*').remove();

    const sectors = [...new Set(data.map((d) => d.sector))];
    const years = [...new Set(data.map((d) => d.year))];
    const countBySectorAndYear = {};

    data.forEach((d) => {
      if (!countBySectorAndYear[d.sector]) {
        countBySectorAndYear[d.sector] = {};
      }
      countBySectorAndYear[d.sector][d.year] = (countBySectorAndYear[d.sector][d.year] || 0) + 1;
    });

    // Define chart dimensions
    const margin = { top: 20, right: 30, bottom: 70, left: 70 }; // Adjusted margin for labels
    const width = 600 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    // Create SVG container
    const svg = d3
      .select(svgRef.current)
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    const xScale = d3.scaleBand().domain(years).range([0, width]).padding(0.1);
    const yScale = d3.scaleLinear().domain([0, d3.max(Object.values(countBySectorAndYear).map((obj) => d3.max(Object.values(obj))))]).nice().range([height, 0]);
    const color = d3.scaleOrdinal().domain(sectors).range(d3.schemeCategory10);

    svg.append('g').attr('class', 'x-axis').attr('transform', `translate(0,${height})`).call(d3.axisBottom(xScale));
    svg.append('g').attr('class', 'y-axis').call(d3.axisLeft(yScale).ticks(5));

    // Add x-axis label
    svg
      .append('text')
      .attr('class', 'x-axis-label')
      .attr('x', width / 2)
      .attr('y', height + margin.top + 20) 
      .style('text-anchor', 'middle')
      .text('Year');


    svg
    .append('text')
    .attr('class', 'y-axis-label') 
    .attr('transform', 'rotate(-90)')
    .attr('x', -height / 2)
    .attr('y', -margin.left - 10) 
    .style('text-anchor', 'middle')
    .text('Count');
  
  

    svg
      .selectAll('.bar')
      .data(sectors)
      .enter()
      .append('g')
      .attr('class', 'bar')
      .attr('fill', (d) => color(d))
      .selectAll('rect')
      .data((d) => years.map((year) => ({ sector: d, year: year, count: countBySectorAndYear[d][year] || 0 })))
      .enter()
      .append('rect')
      .attr('x', (d) => xScale(d.year))
      .attr('y', (d) => yScale(d.count))
      .attr('height', (d) => yScale(0) - yScale(d.count))
      .attr('width', xScale.bandwidth());

  }, [data]);

  return (
    <div className="stacked-bar-chart  border-2 mt-2 border-indigo-500 p-5">
      <svg ref={svgRef}></svg>
    </div>
  );
};

export default StackedBarChart;
