import React, {useEffect} from 'react';
import {useToggle} from "../../../../../hooks";
import {Box} from "@mui/material";
import {
    EConnection,
    EDiagramNode,
    EElementType,
    IDiagramConnectionData,
    INodeData,
    isNodeAutomatic,
} from "../../../../../interface";
import {ConnectionFormulaParameter} from "../parameter/ConnectionFormulaParameter";
import {NodeTriggerModeParameter} from "../parameter/NodeTriggerModeParameter";
import {NodeActionParameter} from "../parameter/NodeActionParameter";
import {ConnectionTypeParameter} from "../parameter/ConnectionTypeParameter";
import {NodeTagParameter} from "../parameter/NodeTagParameter";
import {ElementNameParameter} from "../parameter/ElementNameParameter";
import {ConnectionVariableParameter} from "../parameter/ConnectionVariableParameter";
import {
    DataFieldParameter,
    DatasetParameter,
    DatasetReadOnly,
    ForLoopParameterContainer,
    NodeConnectedNodesParameter,
    NodeFormulaParameterContainer
} from "../parameter";
import {NodeDataParametersContainer} from "../parameter/data/NodeDataParametersContainer";
import {GeneralLoopChildrenNodesParameter} from "../parameter/generalLoop";
import {ChainConnectionParametersContainer} from "../parameter/chainConnection/ChainConnectionParametersContainer";
import {NodeEventTriggerParametersContainer} from "../parameter/eventTrigger";
import {NodeEventListenerParametersContainer} from "../parameter/eventListener";
import {IsNodeAutomaticProperty} from "../parameter/generic/IsNodeAutomaticProperty";
import {NodeLayerParameter} from "../parameter/generic";
import {NodeTransferParametersContainer} from "../parameter/transfer";
import {ContentSeparator} from "../styled";


export const PropertiesSection: React.FC<{
    selectedElementData: INodeData | IDiagramConnectionData
}> = ({selectedElementData}) => {
    const accordionController = useToggle()

    useEffect(() => {
        accordionController.open()
    }, [selectedElementData])

    return (

        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
        }}
        >
            <ElementNameParameter elementData={selectedElementData}/>
            {selectedElementData.elementType === EElementType.Node
                && <NodeTagParameter nodeData={selectedElementData}/>}
            {selectedElementData.elementType === EElementType.Node
                && <NodeLayerParameter nodeData={selectedElementData}/>}

            {selectedElementData.elementType === EElementType.Node &&
                selectedElementData.type === EDiagramNode.Data &&
                <NodeDataParametersContainer nodeData={selectedElementData}/>}

            {selectedElementData.elementType === EElementType.Node && (selectedElementData.type !== EDiagramNode.Label && selectedElementData.type !== EDiagramNode.WhileLoop) &&
                <ContentSeparator sx={{my: '8px'}}/>}
            {selectedElementData.type === EConnection.ChainConnection &&
                <ChainConnectionParametersContainer edgeData={selectedElementData}/>}
            {selectedElementData.type === EDiagramNode.Formula
                && <NodeFormulaParameterContainer nodeData={selectedElementData}/>}
            {selectedElementData.type === EDiagramNode.EventTrigger
                && <NodeEventTriggerParametersContainer nodeData={selectedElementData}/>}
            {selectedElementData.type === EDiagramNode.EventListener
                && <NodeEventListenerParametersContainer nodeData={selectedElementData}/>}
            {selectedElementData.type === EDiagramNode.Transfer
                && <NodeTransferParametersContainer nodeData={selectedElementData}/>}

            {'trigger' in selectedElementData && <NodeTriggerModeParameter nodeData={selectedElementData}/>}
            {selectedElementData.type === EDiagramNode.MicroLoop
                && <ForLoopParameterContainer nodeData={selectedElementData}/>}
            {'actionMode' in selectedElementData && <NodeActionParameter node={selectedElementData}/>}
            {selectedElementData.elementType === EElementType.Node
                && selectedElementData.type === EDiagramNode.DatasetDatafield
                && <DatasetParameter nodeData={selectedElementData}/>}
            {selectedElementData.elementType === EElementType.Node
                && selectedElementData.type === EDiagramNode.DatasetDatafield
                && <DataFieldParameter nodeData={selectedElementData}/>}
            {selectedElementData.elementType === EElementType.Node
                && selectedElementData.type === EDiagramNode.DatasetDatafield
                && <DatasetReadOnly nodeData={selectedElementData}/>}
            {selectedElementData?.type === EConnection.DataConnection &&
                <ConnectionFormulaParameter connection={selectedElementData}/>}
            {selectedElementData.elementType === EElementType.Connection
                &&
                <ConnectionTypeParameter selectedElementData={selectedElementData as IDiagramConnectionData}/>}
            {selectedElementData?.type === EConnection.LogicConnection &&
                <ConnectionVariableParameter selectedElementData={selectedElementData}/>}
            {isNodeAutomatic(selectedElementData) && <IsNodeAutomaticProperty nodeData={selectedElementData}/>}
            <ContentSeparator sx={{my: '8px'}}/>
            {selectedElementData.elementType === EElementType.Node && selectedElementData.type !== EDiagramNode.Label
                && <NodeConnectedNodesParameter baseNodeData={selectedElementData}/>}
            {(selectedElementData.type === EDiagramNode.MicroLoop || selectedElementData.type === EDiagramNode.WhileLoop)
                && <GeneralLoopChildrenNodesParameter nodeData={selectedElementData}/>}
        </Box>

    );
};
