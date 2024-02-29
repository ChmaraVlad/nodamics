import React from 'react';
// eslint-disable-next-line import/named
import {NodeProps} from "reactflow";
import {INodeData} from "../../../../interface";
import {Box} from "@mui/material";
// eslint-disable-next-line import/named
import {SxProps} from "@mui/system/styleFunctionSx";
import {useIsElementExecuted} from "../../../../hooks";
import './shapeContainer.scss'
import {ContextMenuContainer} from "./ContextMenuContainer";
import {EColor, nodeActiveColorMap} from "../../../../constant";
import {hexToRgbA} from "../../../../service";
//
export const BaseNodeShapeContainerV2: React.FC<{
    children: React.ReactNode
    node: NodeProps<INodeData>
    params: {
        width: number
        height: number
        clipPath?: string
    },
    sxContentContainer?: SxProps
}> = ({
          children,
          node,
          params,
          sxContentContainer
      }) => {

    const isPlayAnimation = useIsElementExecuted(node.data)
    const activeBorderColor = nodeActiveColorMap[node.data.type]

    return (
        <ContextMenuContainer node={node}>

            <Box>
                <Box
                    id="base-node-shape-container"
                    sx={{
                        width: params.width,
                        height: params.height,
                        clipPath: params.clipPath,
                        background: 'linear-gradient(103.06deg, rgba(84, 84, 84, 0.25) 0%, rgba(48, 48, 48, 0.35) 52.6%, rgba(48, 48, 48, 0.25) 100%)',
                        borderStyle: 'solid',
                        borderWidth: 1,
                        // borderColor: EColor.lightBrown || node.data.style.borderColor,
                        borderColor: 'red',
                        animation: isPlayAnimation ? 'shapeBlink 0.2s linear 3' : 'none',
                        borderRadius: '6px',
                        backdropFilter: 'blur(1.5px)',
                        "@keyframes containerBlink": {
                            "50%": {
                                borderColor: activeBorderColor,
                            }
                        },
                    }}>
                    {children}
                    {/*<Box*/}
                    {/*    id="shape-container"*/}
                    {/*    sx={{*/}
                    {/*        background: 'linear-gradient(103.06deg, rgba(84, 84, 84, 0.25) 0%, rgba(48, 48, 48, 0.35) 52.6%, rgba(48, 48, 48, 0.25) 100%)',*/}
                    {/*        position: 'absolute',*/}
                    {/*        top: 0,*/}
                    {/*        left: 0,*/}
                    {/*        width: params.width,*/}
                    {/*        height: params.height,*/}
                    {/*        clipPath: params.clipPath,*/}
                    {/*        transform: 'scale(0.984)',*/}
                    {/*        display: 'flex',*/}
                    {/*        borderRadius: '6px',*/}
                    {/*    }}>*/}
                    {/*    {children}*/}
                    {/*</Box>*/}
                </Box>
            </Box>

        </ContextMenuContainer>
    );
};
