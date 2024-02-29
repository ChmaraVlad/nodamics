import React from 'react';
import {IBaseProject} from "../../../interface";
import {ProjectsListElement} from "./ProjectsListElement";
import {MAccordion} from "../../base";
import {dataMarkerTitle, EDateMarker} from "../../../constant";
import {Box} from "@mui/material";


export const ProjectListAccordion: React.FC<{
    projectDateGroup: EDateMarker,
    projects: IBaseProject[]
}> = ({projectDateGroup, projects}) => {
    return (
        <Box>
            {projects.map((project) => (
                <ProjectsListElement
                    projectName={project.name}
                    projectId={project.id}
                    key={project.id}
                />
            ))}
        </Box>
    );
};
