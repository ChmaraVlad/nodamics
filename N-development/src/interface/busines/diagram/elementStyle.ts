import {IDiagramTextStyle} from "./font";

export interface IDiagramNodeStyle {
    borderWidth: number;
    borderColor?: string;
    borderActiveColor?: string;
    fillColor?: string;
    textStyles: IDiagramTextStyle,
}
