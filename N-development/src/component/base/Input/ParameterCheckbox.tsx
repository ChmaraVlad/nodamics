import React from 'react';
import {EColor} from "../../../constant";
// eslint-disable-next-line import/named
import {Box, Checkbox, CheckboxProps} from "@mui/material";
import CheckIcon from '@mui/icons-material/Check';

export const ParameterCheckbox: React.FC<Pick<CheckboxProps, 'onChange' | 'checked'>> = (props) => {
    return (
        <Checkbox
            onChange={props.onChange}
            checked={props.checked || false}
            icon={<Box
                component="span"
                sx={{
                    backgroundColor: 'transparent',
                    border: '1px solid white',
                    borderRadius: '2px',
                    width: 16,
                    height: 16,

                }}/>}
            checkedIcon={<CheckIcon
                sx={{
                    width: 16,
                    height: 16,
                    backgroundColor: 'transparent',
                    border: '1px solid white',
                    borderRadius: '3px',
                }}/>}
        />
    )
    // return (
    //     <Checkbox
    //         onChange={props.onChange}
    //         checked={props.checked || false}
    //         sx={{
    //             padding: 0,
    //             borderColor: EColor.white,
    //             color: EColor.white,
    //             '&.Mui-checked': {
    //                 borderColor: EColor.white,
    //             },
    //
    //         }}/>
    // );
};
