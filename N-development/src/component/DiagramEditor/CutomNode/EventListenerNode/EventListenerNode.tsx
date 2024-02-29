import React from 'react';
import {Box} from "@mui/material";
// eslint-disable-next-line import/named
import {NodeProps, Position} from "reactflow";
import {EConnectionMode, IEventListenerNodeData} from "../../../../interface";
import {NodeStyle} from "../StyledComponent";
import {ChainHandle} from "../../CustomHandle/ChainHandle";
import {BaseNodeContainer} from "../container";

export const EventListenerNode: React.FC<NodeProps<IEventListenerNodeData>> = (props) => {
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
            <Box sx={{
                top: 0,
                position: 'absolute',
                width: 'calc(100%)',
                height: '100%',
                display: 'flex',
                flexDirection: 'row-reverse',
                pointerEvents: 'none',
            }}>
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
                        isActive={data.isEventTriggered}
                    />
                </Box>
            </Box>
        </>
    );
};
