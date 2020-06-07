/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react";
import * as d3 from "d3";
import styled from "styled-components";
import { DefaultProps, PropType, DataType } from "./DefaultProps";

export const AxisContainer = styled.div`
  position: relative;
`;

export const Axis = styled.svg`
  .axis {
    position: absolute;
    top: 0;
    left: 0;
    stroke: gray;
  }
`;

export function Chart(props: PropType): JSX.Element {
  const {
    width,
    height,
    data,
    columns,
    angles,
    dataMax,
    dataKeys,
  } = props;
  const containerRef = React.useRef<SVGSVGElement>(null);
  const axisContainerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const svg = d3.select(containerRef.current);
    svg.selectAll("*").remove();
    const margin = { top: 80, right: 100, bottom: 80, left: 40 };
    const innerRadius = 20;
    const chartWidth = width - margin.left - margin.right;
    const chartHeight = height - margin.top - margin.bottom;
    const outerRadius =
      innerRadius + Math.min(chartWidth, chartHeight) / 2;
    const g = svg
      .append("g")
      .attr("transform", `translate(${width / 2}, ${height / 2})`);
    const angle = d3.scaleLinear().range([0, 2 * Math.PI]);
    const radius = d3.scaleLinear().range([innerRadius, outerRadius]);
    const x = d3
      .scaleBand()
      .range([0, 2 * Math.PI])
      .align(0);
    const xGroup = d3
      .scaleBand()
      .range([0, 2 * Math.PI])
      .align(0);
    const y = d3
      .scaleLinear() // you can try scaleRadial but it scales differently
      .range([innerRadius, outerRadius]);
    const z = d3
      .scaleOrdinal()
      .range([
        "#8e44ad",
        "#4242f4",
        "#42c5f4",
        "#42f4ce",
        "#42f456",
        "#adf442",
        "#f4e242",
        "#f4a142",
        "#f44242",
      ]);
    x.domain(angles.map((d) => d));
    xGroup.domain(columns.map((d) => d));
    y.domain([
      0,
      (d3.max(data, ({ total }) => total) as number) > dataMax
        ? (d3.max(data, ({ total }) => total) as number)
        : dataMax,
    ]);
    z.domain(dataKeys);
    // Extend the domain slightly to match the range of [0, 2π].
    angle.domain([
      0,
      d3.max(data, (_, i): number => i + 1) as number,
    ]);
    radius.domain([0, d3.max(data, () => 0) as number]);
    // radius.domain([]);
    const angleOffset = -360.0 / data.length / 2.0;
    const stackGen: d3.Stack<any, DataType, string> = d3
      .stack()
      .keys(dataKeys);
    const arc = g
      .append("g")
      .selectAll("g")
      .data(stackGen(data))
      .enter()
      .selectAll("path")
      .data((d) => d)
      .enter()
      .append("path");
    const arcVal = d3
      .arc()
      .innerRadius((d) => y(d[0]))
      .outerRadius((d) => y(d[1]))
      .startAngle((_d, i) => x(angles[i]))
      .endAngle((d, i) => x(angles[i]) + x.bandwidth())
      .padAngle(0.0)
      .padRadius(innerRadius);
    arc
      .attr("d", arcVal)
      .attr("transform", `rotate(${angleOffset})`)
      .attr("fill", (d) => d.data.color);
    const label = g
      .append("g")
      .selectAll("g")
      .data(columns)
      .enter()
      .append("g")
      .attr("text-anchor", "middle")
      .attr(
        "transform",
        (d) =>
          `rotate(${
            ((xGroup(d) + xGroup.bandwidth() / 2) * 180) / Math.PI -
            (90 - angleOffset)
          })translate(${outerRadius},0)`
      );
    label
      .append("text")
      // .attr("transform", "rotate(90)translate(0,-9)")
      // eslint-disable-next-line no-confusing-arrow
      .attr("transform", (d) =>
        (xGroup(d) || 0 + xGroup.bandwidth() / 2 + Math.PI / 2) %
        (2 * Math.PI < Math.PI)
          ? "rotate(-90)translate(0,16)"
          : "rotate(90)translate(0,-9)"
      )
      .text((d, i) => columns[i])
      .style("font-size", 14);
    const yAxis = g.append("g").attr("text-anchor", "middle");
    const yTick = yAxis
      .selectAll("g")
      .data(y.ticks(5).slice(1))
      .enter()
      .append("g");
    yTick
      .append("circle")
      .attr("fill", "none")
      .attr("stroke", "gray")
      .attr("stroke-dasharray", "4,4")
      .attr("r", y);
    yTick
      .append("text")
      .attr("y", (d) => -y(d))
      .attr("dy", "-0.35em")
      .attr("x", () => -10)
      .text(y.tickFormat(5, "s"))
      .style("font-size", 14);
    const legend = g
      .append("g")
      .selectAll("g")
      .data(columns)
      .enter()
      .append("g")
      .attr(
        "transform",
        (_d, i) =>
          `translate(${outerRadius + 0},${
            -outerRadius + 40 + (i - (columns.length - 1) / 2) * 20
          })`
      );
    legend
      .append("rect")
      .attr("width", 18)
      .attr("height", 18)
      .attr("fill", z);
    legend
      .append("text")
      .attr("x", 24)
      .attr("y", 9)
      .attr("dy", "0.35em")
      .text((d) => d)
      .style("font-size", 12);
    g.exit().remove();
  });
  return (
    <AxisContainer ref={axisContainerRef} role="main">
      <Axis
        className="axis"
        width={width}
        height={height}
        ref={containerRef}
        role="document"
      />
    </AxisContainer>
  );
}

const {
  data,
  angles,
  columns,
  width,
  height,
  dataMax,
  dataKeys,
} = DefaultProps;

Chart.defaultProps = {
  data,
  dataMax,
  angles,
  columns,
  width,
  height,
  dataKeys,
};
