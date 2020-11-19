/* eslint-disable react/no-this-in-sfc */
/* eslint-disable func-names */
import * as React from "react";
import * as d3 from "d3";
import styled from "styled-components";
import { debounce } from "lodash";
import { DefaultProps } from "./DefaultProps";
import { PropType, DataType } from "./Types";

export function Chart(props: PropType): JSX.Element {
  const {
    width,
    height,
    data,
    columns,
    columnsColor: z,
    angles,
    dataMax,
    dataKeys,
    mouseOverColor,
    mouseOverTitleColor,
    mouseOverSurveyColor,
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
    const y = d3.scaleLinear().range([innerRadius, outerRadius]);
    x.domain(angles.map((d) => d));
    xGroup.domain(columns.map((d) => d));
    y.domain([
      0,
      (d3.max(data, ({ total }) => total) as number) > dataMax
        ? (d3.max(data, ({ total }) => total) as number)
        : dataMax,
    ]);
    angle.domain([
      0,
      d3.max(data, (_, i): number => i + 1) as number,
    ]);
    radius.domain([0, d3.max(data, () => 0) as number]);
    const angleOffset = -360.0 / data.length / 2.0;
    const stackGen: d3.Stack<any, DataType, string> = d3
      .stack()
      .keys(dataKeys);
    const arcVal: d3.Arc<SVGPathElement, d3.DefaultArcObject> = d3
      .arc()
      .innerRadius((d) => Number(y(d[0])))
      .outerRadius((d) => Number(y(d[1])))
      .startAngle((_d, i) => Number(x(angles[i])))
      .endAngle((_d, i) => Number(x(angles[i])) + x.bandwidth())
      .padAngle(0.0)
      .padRadius(innerRadius);
    const arcParent = g
      .append("g")
      .selectAll("g")
      .data(stackGen(data))
      .enter();
    const arc: d3.Selection<
      SVGPathElement,
      d3.SeriesPoint<DataType>,
      d3.EnterElement,
      d3.Series<DataType, string>
    > = arcParent
      .selectAll<SVGPathElement, d3.SeriesPoint<DataType>>("path")
      .data((d) => d)
      .enter()
      .append("path");
    arc
      // @ts-ignore
      .attr("d", arcVal)
      .attr("transform", `rotate(${angleOffset})`)
      .attr("fill", (d: d3.SeriesPoint<DataType>) => d.data.color)
      .attr(
        "class",
        (_d: d3.SeriesPoint<DataType>, i: number) => `arc_${i}`
      )
      .on(
        "mouseover",
        debounce(function (
          this: SVGPathElement,
          _event: any,
          d: d3.SeriesPoint<DataType>
        ) {
          const classname = this.getAttribute("class") || "arc_1";
          const i = classname.split("_")[1];
          this.setAttribute("fill", mouseOverColor);
          this.setAttribute(
            "style",
            "transition: fill 0.5s; cursor: pointer;"
          );
          const bbox = this.getBBox();
          arcParent
            .append("text")
            .attr("class", `tooltip_${i}`)
            .attr("x", bbox.x + bbox.width / 2)
            .attr("dy", bbox.y + bbox.height / 2)
            .attr("text-anchor", "middle")
            .style("font-size", 12)
            .style("fill", mouseOverTitleColor)
            .style("opacity", 1)
            .style("transition", "opacity 0.2s")
            .attr("font-weight", 600)
            .text(`${d.data.coreCompetency}`);
          arcParent
            .append("text")
            .attr("class", `tooltip_${i}`)
            .attr("x", bbox.x + bbox.width / 2)
            .attr("dy", bbox.y + bbox.height / 2 + 14)
            .attr("text-anchor", "middle")
            .style("font-size", 14)
            .style("fill", mouseOverSurveyColor)
            .style("opacity", 1)
            .style("transition", "opacity 0.2s")
            .attr("font-weight", 800)
            .text(`${d.data.survey}`);
        },
        0)
      )
      .on(
        "mouseout",
        debounce(function (
          this: SVGPathElement,
          _event: any,
          d: d3.SeriesPoint<DataType>
        ) {
          const classname = this.getAttribute("class") || "arc_1";
          const i = classname.split("_")[1];
          this.setAttribute(
            "fill",
            String(d.data!.color) || "#ffffff"
          );
          // this.setAttribute("style", "opacity: 0");
          d3.selectAll(`.tooltip_${i}`).remove();
        },
        0)
      );

    const label = g
      .append("g")
      .selectAll("g")
      .data(columns)
      .enter()
      .append("g")
      .attr("text-anchor", "middle")
      .attr("transform", (d) => {
        if (typeof d === "undefined") return null;
        return `rotate(${
          ((Number(xGroup(d)) + xGroup.bandwidth() / 2) * 180) /
            Math.PI -
          (90 - angleOffset)
        })translate(${outerRadius},0)`;
      });
    label
      .append("text")
      .attr("transform", "rotate(90)translate(0,-9)")
      .text((_d, i) => columns[i])
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
      // @ts-ignore
      .attr("r", y);
    yTick
      .append("text")
      // @ts-ignore
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
      .attr("fill", (_d, i) => z[i]);
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

const {
  data,
  angles,
  columns,
  columnsColor,
  width,
  height,
  dataMax,
  dataKeys,
  mouseOverColor,
  mouseOverTitleColor,
  mouseOverSurveyColor,
} = DefaultProps;

Chart.defaultProps = {
  data,
  dataMax,
  angles,
  columns,
  columnsColor,
  width,
  height,
  dataKeys,
  mouseOverColor,
  mouseOverTitleColor,
  mouseOverSurveyColor,
};

export default Chart;
