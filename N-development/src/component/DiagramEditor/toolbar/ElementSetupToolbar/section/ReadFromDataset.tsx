import React, {useEffect} from 'react';
import {Box, Grid, Typography} from "@mui/material";
import {IDatasetReader, IDiagramNodeBaseData} from "../../../../../interface";
import {useToggle} from "../../../../../hooks";
import {BaseSection} from "./BaseSection";
import {FieldToSetDatasetReadCoordinates, SelectDatasetToRead} from "../parameter/datasetReader";
import {Parameter} from "../../../../base";
import {ElementParameter} from "../parameter/ElementParameter";

export const ReadFromDataset: React.FC<{
    nodeData: IDiagramNodeBaseData & IDatasetReader
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
            <SelectDatasetToRead nodeData={nodeData}/>
            <FieldToSetDatasetReadCoordinates nodeData={nodeData}/>
        </Box>


    );
};
