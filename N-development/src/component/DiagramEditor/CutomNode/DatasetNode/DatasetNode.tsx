import React from 'react';
import {BaseNodeContainer, NodeIconContainer} from "../container";
import type {NodeProps} from "reactflow";
import {IDatasetDatafield} from "../../../../interface";
import {Box} from "@mui/material";
import {NodeStyle} from "../StyledComponent";


const WIDTH = 272;
export const DatasetNode: React.FC<NodeProps<IDatasetDatafield>> = (props) => {

    const HEIGHT = props.data.comment ? 192 : 131

    return (
        <BaseNodeContainer node={props}>
            <Box
                sx={{
                    width: WIDTH,
                    height: HEIGHT,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'start',
                    alignItems: 'center',
                    px: '16px',
                    boxSizing: 'border-box',

                }}
            >
                <Box sx={{
                    marginTop: '16px'
                }}>
                    <NodeStyle.NodeInfo node={props}/>
                </Box>
                <NodeStyle.Comment sx={{
                    width: '100%',

                }}>
                    {props.data.comment}
                </NodeStyle.Comment>
            </Box>

        </BaseNodeContainer>
    );
};
