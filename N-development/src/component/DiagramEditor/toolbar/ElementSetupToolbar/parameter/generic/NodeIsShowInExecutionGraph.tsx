import React from 'react';
import {Parameter} from "../../../../../base";
import {useUpdateNode} from "../../../../../../hooks";
import {IDiagramNodeBaseData, IIsShowInExecutionGraphNode} from "../../../../../../interface";
import {Box} from "@mui/material";

export const NodeIsShowInExecutionGraph: React.FC<{
    nodeData: IDiagramNodeBaseData & IIsShowInExecutionGraphNode
}> = ({nodeData}) => {

    const {updateNodeData} = useUpdateNode<IDiagramNodeBaseData & IIsShowInExecutionGraphNode>({
        nodeId: nodeData.id,
    })

    const changeIsReadOnly = (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
        updateNodeData({
            isShowInExecutionGraphNode: checked
        })
    }

    return (
        <Box sx={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
        }}>
            <Parameter.Switch
                onChange={changeIsReadOnly}
                checked={nodeData.isShowInExecutionGraphNode || false}
            />
            <Parameter.Text>
                Track
            </Parameter.Text>
        </Box>
    );
};

