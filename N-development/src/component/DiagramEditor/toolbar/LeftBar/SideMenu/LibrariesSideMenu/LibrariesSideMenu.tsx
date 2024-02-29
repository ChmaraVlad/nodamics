import React from 'react';
import {Box, IconButton, Typography} from "@mui/material";
import {UploadSpreadSheetPopUp} from "../../../../../popUp";
import {useToggle} from "../../../../../../hooks";
import {useDiagramEditorState} from "../../../../../../redux";
import {useGetProjectInfoQuery, useGetSpreadSheetsBaseInfoQuery} from "../../../../../../api";
import {SpreadsheetPreviewButton} from "./SpreadsheetPreviewButton";
import {EColor, EFontColor} from "../../../../../../constant";
import {MButton} from "../../../../../base";
import {PlusIcon} from "../../../../../../assets/svg/PlusIcon";
import {ContentSeparator} from "../../../ElementSetupToolbar/styled";

export const LibrariesSideMenu: React.FC = () => {
    const uploadSpreadSheetPopUpManager = useToggle();
    const {currentDiagramId} = useDiagramEditorState()
    const {data: resProjectInfo} = useGetProjectInfoQuery({
        diagramId: currentDiagramId,
    }, {
        skip: !currentDiagramId,
    })

    const {data: spreadsheets} = useGetSpreadSheetsBaseInfoQuery({
        projectId: resProjectInfo?.id,
    }, {
        skip: !resProjectInfo?.id,
    })

    const lastId = spreadsheets?.data[spreadsheets?.data.length - 1]?.id


    return (
        <>
            {resProjectInfo && <UploadSpreadSheetPopUp
                type="uploadNewSpreadsheet"
                projectId={resProjectInfo.id}
                onClose={uploadSpreadSheetPopUpManager.close}
                isShow={uploadSpreadSheetPopUpManager.isOpened}
            />}

            <>
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}>
                    <Typography sx={{
                        fontWeight: 500,
                        color: EFontColor.white,
                    }}>
                        Spreadsheets
                    </Typography>
                    <IconButton
                        onClick={uploadSpreadSheetPopUpManager.open}
                    >
                        <PlusIcon/>
                    </IconButton>
                </Box>
                <Box sx={{
                    width: '100%',
                    height: '1px',
                    backgroundColor: EColor.grey6,
                    mt: '20px',
                    mb: '24px',
                }}/>
                <Box>
                    {spreadsheets?.data.map((spreadsheet) => {
                        const isLast = spreadsheet.id === lastId
                        return (
                            <SpreadsheetPreviewButton
                                spreadsheet={spreadsheet}
                                key={spreadsheet.id}
                                showBorder={!isLast}
                            />
                        )
                    })}
                </Box>
            </>
        </>
    );
};
