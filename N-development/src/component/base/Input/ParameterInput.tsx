import React from "react";
// eslint-disable-next-line import/named
import {InputProps} from "@mui/material/Input/Input";
import {Box, IconButton, IconButtonProps, Input} from "@mui/material";
import {EColor, EFontColor} from "../../../constant";
import {SimpleArrow} from "../../../assets/svg/SimpleArrow";

const ArrowButton: React.FC<IconButtonProps> = ({sx, ...props}) => {
    return (
        <IconButton sx={{
            width: '10px',
            height: '10px',
            padding: 0,
            ...sx,
        }}
                    {...props}
        >
            <SimpleArrow/>
        </IconButton>
    )
}

interface ArrowButtonProps {
    onArrowClick?: (value: number) => void
}

export const ParameterInput: React.FC<InputProps & ArrowButtonProps> = ({sx, onArrowClick, value, ...props}) => {

    let valueToChange: number
    if (value === undefined) {
        valueToChange = 0
    } else if (typeof value === 'number') {
        valueToChange = value
    } else if (typeof value === 'string' && !isNaN(Number(value))) {
        valueToChange = Number(value)
    } else {
        valueToChange = 0
    }

    const onAdd = () => {

        if (onArrowClick) {
            onArrowClick(valueToChange + 1)
        }

    }

    const onMinus = () => {
        if (onArrowClick) {
            onArrowClick(valueToChange - 1)
        }
    }

    return (
        <Box sx={{
            height: '34px',
            position: 'relative',
        }}>
            <Input
                value={value !== undefined ? value : ''}
                sx={{
                    fontSize: 12,
                    letterSpacing: '0.02em',
                    color: EFontColor.white,
                    width: '100%',

                    flex: 1,
                    backgroundColor: EColor.grey8,
                    border: 'none',
                    borderStyle: 'solid',
                    borderColor: EColor.grey9,
                    borderWidth: '0.5px',
                    borderRadius: '4px',
                    height: '100%',
                    px: '8px',
                    py: '10px',
                    'input': {
                        padding: 0,
                    },
                    '&:after': {
                        display: 'none !important',
                    },
                    '&:before': {
                        display: 'none !important',
                    },
                    '& input[type=number]': {
                        '-moz-appearance': 'textfield'
                    },
                    '& input[type=number]::-webkit-outer-spin-button': {
                        '-webkit-appearance': 'none',
                        margin: 0
                    },
                    '& input[type=number]::-webkit-inner-spin-button': {
                        '-webkit-appearance': 'none',
                        margin: 0
                    },
                    ...sx,

                }}
                {...props}/>
            {onArrowClick && <Box sx={{
                position: 'absolute',
                top: 5,
                right: 10,
                display: 'flex',
                flexDirection: 'column',
                gap: '2px',
            }}>
                <ArrowButton
                    onClick={onAdd}
                    sx={{
                        transform: 'rotate(180deg)',
                    }}/>
                <ArrowButton onClick={onMinus}/>
            </Box>}
        </Box>
    )
}
