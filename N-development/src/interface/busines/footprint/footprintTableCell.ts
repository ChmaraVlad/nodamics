export interface IFootprintDataNodeOptionValue {
    nodeId: string
    label: string
}

export interface IFootprintCell {
    value: string | number | boolean,
    label: string,
    rowIndex: number,
    columnName: string,
    connectedDataNode?: IFootprintDataNodeOptionValue
}
