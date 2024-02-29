// eslint-disable-next-line import/named
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import { ITeamMemberInfo} from "../../interface";


export interface ITeamDashboardState {
    teamMembers: (ITeamMemberInfo)[];
    selectedTeamMemberId?: string;
}

const initialState: ITeamDashboardState = {
    teamMembers: [],
}

export const teamDashboardSlice = createSlice({
    name: 'teamDashboard',
    initialState,
    reducers: {
        setTeamMembers: (state, action: PayloadAction<{
            teamMembers: (ITeamMemberInfo)[]
        }>) => {
            state.teamMembers = action.payload.teamMembers
        },
        setSelectedTeamId: (state, action: PayloadAction<{
            teamMemberId: string
        }>) => {
            state.selectedTeamMemberId = action.payload.teamMemberId
        }
    }
})

export const teamDashboardAction = teamDashboardSlice.actions
