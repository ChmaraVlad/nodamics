import {FootprintQueryResultAggregator} from "./footprintQueryResultAggregator";


export interface FootprintQuery {
    id: string;
    sqlQuery: string;
    projectId?: string;
    result: FootprintQueryResultAggregator | false;
}

