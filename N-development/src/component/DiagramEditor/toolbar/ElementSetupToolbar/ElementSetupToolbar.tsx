import React, {useState} from 'react';
import {Box, styled, Tab as MuiTab, Tabs, Typography} from "@mui/material";
import {EFontColor, NodeSetupSidebarMenu} from "../../../../constant";
import {EDiagramNode, EElementType, isINodeHistory, nodeSetupToolbarNames} from "../../../../interface";
import {ContentSeparator} from "./styled";
import {CommentSection, NodeStatisticSection, PropertiesSection} from "./section";
import {NodeDeleteButton} from "./NodeDeleteButton";
import {useCurrentEditElement} from "../../../../hooks";
import {useDiagramEditorState} from "../../../../redux";


const Tab = styled(MuiTab)({
    padding: 0,
    color: EFontColor.white,
    textTransform: 'none',
    fontSize: '16px',
    fontWeight: 300,
    letterSpacing: '0.32px',
    minHeight: 'fit-content',
})

export const ElementSetupToolbar = () => {
    const selectedElementData = useCurrentEditElement()?.data
    const [openedTab, setOpenedTab] = useState(NodeSetupSidebarMenu.Properties);

    const handleChangeTab = (_: React.SyntheticEvent, newValue: NodeSetupSidebarMenu) => {
        setOpenedTab(newValue);
    };
    const isNodeHasHistory = selectedElementData?.elementType === EElementType.Node && isINodeHistory(selectedElementData)
    return (
        <>
        {selectedElementData ?
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        flex: 1,
                    }}
                >
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 2,
                    }}>
                        <Box>
                            <Typography sx={{
                                color: EFontColor.white,
                                fontSize: '16px',
                                fontWeight: 500,
                            }}>
                                {nodeSetupToolbarNames[selectedElementData.type]}
                            </Typography>
                        </Box>
                        <Tabs
                            value={openedTab}
                            onChange={handleChangeTab}
                            sx={{
                                p: 0,
                                minHeight: '26px',
                            }}
                        >
                            <Tab label="Properties" value={NodeSetupSidebarMenu.Properties}/>
                            {isNodeHasHistory && <Tab label="Statistics" value={NodeSetupSidebarMenu.Statistics}/>}
                            <Tab label="Comment" value={NodeSetupSidebarMenu.Comment}/>
                        </Tabs>
                        <ContentSeparator/>

                        {NodeSetupSidebarMenu.Properties === openedTab &&
                            <PropertiesSection selectedElementData={selectedElementData}/>}


                        {NodeSetupSidebarMenu.Statistics === openedTab && selectedElementData?.elementType === EElementType.Node &&
                            <NodeStatisticSection nodeData={selectedElementData}/>}
                        {NodeSetupSidebarMenu.Comment === openedTab &&
                            <CommentSection element={selectedElementData}/>}


                    </Box>

                    {selectedElementData.elementType === EElementType.Node && <Box
                        sx={{
                            mt: 2,
                            display: 'flex',
                            justifyContent: 'flex-end',
                        }}
                    >
                        {selectedElementData.type !== EDiagramNode.Start &&
                            <NodeDeleteButton nodeId={selectedElementData.id}/>}
                    </Box>}
                </Box>
                : <Typography sx={{
                    color: EFontColor.grey4,

                }}>
                    Please select an element to edit
                </Typography>
        }
        </>
    );
};

