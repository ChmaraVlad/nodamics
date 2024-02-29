import React from 'react';
import {IconButton, InputAdornment, TextField} from "@mui/material";
import {EColor} from "../../../constant";
import {SearchIcon} from "../../../assets/svg/SearchIcon";
import { nanoid} from "nanoid";

const idToPreventAutocomplete = nanoid()

export const SearchInput = () => {
    return (
        <TextField
            placeholder="Search"

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
                endAdornment: (<InputAdornment position="end">
                    <SearchIcon/>
                </InputAdornment>),
            }}

        />
    );
};

