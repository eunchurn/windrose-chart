var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import React from "react";
import { Chart } from "./Chart";
var Template = function (args) { return React.createElement(Chart, __assign({}, args)); };
export var FirstStory = Template.bind({});
FirstStory.args = {
    name: "Chart",
};
export default {
    component: Chart,
    title: "Components/Wind Rose Chart",
};
//# sourceMappingURL=Chart.stories.js.map