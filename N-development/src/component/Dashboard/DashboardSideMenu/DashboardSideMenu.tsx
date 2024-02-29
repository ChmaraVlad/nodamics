import React, {useEffect, useState} from 'react';
import {Avatar, Box, IconButton, Typography} from "@mui/material";
import {NodanomicsLogo} from "../../../assets/svg/NodanomicsLogo";
import {NodanomicsTextIcon} from "../../../assets/svg/NodanomicsTextIcon";
import {EColor, EFontColor} from "../../../constant";
import {ELinks} from "../../../service";
import {DashboardSideMenuButton} from "./DashboardSideMenuButton";
import {useCurrentPath} from "../../../hooks/useCurrentPath";
import {HomeIcon} from "../../../assets/svg/HomeIcon";
import {ProjectsIcon} from "../../../assets/svg/ProjectsIcon";
import {TeamIcon} from "../../../assets/svg/TeamIcon";
import {SettingsIcon} from "../../../assets/svg/SettingsIcon";
import {ControlledSvg} from "../../../interface";
import {UserToolBox} from "../../User";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const pages: {
    name: string,
    link: ELinks,
    icon: React.FC<ControlledSvg>
}[] = [
    {
        name: 'Home',
        link: ELinks.home,
        icon: HomeIcon,
    },
    {
        name: 'Projects',
        link: ELinks.project,
        icon: ProjectsIcon,
    }, {
        name: 'Team',
        link: ELinks.team,
        icon: TeamIcon,
    }, {
        name: 'Settings',
        link: ELinks.accountManageData,
        icon: SettingsIcon,
    }
]


export const DashboardSideMenu = () => {
    const [selected, setSelected] = useState<ELinks>()
    const currentPath = useCurrentPath()

    useEffect(() => {
        if (currentPath) {
            const openedPath = pages.find((page) => currentPath.includes(page.link))
            setSelected(openedPath?.link)
        }
    }, [currentPath])

    const [userMenuRef, setUserMenuRef] = React.useState<HTMLElement | null>(null);

    const onUserMenuClick = (event: React.MouseEvent<HTMLElement>) => {
        setUserMenuRef(event.currentTarget);
    };
    const onCloseUserMenu = () => {
        setUserMenuRef(null);
    }

    return (
        <Box sx={{
            width: 272,
            px: '16px',
            boxSizing: 'border-box',
            backgroundColor: EColor.grey5,
            display: 'grid',
            height: '100vh',
            gridTemplateRows: 'min-content auto min-content',
            borderRightWidth: '1px',
            borderRightStyle: 'solid',
            borderRightColor: EColor.grey6,
        }}>
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                marginBottom: '48px',
                marginTop: '24px',
                marginLeft: '5px',
            }}>
                <Box sx={{
                    width: 17.7,
                    height: 26,
                }}>
                    <NodanomicsLogo/>
                </Box>
                <NodanomicsTextIcon/>
            </Box>
            <Box>
                {pages.map((page) => {
                    return (
                        <DashboardSideMenuButton
                            text={page.name}
                            icon={page.icon}
                            link={page.link}
                            isActive={selected === page.link}
                            key={page.name}
                        />
                    )
                })}
            </Box>
            <Box sx={{
                py: '12px',
                borderTopWidth: '1px',
                borderTopStyle: 'solid',
                borderTopColor: EColor.grey6,
                // height: 28,
                // display: 'flex',
                // alignItems: 'center',
                // gap: '10px',
            }}>
                <UserToolBox anchorElUser={userMenuRef} onClose={onCloseUserMenu}>
                    <Box
                        onClick={onUserMenuClick}
                        sx={{
                            cursor: 'pointer',
                            height: 28,
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px',
                        }}>
                        <IconButton sx={{p: 0, width: 28, height: 28}}>
                            <Avatar sx={{
                                width: 28,
                                height: 28,
                                fontSize: '14px',
                                fontWeight: 600,
                                backgroundColor: EColor.blue5,
                            }}>JS</Avatar>
                        </IconButton>
                        <Typography sx={{
                            color: EFontColor.white,
                            fontWeight: 500,
                            fontSize: '14px',
                        }}>
                            John Smith
                        </Typography>
                        <Box sx={{
                            flexGrow: 1,
                            display: 'flex',
                            justifyContent: 'flex-end',
                            paddingRight: '5px',
                        }}>
                            <ArrowForwardIosIcon sx={{

                                color: EFontColor.white,
                                fontSize: '20px',
                            }}/>
                        </Box>
                    </Box>

                </UserToolBox>
            </Box>
        </Box>
    );
};

