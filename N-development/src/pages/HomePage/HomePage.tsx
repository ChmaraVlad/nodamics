import React, {useRef} from 'react';
import {Box, Input, Typography} from "@mui/material";
import {EColor, EFontColor} from "../../constant";
import {AppTabs, LandingScrollLayout, ProjectsList, SearchInput} from "../../component";
import {QuickActions} from "../../component/Dashboard";
import {useGetInfinityProjects, useProjectsFilter} from "../../hooks";

export const HomePage = () => {
    const userName = 'John'
    const userGreetings = `Welcome, ${userName}!`
    const scrollComponentRef = useRef<HTMLDivElement>(null); // Create a ref for the scroll container


    const {
        projectFilterVariants,
        setSelectedTab,
        selectedTab
    } = useProjectsFilter();

    return (
        <Box
            ref={scrollComponentRef}
            sx={{
                flex: 1,
                backgroundColor: EColor.grey5,
                minHeight: '100vh',
                px: '32px',
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            <Box sx={{
                marginTop: '64px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
            }}>
                <Box>
                    <Typography sx={{
                        color: EColor.white,
                        fontSize: 32,
                        fontWeight: 600,

                    }}>
                        {userGreetings}
                    </Typography>
                    <Typography sx={{
                        color: EFontColor.grey10,
                        fontSize: 14,
                        fontWeight: 400,
                        marginTop: '8px',
                    }}>
                        Select a project below to start shaping your ideas into reality
                    </Typography>
                </Box>
                <SearchInput/>
            </Box>

            <Box sx={{
                marginTop: '80px',
                marginBottom: '68px',
            }}>
                <QuickActions/>
            </Box>
            <Box sx={{
                marginBottom: '32px',
            }}>
                <AppTabs tabs={projectFilterVariants} onSelectedTab={setSelectedTab} selectedTab={selectedTab}/>

            </Box>
            <ProjectsList scrollComponentRef={scrollComponentRef}/>

        </Box>
    );
};

