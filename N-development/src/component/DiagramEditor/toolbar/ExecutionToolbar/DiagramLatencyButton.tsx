import React from 'react';
import {useToggle} from "../../../../hooks";
import {Tooltip} from "../../../base";
import {ExecutionToolbarButtonContainer} from "./container/ExecutionToolbarButtonContainer";
import {Box} from "@mui/material";
import {LatencyIcon} from "../../../../assets/svg/LatencyIcon";
import {diagramEditorActions, useDiagramEditorState} from "../../../../redux";
import {useDispatch} from "react-redux";
import {OrangeBlurIcon} from "../../../../assets/svg/OrangeBlurIcon";

export const DiagramLatencyButton = () => {
    const hoverButtonManager = useToggle();
    const dispatch = useDispatch()

    const {settings: {isResourceAnimationLatency}} = useDiagramEditorState()
    const toggleResourceAnimationLatency = () => {
        dispatch(diagramEditorActions.setResourceAnimationLatency(!isResourceAnimationLatency))
    }

    return (
        <Tooltip title={<Tooltip.TitleAndText title="Latency" text="Ctrl + Alt + L"/>}>
            <ExecutionToolbarButtonContainer
                sx={{
                    padding: '5.1px'
                }}
                onMouseOver={() => hoverButtonManager.open()}
                onMouseOut={() => hoverButtonManager.close()}
                onClick={toggleResourceAnimationLatency}
            >
                <LatencyIcon svg={{style: {zIndex: 1}}}/>
                <Box sx={{
                    opacity: hoverButtonManager.isOpened || !isResourceAnimationLatency ? 1 : 0,
                    transition: 'opacity 0.2s',
                    width: '100%',
                    height: 21,
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                }}>
                    <OrangeBlurIcon/>
                </Box>
            </ExecutionToolbarButtonContainer>
        </Tooltip>
    );
};

