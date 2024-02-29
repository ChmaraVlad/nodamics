import React, {useEffect} from 'react';
import {BaseSection} from "./BaseSection";
import {useToggle} from "../../../../../hooks";
import {INodeData, isINodeDatasetRecorder, isINodeHistory, isShowInExecutionGraphNode} from "../../../../../interface";
import {VariableStatisticsParameter} from "../parameter/VariableStatisticsParameter";
import {NodeIsShowInExecutionGraph} from "../parameter/generic";
import {Parameter} from "../../../../base";
import {Box} from "@mui/material";
import {RecordToDataset} from "./RecordToDataset";
import {NodeDatasetFieldToRecordCoordinates, NodeDatasetFieldToRecordSelectDataset} from "../parameter/datasetRecorder";
import {ReadFromDataset} from "./ReadFromDataset";
import {ContentSeparator} from "../styled";

export const NodeStatisticSection: React.FC<{
    nodeData: INodeData
}> = ({
          nodeData
      }) => {
    const accordionController = useToggle()

    useEffect(() => {
        accordionController.open()
    }, [nodeData])


    const isNodeHasHistory = isINodeHistory(nodeData)

    return (
        <>
            {isNodeHasHistory && <Box>

                <VariableStatisticsParameter
                    nodeData={nodeData}
                />
                <Box sx={{
                    marginTop: '8px',
                }}>
                    <>

                        {isShowInExecutionGraphNode(nodeData) && <NodeIsShowInExecutionGraph nodeData={nodeData}/>}
                        {isINodeDatasetRecorder(nodeData) && <>
                            <ContentSeparator sx={{my: '24px'}}/>

                            <RecordToDataset nodeData={nodeData}/>

                            <ContentSeparator sx={{my: '24px'}}/>

                            <ReadFromDataset nodeData={nodeData}/>

                        </>}
                    </>
                </Box>

            </Box>}
        </>
    );
};
