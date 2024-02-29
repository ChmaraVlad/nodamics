import React from 'react';
import {Mention, MentionsInput} from "react-mentions";
import {EColor, EFontColor} from "../../../constant";
import {Box} from "@mui/material";

const mentionStyle = {
    control: {
        backgroundColor: EColor.grey8,
        fontSize: 16,
        // border: `3px solid ${EColor.grey2}`,
        borderStyle: 'solid',
        borderRadius: '4px',
        borderWidth: '1px',
        color: EFontColor.white,
        borderColor: EColor.grey9,
    },

    '&multiLine': {
        control: {
            fontFamily: 'monospace',
            minHeight: 60,
        },
        highlighter: {
            padding: 9,
            border: '1px solid transparent',
        },
        input: {
            padding: 9,
            border: '1px solid silver',
        },
    },

    '&singleLine': {
        display: 'inline-block',
        width: 180,

        highlighter: {
            padding: 1,
            border: '2px inset transparent',
        },
        input: {
            padding: 1,
            border: '2px inset',
        },
    },

    suggestions: {
        marginTop: 20,
        maxHeight: 200,
        overflowY: 'auto',
        list: {
            backgroundColor: 'white',
            border: '1px solid rgba(0,0,0,0.15)',
            fontSize: 16,
        },
        item: {
            padding: '5px 15px',
            borderBottom: '1px solid rgba(0,0,0,0.15)',
            '&focused': {
                backgroundColor: '#cee4e5',
            },
        },
    },
}

export const IntellisenseInput: React.FC<{
    value?: string;
    onChange: (value: string) => void;
    variables?: { id: string, display: string }[];
    style?: any;
}> = ({variables = [], value = '', onChange, style}) => {

    const mentionVariable = value.length > 0 ? variables : []

    return (
       <Box sx={{
           '& textarea': {
               border: 'none !important',
               color: EFontColor.white,
           }
       }}>
           <MentionsInput
               value={value?.toString() || ''}
               onChange={(event, newValue, newPlainTextValue) => {
                   onChange(newPlainTextValue.trimStart())
               }}
               style={{...mentionStyle, ...style}}
           >
               <Mention
                   trigger=""
                   data={mentionVariable}
               />
           </MentionsInput>
       </Box>
    );
};
