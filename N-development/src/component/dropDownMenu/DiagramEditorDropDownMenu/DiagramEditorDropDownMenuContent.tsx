import React, {useCallback, useState} from 'react';
import {Box, Menu, MenuItem as MuiMenuItem, styled, SxProps} from "@mui/material";
import {useToggle, useUploadDiagram} from "../../../hooks";
import {EDiagramManagerType} from "../../form";
import {useNavigate} from "react-router-dom";
import {ELinks} from "../../../service";
import {useDiagramEditorState} from "../../../redux";
import {useDeleteDiagramMutation, useGetProjectInfoQuery} from "../../../api";
import {CreateDiagramPopUp} from "../../popUp";
import {DiagramManagerPopUp} from "../../popUp/NewDiagramPopUp";
import {useDownloadDiagram} from "../../../hooks/useDownloadDiagram";
import {EColor, EFontColor} from "../../../constant";
import {ImportDiagramPopup} from "../../ImportDiagram";

type IMenuButton = {
    name: string
    onClick: () => void
    sx?: SxProps
} | {
    key: string
    Node: React.ReactNode
    sx?: SxProps
}

const MenuItem = styled(MuiMenuItem)({
    color: EFontColor.white,
    fontSize: '12px',
    letterSpacing: '0.24px',
    fontWeight: 400,
})

export const DiagramEditorDropDownMenuContent: React.FC<{
    anchorEl: HTMLElement | null
    close: () => void
}> = ({
          anchorEl,
          close
      }) => {
    const navigate = useNavigate()
    const toggleCreateDiagram = useToggle()

    const {currentDiagramId} = useDiagramEditorState()
    const [deleteDiagram] = useDeleteDiagramMutation()
    const [diagramManagerType, setDiagramManagerType] = useState<EDiagramManagerType>(EDiagramManagerType.new)
    const {
        open: openManagerDiagramPopUp,
        close: closeManagerDiagramPopUp,
        isOpened: isManagerDiagramPopUpShow
    } = useToggle()

    const onNewDiagram = () => {
        toggleCreateDiagram.open()
        close()
    }

    const onRenameDiagram = () => {
        setDiagramManagerType(EDiagramManagerType.rename)
        openManagerDiagramPopUp()
    }

    const onCloseManagerDiagramPopUp = useCallback(() => {
        closeManagerDiagramPopUp()
    }, [])

    const onCopyDiagram = () => {
        setDiagramManagerType(EDiagramManagerType.makeACopy)
        openManagerDiagramPopUp()
    }

    const onProjects = () => {
        navigate(ELinks.project)
    }


    const onDelete = () => {
        if (currentDiagramId) {
            deleteDiagram(currentDiagramId)
        }
    }

    const download = useDownloadDiagram()
    const {uploadFile, importDiagramState, cancelImport, approveImport} = useUploadDiagram()


    const buttons: IMenuButton[] = [{
        name: 'New',
        onClick: onNewDiagram
    }, {
        name: 'Projects',
        onClick: onProjects,
        sx: {
            borderBottomStyle: 'solid',
            borderBottomWidth: '1px',
            borderBottomColor: EColor.grey6,
        }
    }, {
        name: 'Save (auto save)',
        onClick: () => {
            //
        }
    }, {
        name: 'Export',
        onClick: download
    }, {
        key: 'import',
        Node: <label
            style={{
                width: '100%',
                height: '100%',
                cursor: 'pointer'
            }}
        >
            <input type="file" accept=".json" onChange={uploadFile} hidden/>
            Import
        </label>
    }, {
        name: 'Rename',
        onClick: onRenameDiagram
    }, {
        name: 'Make a copy',
        onClick: onCopyDiagram,
        sx: {
            borderBottomStyle: 'solid',
            borderBottomWidth: '1px',
            borderBottomColor: EColor.grey6,
        }
    }, {
        name: 'Delete',
        onClick: onDelete,
        sx: {
            color: EColor.red3,
        }
    }]

    const {data: projectInfo} = useGetProjectInfoQuery({
        diagramId: currentDiagramId
    })

    return (
        <>
            <Box>
                {projectInfo &&
                    <CreateDiagramPopUp
                        projectId={projectInfo.id}
                        isShow={toggleCreateDiagram.isOpened}
                        onClose={toggleCreateDiagram.close}
                        onSuccess={({id: newDiagramId}) => {
                            navigate(`${ELinks.diagram}/${newDiagramId}`)
                        }}
                    />}
            </Box>
            {importDiagramState && <ImportDiagramPopup
                importDiagramState={importDiagramState}
                approve={approveImport}
                isShow={Boolean(importDiagramState)}
                onClose={cancelImport}
            />}

            <Menu
                sx={{
                    mt: '25px',

                }}
                slotProps={{
                    paper: {
                        sx: {
                            backgroundColor: EColor.grey5,
                            backdropFilter: 'blur(5px)',
                            borderRadius: '8px',
                            width: '200px',
                        }
                    }
                }}
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={Boolean(anchorEl)}

                onClose={close}
            >

                <DiagramManagerPopUp
                    type={diagramManagerType}
                    isShow={isManagerDiagramPopUpShow}
                    onClose={onCloseManagerDiagramPopUp}
                />

                {buttons.map((button) => {
                    if ('name' in button) {
                        return (<MenuItem
                            onClick={button.onClick}
                            key={button.name}
                            sx={button.sx}
                        >{button.name}</MenuItem>)
                    }
                    return <MenuItem
                        key={button.key}
                        sx={button.sx}
                    >{button.Node}</MenuItem>
                })}
            </Menu>
        </>
    );
};

