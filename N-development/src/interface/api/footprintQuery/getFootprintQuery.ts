export type GetFootprintQueryResponse = {
    id: string;
    sqlQuery: string;
    projectId?: string;
    result: JSON | false;
}[]