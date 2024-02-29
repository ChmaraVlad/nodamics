import React from 'react';
import {MenuItem, Select, styled} from "@mui/material";
import {SelectChangeEvent} from "@mui/material/Select/SelectInput";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import {EColor} from "../../../constant";




interface AppSelectorProps {
    selectedValue: string;
    values: {
        value: string;
        label: string;
    }[];
}

export const AppSelector: React.FC<AppSelectorProps> = ({
    selectedValue,
    values,
                                                        }) => {





    return (
        <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            value={selectedValue}
            sx={{
                boxShadow: "none",

                '& .MuiSelect-select': {
                    fontFamily: 'Inter',
                    paddingRight: '6px !important',
                    padding: 0,
                    color: EColor.white,
                    fontWeight: 400,
                    fontSize: '14px',
                },
                ".MuiOutlinedInput-notchedOutline": { border: 0 },
                "&.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline":
                    {
                        border: 0,
                    },
                "&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                    {
                        border: 0,
                    },
            }}
            IconComponent={() => <KeyboardArrowDownIcon  sx={{
                color: EColor.white
            }} />}
        >
            {values.map((value) => (
                <MenuItem key={value.value} value={value.value}>
                    {value.label}
                </MenuItem>
            ))}
        </Select>
    );
};

