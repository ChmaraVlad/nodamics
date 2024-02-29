import React, {useEffect} from 'react';
import {Outlet, useNavigate} from "react-router-dom";
import {ELinks, useShouldLoadRoute} from "../../service";
import {useCurrentPath} from "../../hooks/useCurrentPath";
import {LandingHeader} from "../../component";
import {ProtectedRoute} from "../../service/router/ProtectedRoute";
import {DashboardSideMenu} from "../../component/Dashboard";
import {Box} from "@mui/material";

export const DashboardPage = () => {

    const navigate = useNavigate()
    const path = useCurrentPath()
    const isUserLogged = useShouldLoadRoute();

    useEffect(() => {

        if (path === '/' && !isUserLogged.isLoading && !isUserLogged.hasInvalidClaims) {
            navigate(ELinks.project)
        }
    }, [navigate, path, isUserLogged])



    return (
        <ProtectedRoute>
            <Box sx={{
                display: 'flex',
                height: '100vh',
                // flex: 1,
                // flexDirection: 'row',
            }}>
                <DashboardSideMenu />
                <Box sx={{
                    flex: 1,
                    overflowY: 'auto', // Make this part scrollable
                }}>
                    <Outlet/>
                </Box>
            </Box>
        </ProtectedRoute>
    );
};
