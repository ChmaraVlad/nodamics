import React from 'react';
import {ElementParameter} from "../ElementParameter";
import {Parameter} from "../../../../../base";
import {Box} from "@mui/material";
import {IDatasetRecorder, IDiagramNodeBaseData} from "../../../../../../interface";
import {useUpdateNode} from "../../../../../../hooks";

export const NodeDatasetFieldToRecordCoordinates: React.FC<{
    nodeData: IDiagramNodeBaseData & IDatasetRecorder
}> = ({nodeData}) => {

    const {updateNodeData} = useUpdateNode<IDiagramNodeBaseData & IDatasetRecorder>({
        nodeId: nodeData.id,
    })

    const onDatasetXChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        updateNodeData({
            datasetX: event.target.value,
        })
    }

    const onDatasetYChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        updateNodeData({
            datasetY: event.target.value,
        })
    }


    const showDatasetX = nodeData.datasetX !== undefined
    ? nodeData.datasetX
    : '';

    const showDatasetY = nodeData.datasetY !== undefined
    ? nodeData.datasetY
    : '';

    return (
        <>
            <ElementParameter label="X">
                <Parameter.Input
                    value={showDatasetX}
                    onChange={onDatasetXChange}
                />
            </ElementParameter>
            <ElementParameter label="Y">
                <Parameter.Input
                    value={showDatasetY}
                    onChange={onDatasetYChange}
                />
            </ElementParameter>
        </>

    );
};
