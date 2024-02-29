import React from 'react';
import {Box, Typography} from "@mui/material";
import {EFontColor} from "../../../../constant";
import {Parameter, Tooltip} from "../../../base";

import {
    useInvokeStep,
    useManageExecutionDuration,
    useManageTargetExecutionStep,
    useResetDiagramRun,
    useToggleResourceAnimationLatency
} from "../../../../hooks";
import {useAutoLayout} from "../../../../hooks/useAutoLayout";
import {useDiagramEditorState} from "../../../../redux";

import {DiagramExecutionButton} from "./DiagramExecutionButton";
import {DiagramResetButton} from "./DiagramResetButton";
import {DiagramChartButton} from "./DiagramChartButton";
import {DiagramLatencyButton} from "./DiagramLatencyButton";
import {DiagramAlignButton} from "./DiagramAlignButton";
import {DiagramGroupButton} from "./DiagramGroupButton";
import {SpeedInput} from "./SpeedInput";


export const ExecutionToolbar = () => {

    const {currentRunningDiagramStep} = useDiagramEditorState();



    return (
        <>


            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
            }}>
                <Tooltip title={<Tooltip.TitleAndText title="Step"/>}>
                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                    }}>

                        <Typography sx={{
                            fontSize: 12,
                            color: EFontColor.grey10,
                            marginRight: '5px'
                        }}>
                            Step:
                        </Typography>

                        <Typography sx={{
                            fontSize: 12,
                            fontWeight: 500,
                            color: EFontColor.white,
                            minWidth: '32px',
                        }}>
                            {currentRunningDiagramStep}
                        </Typography>

                    </Box>
                </Tooltip>
                <SpeedInput/>
                <DiagramExecutionButton/>
                <DiagramResetButton/>
                <DiagramChartButton/>
                <DiagramLatencyButton/>
                <DiagramAlignButton/>
                <DiagramGroupButton/>
            </Box>
        </>
    );
};

