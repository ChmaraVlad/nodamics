import React from 'react';
import {Box, IconButton, styled} from "@mui/material";
import {useReactFlowInstance} from "../../../../hooks";
import {PlusIcon} from "../../../../assets/svg/PlusIcon";
import {EColor} from "../../../../constant";
import {MinusIcon} from "../../../../assets/svg/MinusIcon";
import {diagramEditorActions, useAppDispatch, useDiagramEditorState} from "../../../../redux";
import {FitViewIcon} from "../../../../assets/svg/FitViewIcon";
import {LockIcon} from "../../../../assets/svg/LockIcon";
import {useStoreApi} from "@reactflow/core";

const StyledIconButton = styled(IconButton)(() => ({
    backgroundColor: EColor.grey12,
    pointerEvents: 'all',
    borderRadius: '4px',
    padding: '4px',
    width: '16px',
    height: '16px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    "&:hover": {
        backgroundColor: EColor.grey12,
    },
    boxSizing: 'content-box',
    zIndex: 5,
}))

export const CanvasControl = () => {
    const reactFlowInstance = useReactFlowInstance().data?.reactFlowInstance
    const {isInteractive} = useDiagramEditorState()
    const dispatch = useAppDispatch()
    const store = useStoreApi()

    const zoomIn = () => {
        if (reactFlowInstance) {
            reactFlowInstance.zoomIn()
        }
    }

    const zoomOut = () => {
        if (reactFlowInstance) {
            reactFlowInstance.zoomOut()
        }
    }

    const fitView = () => {
        if (reactFlowInstance) {
            reactFlowInstance.fitView()
        }
    }

    const toggleInteractive = () => {
        store.setState({
            nodesDraggable: !isInteractive,
            nodesConnectable: !isInteractive,
            elementsSelectable: !isInteractive,
        });
        dispatch(diagramEditorActions.setIsInteractive(!isInteractive))
    };

    return (
        <Box
            id="canvas-control"
            sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
        }}>
            <StyledIconButton onClick={zoomIn}>
                <PlusIcon/>
            </StyledIconButton>
            <StyledIconButton onClick={zoomOut}>
                <MinusIcon/>
            </StyledIconButton>
            <StyledIconButton onClick={fitView}>
                <FitViewIcon/>
            </StyledIconButton>
            <StyledIconButton onClick={toggleInteractive}>
                <LockIcon/>
            </StyledIconButton>
        </Box>
    );
};

