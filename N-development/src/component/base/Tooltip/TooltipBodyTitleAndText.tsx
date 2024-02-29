import React from 'react';
import {Box, Typography} from "@mui/material";

export const TooltipBodyTitleAndText: React.FC<{
    title?: string,
    text?: string,
}> = ({title,text}) => {
    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '6px 12px',
            gap: '2px',
            borderRadius: '4px',
            backgroundColor: 'rgba(34, 34, 34, 0.50)',
        }}>
            <Typography sx={{
                color: '#FFF',
                fontSize: '12px',
                fontWeight: 500,
            }}>{title}</Typography>
            <Typography sx={{
                color: '#9B9B9B',
                fontSize: '12px',
                fontWeight: 300,

            }}>{text}</Typography>
        </Box>
    );
};

