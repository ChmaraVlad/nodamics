import React from 'react';
import {ElementParameter} from "../ElementParameter";
import {Parameter} from "../../../../../base";
import {Box} from "@mui/material";
import {IDatasetReader, IDatasetRecorder, IDiagramNodeBaseData} from "../../../../../../interface";
import {useUpdateNode} from "../../../../../../hooks";

export const FieldToSetDatasetReadCoordinates: React.FC<{
    nodeData: IDiagramNodeBaseData & IDatasetReader
}> = ({nodeData}) => {

    const {updateNodeData} = useUpdateNode<IDiagramNodeBaseData & IDatasetRecorder>({
        nodeId: nodeData.id,
    })

    const onDatasetXChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        updateNodeData({
            readDatasetX: event.target.value,
        })
    }

    const onDatasetYChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        updateNodeData({
            readDatasetY: event.target.value,
        })
    }


    const showDatasetX = nodeData.readDatasetX !== undefined
    ? nodeData.readDatasetX
    : '';

    const showDatasetY = nodeData.readDatasetY !== undefined
    ? nodeData.readDatasetY
    : '';

    return (
        <>
            <ElementParameter label="X">
                <Parameter.Input
                    value={showDatasetX}
                    onChange={onDatasetXChange}
                />
            </ElementParameter>
            <ElementParameter label="Y">
                <Parameter.Input
                    value={showDatasetY}
                    onChange={onDatasetYChange}
                />
            </ElementParameter>
            {/*<ElementParameter label="coordinates">*/}
            {/*    <Box sx={{*/}
            {/*        display: 'flex',*/}
            {/*    }}>*/}

            {/*        <Parameter.Text sx={{*/}
            {/*            fontWeight: 400,*/}
            {/*            marginRight: 0.25,*/}
            {/*        }}>*/}
            {/*            X*/}
            {/*        </Parameter.Text>*/}
            {/*        <Parameter.Input*/}
            {/*            value={showDatasetX}*/}
            {/*            onChange={onDatasetXChange}*/}
            {/*        />*/}
            {/*    </Box>*/}
            {/*    <Box sx={{*/}
            {/*        display: 'flex',*/}
            {/*        alignItems: 'center'*/}

            {/*    }}>*/}
            {/*        <Parameter.Text sx={{*/}
            {/*            fontWeight: 400,*/}
            {/*            marginRight: 0.25,*/}
            {/*        }}>*/}
            {/*            Y*/}
            {/*        </Parameter.Text>*/}
            {/*        <Parameter.Input*/}
            {/*            value={showDatasetY}*/}
            {/*            onChange={onDatasetYChange}*/}
            {/*        />*/}
            {/*    </Box>*/}
            {/*</ElementParameter>*/}
        </>
    );
};
