import React from "react";
// eslint-disable-next-line import/named
import {Box, styled, Switch, TextField, TextFieldProps, Typography} from "@mui/material";
import {EColor, EFontColor} from "../../../constant";
import {ParameterLabel} from "../Label";
import {ParametersContainer} from "./ParametersContainer";
import {ElementParameterContainer} from "./ElementParameterContainer";
import {IntellisenseInput, ParameterInput} from "../Input";
import {ParameterCheckbox} from "../Input/ParameterCheckbox";
import {isObject} from "../../../utils";
import ParametersSelect from "../Select/ParametersSelect";
import {SwitchProps} from "@mui/material/Switch/Switch";

export const ElementSetupToolbarSectionTitle = styled(Box)({
    display: 'block',
    backgroundColor: 'transparent',
    paddingLeft: 1,
    padding: '4px',
    color: EFontColor.white,
    fontWeight: 'bold',
    // borderColor: EColor.lightMarine3,
    // borderStyle: 'solid',
    borderRadius: 2,
    borderWidth: '1px',
    marginBottom: 16,
})

export const ParameterText = styled(Typography)({
    fontSize: 12,
    fontWeight: 300,
    letterSpacing: '0.24px',
    color: EFontColor.white,
})

export const ParameterList: React.FC<{
    items?: string[] | {
        label: string
        value: string
    }[]
}> = ({items}) => {


    return (<Box
            sx={{
                px: '8px',
                py: '10px',
                height: 120,
                flex: 1,
                borderWidth: 1,
                borderStyle: 'solid',
                borderRadius: '4px',
                borderColor: EColor.grey9,
                overflowX: 'hidden',
                overflowY: 'auto',
                display: 'flex',
                gap: '8px',
                flexWrap: 'wrap',
                minHeight: 12,
            }}
        >
            {items?.map((item, index) => {
                if (isObject(item) && 'label' in item) {
                    return (<Box sx={{
                        px: '6px',
                        py: '4px',
                        gap: '4px',
                        backgroundColor: EColor.grey8,
                        borderRadius: '4px',
                        width: 'fit-content',
                        rowGap: '4px',
                    }}>
                        <Typography
                            sx={{
                                color: EColor.white,
                                fontSize: 14,
                            }}
                            key={`${item}-${index}`}
                        >
                            {item.label}
                        </Typography>
                    </Box>)
                }
                return (<Box sx={{
                    px: '6px',
                    py: '4px',
                    gap: '4px',
                    backgroundColor: EColor.grey8,
                    borderRadius: '4px',
                }}>
                    <Typography
                        sx={{
                            color: EColor.white,
                            fontSize: 14,
                        }}
                        key={`${item}-${index}`}
                    >
                        {item}
                    </Typography>
                </Box>)
            })}
        </Box>

    )
}

const TextArea: React.FC<TextFieldProps> = ({...props}) => {
    return <TextField
        multiline
        rows={4}
        sx={{
            color: EFontColor.grey4,
            backgroundColor: EColor.grey8,
            borderStyle: 'solid',
            borderRadius: '4px',
            borderWidth: '1px',
            borderColor: EColor.grey9,
        }}
        {...props}/>
}
const ParameterSwitch: React.FC<SwitchProps> = (props) => {
    return <Switch
        sx={{
            padding: 0,
            width: 'fit-content',
            height: 'fit-content',
            color: EFontColor.grey4,
            '& .MuiSwitch-thumb': {
                width: 16,
                height: 16,
                backgroundColor: EColor.white,
                boxShadow: 'none',

            },
            '& .MuiSwitch-switchBase': {
                top: -6,
                left: -6,
            },
            '& .MuiSwitch-track': {
                borderRadius: '99px',
                width: 36,
                height: 16,
                boxSizing: 'content-box',
                padding: '2px',
                backgroundColor: EColor.grey5,
                borderStyle: 'solid',
                borderWidth: 1,
                borderColor: EColor.grey9,
            }

        }}

        {...props}
    />
}



export const Parameter = {
    Container: ParametersContainer,
    Property: ElementParameterContainer,
    ElementContainer: ElementParameterContainer,
    Checkbox: ParameterCheckbox,
    Label: ParameterLabel,
    Text: ParameterText,
    Input: ParameterInput,
    List: ParameterList,
    TextArea: TextArea,
    IntellisenseInput: IntellisenseInput,
    Select: ParametersSelect,
    Switch: ParameterSwitch,
}
