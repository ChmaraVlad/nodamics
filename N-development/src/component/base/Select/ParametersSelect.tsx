import React from 'react';
import {FormControl, InputLabel, MenuItem, Select} from "@mui/material";
import {EColor, EFontColor} from "../../../constant";
// eslint-disable-next-line import/named
import {SelectChangeEvent} from "@mui/material/Select/SelectInput";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
export interface IParametersSelectValue {
    value: string,
    label: string,
}

export const ParametersSelect: React.FC<{
    currentValue?: string,
    onChange?: (event: SelectChangeEvent) => void,
    values?: string[] | IParametersSelectValue[],
}> = ({currentValue, onChange, values}) => {
    return (
        <FormControl
            fullWidth
            size="small"
            sx={{
                maxWidth: '100%',
                boxSizing: 'border-box',

            }}
            id={`ParametersSelect-controller${currentValue}`}
        >


            <Select
                value={currentValue || ''}
                onChange={onChange}

                sx={{
                    px: '8px',
                    py: '10px',
                    width: '100%',
                    maxWidth: '100%',
                    maxHeight: '37px',
                    flex: 1,
                    color: EFontColor.white,
                    borderColor: EColor.grey9,
                    backgroundColor: EColor.grey8,
                    borderWidth: 1,
                    borderRadius: '4px',
                    borderStyle: 'solid',
                    // px: 0.5,
                    // padding: 0,
                    boxShadow: "none",
                    ".MuiOutlinedInput-notchedOutline": {border: 0},
                    "&.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
                        border: 0,
                    },
                    "&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        border: 0,
                    },
                    "& .MuiSvgIcon-root": {
                        color: "white"
                    }
                }}
                IconComponent={KeyboardArrowDownIcon}
                inputProps={{
                    color: EFontColor.white,
                    sx: {
                        padding: 0,
                        fontSize: '14px',
                        letterSpacing: '0.28px',
                        fontWeight: 400,
                    },

                    MenuProps: {

                        MenuListProps: {
                            sx: {
                                backgroundColor: EColor.grey5
                            }
                        },
                    },

                }}

            >
                {values?.map((item) => {
                    if (typeof item === 'string') {
                        return (
                            <MenuItem
                                key={item}
                                value={item}
                                sx={{
                                    color: EFontColor.white,
                                }}
                            >
                                {item}
                            </MenuItem>
                        )
                    }
                    return <MenuItem
                        key={item.value}
                        value={item.value}
                        sx={{
                            color: EFontColor.white,
                        }}
                    >
                        {item.label}
                    </MenuItem>
                })}
            </Select>
        </FormControl>
    );
};

export default ParametersSelect;
