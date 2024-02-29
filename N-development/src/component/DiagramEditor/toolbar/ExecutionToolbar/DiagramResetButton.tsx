import React, {useState} from 'react';
import {Tooltip} from '../../../base'
import {Box, IconButton} from "@mui/material";
import {useResetDiagramRun} from "../../../../hooks";
import {RedBlurIcon} from "../../../../assets/svg/RedBlurIcon";
import {ResetIcon} from "../../../../assets/svg/ResetIcon";
import {ExecutionToolbarButtonContainer} from "./container/ExecutionToolbarButtonContainer";

export const DiagramResetButton = () => {
    const {resetDiagramRun} = useResetDiagramRun();
    const [isButtonHover, setIsButtonHover] = useState(false);

    return (
        <Tooltip title={<Tooltip.TitleAndText title="Reset" text="Ctrl + R"/>}>

            <ExecutionToolbarButtonContainer
                onMouseOver={() => setIsButtonHover(true)}
                onMouseOut={() => setIsButtonHover(false)}
                onClick={resetDiagramRun}
            >
                <ResetIcon svg={{style: {zIndex: 1}}}/>
                <Box sx={{
                    opacity: isButtonHover ? 1 : 0,
                    transition: 'opacity 0.2s',
                    width: '100%',
                    height: 21,
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                }}>
                    <RedBlurIcon/>
                </Box>
            </ExecutionToolbarButtonContainer>
        </Tooltip>
    );
};

