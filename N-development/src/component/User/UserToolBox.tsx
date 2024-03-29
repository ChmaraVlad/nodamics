import React, {useMemo, useState} from 'react';
import {Avatar, Box, IconButton, Menu, MenuItem, Tooltip, Typography} from "@mui/material";
import {Link} from "react-router-dom";
import {ELinks} from "../../service/router";
import {useSessionUserDataQuery} from "../../api";
import {useLogOut} from "../../service/superTokens";

export const UserToolBox: React.FC<{
    children?: React.ReactNode
    anchorElUser?: HTMLElement | null
    onClose: () => void
}> = ({children, anchorElUser = null, onClose}) => {
    const logOut = useLogOut(ELinks.login);

    const {data: userData} = useSessionUserDataQuery(undefined)

    const settings = useMemo(() => {
        const settingsBase: ({
            type: 'link',
            name: string,
            link: ELinks | string,
        } | {
            type: 'action',
            name: string,
            action: () => void
        })[] = [
            {
                type: 'link',
                name: 'Log in',
                link: ELinks.login,
            }, {
                type: 'link',
                name: 'Register',
                link: ELinks.register,
            }]
        if (userData) {
            settingsBase.push({
                type: 'action',
                name: 'Log out',
                action: logOut,
            })
        }
        return settingsBase
    }, [userData])

    const handleCloseUserMenu = () => {
        onClose();
    };


    return (
        <>

            {children}


        <Menu
            sx={{mb: '45px'}}
            id="menu-appbar"
            anchorEl={anchorElUser || null}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
        >
            {settings.map((setting) => {
                if (setting.type === 'link') {
                    return (
                        <Link to={setting.link} key={setting.name}>
                            <MenuItem onClick={handleCloseUserMenu}>
                                <Typography textAlign="center">{setting.name}</Typography>
                            </MenuItem>
                        </Link>)
                } else if (setting.type === 'action') {
                    return (
                        <MenuItem onClick={setting.action} key={setting.name}>
                            <Typography textAlign="center">{setting.name}</Typography>
                        </MenuItem>
                    )
                }
            })}
        </Menu>
        </>
    );
};
