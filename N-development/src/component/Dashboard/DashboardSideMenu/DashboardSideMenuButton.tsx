import React from 'react';
import {Box, SxProps, Typography} from "@mui/material";
import {EColor, EFontColor, LinkToSidebarButtonColorMapping} from "../../../constant";
import {Link} from "react-router-dom";
import {SideBarButtonColorTransition} from "../../../assets/svg/SideBarButtonColorTransition";
import {ControlledSvg} from "../../../interface";
import { ELinks } from '../../../service';

interface DashboardSideMenuButtonProps {
    icon: React.FC<ControlledSvg>
    text: string
    link: ELinks
    onClick?: (data: {
        link: ELinks
    }) => void
    isActive?: boolean
}

export const DashboardSideMenuButton: React.FC<DashboardSideMenuButtonProps> = ({
                                                                                    text,
                                                                                    icon: Icon,
                                                                                    link,
                                                                                    onClick,
                                                                                    isActive
                                                                                }) => {

    const onClickHandler = () => {
        onClick?.({link})
    }

    const activeStyle: SxProps = isActive ? {
        borderColor: EColor.grey6,
        borderStyle: 'solid',
        borderWidth: '2px',
    } : {}

    const color = isActive ? EColor.white : EColor.grey10;
    const bgColor = LinkToSidebarButtonColorMapping[link];

    return (
        <Link to={link} onClick={onClickHandler}>
            <Box
                sx={{
                    alignItems: 'center',
                    px: '8px',
                    display: 'flex',
                    gap: '10px',
                    cursor: 'pointer',
                    position: 'relative',
                    overflow: 'hidden',
                    width: '240px',
                    height: '40px',
                    boxSizing: 'border-box',
                    borderRadius: '4px',
                    ...activeStyle,
                }}
            >
                {isActive && <Box sx={{
                    position: 'absolute',
                    right: 0,
                    top: 0,
                }}>
                    <SideBarButtonColorTransition bgColor={bgColor}/>
                </Box>}
                <Box sx={{
                    width: '24px',
                    height: '24px',

                }}>
                    <Icon color={color}/>
                </Box>
                <Typography sx={{
                    color: color,
                    fontSize: '14px',
                    fontWeight: 400,
                    fontFamily: 'Inter'
                }}>
                    {text}
                </Typography>
            </Box>
        </Link>
    );
};

