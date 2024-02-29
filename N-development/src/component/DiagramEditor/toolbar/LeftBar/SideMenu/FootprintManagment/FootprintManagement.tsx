import React from 'react';
import {EColor} from "../../../../../../constant";
import {Box} from "@mui/material";
import {useAppSelector, useDiagramEditorState} from "../../../../../../redux";
import {FootprintRowItem} from "./FootprintRowItem";

export const FootprintManagement = () => {
    const footprintQueries = useDiagramEditorState().footprintQueries.queries
    return (
        <Box sx={{
            backgroundColor: EColor.darkMarineLight,
            width: 400,
        }}>
            {footprintQueries?.map((footprintQuery) => {
                return (
                    <FootprintRowItem
                        footprintQuery={footprintQuery}
                        key={footprintQuery.id}
                    />
                )
            })}
        </Box>
    );
};

