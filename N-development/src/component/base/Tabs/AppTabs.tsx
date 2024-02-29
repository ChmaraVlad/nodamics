import React, {useState} from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import {styled} from "@mui/material";
import {EColor} from "../../../constant";

const StyledTab = styled(Tab)(({theme}) => ({
    fontFamily: 'Inter',
    color: EColor.white,
    fontWeight: 300,
    fontSize: '16px',
    minHeight: '22px',
    textTransform: 'none',
    padding: 0,
    width: 'fit-content',
    minWidth: 'fit-content',
    mr: 1,
    '&:focus': {
        opacity: 1,
    },
    "&.Mui-selected": {
        fontWeight: 500,
    }
}));


export const AppTabs: React.FC<{
    tabs: { label: string, value: string }[]
    onSelectedTab: (tab: string) => void
    selectedTab: string
}> = ({tabs, onSelectedTab, selectedTab}) => {
    console.log('selectedTab: ', selectedTab)
    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        console.log(newValue)
        onSelectedTab(newValue);
    };
    return (
        <Box>
            <Box>
                <Tabs sx={{
                    minHeight: '24px',
                    '& .MuiTabs-flexContainer': {
                        gap: '24px'
                    }
                }} value={selectedTab} onChange={handleChange}>
                    {tabs.map((tab, index) => (
                        <StyledTab value={tab.value} label={tab.label} key={index}/>
                    ))}
                </Tabs>
            </Box>
        </Box>
    );
};

