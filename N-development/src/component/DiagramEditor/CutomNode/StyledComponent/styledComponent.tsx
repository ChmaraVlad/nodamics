// eslint-disable-next-line import/named
import {Input, styled, SxProps, TextField, TextFieldProps, Theme, Typography, TypographyProps} from "@mui/material";
import {EColor, EFontColor} from "../../../../constant";
import React from "react";
// eslint-disable-next-line import/named
import {InputProps} from "@mui/material/Input/Input";
import {NodeTextName} from "./NodeName";
import {NodeTypeText} from "./NodeTypeText";
import {NodeInfo} from "./NodeInfo";
import {NodeValueInput} from "../../NodeInput";


const NodeTextValue = styled(Typography)(() => ({
    fontSize: 12,
    fontWeight: 600,
    color: EFontColor.white,
}))

const NodeInputTextValue: React.FC<InputProps> = ({sx, ...props}) => {
    return <Input
        sx={{
            color: EFontColor.lightMarine4,
            // height:' 0.7em',
            '& input': {
                padding: 0,
            },
            padding: 0,
            ...sx,
        }}
        {...props}
    />
}
const InputTitle = styled(Typography)(() => ({
    fontSize: 12,
    lineHeight: '15px',
    letterSpacing: '0.02em',
    color: EFontColor.grey10,
}))

const NodeInputTextValue2: React.FC<TextFieldProps & {
    width: number | string
}> = ({sx, width, ...props}) => {
    return <TextField

        sx={{
            height: '32px',
            minWidth: '32px',
            minHeight: '32px',
            borderRadius: '4px',
            borderWidth: '1px',
            borderStyle: 'solid',
            borderColor: EColor.grey6,
            backgroundColor: EColor.black2,
            width,
            "& fieldset": {border: 'none'},
        }}
        InputProps={{
            disableUnderline: true,
            inputProps: {
                sx: {
                    fontWeight: 300,
                    fontFamily: 'Inter',
                    padding: 0,
                    px: '4px',
                    color: EFontColor.white,
                    minWidth: '32px',
                    minHeight: '32px',
                    outline: 'none',
                    border: 'none',
                    fontSize: 12,
                    width,
                },
            }
        }}
        {...props}
    />
}

const Comment = styled(Typography)(() => ({
    fontSize: '12px',
    lineHeight: '15px',
    letterSpacing: '-0.02em',
    color: EFontColor.grey10,
}))

export const NodeStyle = {
    Name: NodeTextName,
    Type: NodeTypeText,
    Value: NodeTextValue,
    Input: NodeInputTextValue,
    InputV2: NodeInputTextValue2,
    ValueInput: NodeValueInput,
    InputTitle: InputTitle,
    NodeInfo: NodeInfo,
    Comment,
}
