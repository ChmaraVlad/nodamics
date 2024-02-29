import React from "react";
import {ITransferNodeData} from "../../../../../../interface";
import {useUpdateNode} from "../../../../../../hooks";
import {Parameter} from "../../../../../base";
import {Box} from "@mui/material";

export const TransferNodeIsExecuteWhenPassZeroParameter: React.FC<{
    nodeData: ITransferNodeData
}> = ({nodeData}) => {

    const {updateNodeData} = useUpdateNode<ITransferNodeData>({
        nodeId: nodeData.id,
    })

    const changeIsExecuteOutgoingIfTransferredZero = (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
        updateNodeData({
            isExecuteOutgoingIfTransferredZero: checked,
        })
    }

    return (
        <Box sx={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
        }}>
            <Parameter.Switch
                onChange={changeIsExecuteOutgoingIfTransferredZero}
                checked={nodeData.isExecuteOutgoingIfTransferredZero || false}
            />
            <Parameter.Text>
                Execute if transferred zero
            </Parameter.Text>
        </Box>
    );
};
