import React from 'react';
import {IDataNodeData} from "../../../../../../interface";
import {ElementParameter} from "../ElementParameter";
import {Box} from "@mui/material";
import {useChangeNodeDataStep, useUpdateNode} from "../../../../../../hooks";
import {Parameter} from "../../../../../base";

export const NodeDataStepParameter: React.FC<{
    nodeData: IDataNodeData
}> = ({nodeData}) => {

    const {updateNodeData} = useUpdateNode<IDataNodeData>({
        nodeId: nodeData.id,
    })

    const changeIsReadOnly = (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
        updateNodeData({
            isShowStep: checked
        })
    }

    const {changeNodeDataStep} = useChangeNodeDataStep({
        nodeData,
    })

    const changeStep = (event: React.ChangeEvent<HTMLInputElement>) => {
        const step = Number(event.target.value)
        changeNodeDataStep(step)
    }

    const onArrowClick = (value: number) => {
        changeNodeDataStep(value)
    }

    return (
        <ElementParameter label="Steps">
            <Box sx={{
                display: 'flex',
                justifyContent: 'space-between',
                flexDirection: 'column',
                gap: 1,
            }}>

                <Box>

                    <Parameter.Input
                        type="number"
                        value={nodeData.step || ''}
                        onChange={changeStep}
                        onArrowClick={onArrowClick}
                    />
                </Box>
                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                }}>
                    <Box>
                        <Parameter.Switch onChange={changeIsReadOnly} checked={nodeData.isShowStep}/>
                    </Box>
                    <Parameter.Text>
                        Per Step
                    </Parameter.Text>

                </Box>
            </Box>
        </ElementParameter>
    );
};
