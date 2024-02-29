import React, {useMemo} from 'react';
import {Box, Typography} from "@mui/material";
import {useDiagramEditorState} from "../../../redux";
import {DiagramEditorDropDownMenu} from "../../dropDownMenu";
import {TeamInlineListItem, TeamMembersInlineList} from "../../Team";
import {useGetProjectTeamMembersQuery} from "../../../api";
import {ITeamMemberInfo} from "../../../interface";
import {Optionalize} from "../../../utils";
import {useCurrentUser} from "../../../hooks";
import {EColor, EFontColor} from "../../../constant";
import {ExecutionToolbar} from "../toolbar";

export const DiagramEditorHeader = () => {
    const {name, currentDiagramId} = useDiagramEditorState()
    const {data: resTeamMembers} = useGetProjectTeamMembersQuery({
        diagramId: currentDiagramId
    }, {
        skip: !currentDiagramId
    })
    const {currentUser} = useCurrentUser()
    const owner: Optionalize<ITeamMemberInfo, 'avatar' | 'firstName' | 'lastName'> | undefined = currentUser && {
        avatar: currentUser.avatar,
        firstName: currentUser.firstName,
        lastName: currentUser.lastName,
    }

    const teamMembers: ITeamMemberInfo[] = useMemo(() => {
        if (resTeamMembers && currentUser) {
            return resTeamMembers.members.filter((teamMember) => teamMember.userId !== currentUser.id)
        }
        return []
    }, [resTeamMembers, currentUser])

    return (
        <Box
            sx={{
                backgroundColor: EColor.grey5,
                display: 'flex',
                justifyContent: 'space-between',
                height: 48,
                paddingLeft: '28px',
                paddingRight: '20px',
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    alignContent: 'center',
                    alignItems: 'center',
                    gap: '20px',
                }}
            >
                <DiagramEditorDropDownMenu/>
                <Typography sx={{
                    fontSize: 14,
                    fontWeight: 500,
                    color: EFontColor.white,
                }}>
                    {name}
                </Typography>
            </Box>
            <ExecutionToolbar/>
            <Box sx={{
                display: 'flex',
                gap: 0.8,
                alignItems: 'center',

            }}>
                <TeamMembersInlineList teamMembers={teamMembers}/>
                {owner && <TeamInlineListItem teamMember={owner} size="medium"/>}
            </Box>
        </Box>
    );
};
