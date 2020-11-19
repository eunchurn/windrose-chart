/// <reference types="react" />
import { PropType } from "./Types";
export declare function Chart(props: PropType): JSX.Element;
export declare namespace Chart {
    var defaultProps: {
        data: {
            subject: string;
            coreCompetency: string;
            survey: number;
            color: string;
        }[];
        dataMax: number;
        angles: string[];
        columns: string[];
        columnsColor: string[];
        width: number;
        height: number;
        dataKeys: string[];
        mouseOverColor: string;
        mouseOverTitleColor: string;
        mouseOverSurveyColor: string;
    };
}
export declare const AxisContainer: import("styled-components").StyledComponent<"div", any, {}, never>;
export declare const Axis: import("styled-components").StyledComponent<"svg", any, {}, never>;
export default Chart;
