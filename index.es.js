import { useRef, useEffect, createElement } from 'react';
import { select, scaleLinear, scaleBand, max, stack, arc, selectAll } from 'd3';
import styled from 'styled-components';
import { debounce } from 'lodash';

function _taggedTemplateLiteral(strings, raw) {
  if (!raw) {
    raw = strings.slice(0);
  }

  return Object.freeze(Object.defineProperties(strings, {
    raw: {
      value: Object.freeze(raw)
    }
  }));
}

var data = [{
  subject: "Language Arts",
  coreCompetency: "Reading/Verbal Comprehension",
  survey: 1.2,
  color: "#8e44ad"
}, {
  subject: "Language Arts",
  coreCompetency: "Writing",
  survey: 2.3,
  color: "#7e44ad"
}, {
  subject: "Language Arts",
  coreCompetency: "Textual Analysis",
  survey: 2.4,
  color: "#6e44ad"
}, {
  subject: "Language Arts",
  coreCompetency: "Literary Knowledge",
  survey: 3.1,
  color: "#5e44ad"
}, {
  subject: "Language Arts",
  coreCompetency: "Foreign Language",
  survey: 1.7,
  color: "#4e44ad"
}, {
  subject: "Math",
  coreCompetency: "Arithmetic/ Algebra",
  survey: 4.2,
  color: "#c0392b"
}, {
  subject: "Math",
  coreCompetency: "Geometry/Trig/Spatial Orientation",
  survey: 5.6,
  color: "#c0492b"
}, {
  subject: "Math",
  coreCompetency: "Probability/Statistics/Modeling",
  survey: 1.6,
  color: "#c0592b"
}, {
  subject: "Math",
  coreCompetency: "Calculus/Other advanced math",
  survey: 2.3,
  color: "#c0692b"
}, {
  subject: "Math",
  coreCompetency: "Graphical Literacy",
  survey: 5.6,
  color: "#c0792b"
}, {
  subject: "Science",
  coreCompetency: "Application of Scientific method or deductive reasoning",
  survey: 5.8,
  color: "#27ae60"
}, {
  subject: "Science",
  coreCompetency: "Experimental/Prototype design and revision",
  survey: 5.2,
  color: "#27ae70"
}, {
  subject: "Science",
  coreCompetency: "Synthesis or inference based on multiple lines of evidence",
  survey: 5.1,
  color: "#27ae80"
}, {
  subject: "Science",
  coreCompetency: "Disciplinary Knowledge (Physics, biology, chemistry, medicine, engineering, etc.)",
  survey: 5.7,
  color: "#27ae90"
}, {
  subject: "Science",
  coreCompetency: "Data management/visualization",
  survey: 4.2,
  color: "#27aea0"
}, {
  subject: "Social Studies",
  coreCompetency: "Constructing questions, gathering and synthesizing sources of cultural, geographical, and historical knowledge",
  survey: 1.3,
  color: "#2c3e50"
}, {
  subject: "Social Studies",
  coreCompetency: "Understanding of government, law, & politics",
  survey: 4.9,
  color: "#2c4e50"
}, {
  subject: "Social Studies",
  coreCompetency: "World history and geography: temporal and spatial views of the world, human-environmental interactions, (changing) spatial patterns and movement",
  survey: 1.2,
  color: "#2c5e50"
}, {
  subject: "Social Studies",
  coreCompetency: "Higher-level analysis: Evaluating sources of cultural and historical knowledge; developing claims from evidence",
  survey: 2.3,
  color: "#2c6e50"
}, {
  subject: "Social Studies",
  coreCompetency: "Communicating and critiquing historical, political, economic, or cultural viewpoints",
  survey: 1.1,
  color: "#2c7e50"
}, {
  subject: "21st Century Skills",
  coreCompetency: "Collaboration",
  survey: 5.6,
  color: "#0984e3"
}, {
  subject: "21st Century Skills",
  coreCompetency: "Communication",
  survey: 5.1,
  color: "#0974e3"
}, {
  subject: "21st Century Skills",
  coreCompetency: "Creativity",
  survey: 5.3,
  color: "#0964e3"
}, {
  subject: "21st Century Skills",
  coreCompetency: "Critical Thinking",
  survey: 4.5,
  color: "#0954e3"
}, {
  subject: "21st Century Skills",
  coreCompetency: "Tech Savvy (coding, touch-typing, troubleshooting abilities, software competency)",
  survey: 5.9,
  color: "#0944e3"
}, {
  subject: "Arts, Crafts & Labor",
  coreCompetency: "Physical Effort",
  survey: 1.9,
  color: "#e84393"
}, {
  subject: "Arts, Crafts & Labor",
  coreCompetency: "Mental Effort",
  survey: 5.8,
  color: "#d84393"
}, {
  subject: "Arts, Crafts & Labor",
  coreCompetency: "Emotional Effort",
  survey: 2.1,
  color: "#c84393"
}, {
  subject: "Arts, Crafts & Labor",
  coreCompetency: "Specialized art or craft knowledge (sketching, painting, carpentry, hair cutting, welding, etc)",
  survey: 1.9,
  color: "#b84393"
}, {
  subject: "Arts, Crafts & Labor",
  coreCompetency: "Appreciation of or critique of art/craft/design",
  survey: 1.7,
  color: "#a84393"
}];
var angles = data.map(function (d) {
  return d.coreCompetency;
});
var maxData = data.reduce(function (pre, cur) {
  return pre.survey > cur.survey ? pre : cur;
});
var DefaultProps = {
  width: 600,
  height: 500,
  dataMax: maxData.survey,
  data: data,
  columns: ["Language Arts", "Math", "Science", "Social Studies", "21st Century Skills", "Arts, Crafts & Labor"],
  columnsColor: ["#8e44ad", "#c0392b", "#27ae60", "#2c3e50", "#0984e3", "#e84393"],
  angles: angles,
  dataKeys: ["survey"],
  mouseOverColor: "#1abc9c",
  mouseOverTitleColor: "#e67e22",
  mouseOverSurveyColor: "#e74c3c"
};

function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n  .axis {\n    position: absolute;\n    top: 0;\n    left: 0;\n    stroke: gray;\n  }\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  position: relative;\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}
function Chart(props) {
  var width = props.width,
      height = props.height,
      data = props.data,
      columns = props.columns,
      z = props.columnsColor,
      angles = props.angles,
      dataMax = props.dataMax,
      dataKeys = props.dataKeys,
      mouseOverColor = props.mouseOverColor,
      mouseOverTitleColor = props.mouseOverTitleColor,
      mouseOverSurveyColor = props.mouseOverSurveyColor;
  var containerRef = useRef(null);
  var axisContainerRef = useRef(null);
  useEffect(function () {
    var svg = select(containerRef.current);
    svg.selectAll("*").remove();
    var margin = {
      top: 80,
      right: 100,
      bottom: 80,
      left: 40
    };
    var innerRadius = 20;
    var chartWidth = width - margin.left - margin.right;
    var chartHeight = height - margin.top - margin.bottom;
    var outerRadius = innerRadius + Math.min(chartWidth, chartHeight) / 2;
    var g = svg.append("g").attr("transform", "translate(".concat(width / 2, ", ").concat(height / 2, ")"));
    var angle = scaleLinear().range([0, 2 * Math.PI]);
    var radius = scaleLinear().range([innerRadius, outerRadius]);
    var x = scaleBand().range([0, 2 * Math.PI]).align(0);
    var xGroup = scaleBand().range([0, 2 * Math.PI]).align(0);
    var y = scaleLinear().range([innerRadius, outerRadius]);
    x.domain(angles.map(function (d) {
      return d;
    }));
    xGroup.domain(columns.map(function (d) {
      return d;
    }));
    y.domain([0, max(data, function (_ref) {
      var total = _ref.total;
      return total;
    }) > dataMax ? max(data, function (_ref2) {
      var total = _ref2.total;
      return total;
    }) : dataMax]);
    angle.domain([0, max(data, function (_, i) {
      return i + 1;
    })]);
    radius.domain([0, max(data, function () {
      return 0;
    })]);
    var angleOffset = -360.0 / data.length / 2.0;
    var stackGen = stack().keys(dataKeys);
    var arcVal = arc().innerRadius(function (d) {
      return Number(y(d[0]));
    }).outerRadius(function (d) {
      return Number(y(d[1]));
    }).startAngle(function (_d, i) {
      return Number(x(angles[i]));
    }).endAngle(function (_d, i) {
      return Number(x(angles[i])) + x.bandwidth();
    }).padAngle(0.0).padRadius(innerRadius);
    var arcParent = g.append("g").selectAll("g").data(stackGen(data)).enter();
    var arc$1 = arcParent.selectAll("path").data(function (d) {
      return d;
    }).enter().append("path");
    arc$1 // @ts-ignore
    .attr("d", arcVal).attr("transform", "rotate(".concat(angleOffset, ")")).attr("fill", function (d) {
      return d.data.color;
    }).attr("class", function (_d, i) {
      return "arc_".concat(i);
    }).on("mouseover", debounce(function (_event, d) {
      var classname = this.getAttribute("class") || "arc_1";
      var i = classname.split("_")[1];
      this.setAttribute("fill", mouseOverColor);
      this.setAttribute("style", "transition: fill 0.5s; cursor: pointer;");
      var bbox = this.getBBox();
      arcParent.append("text").attr("class", "tooltip_".concat(i)).attr("x", bbox.x + bbox.width / 2).attr("dy", bbox.y + bbox.height / 2).attr("text-anchor", "middle").style("font-size", 12).style("fill", mouseOverTitleColor).style("opacity", 1).style("transition", "opacity 0.2s").attr("font-weight", 600).text("".concat(d.data.coreCompetency));
      arcParent.append("text").attr("class", "tooltip_".concat(i)).attr("x", bbox.x + bbox.width / 2).attr("dy", bbox.y + bbox.height / 2 + 14).attr("text-anchor", "middle").style("font-size", 14).style("fill", mouseOverSurveyColor).style("opacity", 1).style("transition", "opacity 0.2s").attr("font-weight", 800).text("".concat(d.data.survey));
    }, 0)).on("mouseout", debounce(function (_event, d) {
      var classname = this.getAttribute("class") || "arc_1";
      var i = classname.split("_")[1];
      this.setAttribute("fill", String(d.data.color) || "#ffffff"); // this.setAttribute("style", "opacity: 0");

      selectAll(".tooltip_".concat(i)).remove();
    }, 0));
    var label = g.append("g").selectAll("g").data(columns).enter().append("g").attr("text-anchor", "middle").attr("transform", function (d) {
      if (typeof d === "undefined") return null;
      return "rotate(".concat((Number(xGroup(d)) + xGroup.bandwidth() / 2) * 180 / Math.PI - (90 - angleOffset), ")translate(").concat(outerRadius, ",0)");
    });
    label.append("text").attr("transform", "rotate(90)translate(0,-9)").text(function (_d, i) {
      return columns[i];
    }).style("font-size", 14);
    var yAxis = g.append("g").attr("text-anchor", "middle");
    var yTick = yAxis.selectAll("g").data(y.ticks(5).slice(1)).enter().append("g");
    yTick.append("circle").attr("fill", "none").attr("stroke", "gray").attr("stroke-dasharray", "4,4") // @ts-ignore
    .attr("r", y);
    yTick.append("text") // @ts-ignore
    .attr("y", function (d) {
      return -y(d);
    }).attr("dy", "-0.35em").attr("x", function () {
      return -10;
    }).text(y.tickFormat(5, "s")).style("font-size", 14);
    var legend = g.append("g").selectAll("g").data(columns).enter().append("g").attr("transform", function (_d, i) {
      return "translate(".concat(outerRadius + 0, ",").concat(-outerRadius + 40 + (i - (columns.length - 1) / 2) * 20, ")");
    });
    legend.append("rect").attr("width", 18).attr("height", 18).attr("fill", function (_d, i) {
      return z[i];
    });
    legend.append("text").attr("x", 24).attr("y", 9).attr("dy", "0.35em").text(function (d) {
      return d;
    }).style("font-size", 12);
    g.exit().remove();
  });
  return /*#__PURE__*/createElement(AxisContainer, {
    ref: axisContainerRef,
    role: "main"
  }, /*#__PURE__*/createElement(Axis, {
    className: "axis",
    width: width,
    height: height,
    ref: containerRef,
    role: "document"
  }));
}
var AxisContainer = styled.div(_templateObject());
var Axis = styled.svg(_templateObject2());
var data$1 = DefaultProps.data,
    angles$1 = DefaultProps.angles,
    columns = DefaultProps.columns,
    columnsColor = DefaultProps.columnsColor,
    width = DefaultProps.width,
    height = DefaultProps.height,
    dataMax = DefaultProps.dataMax,
    dataKeys = DefaultProps.dataKeys,
    mouseOverColor = DefaultProps.mouseOverColor,
    mouseOverTitleColor = DefaultProps.mouseOverTitleColor,
    mouseOverSurveyColor = DefaultProps.mouseOverSurveyColor;
Chart.defaultProps = {
  data: data$1,
  dataMax: dataMax,
  angles: angles$1,
  columns: columns,
  columnsColor: columnsColor,
  width: width,
  height: height,
  dataKeys: dataKeys,
  mouseOverColor: mouseOverColor,
  mouseOverTitleColor: mouseOverTitleColor,
  mouseOverSurveyColor: mouseOverSurveyColor
};

/* eslint-disable import/no-named-as-default */

export default Chart;
export { Axis, AxisContainer, Chart };
//# sourceMappingURL=index.es.js.map
