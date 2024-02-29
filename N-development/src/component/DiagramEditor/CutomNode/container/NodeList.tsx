import React, {useMemo} from 'react';
import {useDiagramEditorState} from "../../../../redux";
import {IReactFlowNode} from "../../../../interface";
import {Box, Typography} from "@mui/material";
import {EFontColor, nodeActiveColorMap} from "../../../../constant";
import {nodeTypeIconMap} from "../../../../service";

const MAX_NODE_LIST_LENGTH = 6
export const NodeList: React.FC<{
    nodeIds: string[]
}> = ({nodeIds}) => {
    const {diagramNodes} = useDiagramEditorState()

    const {nodes, leftNodeCount} = useMemo(() => {
        const nodeIdsSet = new Set(nodeIds)
        const foundNodes: IReactFlowNode[] = []
        for (const node of diagramNodes) {
            if (nodeIdsSet.has(node.data.id)) {
                foundNodes.push(node)
                nodeIdsSet.delete(node.data.id)
            }
            if (nodeIdsSet.size === 0 || foundNodes.length === MAX_NODE_LIST_LENGTH) {
                break
            }
        }

        return {nodes: foundNodes, leftNodeCount: nodeIdsSet.size}
    }, [nodeIds])

    return (
        <Box sx={{
            display: 'flex',
            gap: '8px',
            width: '100%',
        }}>
            {nodes.map((node) => {
                const NodeIcon = nodeTypeIconMap[node.data.type]
                return (
                    <Box sx={{
                        boxSizing: 'border-box',
                        backgroundColor: nodeActiveColorMap[node.data.type],
                        borderRadius: '4px',
                        padding: '6px',
                        width: '26px',
                        minWidth: '26px',
                        maxWidth: '26px',
                        minHeight: '26px',
                        maxHeight: '26px',
                        height: '26px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        boxShadow: '0px 25px 10px rgba(0, 0, 0, 0.01), 0px 14px 8px rgba(0, 0, 0, 0.03), 0px 6px 6px rgba(0, 0, 0, 0.04), 0px 2px 3px rgba(0, 0, 0, 0.05)',
                        filter: 'drop-shadow(0px 16px 6px rgba(0, 0, 0, 0.01)) drop-shadow(0px 9px 5px rgba(0, 0, 0, 0.05)) drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.09)) drop-shadow(0px 1px 2px rgba(0, 0, 0, 0.1))'
                    }}>
                        <NodeIcon/>
                    </Box>
                )
            })}
            {leftNodeCount > 0 && <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '26px',
                height: '26px',
                backgroundColor: 'rgba(78, 78, 78, 0.3)',
                borderRadius: '4px',
                fontSize: '12px',
                lineHeight: '15px',
                textAlign: 'center',
                letterSpacing: '-0.02em',
                boxShadow: '0px 25px 10px rgba(0, 0, 0, 0.01), 0px 14px 8px rgba(0, 0, 0, 0.03), 0px 6px 6px rgba(0, 0, 0, 0.04), 0px 2px 3px rgba(0, 0, 0, 0.05)',

            }}>
                <Typography sx={{
                    fontSize: '12px',
                    lineHeight: '15px',
                    textAlign: 'center',
                    letterSpacing: '-0.02em',
                    color: EFontColor.grey10,


                }}>
                    +{leftNodeCount}
                </Typography>
            </Box>}
        </Box>
    );
};

