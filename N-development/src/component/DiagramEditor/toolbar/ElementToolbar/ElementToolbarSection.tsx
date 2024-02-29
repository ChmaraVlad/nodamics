import React from "react";
import {IDiagramElementPreviewToolbarElement} from "../../../../interface";
import {Box, Typography} from "@mui/material";
import {EColor} from "../../../../constant";
import {ElementToolbarElement} from "./ElementToolbarElement";

export const ElementToolbarSection: React.FC<{
    section: {
        name: string;
        elements: IDiagramElementPreviewToolbarElement[];
    }
}> = ({section}) => {
    return (
        <Box
            id="toolbar-type-section"
            sx={{
                display: 'flex',
                gap: '8px',
                justifyContent: 'center',
                alignItems: 'center',


            }}>
            {section.elements.map((element) => {
                return (
                    <ElementToolbarElement
                        key={element.type}
                        element={element}
                    />
                )
            })}
        </Box>
    )
};
