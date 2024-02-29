import React from 'react';
import {IDataNodeData} from "../../../../../../interface";
import {ElementParameter} from "../ElementParameter";
import {useChangeNodeDataStep} from "../../../../../../hooks";
import {Parameter} from "../../../../../base";

export const NodeDataValueParameter: React.FC<{
    nodeData: IDataNodeData
}> = ({nodeData}) => {


    const {changeValueFromInput, changeValue} = useChangeNodeDataStep({
        nodeData,
    })


    return (
        <ElementParameter label="Value">
            <Parameter.Input
                type="number"
                value={nodeData.resources.value}
                onChange={changeValueFromInput}
                onArrowClick={changeValue}
            />

        </ElementParameter>
    )
}
