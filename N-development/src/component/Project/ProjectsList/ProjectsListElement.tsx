import React from 'react';
import {projectDashboardAction, useAppDispatch, useProjectDashboardState} from "../../../redux";
import {MView} from "../../base";
import {useNavigate} from "react-router-dom";
import {ELinks} from "../../../service";
import {Avatar, Box, Typography} from "@mui/material";
import ProjectSkeletonImage from "../../../assets/image/ProjectSkeletonImage.png"
import { EColor, EFontColor } from '../../../constant';

export const ProjectsListElement: React.FC<{
    projectName: string
    projectId: string
}> = ({projectName, projectId}) => {
    const navigate = useNavigate()

    const onClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        navigate(`${ELinks.project}/${projectId}`)
        // if (event.detail === 2) {
        //     navigate(`${ELinks.project}/${projectId}`)
        // }
        // dispatch(projectDashboardAction.setSelectedProjectId({
        //     projectId: projectId
        // }))
    }

    return (
        <Box
            onClick={onClick}
            sx={{
                cursor: 'pointer',
            }}>
            <Box sx={{
                width: 290,
                height: 176,
                borderRadius: '6px',
                overflow: 'hidden',
            }}>
                <Box
                    sx={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                    }}
                    src={ProjectSkeletonImage}
                    component="img"
                />
            </Box>
            <Box  sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingTop: '12px',
                paddingBottom: '4px'
            }}>
                <Box>
                    <Typography sx={{
                        color: EFontColor.white,
                        fontSize: 16
                    }}>
                        {projectName}
                    </Typography>
                    <Typography sx={{
                        color: EFontColor.grey10,
                        fontSize: 12
                    }}>
                        Edited 2 days ago
                    </Typography>
                </Box>
                <Avatar sx={{
                    width: 28,
                    height: 28,
                    fontSize: '14px',
                    fontWeight: 600,
                    backgroundColor: EColor.blue5,
                }}>JS</Avatar>
            </Box>

        </Box>
    );
};
