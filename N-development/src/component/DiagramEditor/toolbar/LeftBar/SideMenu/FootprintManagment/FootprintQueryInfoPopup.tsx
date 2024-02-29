import React, {useMemo} from 'react';
import {
    EDiagramNode,
    FootprintQuery,
    IDataNodeData,
    IFootprintCell,
    IFootprintDataNodeOptionValue,
} from "../../../../../../interface";
import {Box, Table, TableBody, TableCell, TableRow, Typography} from "@mui/material";
import {BasePopUp} from "../../../../../popUp";
import {EColor} from "../../../../../../constant";
import {Dialog} from "@headlessui/react";
import {useDiagramEditorState} from "../../../../../../redux";
import {FootprintTableCell} from "./FootprintTableCell";
import {isArray} from "lodash";



export const FootprintQueryInfoPopup: React.FC<{
    footprintQuery: FootprintQuery,
    isShow: boolean,
    onClose: () => void
}> = ({footprintQuery, isShow, onClose}) => {
    const {diagramNodes} = useDiagramEditorState()
    const dataNodes = useMemo(() => {
        const nodes: IDataNodeData[] = []
        diagramNodes.forEach(node => {
            if (node.data.type === EDiagramNode.Data) {
                nodes.push(node.data)
            }
        })
        return nodes
    }, [diagramNodes])

    const dataNodesOptions = useMemo(() => {
        const nodes: IFootprintDataNodeOptionValue[] = []
        diagramNodes.forEach(node => {
            if (node.data.type === EDiagramNode.Data) {
                nodes.push({
                    nodeId: node.id,
                    label: node.data.name
                })
            }
        })
        return nodes
    }, [diagramNodes])

    const tableViewData = useMemo(() => {
        if (footprintQuery.result && isArray(footprintQuery.result.array) && footprintQuery.result.array.length > 0) {
            const firstRow = footprintQuery.result.array[0]
            const headers = Object.keys(firstRow)
            const data = footprintQuery.result.array.map((row, index) => {
                return Object.entries(row).map(([columnName, value]) => {
                    const connectedDataNode = dataNodes.find(node => {
                        if (node.footprint && node.footprint.queryId === footprintQuery.id && node.footprint.columnName === columnName && node.footprint.rowIndex === index) {
                            return true
                        }
                    })
                    const connectedDataNodeFormatted: IFootprintDataNodeOptionValue | undefined = connectedDataNode ? {
                        nodeId: connectedDataNode.id,
                        label: connectedDataNode.name || '',
                    } : undefined
                    const cell: IFootprintCell = {
                        rowIndex: index,
                        columnName,
                        label: `${value}`,
                        value,
                        connectedDataNode: connectedDataNodeFormatted
                    }
                    return cell
                })
            })
            return {
                headers,
                data,
            }
        }
    }, [footprintQuery.result, dataNodes])
    return (
        <Dialog open={isShow} onClose={onClose}>
            <BasePopUp>
                <Dialog.Panel>
                    <Box sx={{
                        padding: '10px',
                        height: 600,
                        width: 700,
                        borderRadius: 8,
                        backgroundColor: EColor.darkMarineLight,
                        // added overflowY property with 'scroll' value
                        overflowY: 'scroll'
                    }}>
                        <Box>
                            <Typography sx={{
                                fontSize: 20,
                                fontWeight: 'bold',
                                color: EColor.white,
                                marginBottom: 2
                            }}>
                                Game
                            </Typography>
                        </Box>
                        {tableViewData && (

                            <Table sx={{
                                height: 400,
                                maxHeight: 400,
                            }}>
                                <TableBody sx={{
                                    // removed overflow: 'auto' and added height: '100%'
                                    height: '100%'
                                }}>
                                    <TableRow>
                                        {tableViewData.headers?.map((name, index) => {

                                            return (
                                                <React.Fragment key={name}>
                                                    <TableCell key={index}>
                                                        {name}
                                                    </TableCell>
                                                    <TableCell>
                                                        Data Node
                                                    </TableCell>
                                                </React.Fragment>
                                            );
                                        })}

                                    </TableRow>
                                    {tableViewData.data?.map((row, index) => {
                                        return (
                                            <TableRow key={index}>
                                                {row.map((cell, index) => {
                                                    return (
                                                        <FootprintTableCell cell={cell} dataNodesOptions={dataNodesOptions} footprintQueryId={footprintQuery.id} />
                                                    )
                                                })}

                                            </TableRow>
                                        );
                                    })}
                                </TableBody>
                            </Table>

                        )}
                    </Box>
                </Dialog.Panel>
            </BasePopUp>
        </Dialog>
    );
};