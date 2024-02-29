import React, {useCallback, useState} from 'react';
import {Box, IconButton, Tooltip} from "@mui/material";
import {DiagramEditorDropDownMenuContent} from "./DiagramEditorDropDownMenuContent";
import {NodanomicsLogo} from "../../../assets/svg/NodanomicsLogo";
import {SimpleArrow} from "../../../assets/svg/SimpleArrow";

export const DiagramEditorDropDownMenu = () => {
    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = useCallback(() => {
        setAnchorElUser(null);
    }, [])
    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
            }}
        >

            <Tooltip title="Open settings">
                <IconButton
                    onClick={handleOpenUserMenu}
                    sx={{
                        px: '2px'
                    }}
                >
                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '10px'
                    }}>
                        <Box
                            sx={{

                                width: 14,
                                height: 20,
                            }}
                        >
                            <NodanomicsLogo/>
                        </Box>

                        <Box sx={{
                            width: 8,
                            height: 8,
                            mb: '25px',
                        }} component="span">
                            <SimpleArrow/>
                        </Box>

                    </Box>

                    {/*<BurgerMenuIcon/>*/}
                </IconButton>
            </Tooltip>
            <DiagramEditorDropDownMenuContent
                anchorEl={anchorElUser}
                close={handleCloseUserMenu}
            />
        </Box>
    );
};
