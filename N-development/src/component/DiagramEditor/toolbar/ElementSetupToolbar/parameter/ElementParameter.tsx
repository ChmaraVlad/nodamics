import React from 'react';
import {EColor, EFontColor} from "../../../../../constant";


import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {Box} from "@mui/material";

const StyledAccordion = {
    width: '100%',
    backgroundColor: EColor.grey8, // Replace with your exact color
    color: 'white',
    borderRadius: '6px',
    boxShadow: 'box-shadow: 0px 25px 10px rgba(0, 0, 0, 0.01), 0px 14px 8px rgba(0, 0, 0, 0.03), 0px 6px 6px rgba(0, 0, 0, 0.04), 0px 2px 3px rgba(0, 0, 0, 0.05)'
} as const;


export const ElementParameter: React.FC<{
    label: string,
    children: React.ReactNode
    isRow?: boolean
}> = ({label, children, isRow}) => {

    if(isRow) {
        return  (
            <Box sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '8px',
            }}>
                <Typography sx={{
                    fontSize: 12,
                    fontWeight: 300,
                    letterSpacing: '0.24px',
                    color: EFontColor.white,
                }}>{label}</Typography>

                    {children}
            </Box>
        )
    }

    return (
        <Box>
            <Typography sx={{
                fontSize: 12,
                fontWeight: 300,
                letterSpacing: '0.24px',
                color: EFontColor.white,
                marginBottom: '10px',
            }}>{label}</Typography>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
            }}>
                {children}
            </Box>
        </Box>

    )

};


