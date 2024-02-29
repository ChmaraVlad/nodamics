import React, {DragEvent} from 'react';
import {EDiagramNode, EElementType, IDiagramElement, IDiagramElementPreviewToolbarElement} from "../../../../interface";
import {Box, Tooltip, Typography} from "@mui/material";
import {EColor, EFontColor, nodeActiveColorMap} from "../../../../constant";

export const ElementToolbarElement: React.FC<{
    element: IDiagramElementPreviewToolbarElement
}> = ({element}) => {
    const Preview = element.Component
    const onDragStart = (event: DragEvent<HTMLSpanElement>, nodeType: IDiagramElement) => {
        event.dataTransfer.setData('application/reactflow', nodeType);
        event.dataTransfer.effectAllowed = 'move';
    };
    const hoverColor = element.elementType === EElementType.Node ? nodeActiveColorMap[element.type as EDiagramNode] :  undefined
    return (
        <Tooltip title={element.toolbarName}>
            <Box
                onDragStart={(event) => onDragStart(event, element.type)}
                draggable
                sx={{
                    cursor: 'pointer',
                }}
            >
               <Box sx={{
                   width: '40px',
                   height: '40px',
                   backgroundColor: EColor.grey12,
                   display: 'flex',
                   justifyContent: 'center',
                   alignItems: 'center',
                   borderRadius: '4px',
                   padding: '10px',
                   boxSizing: 'border-box',
                   "&:hover": {
                          backgroundColor: hoverColor,
                     }
               }}>
                   <Preview/>
               </Box>
                <Typography sx={{
                    fontSize: '12px',
                    color: EFontColor.grey10,
                    textAlign: 'center',
                    marginTop: '4px',
                }}>
                    {element.toolbarName}
                </Typography>
            </Box>
        </Tooltip>
    );
};
