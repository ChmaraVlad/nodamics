import React from 'react';
import {Box, Typography} from "@mui/material";
// eslint-disable-next-line import/named
import {NodeProps, Position} from "reactflow";
import {IOriginNodeData} from "../../../../interface";
import {NodeStyle} from "../StyledComponent";
import {SvgNodeContainerHandler} from "../container";
import {ChainHandle} from "../../CustomHandle/ChainHandle";
import {DataHandle} from "../../CustomHandle/DataHandle";

import {OriginNodeContainer} from "../../../../assets";
import {EFontColor} from "../../../../constant";


export const OriginNode: React.FC<NodeProps<IOriginNodeData>> = (props) => {
    const {isConnectable, data} = props


    return (
        <>
            <SvgNodeContainerHandler node={props} Container={OriginNodeContainer}>
                <Box sx={{
                    marginTop: '72px',
                    mx: '30px',
                }}>
                    <NodeStyle.NodeInfo node={props}/>
                </Box>
                <NodeStyle.Comment sx={{
                    marginLeft: '30px',
                    marginRight: '30px',
                }}>
                    {data.comment}
                </NodeStyle.Comment>
            </SvgNodeContainerHandler>
            <Box
                id="origin-node-connection-container"
                sx={{
                    pointerEvents: 'none',
                    position: 'absolute',
                    width: 'calc(100%)',
                    height: 'calc(100%)',
                    top: 0,
                    left: '0',
                }}>
                <Box sx={{
                    width: 'calc(100%)',
                    position: 'absolute',
                    display: 'flex',
                    justifyContent: 'space-between',
                    left: 0,
                    bottom: 'calc(50% - 16px)',
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
                    />
                </Box>
                <Box sx={{
                    position: 'absolute',
                    left: '49%',
                }}>
                    <DataHandle
                        type="source"
                        position={Position.Top}
                        isConnectable={isConnectable}
                    />
                </Box>
            </Box>
        </>
    );
};
