import React from 'react';
import {ElementParameter} from "../ElementParameter";
import {IDatasetDatafield} from "../../../../../../interface";
import {Box, Checkbox} from "@mui/material";
import {EColor} from "../../../../../../constant";
import {useUpdateNode} from "../../../../../../hooks";
import {Parameter} from "../../../../../base";
// eslint-disable-next-line import/named

export const DatasetReadOnly: React.FC<{
    nodeData: IDatasetDatafield
}> = ({nodeData}) => {

    const {updateNodeData} = useUpdateNode<IDatasetDatafield>({
        nodeId: nodeData.id,
    })

    const changeIsReadOnly = (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
        updateNodeData({
            isReadOnly: checked
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
                checked={nodeData.isReadOnly || false}
            />
            <Parameter.Text>
                Read only
            </Parameter.Text>
        </Box>
    );
};
