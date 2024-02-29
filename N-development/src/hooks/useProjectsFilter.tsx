import {ProjectStatus} from "../constant";
import {useState} from "react";

const ALL = 'all'

const projectFilterVariants = [{
    value: ALL,
    label: 'All'
}, {
    value: ProjectStatus.Draft,
    label: 'Drafts'
}, {
    value: ProjectStatus.Shared,
    label: 'Shared projects'
}]

export const useProjectsFilter = () => {
    const [selectedTab, setSelectedTab] = useState(ALL);


    return {
        selectedTab,
        projectFilterVariants,
        setSelectedTab
    }
}
