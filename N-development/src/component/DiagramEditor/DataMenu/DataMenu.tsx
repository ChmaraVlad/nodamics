import React from 'react';
import {EColor, RightMenu} from "../../../constant";
import {Box, IconButton} from "@mui/material";
import {BookIcon} from "../../../assets/svg/BookIcon";
import {diagramEditorActions, useAppDispatch, useDiagramEditorState} from "../../../redux";

const buttons = [
    {
        Icon: BookIcon,
        rightMenu: RightMenu.Library,
    }
]

export const DataMenu = () => {
    const dispatch = useAppDispatch()
    const currentOpenRightMenu = useDiagramEditorState().rightMenu


    const setRightMenu = (rightMenu: RightMenu) => {
        const isRightMenuOpen = currentOpenRightMenu === rightMenu
        if (isRightMenuOpen) {
            dispatch(diagramEditorActions.setRightMenu(undefined))

        } else {
            dispatch(diagramEditorActions.setRightMenu(rightMenu))
        }
    }
    return (
        <Box
        className='data-menu__wrapper'
        sx={{
            width: 42,
            height: '100%',
            backgroundColor: EColor.grey5,
            borderColor: EColor.grey6,
            borderTopStyle: 'solid',
            borderTopWidth: '1px',
            boxSizing: 'border-box',
            pointerEvents: 'all',
            flexDirection: 'column',
            gap: '16px'
        }}>
            {buttons.map(({Icon, rightMenu}) => (
                <IconButton
                    onClick={() => setRightMenu(rightMenu)}
                    sx={{
                        width: 42,
                        height: 42,
                        color: EColor.grey1,
                        '&:hover': {
                            color: EColor.grey2,
                            backgroundColor: EColor.grey5,
                        }
                    }}
                >
                    <Icon/>
                </IconButton>
            ))}

        </Box>
    );
};

