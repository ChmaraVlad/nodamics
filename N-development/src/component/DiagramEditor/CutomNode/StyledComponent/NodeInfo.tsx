import React from 'react';
import {Box, IconButton} from "@mui/material";
import {NodeIconContainer} from "../container";
import {DatasetIcon} from "../../../../assets/svg/DatasetIcon";
import {NodeStyle} from "./styledComponent";
import {NodeProps} from "reactflow";
import {EDiagramNode, INodeData, nodeSetupToolbarNames} from "../../../../interface";
import {nodeActiveColorMap} from "../../../../constant";
import {nodeTypeIconMap} from "../../../../service";
import {ExpandCollapseLoopIcon} from "../../../../assets";

export const NodeInfo: React.FC<{
    maxNameLength?: number
    node: NodeProps<INodeData>
}> = ({ node, maxNameLength: customMaxNameLength}) => {
    const nodeName = node.data.name
    const maxNameLength = customMaxNameLength || 24
    const formattedName = nodeName.length > maxNameLength ? `${nodeName.substring(0, maxNameLength).trim()}...` : nodeName

    const activeBorderColor = nodeActiveColorMap[node.data.type]
    const nodeTypeName = nodeSetupToolbarNames[node.data.type]
    const NodeIcon = nodeTypeIconMap[node.data.type]

    const isShowExpandCollapse = [EDiagramNode.WhileLoop, EDiagramNode.MicroLoop].includes(node.data.type)
    const isLoopExpand = node.data.isCollapsed
    return (
        <Box sx={{
            width: '100%',
            display: 'flex',
        }}>
           <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'start',
           }}>
               <NodeIconContainer  color={activeBorderColor}>
                   <NodeIcon/>
               </NodeIconContainer>
           </Box>
            <Box sx={{
                marginTop: '5px',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
                height: '100%',
                marginLeft: '12px',
            }}>
                <NodeStyle.Type>
                    {nodeTypeName} Node
                </NodeStyle.Type>
                <NodeStyle.Name>
                    {formattedName}
                </NodeStyle.Name>
            </Box>
            {isShowExpandCollapse && <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                marginLeft: 'auto',
            }}>
                <IconButton
                    id={`node-${node.data.name}-expand-collapse`}
                    sx={{
                        pointerEvents: 'inherit',
                        boxSizing: 'border-box',
                        width: 12,
                        height: 12,
                        padding: 0,
                        transform: isLoopExpand ? 'rotate(0deg)' : 'rotate(180deg)',
                    }}>
                    <ExpandCollapseLoopIcon/>
                </IconButton>
            </Box>}
        </Box>
    );
};

