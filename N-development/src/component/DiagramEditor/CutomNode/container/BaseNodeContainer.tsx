import React, {CSSProperties} from 'react';
import {Box} from "@mui/material";
import {EDiagramNode, INodeData} from "../../../../interface";
// eslint-disable-next-line import/named
import {NodeProps} from "reactflow";
import {useIsElementExecuted} from "../../../../hooks";
// import './baseContainer.scss'
// eslint-disable-next-line import/named
import {SxProps} from "@mui/system/styleFunctionSx";
import {EColor, nodeActiveColorMap} from "../../../../constant";
import {NodeName} from "./NodeName";
import {ContextMenuContainer} from "./ContextMenuContainer";


export const BaseNodeContainer: React.FC<{
    children: React.ReactNode
    node: NodeProps<INodeData>
    sx?: SxProps
}> = ({
          children,
          node,
          sx,
      }) => {
    const {data} = node;
    const isPlayAnimation = useIsElementExecuted(data)
    const activeBorderColor = nodeActiveColorMap[node.data.type]

    const animationId = `containerBlink${node.id}`

    return (
        <ContextMenuContainer node={node}>
            <Box
                id={`base-node-container`}


                sx={{
                    padding: '2px',
                    borderWidth: 1,
                    borderRadius: '6px',
                    borderColor: data.style.borderColor || EColor.lightBrown,
                    borderStyle: 'solid',
                    background: 'linear-gradient(103.06deg, rgba(84, 84, 84, 0.25) 0%, rgba(48, 48, 48, 0.35) 52.6%, rgba(48, 48, 48, 0.25) 100%)',
                    animation: isPlayAnimation ? `${animationId} 0.2s linear 3` : 'none',
                    backdropFilter: 'blur(1.5px)',
                    [`@keyframes ${animationId}`]: {
                        "50%": {
                            borderColor: activeBorderColor,
                        }
                    },
                    ...sx,
                }}>

                {children}
            </Box>
        </ContextMenuContainer>
    );
};
