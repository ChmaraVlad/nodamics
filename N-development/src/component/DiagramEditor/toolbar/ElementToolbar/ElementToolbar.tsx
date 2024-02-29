import React from 'react';
import {DiagramElementPreviewToolbar, EDiagramNode, EElementType} from "../../../../interface";
import {Box} from "@mui/material";
import {EColor} from "../../../../constant";
import {ElementToolbarSection} from "./ElementToolbarSection";
import {DataNodeIcon} from "../../../../assets/svg/DataNodeIcon";
import {DatasetIcon} from "../../../../assets/svg/DatasetIcon";
import {OriginIcon} from "../../../../assets/svg/OriginIcon";
import {SinkIcon} from "../../../../assets/svg/SinkIcon";
import {FormulaNodeIcon} from "../../../../assets/svg/FormulaNodeIcon";
import {TransferNodeIcon} from "../../../../assets/svg/TransferNodeIcon";
import {LabelNodeIcon} from "../../../../assets/svg/LabelNodeIcon";
import {MicroLoopNodeIcon} from "../../../../assets/svg/MicroLoopNodeIcon";
import {WhileLoopNodeIcon} from "../../../../assets/svg/WhileLoopNodeIcon";
import {TriggerNodeIcon} from "../../../../assets/svg/TriggerNodeIcon";
import {ListenerNodeIcon} from "../../../../assets/svg/ListenerNodeIcon";


export enum EElementShow {
    Node = 'Node',
    // Connection = 'Connection',
    Event = 'Event',
    Logic = 'Logic',
}

const mockDiagramNodes: DiagramElementPreviewToolbar = {
    [EElementShow.Node]: [
        {
            elementType: EElementType.Node,
            type: EDiagramNode.DatasetDatafield,
            toolbarName: 'Dataset',
            Component: DatasetIcon,
        },
        {
            elementType: EElementType.Node,
            type: EDiagramNode.Data,
            toolbarName: 'Data',
            Component:DataNodeIcon,
        },
        {
            elementType: EElementType.Node,
            type: EDiagramNode.Origin,
            toolbarName: 'Origin',
            Component: OriginIcon,
        }, {
            elementType: EElementType.Node,
            type: EDiagramNode.Sink,
            toolbarName: 'Sink',
            Component: SinkIcon,
        }, {
            elementType: EElementType.Node,
            type: EDiagramNode.Formula,
            toolbarName: 'Formula',
            Component: FormulaNodeIcon,
        }, {
            elementType: EElementType.Node,
            type: EDiagramNode.Transfer,
            toolbarName: 'Transfer',
            Component: TransferNodeIcon,
        }, {
            elementType: EElementType.Node,
            type: EDiagramNode.Label,
            toolbarName: 'Label',
            Component: LabelNodeIcon,
        }
    ],
    [EElementShow.Logic]: [{
        elementType: EElementType.Node,
        type: EDiagramNode.MicroLoop,
        toolbarName: 'Micro',
        Component: MicroLoopNodeIcon,
    }, {
        elementType: EElementType.Node,
        type: EDiagramNode.WhileLoop,
        toolbarName: 'While',
        Component: WhileLoopNodeIcon,
    }],
    [EElementShow.Event]: [{
        elementType: EElementType.Node,
        type: EDiagramNode.EventTrigger,
        toolbarName: 'Trigger',
        Component: TriggerNodeIcon,
    }, {
        elementType: EElementType.Node,
        type: EDiagramNode.EventListener,
        toolbarName: 'Listener',
        Component: ListenerNodeIcon,
    }],


}

export const ElementToolbar = () => {
    const formatted = Object.entries(mockDiagramNodes);

    return (
        <>
            <Box
            className='element-toolbar__wrapper'
            sx={{
                pointerEvents: 'auto',
                display: 'flex',
                gap: '12px',
                borderRadius: 2,
                backgroundColor: EColor.grey11,
                px: '8px',
                py: '8px',
            }}>
                {formatted.map(([sectionName, elements], index) => {
                    const isLast = index === formatted.length - 1;
                    return (
                        <React.Fragment key={sectionName}>
                            <ElementToolbarSection
                                section={{
                                    elements,
                                    name: sectionName
                                }}
                            />
                            {!isLast && <Box sx={{
                                width: '1px',
                                height: 40,
                                backgroundColor: EColor.grey6,
                                alignSelf: 'center',
                            }}/>}
                        </React.Fragment>
                    )
                })}
            </Box>
        </>
    );
};
