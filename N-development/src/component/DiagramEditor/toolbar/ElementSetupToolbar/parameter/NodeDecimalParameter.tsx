import React from 'react';
import {ElementParameter} from "./ElementParameter";
import {Box, Checkbox} from "@mui/material";
import {EColor} from "../../../../../constant";
import {MSelect, Parameter} from "../../../../base";
import {
    EDiagramNode,
    ENodeTrigger,
    IDataNodeData,
    IDiagramNodeBaseData,
    INodeDecimal,
    isIDataNodeData
} from "../../../../../interface";
import {useUpdateNode} from "../../../../../hooks";
import {SelectChangeEvent} from "@mui/material/Select/SelectInput";


export const NodeDecimalParameter: React.FC<{
    nodeData: IDiagramNodeBaseData & INodeDecimal
}> = ({nodeData}) => {

    const {updateNodeData} = useUpdateNode<IDiagramNodeBaseData & INodeDecimal>({
        nodeId: nodeData.id,
    })

    const changeIsShowDecimals = (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
        updateNodeData({
            isShowDecimal: checked
        })
    }

    const changeDigits = (event: React.ChangeEvent<HTMLInputElement>) => {
        const decimals = Number(event.target.value)
        updateNodeData({
            decimalDigits: decimals
        })
    }

    const onArrowClick = (value: number) => {
        updateNodeData({
            decimalDigits: value
        })
    }


    return (
        <ElementParameter label="Decimals">

            <Box sx={{
                display: 'flex',
                justifyContent: 'space-between',
                flexDirection: 'column',
                gap: 1,
            }}>

                <Box>

                    <Parameter.Input
                        type="number"
                        value={nodeData.decimalDigits || ''}
                        onChange={changeDigits}
                        onArrowClick={onArrowClick}
                    />
                </Box>
                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                }}>
                    <Box>
                        <Parameter.Switch onChange={changeIsShowDecimals} checked={nodeData.isShowDecimal}/>
                    </Box>
                    <Parameter.Text>
                        Digits
                    </Parameter.Text>

                </Box>
            </Box>
        </ElementParameter>
    );
};
