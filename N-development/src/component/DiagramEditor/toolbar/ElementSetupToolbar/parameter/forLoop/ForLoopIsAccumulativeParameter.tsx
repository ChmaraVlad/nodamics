import React from 'react';
import {IMicroLoopNodeData} from "../../../../../../interface";
import {Parameter} from "../../../../../base";
import {useUpdateNode} from "../../../../../../hooks";
import {Box} from "@mui/material";

export const ForLoopIsAccumulativeParameter: React.FC<{
    nodeData: IMicroLoopNodeData
}> = ({nodeData}) => {
    const {updateNodeData} = useUpdateNode<IMicroLoopNodeData>({
        nodeId: nodeData.id,
    })
    const changeIsReadOnly = (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
        updateNodeData({
            isAccumulative: checked,
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
                checked={nodeData.isAccumulative || false}
            />
            <Parameter.Text>
                Accumulate
            </Parameter.Text>
        </Box>
    );
};

