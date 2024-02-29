import React from 'react';
import {
    SvgNodeContainerPropsAggregator,
    SvgNodeContainerSize
} from "../../../../interface/busines/diagram/nodeContainer";
import {EColor, nodeActiveColorMap} from "../../../../constant";
import {NodeProps} from "reactflow";
import {INodeData} from "../../../../interface";
import {useIsElementExecuted} from "../../../../hooks";
import {Box} from "@mui/material";
import {ContextMenuContainer} from "./ContextMenuContainer";

export const SvgNodeContainerHandler: React.FC<{
    Container: React.FC<SvgNodeContainerPropsAggregator>
    node: NodeProps<INodeData>
    children?: React.ReactNode
}> = ({Container, node, children}) => {


    const isPlayAnimation = useIsElementExecuted(node.data)

    const activeBorderColor = nodeActiveColorMap[node.data.type]
    const defaultBorderColor = EColor.lightBrown || node.data.style.borderColor
    const borderColor = isPlayAnimation ? activeBorderColor : defaultBorderColor
    const isShowTall = node.data.comment !== undefined && node.data.comment !== ''
    const size = isShowTall ? SvgNodeContainerSize.Tall : SvgNodeContainerSize.Common
    return (
        <>
            <ContextMenuContainer node={node}>
                <Container borderColor={borderColor} isPlayAnimation={isPlayAnimation} size={size}/>

                <Box sx={{
                    top: 0,
                    left: 0,
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    justifyContent: 'start',
                    alignItems: 'start',
                    flexDirection: 'column',
                }}>
                    {children}
                </Box>
            </ContextMenuContainer>
        </>
    );
};

