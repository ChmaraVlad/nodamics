import React from 'react';
import {IconButton, styled} from "@mui/material";

export const ExecutionToolbarButtonContainer = styled(IconButton)(({theme}) => ({
    display: 'flex',
    width: 32,
    height: 32,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
    borderRadius: '4px',
    overflow: 'hidden',
    backgroundColor: 'transparent',
    boxSizing: 'border-box',
    transition: 'backgroundColor 0.3s',
    ":hover": {
        backgroundColor: "#2A2A2A"
    }
}))

