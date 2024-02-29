import React from "react";
import {Accordion, AccordionDetails, AccordionSummary, Typography} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {ElementSetupToolbarSectionTitle} from "../../../../base";
import {EColor} from "../../../../../constant";

export const BaseSection: React.FC<{
    children: React.ReactNode;
    title: string;
    isOpen: boolean;
    toggle: () => void;
}> = ({children, title, isOpen, toggle}) => {


    return (
        <Accordion
            sx={{
                // border: '1px solid black',
                padding: 0,
                paddingRight: '2px',
                margin: 0,
                backgroundColor: 'transparent',
                border: 'none',
                // borderColor: EColor.lightMarine3,
                '&.MuiExpansionPanel-root:before': {
                    display: 'none',
                    border: 'none',
                },
                '&.MuiAccordion-root': {
                    backgroundColor: 'transparent',
                    border: 'none',
                    boxShadow: 'none',
                    padding: 0,
                    margin: 0,
                    '&:before': {
                        backgroundColor: 'transparent',
                        display: 'none',
                        border: 'none',
                    },
                },
            }}
            expanded={isOpen}
        >
            <ElementSetupToolbarSectionTitle>
                <AccordionSummary

                    sx={{
                        flexDirection: 'row-reverse',
                        padding: 0,
                        margin: 0,
                        minHeight: '0 !important',
                        gap: '10px',
                        '& .MuiAccordionSummary-content': {

                            borderColor: EColor.lightMarine3,
                            margin: '0 !important',
                            padding: 0,
                            minHeight: 0,
                            height: 'auto',
                        },
                        '& .Mui-expanded': {
                            borderColor: EColor.lightMarine3,
                            minHeight: '0 !important',
                            height: 'auto',
                        }
                    }}

                    onClick={toggle}
                    expandIcon={<ExpandMoreIcon sx={{
                        color: EColor.white,
                        fontSize: 18,
                        fontWeight: '500',
                    }}/>}
                >

                 <Typography sx={{
                        color: EColor.white,
                        fontSize: 14,
                        fontWeight: '500',

                 }}>
                     {title}
                 </Typography>
                </AccordionSummary>
            </ElementSetupToolbarSectionTitle>
            <AccordionDetails
                sx={{
                    padding: 0,

                }}>
                {children}
            </AccordionDetails>
        </Accordion>
    );
};
