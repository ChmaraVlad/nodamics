import React from 'react';
import {IDiagramNodeBaseData, IEventListenerNodeData, IEventTriggerNodeData} from "../../../../../../interface";
import {ElementParameter} from "../ElementParameter";
import {Parameter} from "../../../../../base";
import {useDiagramEditorState} from "../../../../../../redux";
import {useChangeLayer} from "../../../../../../hooks";

export const NodeLayerParameter: React.FC<{
    nodeData: IDiagramNodeBaseData
}> = ({nodeData}) => {

    const {
        currentLayer,
        layers,
        updateLayer,
    } = useChangeLayer(nodeData)

    return (
        <ElementParameter label="Layer">
            <Parameter.Select
                values={layers}
                onChange={updateLayer}
                currentValue={currentLayer?.id}
            />

        </ElementParameter>
    )
}
