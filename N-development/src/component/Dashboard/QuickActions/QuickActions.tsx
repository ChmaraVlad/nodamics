import React from 'react';
import {Box, styled, Typography} from "@mui/material";
import {EColor} from "../../../constant";
import NewProjectImage from '../../../assets/image/NewProjectImage.png'
import ProjectPlaceHolder from '../../../assets/image/ProjectPlaceHolder.png'
import ManageTeamImage from '../../../assets/image/ManageTeamImage.png'
import { useToggle } from '../../../hooks';
import { CreateProjectPopUp } from '../../popUp';

const borderImage = 'url("data:image/svg+xml,%3csvg width=\'100%25\' height=\'100%25\' xmlns=\'http://www.w3.org/2000/svg\'%3e%3crect width=\'100%25\' height=\'100%25\' fill=\'none\' rx=\'8\' ry=\'8\' stroke=\'%23333\' stroke-width=\'3\' stroke-dasharray=\'10\' stroke-dashoffset=\'10\' stroke-linecap=\'square\'/%3e%3c/svg%3e")'

const QuickActionItemContainer = styled(Box)({
    width: 320,
    height: 222,
    overflow: 'hidden',
    borderRadius: '8px',
    cursor: 'pointer',
    position: 'relative',
})

const QuickActionImage = styled('img')({
    width: '100%',
    height: '100%',
    borderRadius: '8px',
    objectFit: 'cover',
})

const QuickActionItemText = styled(Typography)({
    fontFamily: 'Inter',
    fontSize: 16,
    color: EColor.white,
    fontWeight: 400,
    position: 'absolute',
    bottom: '20px',
    left: '16px',
})

export const QuickActions = () => {
    const createProjectPopUp = useToggle()

    return (
        <Box sx={{
            width: '100%',
            height: 316,
            borderRadius: '8px',
            backgroundImage: borderImage,
            backgroundColor: EColor.grey7,
            display: 'flex',

            justifyContent: 'center',
        }}>
            <CreateProjectPopUp
                onClose={createProjectPopUp.close}
                isShow={createProjectPopUp.isOpened}
            />
            <Box >
                <Typography sx={{
                    fontFamily: 'Inter',
                    fontSize: 24,
                    fontWeight: 600,
                    color: EColor.white,
                    py: '16px',
                }}>
                    Quick actions
                </Typography>
                <Box sx={{
                    display: 'flex',
                    gap: '32px',
                }}>
                    <QuickActionItemContainer>
                        <QuickActionImage
                            onClick={createProjectPopUp.open}
                            src={NewProjectImage}
                            alt="New Project"
                        />
                        <QuickActionItemText>
                            Create a new project
                        </QuickActionItemText>
                    </QuickActionItemContainer>
                    <QuickActionItemContainer>
                        <QuickActionImage
                            src={ProjectPlaceHolder}
                        />
                        <QuickActionItemText>
                            Continue working on Draft_02
                        </QuickActionItemText>
                    </QuickActionItemContainer>
                    <QuickActionItemContainer>
                        <QuickActionImage
                            src={ManageTeamImage}
                        />
                        <QuickActionItemText>
                            Manage your team
                        </QuickActionItemText>
                    </QuickActionItemContainer>
                </Box>
            </Box>

        </Box>
    );
};

