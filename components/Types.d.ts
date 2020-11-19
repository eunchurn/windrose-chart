export interface DataType {
    [key: string]: number | null;
}
interface State {
    width: number;
    height: number;
}
export interface PropType extends State {
    /**
     * Professionals respond to survey of how much they use a K-12 core competancy in each subject
     */
    data: DataType[];
    /**
     * Subjects
     */
    columns: string[];
    /**
     * Subjects colors
     */
    columnsColor: string[];
    /**
     * All core competency
     */
    angles: string[];
    /**
     * Max score
     */
    dataMax: number;
    /**
     * Target data keys
     */
    dataKeys: string[];
    /**
     * Mouse over Path color
     */
    mouseOverColor: string;
    /**
     * Mouse over competency text color
     */
    mouseOverTitleColor: string;
    /**
     * Mouseover survey score text color
     */
    mouseOverSurveyColor: string;
}
export {};
