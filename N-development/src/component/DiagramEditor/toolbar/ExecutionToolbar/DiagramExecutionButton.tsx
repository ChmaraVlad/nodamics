import React, {useState} from 'react';
import {Tooltip} from '../../../base'
import {Box, Typography} from "@mui/material";
import {PlayIcon} from "../../../../assets/svg/PlayIcon";
import {GreenBlurForStartExecutionIcon} from "../../../../assets/svg/GreenBlurForStartExecutionIcon";
import {useInvokeStep, useManageTargetExecutionStep} from "../../../../hooks";
import {PauseIcon} from "../../../../assets/svg/PauseIcon";
import {GreenBlurStopExecutionIcon} from "../../../../assets/svg/GreenBlurStopExecutionIcon";
import {RedBlurIcon} from "../../../../assets/svg/RedBlurIcon";
import {ExecutionToolbarButtonContainer} from "./container/ExecutionToolbarButtonContainer";

export const DiagramExecutionButton = () => {
    const {toggleStepInterval, isRunning} = useInvokeStep();
    const {targetSteps, changeTargetExecutionStep} = useManageTargetExecutionStep();
    const changeTargetExecutionStepHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        if(event.currentTarget.textContent){
            changeTargetExecutionStep(event.currentTarget.textContent);
        } else {
            changeTargetExecutionStep('');
        }
    }
    const [isButtonHover, setIsButtonHover] = useState(false);

    const tooltipTitle = isRunning ? 'Stop' : 'Start';

    return (
        <Box
            id="execution-button"
            onMouseOver={() => setIsButtonHover(true)}
            onMouseOut={() => setIsButtonHover(false)}
            sx={{
                width: 'fit-content',
                // width: 64,
                height: 32,
                background: '#202020',
                borderRadius: '4px',
                overflow: 'hidden',
                borderWidth: '0.5px',
                borderStyle: 'solid',
                borderColor: '#4B4B4B',
                justifyContent: 'flex-start',
                alignItems: 'center',
                display: 'inline-flex',
                backgroundColor: '#202020',
                boxSizing: 'border-box',
                pointerEvents: 'none',
            }}>
            <Tooltip
                title={<Tooltip.TitleAndText title={tooltipTitle} text="Ctrl + Alt + ↵"/>}

            >
                <ExecutionToolbarButtonContainer
                    onClick={toggleStepInterval}
                    sx={{
                        backgroundColor: '#2A2A2A',
                        pointerEvents: 'auto',

                    }}

                >
                    {!isRunning ? (<>
                        <PlayIcon/>
                        <Box sx={{
                            opacity: isButtonHover ? 1 : 0,
                            transition: 'opacity 0.2s',
                            width: '100%',
                            height: 19,
                            position: 'absolute',
                            bottom: 0,
                            left: 0,
                            pointerEvents: 'none',

                        }}>
                            <GreenBlurForStartExecutionIcon/>
                        </Box>
                    </>) : (<>


                        <PauseIcon svg={{style: {zIndex: 1}}}/>
                        <Box sx={{
                            opacity: !isButtonHover ? 1 : 0,
                            transition: 'opacity 0.2s',
                            width: '100%',
                            height: 44,
                            position: 'absolute',
                            bottom: -13,
                            left: 0,
                            pointerEvents: 'none',

                        }}>
                            <GreenBlurStopExecutionIcon/>
                        </Box>
                        <Box sx={{
                            opacity: isButtonHover ? 1 : 0,
                            transition: 'opacity 0.2s',
                            width: '100%',
                            height: 21,
                            position: 'absolute',
                            bottom: 0,
                            left: 0,
                            pointerEvents: 'none',

                        }}>
                            <RedBlurIcon/>
                        </Box>
                    </>)}
                </ExecutionToolbarButtonContainer>
            </Tooltip>
            <Box
                  sx={{
                    width: 'fit-content',
                    maxWidth: 'fit-content',
                    height: 32,
                    color: '#FFFFFF',
                    fontFamily: 'Inter',
                    fontSize: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
                component="span"

            >

                <Typography
                    sx={{
                        cursor: 'text',
                        pointerEvents: 'auto',
                        minWidth: 32,
                        outline: 'none',
                        border: 'none',
                        px: '6px',
                        boxSizing: 'border-box',
                    }}
                    onInput={changeTargetExecutionStepHandler}
                    contentEditable={true}
                >
                    {targetSteps || ' '}
                </Typography>
            </Box>
        </Box>
    );
};

