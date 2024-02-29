import React from 'react';
import {LoopConnectionHandler, LoopContainer, NodeList} from "../container";
// eslint-disable-next-line import/named
import {NodeProps, Position} from "reactflow";
import {EConnectionMode, IWhileLoopNodeData} from "../../../../interface";
import {EColor, EFontColor, GAP_BETWEEN_EDITOR_CANVAS_DOTS} from "../../../../constant";
import {Box} from "@mui/material";
import {NodeStyle} from "../StyledComponent/styledComponent";
import {ChainHandle} from "../../CustomHandle/ChainHandle";
import {useExpandOrCollapse} from "../../../../hooks";
import {LogicHandle} from "../../CustomHandle";

const WIDTH = 272

export const WhileLoopNode: React.FC<NodeProps<IWhileLoopNodeData>> = (props) => {
    const {data} = props;

    const isCollapsed = data.isCollapsed
    const {expandOrCollapse} = useExpandOrCollapse({
        nodeData: data,
    })

    const changeExpandOrCollapse = () => {
        expandOrCollapse()
    }

    const onDoubleClick: React.MouseEventHandler<HTMLDivElement> = (event) => {
        if (event.detail === 2) {
            changeExpandOrCollapse()
        }
    }

    const baseHeight = data.comment ? 192 : 131

    const childrenNodeIds = data.children?.map((item) => {
        return item.id
    })

    return (
        <>
            <LoopContainer node={props}>


                <Box
                    sx={{
                        boxSizing: 'border-box',
                        width: isCollapsed ? WIDTH : data.style.width,
                        height: isCollapsed ? baseHeight : data.style.height,
                        display: 'flex',
                        position: 'relative',
                    }}
                    onClick={onDoubleClick}
                >
                    {isCollapsed && (<Box sx={{
                        mx: '16px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '16px',
                        justifyContent: 'center',
                        width: '100%',
                    }}>
                        <NodeStyle.NodeInfo node={props}/>
                        {childrenNodeIds && <Box>
                            <NodeList nodeIds={childrenNodeIds}/>
                        </Box>}
                        {data.comment && (<NodeStyle.Comment>
                            {data.comment}
                        </NodeStyle.Comment>)}
                    </Box>)}
                    {!isCollapsed &&
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                flex: 1,
                            }}
                        >
                            <Box sx={{
                                position: 'absolute',
                                top: 16,
                                left: 16,
                                width: 'calc(100% - 32px)'
                            }}>
                                <NodeStyle.NodeInfo node={props}/>
                            </Box>
                            <LoopConnectionHandler side="left" loop={data}>
                                <LoopConnectionHandler.LeftGroup>
                                    <ChainHandle

                                        type="target"
                                        position={Position.Left}
                                        mode={EConnectionMode.NodeIncoming}
                                    />
                                    <LogicHandle

                                        type="target"
                                        position={Position.Left}
                                        mode={EConnectionMode.NodeIncoming}
                                    />

                                </LoopConnectionHandler.LeftGroup>

                                <LoopConnectionHandler.RightGroup>
                                    <ChainHandle type="source" position={Position.Right}
                                                 mode={EConnectionMode.LoopInnerToChildren}/>
                                    <LogicHandle type="source"
                                                 position={Position.Right}
                                                 mode={EConnectionMode.LoopInnerToChildren}/>


                                </LoopConnectionHandler.RightGroup>
                            </LoopConnectionHandler>
                            <LoopConnectionHandler side="right" loop={data}>
                                <LoopConnectionHandler.LeftGroup>
                                    <ChainHandle

                                        type="target"
                                        position={Position.Left}
                                        mode={EConnectionMode.LoopChildrenToExternal}
                                    />
                                    <LogicHandle

                                        type="target"
                                        position={Position.Left}
                                        mode={EConnectionMode.LoopChildrenToExternal}
                                    />

                                </LoopConnectionHandler.LeftGroup>
                                <LoopConnectionHandler.RightGroup>
                                    <ChainHandle type="source" position={Position.Right}
                                                 mode={EConnectionMode.NodeOutgoing}/>
                                    <LogicHandle type="source" position={Position.Right}
                                                 mode={EConnectionMode.NodeOutgoing}/>
                                </LoopConnectionHandler.RightGroup>
                            </LoopConnectionHandler>
                        </Box>
                    }
                </Box>
            </LoopContainer>
            {/*connections*/}
            <Box sx={{
                position: 'absolute',
                width: 'calc(100%)',
                height: '100%',
                left: 0,
                top: 0,
                display: 'flex',
                flex: 1,
                justifyContent: 'space-between',
                alignItems: 'center',
                cursor: 'none',
                pointerEvents: 'none',
            }}>
                {isCollapsed && <Box sx={{
                    display: 'flex',
                    flex: 1,
                    justifyContent: 'space-between',
                }}>
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '48px',
                    }}>
                        <LogicHandle
                            isStroke
                            type="target"
                            position={Position.Left}
                            mode={EConnectionMode.NodeIncoming}
                        />
                        <ChainHandle
                            isStroke
                            type="target"
                            position={Position.Left}
                            mode={EConnectionMode.NodeIncoming}
                        />
                    </Box>
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '48px',
                    }}>
                        <ChainHandle isStroke type="source" position={Position.Right}
                                     mode={EConnectionMode.NodeOutgoing}/>
                        <LogicHandle isStroke type="source" position={Position.Right}
                                     mode={EConnectionMode.NodeOutgoing}/>
                    </Box>
                </Box>}
            </Box>
        </>

    );
};
