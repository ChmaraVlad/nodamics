import React from 'react';
import {Button, Typography} from "@mui/material";
import {PlusIcon} from "../../../assets/svg/PlusIcon";
import {EColor} from "../../../constant";
import AppButton, {AppButtonVariant} from "../../base/Button/AppButton";

export const AddTeamMemberButton = () => {
    return (
        <AppButton variant={AppButtonVariant.plus}>
            Add Member
        </AppButton>
    );
};

