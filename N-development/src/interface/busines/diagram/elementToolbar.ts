import React from "react";
import {IBaseDiagramElement} from "./diagramElement";
import {EElementShow} from "../../../component/DiagramEditor/toolbar";

export interface IDiagramElementPreviewToolbarElement extends IBaseDiagramElement {
    toolbarName: string;
    Component: React.FC;
}

export type DiagramElementPreviewToolbar = {
    [key in EElementShow]: IDiagramElementPreviewToolbarElement[]
}
