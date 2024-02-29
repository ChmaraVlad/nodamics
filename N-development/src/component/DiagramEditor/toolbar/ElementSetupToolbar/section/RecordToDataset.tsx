import React, {useEffect} from 'react';
import {Box, Grid} from "@mui/material";
import {IDatasetRecorder, IDiagramNodeBaseData} from "../../../../../interface";
import {useToggle} from "../../../../../hooks";
import {BaseSection} from "./BaseSection";
import {NodeDatasetFieldToRecordSelectDataset} from "../parameter/datasetRecorder";
import {NodeDatasetFieldToRecordCoordinates} from "../parameter/datasetRecorder/NodeDatasetFieldToRecordCoordinates";
import {ElementParameter} from "../parameter/ElementParameter";

export const RecordToDataset: React.FC<{
    nodeData: IDiagramNodeBaseData & IDatasetRecorder
}> = ({nodeData}) => {

    const accordionController = useToggle()

    useEffect(() => {
        accordionController.open()
    }, [nodeData])

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
        }}>
            <NodeDatasetFieldToRecordSelectDataset nodeData={nodeData}/>
            <NodeDatasetFieldToRecordCoordinates nodeData={nodeData}/>
        </Box>
    );
};
