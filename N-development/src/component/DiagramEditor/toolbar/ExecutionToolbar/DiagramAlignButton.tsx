import React from 'react';
import {useToggle} from "../../../../hooks";
import {Tooltip} from "../../../base";
import {ExecutionToolbarButtonContainer} from "./container/ExecutionToolbarButtonContainer";
import {Box} from "@mui/material";
import {LayoutIcon} from "../../../../assets/svg/LayoutIcon";
import {PurpleBlurIcon} from "../../../../assets/svg/PurpleBlurIcon";

export const DiagramAlignButton = () => {
    const hoverButtonManager = useToggle();
    return (
        <Tooltip title={<Tooltip.TitleAndText title="Layout" text="Ctrl + L"/>}>
            <ExecutionToolbarButtonContainer
                sx={{
                    padding: '5.1px'
                }}
                onMouseOver={() => hoverButtonManager.open()}
                onMouseOut={() => hoverButtonManager.close()}
            >
                <LayoutIcon/>
                <Box sx={{
                    opacity: hoverButtonManager.isOpened ? 1 : 0,
                    transition: 'opacity 0.2s',
                    width: '100%',
                    height: 21,
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                }}>
                    <PurpleBlurIcon/>
                </Box>
            </ExecutionToolbarButtonContainer>
        </Tooltip>
    );
};

