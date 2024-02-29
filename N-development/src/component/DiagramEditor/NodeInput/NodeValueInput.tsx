import React, {useEffect, useState} from 'react';
import {Box, Input, TextField, Typography} from "@mui/material";
import {NodeStyle} from "../CutomNode/StyledComponent/styledComponent";
import {EColor} from "../../../constant";

const FONT_SIZE = 12

export const NodeValueInput: React.FC<{
    title: string
    value?: string | number
    onChange?: (value: string) => void
    minWidth?: number
    maxWidth?: number
}> = ({title, onChange, value = '', minWidth = 8, maxWidth = 80}) => {
    const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (onChange) {
            onChange(event.target.value)
        }

    }

    return (
        <Box sx={{
            display: 'flex',
            gap: '8px',
            alignItems: 'center',
            width: '100%',
        }}>
            <NodeStyle.InputTitle>
                {title}
            </NodeStyle.InputTitle>
            <NodeStyle.InputV2
                width="100%"
                value={value}
                onChange={onChangeHandler}
            />
        </Box>
    );
};
