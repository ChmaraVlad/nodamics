import React from "react";
import {InputAdornment, TextField} from "@mui/material";
import {EColor, EFontColor} from "../../../constant";
import {SearchIcon} from "../../../assets/svg/SearchIcon";
import {nanoid} from "nanoid";
import {TextFieldProps} from "@mui/material/TextField/TextField";

export enum BaseInputVariant {
    grey = 'grey',
}

export type  IBaseInputProps =
    Pick<TextFieldProps,
        'type' |
        'placeholder' |
        'value' |
        'onChange' |
        'disabled' |
        'className' |
        'id' |
        'name' |
        'autoFocus' |
        'sx'
    > & {
    viewVariant?:  BaseInputVariant;
}

const idToPreventAutocomplete = nanoid()

export const BaseInput: React.FC<IBaseInputProps> = ({value,sx= {}, viewVariant, ...props}) => {

    if (viewVariant === BaseInputVariant.grey) {
        return (
            <TextField
                name={idToPreventAutocomplete}
                sx={{
                    width: 320,
                    height: 40,
                    backgroundColor: EColor.grey7,
                    borderWidth: '1px',
                    borderColor: EColor.grey6,
                    borderStyle: 'solid',
                    borderRadius: '6px',
                    "& fieldset": {border: 'none'},
                    ...sx,
                }}
                size="small"

                InputProps={{
                    sx: {
                        color: EColor.grey10,
                        fontFamily: 'Inter',
                        fontSize: 14,

                    },
                    autoComplete: 'off',
                    disableUnderline: true,

                }}
                {...props}

            />
        );
    }

    return (
        <TextField
            sx={{
                width: '100%',
                height: 'fit-content',
                ...sx,
            }}
            variant="outlined"
            inputProps={{
                sx: {
                    color: EFontColor.black,
                    padding: '6px',
                    border: 1,
                }
            }}
            value={value ? value : ''} {...props}/>
    );
}
