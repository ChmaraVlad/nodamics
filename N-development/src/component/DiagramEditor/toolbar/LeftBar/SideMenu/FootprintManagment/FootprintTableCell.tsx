import React from 'react';
import {TableCell} from "@mui/material";
import {ParameterAutocomplete} from "../../../../../base";
import {diagramEditorActions, useAppDispatch} from "../../../../../../redux";
import {FootprintResultType} from "../../../../../../constant";
import {IFootprintCell, IFootprintDataNodeOptionValue} from "../../../../../../interface";
import {useChangeNodeDataStep, useChangeNodeDefaultResources} from "../../../../../../hooks";

export const FootprintTableCell: React.FC<{
    footprintQueryId: string
    cell: IFootprintCell
    dataNodesOptions: IFootprintDataNodeOptionValue[]
}> = ({footprintQueryId, cell, dataNodesOptions}) => {
    const dispatch = useAppDispatch()
const {changeValueWithId} = useChangeNodeDefaultResources()
    const onChangeDataNode = (value: {
        type: 'setNew'
        nodeId: string
        label: string
        rowIndex: number
        columnName: string
    } | {
        type: 'clear',
        nodeId: string
    }) => {
        const cellValue = Number(cell.value)
        if (value && footprintQueryId && value.type === 'setNew' && !isNaN(cellValue)) {
            dispatch(diagramEditorActions.updateNodeData({
                id: value.nodeId,
                footprint: {
                    type: FootprintResultType.ARRAY,
                    queryId: footprintQueryId,
                    rowIndex: value.rowIndex,
                    columnName: value.columnName,
                }
            }));
            changeValueWithId({
                nodeId: value.nodeId,
                value: cellValue,
            })
        } else {
            dispatch(diagramEditorActions.updateNodeData({
                id: value.nodeId,
                footprint: undefined
            }))
        }
    }
    const onRowChangeHandler = (newValue: IFootprintDataNodeOptionValue | null) => {
        if (newValue) {
            onChangeDataNode({
                nodeId: newValue.nodeId,
                label: newValue.label,
                rowIndex: cell.rowIndex,
                columnName: cell.columnName,
                type: 'setNew',
            })
        } else {
            if (cell.connectedDataNode?.nodeId) {
                onChangeDataNode({
                    type: 'clear',
                    nodeId: cell.connectedDataNode.nodeId
                })
            } else {
                console.error('cell.connectedDataNode?.nodeId is undefined')
            }
        }
    }
    return (
        <React.Fragment
            key={`${cell.label}_${cell.rowIndex}_${cell.value}`}>
            <TableCell >
                {cell.value}
            </TableCell>
            <TableCell>
                <ParameterAutocomplete
                    value={cell.connectedDataNode}
                    options={dataNodesOptions}
                    onChange={onRowChangeHandler}
                />
            </TableCell>
        </React.Fragment>
    );
};

