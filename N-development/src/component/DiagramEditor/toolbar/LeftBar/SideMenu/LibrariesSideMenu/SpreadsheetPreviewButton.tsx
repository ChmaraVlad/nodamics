import React from 'react';
import {Box, Button, IconButton, Typography} from "@mui/material";
import {EColor} from "../../../../../../constant";
import {ISpreadsheetInfo} from "../../../../../../interface";
import {SpreadsheetViewerPopUp} from "../../../../../popUp";
import {useToggle} from "../../../../../../hooks";
import {ContentSeparator} from "../../../ElementSetupToolbar/styled";
import {SimpleArrow} from "../../../../../../assets/svg/SimpleArrow";

export const SpreadsheetPreviewButton: React.FC<{
    spreadsheet: ISpreadsheetInfo;
    showBorder?: boolean;
}> = ({spreadsheet, showBorder = true}) => {
    const spreadsheetViewerPopUpManager = useToggle();
    return (
        <>

            <SpreadsheetViewerPopUp
                isShow={spreadsheetViewerPopUpManager.isOpened}
                onClose={spreadsheetViewerPopUpManager.close}
                spreadsheetId={spreadsheet.id}
            />
            <Button
                onClick={spreadsheetViewerPopUpManager.open}
                sx={{
                    width: '100%',
                    borderBottomColor: EColor.grey6,
                    borderBottomWidth: showBorder ? '0.5px' : '0px',
                    borderBottomStyle: 'solid',
                    paddingBottom: '16px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}>
                <Typography sx={{
                    fontWeight: 'bold',
                    color: EColor.grey2,
                }}>
                    {spreadsheet.name}
                </Typography>
                <Box sx={{
                    width: 16,
                    height: 16,
                    transform: 'rotate(-90deg)',
                }}>
                    <SimpleArrow/>
                </Box>
            </Button>
        </>

    );
};
