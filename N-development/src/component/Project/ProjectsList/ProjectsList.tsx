import React from 'react';
import {Box} from "@mui/material";

import {useProjectDashboardState} from "../../../redux";
import {ProjectsListElement} from "./ProjectsListElement";
import {useGetInfinityProjects} from "../../../hooks";




export const ProjectsList = ({scrollComponentRef}: {scrollComponentRef: React.RefObject<HTMLDivElement>}) => {
    useGetInfinityProjects(scrollComponentRef); // Pass the ref to your hook
    // useGetInfinityProjects()
    const {projects} = useProjectDashboardState()

    return (

      <Box>
          <Box
              sx={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  border: 'none',
                  height: 'fit-content',
                  columnGap: '28px',
                  rowGap: '48px',
                  alignItems: 'center',
                  justifyContent: 'center',
                  overflow: 'auto', // Make sure this container can scroll
              }}
          >
              {projects.map((project) => (
                  <ProjectsListElement
                      projectName={project.name}
                      projectId={project.id}
                      key={project.id}
                  />
              ))}
          </Box>
      </Box>
    );
};
