import React, {useEffect} from 'react';
import {
    DashboardPageLayout,
    TeamMemberList,
    TeamMemberCard,
    LandingScrollLayout,
    AddTeamMemberButton, SearchInput
} from "../../component";
import {Box, Typography} from "@mui/material";
import {teamDashboardAction, useAppDispatch, useTeamDashboardState} from "../../redux";
import {MOCK_TEAM_MEMBERS} from "../../mock/MOCK_TEAM_MEMBERS";
import {EColor} from "../../constant";
import {TeamMemberTable} from "../../component/Team/TeamMemberTable/TeamMemberTable";


export const TeamPage = () => {

    const dispatch = useAppDispatch()
    const {teamMembers, selectedTeamMemberId} = useTeamDashboardState()

    useEffect(() => {
        dispatch(teamDashboardAction.setTeamMembers({
            teamMembers: MOCK_TEAM_MEMBERS
        }))
    }, [dispatch])

    useEffect(() => {
        if (!selectedTeamMemberId && teamMembers.length > 0) {
            dispatch(teamDashboardAction.setSelectedTeamId({
                teamMemberId: teamMembers[0].id
            }))
        }
    }, [dispatch, teamMembers])

    return (
        <Box
            sx={{
                flex: 1,
                backgroundColor: EColor.grey5,
                px: '32px',
                display: 'flex',
                flexDirection: 'column',
                minHeight: '100vh',
            }}
        >
            <Box sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: '32px',
            }}>
                <Typography sx={{
                    color: EColor.white,
                    fontSize: 32,
                    fontWeight: 600,

                }}>
                    Team Members
                </Typography>
                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px'
                }}>
                    <SearchInput />
                    <AddTeamMemberButton />
                </Box>
            </Box>
            <Box sx={{
                marginTop: '48px',
                display: 'flex',
            }}>
                <TeamMemberTable/>
            </Box>
        </Box>
    );
};
