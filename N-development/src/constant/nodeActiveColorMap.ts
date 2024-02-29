import {EDiagramNode} from "../interface";
import {EColor} from "./color";

export const nodeActiveColorMap: {
    [key in EDiagramNode]?: string
} = {
    [EDiagramNode.DatasetDatafield]: EColor.lightBlue,
    [EDiagramNode.Data]: EColor.green2,
    [EDiagramNode.Origin]: EColor.orange2,
    [EDiagramNode.Sink]: EColor.blue2,
    [EDiagramNode.Formula]: EColor.purple2,
    [EDiagramNode.Transfer]: EColor.yellow,
    [EDiagramNode.EventTrigger]: EColor.red2,
    [EDiagramNode.EventListener]: EColor.purple3,
    [EDiagramNode.MicroLoop]: EColor.green3,
    [EDiagramNode.WhileLoop]: EColor.blue3,
    [EDiagramNode.Label]: EColor.lightBrown,
}