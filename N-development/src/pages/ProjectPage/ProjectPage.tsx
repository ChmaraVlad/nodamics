import React, { useRef } from 'react';
import {
    DashboardPageLayout,
    ProjectDetails,
    ProjectsList,
    LandingScrollLayout, CreateProjectButton, AppTabs, AppSelector, SearchInput
} from "../../component";
import {useAutoSelectFirstProject, useGetInfinityProjects, useProjectsFilter} from "../../hooks";
import {Box} from "@mui/material";
import {EColor, ProjectStatus} from '../../constant';

const sortTeam = [{
    value: 'Team',
    label: 'Team'
}]

const timeSort = [{
    value: 'lastEdited',
    label: 'Last Edited'
}]

export const ProjectPage = () => {
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
            display: 'flex',
            flexDirection: 'column',
            flex: 1,
            backgroundColor: EColor.grey5,
            minHeight: '100vh',
        }}>
            <Box sx={{
                marginX: '32px',
                marginTop: '32px',
                marginBottom: '64px',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
                <AppTabs tabs={projectFilterVariants} onSelectedTab={setSelectedTab} selectedTab={selectedTab} />
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: '26px',
                }}>
                    <AppSelector selectedValue="Team" values={sortTeam} />
                    <AppSelector selectedValue="lastEdited" values={timeSort} />
                    <SearchInput />
                </Box>
            </Box>
            <ProjectsList scrollComponentRef={scrollComponentRef}/>
        </Box>
    );
};
