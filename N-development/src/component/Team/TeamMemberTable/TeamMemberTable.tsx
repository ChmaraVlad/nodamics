import React, {useMemo} from 'react';
import {
    Avatar,
    Box,
    IconButton, styled,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    TableSortLabel,
    Typography
} from "@mui/material";
import {useTeamDashboardState} from "../../../redux";

import {ArrowDropDown} from "@mui/icons-material";
import {TableCellProps} from "@mui/material/TableCell/TableCell";
import {EColor, EFontColor} from "../../../constant";
import {ArrowDrop} from "../../../assets/svg/ArrowDrop";
import { ITeamMemberInfo} from "../../../interface";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {ThreeDotsIcon} from "../../../assets/svg/ThreeDotsIcon";


interface AppTableHeaderCell {
    slotsProps?: {
        TableCellProps?: TableCellProps
    },
    hidden?: boolean
    name?: string
}

const StyledHeaderCell = styled(TableCell)(() => ({
    borderBottom: 'none',
}));

const AppTableHeaderCellWithSort: React.FC<AppTableHeaderCell> = ({name, slotsProps, hidden}) => {
    return (

        <StyledHeaderCell {...slotsProps?.TableCellProps}>
            {!hidden && <Box sx={{
                display: 'flex',
                alignItems: 'center'
            }}>
                <Typography sx={{
                    fontSize: 16,
                    color: EFontColor.white,
                    fontFamily: 'Inter',
                    fontWeight: 500,
                }}>
                    {name}
                </Typography>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    marginLeft: '8px',
                }}>
                    <IconButton sx={{
                        padding: '2px',
                    }}>
                        <ArrowDrop svgProps={{
                            style: {
                                transform: 'rotate(180deg)'
                            }
                        }}/>
                    </IconButton>
                    <IconButton sx={{
                        padding: '2px',
                    }}>
                        <ArrowDrop/>
                    </IconButton>
                </Box>
            </Box>}
        </StyledHeaderCell>
    );
}


export type TableCellComponent<Row, AdditionalData> = React.FC<{
    row: Row;
    additionalData: AdditionalData;
}>;

export enum TableCellType {
    Cell = 'Cell',
    Component = 'Component',
}


interface AppTableCellBase<Row, AdditionalData> {
    columnName?: string
    columnKey: Extract<keyof Row, string> | string;
    tableCellType: TableCellType;
    width?: string;
}

interface AppTableCellComponent<Row, AdditionalData> extends AppTableCellBase<Row, AdditionalData> {
    tableCellType: TableCellType.Component;
    Component: TableCellComponent<Row, AdditionalData>;
}

interface AppTableCellText<Row, AdditionalData> extends AppTableCellBase<Row, AdditionalData> {
    tableCellType: TableCellType.Cell;
    columnKey: Extract<keyof Row, string>;
    modifyValue?: (row: Row) => string;
}

type AppTableColumn<Row, AdditionalData> =
    AppTableCellComponent<Row, AdditionalData>
    | AppTableCellText<Row, AdditionalData>;


const StyledTableCell = styled(TableCell)(() => ({
    borderBottomColor: EColor.grey6,
    backgroundColor: 'transparent',
}))

const StyledTableBody = styled(TableBody)(() => ({
    borderRight: ' 16px solid transparent',
    borderLeft: '16px solid transparent',
    'td': {
        backgroundColor: EColor.grey7,
        display: ' table-cell'
    },
    'tr td:first-child': {
        // backgroundColor: 'red',
        marginRight: '16px',
        // borderTopLeftRadius: '8px',
    },
    'tr:first-child td:first-child': {
        borderTopLeftRadius: '8px',
    },
    ' tr:first-child td:last-child': {
        borderTopRightRadius: '8px',
    },
    ' tr:last-child td:first-child': {
        borderBottomLeftRadius: '8px',
    },
    ' tr:last-child td:last-child': {
        borderBottomRightRadius: '8px',
    },
}))

export const TeamMemberTable = () => {
        const teamMembers = useTeamDashboardState().teamMembers

        const headers: AppTableHeaderCell[] = useMemo(() => [{
            name: 'Member',
            slotsProps: {
                TableCellProps: {
                    colSpan: 2,
                }
            }
        }, {
            name: 'Last active',
        }, {
            name: 'Role',
        }, {
            hidden: true,
            name: '',
        }], [])


        const columns: AppTableColumn< ITeamMemberInfo, unknown>[] = useMemo(() => [
                {
                    columnKey: 'avatar',
                    columnName: 'avatar',
                    tableCellType: TableCellType.Component,
                    width: '30px',
                    Component: ({row}) => {
                        return (
                            <Box sx={{
                                display: 'flex',
                                alignItems: 'center'
                            }}>
                                <Avatar sx={{
                                    width: 32,
                                    height: 32,
                                    fontSize: 14,
                                    backgroundColor: EColor.blue5,
                                }}>
                                    {row.firstName[0]}{row?.lastName?.[0]}
                                </Avatar>
                            </Box>
                        );
                    }
                },
                {
                    columnKey: 'member',
                    columnName: 'Member',
                    tableCellType: TableCellType.Component,
                    Component: ({row}) => {
                        return (
                            <Box sx={{
                                display: 'flex',
                                flexDirection: 'column',
                            }}>
                                <Typography sx={{
                                    fontSize: 14,
                                    color: EFontColor.white,
                                    fontFamily: 'Inter',
                                    fontWeight: 500,
                                }}>
                                    {row.firstName} {row?.lastName}
                                </Typography>
                                <Typography sx={{
                                    fontSize: 12,
                                    color: EFontColor.grey,
                                    fontFamily: 'Inter',
                                    fontWeight: 400,
                                }}>
                                    {row.email}
                                </Typography>
                            </Box>
                        );
                    }
                }, {
                    columnKey: 'lastActive',
                    columnName: 'Last Active',
                    tableCellType: TableCellType.Cell,
                },
                {
                    columnKey: 'role',
                    columnName: 'Role',
                    tableCellType: TableCellType.Cell,
                },
                {
                    columnKey: 'info',
                    columnName: '',
                    tableCellType: TableCellType.Component,
                    width: '30px',
                    Component: ({row}) => {
                        return (
                            <Box sx={{
                                display: 'flex',
                                alignItems: 'center'
                            }}>
                                <IconButton>
                                    <ThreeDotsIcon/>
                                </IconButton>
                            </Box>
                        );
                    }
                }
            ],
            []
        )


        return (
            <Table>
                <TableHead>
                    <TableRow>
                        {headers.map((header) => {
                            return (
                                <AppTableHeaderCellWithSort {...header}/>
                            );
                        })}

                    </TableRow>
                </TableHead>
                <StyledTableBody>
                    {teamMembers.map((teamMember) => {
                        return (
                            <TableRow key={teamMember.id}>
                                {columns.map((column) => {
                                    if (column.tableCellType === TableCellType.Cell) {

                                        let cellValue: string | number | undefined = undefined;
                                        const rawCellValue = column.columnKey in teamMember && teamMember[column.columnKey];
                                        console.log('rawCellValue: ', rawCellValue)
                                        if (rawCellValue && (typeof rawCellValue === 'string' || typeof rawCellValue === 'number')) {
                                            cellValue = rawCellValue;
                                        }

                                        return (
                                            <StyledTableCell width={column.width}>
                                                <Typography sx={{
                                                    fontSize: 14,
                                                    color: EFontColor.white,
                                                    fontFamily: 'Inter',
                                                    fontWeight: 400,
                                                }}>
                                                    {column.modifyValue ? column.modifyValue(teamMember) : cellValue}
                                                </Typography>
                                            </StyledTableCell>
                                        );
                                    } else {
                                        return (
                                            <StyledTableCell width={column.width}>
                                                <column.Component row={teamMember} additionalData={{}}/>
                                            </StyledTableCell>
                                        );
                                    }
                                })}
                            </TableRow>
                        );
                    })}
                </StyledTableBody>
            </Table>
        );
    }
;

