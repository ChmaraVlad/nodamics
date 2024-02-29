import {FootprintResultType} from "../../../constant";

export type FootprintIndexForNodeArray = {
    type: FootprintResultType.ARRAY,
    queryId: string,
    rowIndex: number,
    columnName: string,
}

export type FootprintIndexForNode = FootprintIndexForNodeArray