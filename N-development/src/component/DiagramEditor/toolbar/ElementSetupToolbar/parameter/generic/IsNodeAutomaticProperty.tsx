import React from "react";
import {IDiagramNodeBaseData, IIsNodeAutomatic} from "../../../../../../interface";
import {useUpdateNode} from "../../../../../../hooks";
import {Parameter} from "../../../../../base";
import {Box} from "@mui/material";

export const IsNodeAutomaticProperty: React.FC<{
    nodeData: IDiagramNodeBaseData & IIsNodeAutomatic
}> = ({nodeData}) => {

    const {updateNodeData} = useUpdateNode<IDiagramNodeBaseData & IIsNodeAutomatic>({
        nodeId: nodeData.id,
    })

    const changeIsNodeAutomatic = (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
        updateNodeData({
            isAutomatic: checked
        })
    }

    return (
        <Box sx={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
        }}>
            <Parameter.Switch
                onChange={changeIsNodeAutomatic}
                checked={nodeData.isAutomatic || false}
            />
            <Parameter.Text>
                Automatic
            </Parameter.Text>
        </Box>
    );
};
