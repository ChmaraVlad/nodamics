import React from 'react';
import {Box} from "@mui/material";
import {SvgNodeContainerHandler} from "../container";
import {NodeStyle} from "../StyledComponent";
import type {NodeProps} from "reactflow";
import {EConnectionMode, ISinkNodeData} from "../../../../interface";
import {ChainHandle} from "../../CustomHandle/ChainHandle";
import {Position} from "reactflow";
import {DataHandle} from "../../CustomHandle/DataHandle";
import { TransferNodeContainer} from "../../../../assets";




export const TransferNode: React.FC<NodeProps<ISinkNodeData>> = (props) => {
    const {data, isConnectable} = props;
    return (
        <>


            <SvgNodeContainerHandler node={props} Container={TransferNodeContainer}>
                <Box sx={{
                    boxSizing: 'border-box',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px',
                    px: '64px',
                    pt: '40px',
                }} >
                    <NodeStyle.NodeInfo node={props}/>
                    <NodeStyle.Comment>
                        {data.comment}
                    </NodeStyle.Comment>
                </Box>
            </SvgNodeContainerHandler>
            {/*connections*/}
            <Box sx={{
                position: 'absolute',
                width: 'calc(100%)',
                height: 'calc(100%)',
                left: 0,
                top: 0,
                pointerEvents: 'none',

            }}>

                <Box sx={{
                    position: 'absolute',
                    width: '94%',
                    display: 'flex',
                    justifyContent: 'space-between',
                    top: 'calc(12%)',
                }}>
                    <DataHandle
                        type="target"
                        position={Position.Left}
                        isConnectable={isConnectable}
                        mode={EConnectionMode.NodeIncoming}
                    />
                    <DataHandle
                        type="source"
                        position={Position.Right}
                        isConnectable={isConnectable}
                        mode={EConnectionMode.NodeOutgoing}
                    />

                </Box>

                <Box sx={{
                    width: '94%',
                    position: 'absolute',
                    display: 'flex',
                    justifyContent: 'space-between',
                    bottom: 'calc(12%)',
                }}>
                    <ChainHandle
                        type="target"
                        position={Position.Left}
                        isConnectable={isConnectable}

                    />
                    <ChainHandle
                        type="source"
                        position={Position.Right}
                        isConnectable={isConnectable}
                        mode={EConnectionMode.NodeOutgoing}
                    />
                </Box>
            </Box>

        </>
    );
};
