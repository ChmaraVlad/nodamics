import React, {useState} from 'react';
import {Box} from "@mui/material";
import {EColor, RightMenu} from "../../../../constant";

import {ElementSetupToolbar} from "../ElementSetupToolbar/ElementSetupToolbar";
import {useDiagramEditorState} from "../../../../redux";
import {LibrariesSideMenu} from "../LeftBar/SideMenu/LibrariesSideMenu";


export const RightMenuBar = () => {


    const {rightMenu} = useDiagramEditorState()
    return (
        <Box
            className='right-menu-bar'
            sx={{
                display: 'flex',

                pointerEvents: 'auto',
                borderStyle: 'solid',
                borderWidth: '1px',
                maxWidth: 320,
                width: 320,
                backgroundColor: EColor.grey5,
                height: '100%',
                boxSizing: 'border-box',
                overflowY: 'auto',
                overflowX: 'hidden',
                borderColor: EColor.grey6,

                px: '14px',
                py: '16px',

            }}
        >
            <Box sx={{
                width: '100%',
                height: 'fit-content',
                display: 'flex',
                flexDirection: 'column',
                px: '14px',
                py: '16px',
            }}>
                {rightMenu === RightMenu.NODE && <ElementSetupToolbar/>}
                {rightMenu === RightMenu.Library && <LibrariesSideMenu/>}
            </Box>
        </Box>
    );
};
