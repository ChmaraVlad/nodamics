import React from 'react';
import {EColor, GAP_BETWEEN_EDITOR_CANVAS_DOTS} from "../../../../constant";
// eslint-disable-next-line import/named
import {NodeProps, Position} from "reactflow";
import {ISinkNodeData} from "../../../../interface";
import {Box} from "@mui/material";
import {ChainHandle} from "../../CustomHandle/ChainHandle";
import {DataHandle} from "../../CustomHandle/DataHandle";
import {BaseNodeShapeContainer, SvgNodeContainerHandler} from "../container";
import {NodeStyle} from "../StyledComponent/styledComponent";
import {OriginNodeContainer, SinkNodeContainer} from "../../../../assets";

const SIZE = GAP_BETWEEN_EDITOR_CANVAS_DOTS * 4
// const clipPath = 'polygon(50% 0%, 100% 50%, 100% 100%, 0 100%, 0 50%)'
const clipPath = 'polygon(100% 0%, 100% 50%, 50% 100%, 0% 50%, 0% 0%)'

export const SinkNode: React.FC<NodeProps<ISinkNodeData>> = (props) => {
    const {isConnectable, data} = props
    return (
        <>

            <SvgNodeContainerHandler node={props} Container={SinkNodeContainer}>
                <Box sx={{
                    marginTop: '39px',
                    mx: '30px',
                }}>
                    <NodeStyle.NodeInfo node={props}/>
                    <NodeStyle.Comment>
                        {data.comment}
                    </NodeStyle.Comment>
                </Box>
            </SvgNodeContainerHandler>
            {/*connections*/}
            <Box sx={{
                top: 0,
                left: 0,
                position: 'absolute',
                width: 'calc(100%)',
                height: 'calc(100%)',
                pointerEvents: 'none',
            }}>
                <Box sx={{
                    width: '100%',
                    position: 'absolute',
                    display: 'flex',
                    justifyContent: 'space-between',
                    top: 61,
                    left: 0,
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
                    bottom: 2,
                    left: 'calc(50% - 3.5px)',
                }}>
                    <DataHandle
                        type="target"
                        position={Position.Bottom}
                        isConnectable={isConnectable}
                    />
                </Box>
            </Box>
        </>
    );
};
