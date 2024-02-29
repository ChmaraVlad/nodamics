import React, { useState } from 'react';
import { FootprintQuery } from "../../../../../../interface";
import {Box, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button} from "@mui/material";
import {MButton} from "../../../../../base";
import {FootprintQueryInfoPopup} from "./FootprintQueryInfoPopup";

export const FootprintRowItem: React.FC<{ footprintQuery: FootprintQuery }> = ({ footprintQuery }) => {
    const [isShow, setIsShow] = useState(false);

    const handleClickOpen = () => {
        setIsShow(true);
    };

    const handleClose = () => {
        setIsShow(false);
    };

    return (
        <Box>
            <MButton.Submit  onClick={handleClickOpen} sx={{ width: '100%' }}>
                game
            </MButton.Submit>
            <FootprintQueryInfoPopup isShow={isShow} onClose={handleClose} footprintQuery={footprintQuery} />

        </Box>
    );
};