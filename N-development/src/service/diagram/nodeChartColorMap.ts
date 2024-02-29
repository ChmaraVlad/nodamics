import {EDiagramNode} from "../../interface";
import {EColor} from "../../constant";

export const nodeChartColorMap: {
    [key in EDiagramNode]?: string
} = {
    [EDiagramNode.Data]: EColor.green2,
    [EDiagramNode.Sink]: EColor.blue2,
    [EDiagramNode.Formula]: EColor.purple2,
    [EDiagramNode.Transfer]: EColor.yellow,

}