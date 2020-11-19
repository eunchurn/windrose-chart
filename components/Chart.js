var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
/* eslint-disable react/no-this-in-sfc */
/* eslint-disable func-names */
import * as React from "react";
import * as d3 from "d3";
import styled from "styled-components";
import { debounce } from "lodash";
import { DefaultProps } from "./DefaultProps";
export function Chart(props) {
    var width = props.width, height = props.height, data = props.data, columns = props.columns, z = props.columnsColor, angles = props.angles, dataMax = props.dataMax, dataKeys = props.dataKeys, mouseOverColor = props.mouseOverColor, mouseOverTitleColor = props.mouseOverTitleColor, mouseOverSurveyColor = props.mouseOverSurveyColor;
    var containerRef = React.useRef(null);
    var axisContainerRef = React.useRef(null);
    React.useEffect(function () {
        var svg = d3.select(containerRef.current);
        svg.selectAll("*").remove();
        var margin = { top: 80, right: 100, bottom: 80, left: 40 };
        var innerRadius = 20;
        var chartWidth = width - margin.left - margin.right;
        var chartHeight = height - margin.top - margin.bottom;
        var outerRadius = innerRadius + Math.min(chartWidth, chartHeight) / 2;
        var g = svg
            .append("g")
            .attr("transform", "translate(" + width / 2 + ", " + height / 2 + ")");
        var angle = d3.scaleLinear().range([0, 2 * Math.PI]);
        var radius = d3.scaleLinear().range([innerRadius, outerRadius]);
        var x = d3
            .scaleBand()
            .range([0, 2 * Math.PI])
            .align(0);
        var xGroup = d3
            .scaleBand()
            .range([0, 2 * Math.PI])
            .align(0);
        var y = d3.scaleLinear().range([innerRadius, outerRadius]);
        x.domain(angles.map(function (d) { return d; }));
        xGroup.domain(columns.map(function (d) { return d; }));
        y.domain([
            0,
            d3.max(data, function (_a) {
                var total = _a.total;
                return total;
            }) > dataMax
                ? d3.max(data, function (_a) {
                    var total = _a.total;
                    return total;
                })
                : dataMax,
        ]);
        angle.domain([
            0,
            d3.max(data, function (_, i) { return i + 1; }),
        ]);
        radius.domain([0, d3.max(data, function () { return 0; })]);
        var angleOffset = -360.0 / data.length / 2.0;
        var stackGen = d3
            .stack()
            .keys(dataKeys);
        var arcVal = d3
            .arc()
            .innerRadius(function (d) { return Number(y(d[0])); })
            .outerRadius(function (d) { return Number(y(d[1])); })
            .startAngle(function (_d, i) { return Number(x(angles[i])); })
            .endAngle(function (_d, i) { return Number(x(angles[i])) + x.bandwidth(); })
            .padAngle(0.0)
            .padRadius(innerRadius);
        var arcParent = g
            .append("g")
            .selectAll("g")
            .data(stackGen(data))
            .enter();
        var arc = arcParent
            .selectAll("path")
            .data(function (d) { return d; })
            .enter()
            .append("path");
        arc
            // @ts-ignore
            .attr("d", arcVal)
            .attr("transform", "rotate(" + angleOffset + ")")
            .attr("fill", function (d) { return d.data.color; })
            .attr("class", function (_d, i) { return "arc_" + i; })
            .on("mouseover", debounce(function (_event, d) {
            var classname = this.getAttribute("class") || "arc_1";
            var i = classname.split("_")[1];
            this.setAttribute("fill", mouseOverColor);
            this.setAttribute("style", "transition: fill 0.5s; cursor: pointer;");
            var bbox = this.getBBox();
            arcParent
                .append("text")
                .attr("class", "tooltip_" + i)
                .attr("x", bbox.x + bbox.width / 2)
                .attr("dy", bbox.y + bbox.height / 2)
                .attr("text-anchor", "middle")
                .style("font-size", 12)
                .style("fill", mouseOverTitleColor)
                .style("opacity", 1)
                .style("transition", "opacity 0.2s")
                .attr("font-weight", 600)
                .text("" + d.data.coreCompetency);
            arcParent
                .append("text")
                .attr("class", "tooltip_" + i)
                .attr("x", bbox.x + bbox.width / 2)
                .attr("dy", bbox.y + bbox.height / 2 + 14)
                .attr("text-anchor", "middle")
                .style("font-size", 14)
                .style("fill", mouseOverSurveyColor)
                .style("opacity", 1)
                .style("transition", "opacity 0.2s")
                .attr("font-weight", 800)
                .text("" + d.data.survey);
        }, 0))
            .on("mouseout", debounce(function (_event, d) {
            var classname = this.getAttribute("class") || "arc_1";
            var i = classname.split("_")[1];
            this.setAttribute("fill", String(d.data.color) || "#ffffff");
            // this.setAttribute("style", "opacity: 0");
            d3.selectAll(".tooltip_" + i).remove();
        }, 0));
        var label = g
            .append("g")
            .selectAll("g")
            .data(columns)
            .enter()
            .append("g")
            .attr("text-anchor", "middle")
            .attr("transform", function (d) {
            if (typeof d === "undefined")
                return null;
            return "rotate(" + (((Number(xGroup(d)) + xGroup.bandwidth() / 2) * 180) /
                Math.PI -
                (90 - angleOffset)) + ")translate(" + outerRadius + ",0)";
        });
        label
            .append("text")
            .attr("transform", "rotate(90)translate(0,-9)")
            .text(function (_d, i) { return columns[i]; })
            .style("font-size", 14);
        var yAxis = g.append("g").attr("text-anchor", "middle");
        var yTick = yAxis
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
            .attr("y", function (d) { return -y(d); })
            .attr("dy", "-0.35em")
            .attr("x", function () { return -10; })
            .text(y.tickFormat(5, "s"))
            .style("font-size", 14);
        var legend = g
            .append("g")
            .selectAll("g")
            .data(columns)
            .enter()
            .append("g")
            .attr("transform", function (_d, i) {
            return "translate(" + (outerRadius + 0) + "," + (-outerRadius + 40 + (i - (columns.length - 1) / 2) * 20) + ")";
        });
        legend
            .append("rect")
            .attr("width", 18)
            .attr("height", 18)
            .attr("fill", function (_d, i) { return z[i]; });
        legend
            .append("text")
            .attr("x", 24)
            .attr("y", 9)
            .attr("dy", "0.35em")
            .text(function (d) { return d; })
            .style("font-size", 12);
        g.exit().remove();
    });
    return (React.createElement(AxisContainer, { ref: axisContainerRef, role: "main" },
        React.createElement(Axis, { className: "axis", width: width, height: height, ref: containerRef, role: "document" })));
}
export var AxisContainer = styled.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  position: relative;\n"], ["\n  position: relative;\n"])));
export var Axis = styled.svg(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  .axis {\n    position: absolute;\n    top: 0;\n    left: 0;\n    stroke: gray;\n  }\n"], ["\n  .axis {\n    position: absolute;\n    top: 0;\n    left: 0;\n    stroke: gray;\n  }\n"])));
var data = DefaultProps.data, angles = DefaultProps.angles, columns = DefaultProps.columns, columnsColor = DefaultProps.columnsColor, width = DefaultProps.width, height = DefaultProps.height, dataMax = DefaultProps.dataMax, dataKeys = DefaultProps.dataKeys, mouseOverColor = DefaultProps.mouseOverColor, mouseOverTitleColor = DefaultProps.mouseOverTitleColor, mouseOverSurveyColor = DefaultProps.mouseOverSurveyColor;
Chart.defaultProps = {
    data: data,
    dataMax: dataMax,
    angles: angles,
    columns: columns,
    columnsColor: columnsColor,
    width: width,
    height: height,
    dataKeys: dataKeys,
    mouseOverColor: mouseOverColor,
    mouseOverTitleColor: mouseOverTitleColor,
    mouseOverSurveyColor: mouseOverSurveyColor,
};
export default Chart;
var templateObject_1, templateObject_2;
//# sourceMappingURL=Chart.js.map