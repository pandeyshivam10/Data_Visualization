import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const BarChartRelevance = ({ data }) => {
  const svgRef = useRef();

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    const margin = { top: 20, right: 30, bottom: 40, left: 60 }; // Adjust margin as needed
    const width = 600 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    svg.selectAll('*').remove();

    const x = d3.scaleBand().domain(data.map(d => d.Country)).range([margin.left, width + margin.left]).padding(0.2);
    const y = d3.scaleLinear().domain([0, d3.max(data, d => d.Relevance)]).nice().range([height, 0]);

    const xAxis = d3.axisBottom(x);
    const yAxis = d3.axisLeft(y);

    // Append the X and Y axis labels
    svg.append('g').attr('transform', `translate(0,${height + margin.top})`).call(xAxis);
    svg.append('g').attr('transform', `translate(${margin.left}, 0)`).call(yAxis);

    // Add a title to the chart
    svg
      .append('text')
      .attr('x', width / 2 + margin.left)
      .attr('y', margin.top / 2)
      .attr('text-anchor', 'middle')
      .style('font-size', '18px')
      .text('Relevance by Country');

    svg
      .selectAll('.bar')
      .data(data)
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('x', d => x(d.Country))
      .attr('y', d => y(d.Relevance) + margin.top)
      .attr('width', x.bandwidth())
      .attr('height', d => height - y(d.Relevance))
      .attr('fill', 'steelblue');
  }, [data]);

  return (
    <div className="chart-container">
      <svg ref={svgRef} width={600} height={400} />
    </div>
  );
};

export default BarChartRelevance;
