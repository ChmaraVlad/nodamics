import React from 'react';
import {Box, Typography} from "@mui/material";
import {EFontColor} from "../../../../constant";
import {Parameter} from "../../../base";
import {useManageExecutionDuration} from "../../../../hooks";

export const SpeedInput = () => {
    const {executionDurationSeconds, changeExecutionDuration} = useManageExecutionDuration();

    const changeExecutionDurationHandler = (event: React.ChangeEvent<HTMLInputElement>) => {

        changeExecutionDuration(event.target.value);
    }

    const formattedValue = `${executionDurationSeconds} s`

    return (
        <Box sx={{
            display: 'flex',
            alignItems: 'center',
        }}>
            <Typography sx={{
                fontSize: 12,
                color: EFontColor.grey10,
                marginRight: '4px'
            }}>
                Speed:
            </Typography>
            <Parameter.Input
                onChange={changeExecutionDurationHandler}
                value={executionDurationSeconds}
                sx={{
                    width: '72px',
                    height: '32px',
                }}
            />
        </Box>
    );
};

