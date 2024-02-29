import React, {useEffect, useState} from 'react';
// eslint-disable-next-line import/named
import {NodeProps, Position} from "reactflow";
import {Box} from "@mui/material";
import {EConnectionMode, IDataNodeData} from "../../../../interface";
import {NodeStyle} from "../StyledComponent";
import {nodeActiveColorMap} from "../../../../constant";
import {BaseNodeContainer} from "../container";

import {useChangeNodeDataStep, useUpdateNode} from "../../../../hooks";
import {useDiagramEditorState} from "../../../../redux";
import {shortenLargeNumber} from "../../../../utils";
import {DataHandle} from "../../CustomHandle/DataHandle";
import {ChainHandle} from "../../CustomHandle/ChainHandle";

import {NodeValueInput} from "../../NodeInput";


const WIDTH = 272;


export const DataNode: React.FC<NodeProps<IDataNodeData>> = (props) => {

    const {updateNodeData} = useUpdateNode<IDataNodeData>({
        nodeId: props.data.id,
    })

    const {isConnectable, data} = props
    const {isDiagramRunning, completedSteps, settings: {isResourceAnimationLatency}} = useDiagramEditorState()

    const isShowStep = data.isShowStep || false

    const {increaseNodeDataStep, decreaseNodeDataStep} = useChangeNodeDataStep({
        nodeData: props.data,
    })

    const [resources, setResources] = useState<number>(data.resources.value)
    const [minMaxResources, setMinMaxResources] = useState<{
        min: string | undefined,
        max: string | undefined,
    }>({
        min: undefined,
        max: undefined,
    })
    const HEIGHT = data.comment ? 192 : 131

    const updateMinMax = () => {
        if (data.history.length > 0) {
            setMinMaxResources({
                min: shortenLargeNumber(Math.min(...data.history), 1),
                max: shortenLargeNumber(Math.max(...data.history), 1),
            })
        } else {
            setMinMaxResources({
                min: undefined,
                max: undefined,
            })
        }
    }


    useEffect(() => {
        if (isResourceAnimationLatency) {
            setResources(data.resources.value)
            updateMinMax()
        }
    }, [completedSteps]);

    useEffect(() => {
        if (!isDiagramRunning || !isResourceAnimationLatency) {
            setResources(data.resources.value)
            updateMinMax()
        }
    }, [data.resources]);


    const currentResourcesValue = resources
        ? shortenLargeNumber(resources, data.decimalDigits || 1)
        : 0

    const {changeValue: changeResource} = useChangeNodeDataStep({
        nodeData: props.data,
    })


    const onMinCapacityChange = (newMinValue: string) => {
        updateNodeData({
            minCapacity: Number(newMinValue),
        })
    }

    const onMaxCapacityChange = (newMaxValue: string) => {
        updateNodeData({
            maxCapacity: Number(newMaxValue),
        })
    }


    const nodeName = props.data.name
    const formattedName = nodeName.length > 35 ? `${nodeName.substring(0, 35).trim()}...` : nodeName

    const activeBorderColor = nodeActiveColorMap[props.data.type]


    return (

        <>
            <BaseNodeContainer node={props}>
                <Box
                    sx={{
                        width: WIDTH,
                        height: HEIGHT,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        px: '16px',
                        pt: '16px',
                        pb: '8px',
                        boxSizing: 'border-box',
                        gap: '10px',
                    }}
                >


                    <NodeStyle.NodeInfo node={props}/>


                    <NodeStyle.ValueInput
                        title="Value"
                        value={resources}
                        onChange={changeResource}
                    />


                    {data.comment && <NodeStyle.Comment sx={{
                        width: '100%',
                        flex: 1,
                        marginTop: 0,
                    }}>
                        {data.comment}
                    </NodeStyle.Comment>}
                </Box>
            </BaseNodeContainer>
            {/*connections*/
            }
            <Box sx={{
                pointerEvents: 'none',
                position: 'absolute',
                width: 'calc(100% + 1.8px)',
                height: '100%',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                top: 0,
                left: '-0.8px'
            }}>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    gap: '6px',
                }}>
                    <DataHandle
                        type="target"
                        position={Position.Left}
                        isConnectable={isConnectable}
                    />
                    <Box>
                        <ChainHandle
                            type={"target"}
                            position={Position.Left}
                            mode={EConnectionMode.RecordToSpreadsheet}
                            isConnectable={isConnectable}
                        />
                    </Box>
                    <Box>
                        <ChainHandle
                            type={"target"}
                            position={Position.Left}
                            mode={EConnectionMode.ReadDataset}
                            isConnectable={isConnectable}
                        />
                    </Box>
                </Box>
                <DataHandle
                    type="source"
                    position={Position.Right}
                    isConnectable={isConnectable}
                />
            </Box>
        </>
    )
        ;
};
