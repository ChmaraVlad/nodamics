import React from "react";
import {EDiagramNode} from "../../interface";
import {DataNodeIcon} from "../../assets/svg/DataNodeIcon";
import {DatasetIcon} from "../../assets/svg/DatasetIcon";
import {OriginIcon} from "../../assets/svg/OriginIcon";
import {SinkIcon} from "../../assets/svg/SinkIcon";
import {FormulaNodeIcon} from "../../assets/svg/FormulaNodeIcon";
import {TransferNodeIcon} from "../../assets/svg/TransferNodeIcon";
import {LabelNodeIcon} from "../../assets/svg/LabelNodeIcon";
import {MicroLoopNodeIcon} from "../../assets/svg/MicroLoopNodeIcon";
import {WhileLoopNodeIcon} from "../../assets/svg/WhileLoopNodeIcon";
import {TriggerNodeIcon} from "../../assets/svg/TriggerNodeIcon";
import {ListenerNodeIcon} from "../../assets/svg/ListenerNodeIcon";

export const nodeTypeIconMap: {
    [key in EDiagramNode]: React.FC;
    } = {
    [EDiagramNode.Data]: DataNodeIcon,
    [EDiagramNode.Start]: DataNodeIcon,
    [EDiagramNode.StaticVariable]: DataNodeIcon,
    [EDiagramNode.DatasetDatafield]:  DatasetIcon,
    [EDiagramNode.Origin]: OriginIcon,
    [EDiagramNode.Sink]: SinkIcon,
    [EDiagramNode.Formula]: FormulaNodeIcon,
    [EDiagramNode.Transfer]: TransferNodeIcon,
    [EDiagramNode.Label]: LabelNodeIcon,
    [EDiagramNode.MicroLoop]: MicroLoopNodeIcon,
    [EDiagramNode.WhileLoop]: WhileLoopNodeIcon,
    [EDiagramNode.EventTrigger]: TriggerNodeIcon,
    [EDiagramNode.EventListener]: ListenerNodeIcon,

}