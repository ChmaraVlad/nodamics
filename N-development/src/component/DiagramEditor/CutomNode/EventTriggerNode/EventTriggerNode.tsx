import React from 'react';
import {Box} from "@mui/material";
import {EColor, GAP_BETWEEN_EDITOR_CANVAS_DOTS} from "../../../../constant";
// eslint-disable-next-line import/named
import {NodeProps, Position} from "reactflow";
import {EConnectionMode, IEventTriggerNodeData} from "../../../../interface";
import {NodeStyle} from "../StyledComponent";
import {ChainHandle} from "../../CustomHandle/ChainHandle";
import {BaseNodeContainer} from "../container";

export const EventTriggerNode: React.FC<NodeProps<IEventTriggerNodeData>> = (props) => {
    const {isConnectable, data} = props

    const height = data.comment ? 192 : 131

    return (
        <>
            <BaseNodeContainer node={props} sx={{
                width: 336,
                height,
                borderRadius: '99px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                px: '48px',
                boxSizing: 'border-box',
            }}>
                <Box sx={{
                    display: 'flex',

                }}>
                    <NodeStyle.NodeInfo node={props}/>
                </Box>
                <Box sx={{
                    width: '100%',
                }}>
                    <NodeStyle.Comment>
                        {data.comment}
                    </NodeStyle.Comment>
                </Box>
            </BaseNodeContainer>
            {/*    connections*/}
            <Box sx={{
                position: 'absolute',
                width: 'calc(100%)',
                height: '100%',
                top: 0,
                left: 0,
                display: 'flex',
                pointerEvents: 'none',
            }}>
                <Box sx={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'flex-start',
                    gap: 1,
                    pointerEvents: 'none',
                }}>
                    <ChainHandle
                        type="target"
                        position={Position.Left}
                        isConnectable={isConnectable}
                        mode={EConnectionMode.NodeIncoming}
                    />

                </Box>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'flex-start',
                    gap: 1,
                    pointerEvents: 'none',
                }}>
                    <ChainHandle
                        type="source"
                        position={Position.Right}
                        isConnectable={isConnectable}
                        mode={EConnectionMode.NodeIncoming}
                        isActive={true}
                    />
                </Box>
            </Box>
        </>
    )
}
