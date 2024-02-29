import React from 'react';
import {Tooltip} from "../../../base";
import {ExecutionToolbarButtonContainer} from "./container/ExecutionToolbarButtonContainer";
import {Box} from "@mui/material";
import {useToggle} from "../../../../hooks";
import {ExecutionGraphPopUp} from "../../ExecutionGraph";
import {ChartIcon} from "../../../../assets/svg/ChartIcon";
import {BlueBlurIcon} from "../../../../assets/svg/BlueBlurIcon";

export const DiagramChartButton = () => {
    const executionGraphPopUp = useToggle();
    const hoverButtonManager = useToggle();
    return (
        <>
            <ExecutionGraphPopUp
                isShow={executionGraphPopUp.isOpened}
                onClose={executionGraphPopUp.close}
            />
            <Tooltip title={<Tooltip.TitleAndText title="Execution Graph" text="Cntr + Alt + C"/>}>

                <ExecutionToolbarButtonContainer
                    onMouseOver={() => hoverButtonManager.open()}
                    onMouseOut={() => hoverButtonManager.close()}
                    onClick={executionGraphPopUp.open}
                >
                    <ChartIcon  svg={{style: {zIndex: 1}}}/>
                    <Box sx={{
                        opacity: hoverButtonManager.isOpened || executionGraphPopUp.isOpened ? 1 : 0,
                        transition: 'opacity 0.2s',
                        width: '100%',
                        height: 21,
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                    }}>
                        <BlueBlurIcon/>
                    </Box>
                </ExecutionToolbarButtonContainer>
            </Tooltip>
        </>

    );
};

