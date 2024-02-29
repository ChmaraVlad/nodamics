import {FootprintResultType} from "../../../constant";

export type FootprintQueryResultArray = {
    [key: string]: string | number | boolean
}[]

export type FootprintQueryResultArrayType = {
    type: FootprintResultType.ARRAY,
    array: FootprintQueryResultArray
}