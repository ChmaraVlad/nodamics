import React, {useEffect} from 'react';
import {Outlet, useNavigate} from "react-router-dom";
import {Box, Typography} from "@mui/material";
import {DashboardPageLayout, AccountNav, SearchInput, AddTeamMemberButton, AppTabs} from "../../component";
import {useCurrentPath} from "../../hooks/useCurrentPath";
import {ELinks} from "../../service";
import {EColor} from "../../constant";
import {TeamMemberTable} from "../../component/Team/TeamMemberTable/TeamMemberTable";

const accountSettingsPages = [{
    value: 'Account',
    label: 'Account'
}, {
    value: 'Plan',
    label: 'Plan',
}, {
    value: 'Billing',
    label: 'Billing'
}, {
    value: 'NFT',
    label: 'NFT'
}]

export const AccountPage = () => {

    const navigate = useNavigate()
    const path = useCurrentPath()

    useEffect(() => {
        if (path === ELinks.accountManageData) {
            navigate(ELinks.accountProfile)
        }
    }, [navigate])

    const setSelectedTab = (tab: string) => {

    }

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
                alignItems: 'center',
                marginTop: '32px',
            }}>
                <Typography sx={{
                    color: EColor.white,
                    fontSize: 32,
                    fontWeight: 600,
                }}>
                    Settings
                </Typography>

            </Box>
            <Box sx={{
                marginTop: '32px',
            }}>
                <AppTabs tabs={accountSettingsPages} onSelectedTab={setSelectedTab} selectedTab="Account"/>

            </Box>
            <Box sx={{
                marginTop: '48px',
                display: 'flex',
                flexDirection: 'column',
                flex: 1,
            }}>
                <Outlet/>
            </Box>
        </Box>
    );
};
