import React, {useEffect} from 'react';
import {Box, Grid} from "@mui/material";
import {IDiagramBaseInteractiveElementData} from "../../../../../interface";
import {useToggle} from "../../../../../hooks";
import {BaseSection} from "./BaseSection";
import {ElementCommentParameter} from "../parameter/generic";

export const CommentSection: React.FC<{
    element: IDiagramBaseInteractiveElementData
}> = ({element}) => {

    const accordionController = useToggle()

    useEffect(() => {
        accordionController.open()
    }, [element])

    return (
        <Box>

            <ElementCommentParameter element={element}/>
        </Box>
    );
};
