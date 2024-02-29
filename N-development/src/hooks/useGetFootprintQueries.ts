import {useGetFootprintQuery} from "../api";
import {useEffect} from "react";
import {useParams} from "react-router-dom";
import {diagramEditorActions, useAppDispatch} from "../redux";
import {FootprintQuery, GetFootprintQueryResponse} from "../interface";
import {isArray} from "lodash";
import {FootprintResultType} from "../constant";

export const useGetFootprintQueries = () => {
    const {diagramId: currentDiagramId} = useParams() as { diagramId: string }
    const dispatch = useAppDispatch()
    const {data} = useGetFootprintQuery({diagramId: currentDiagramId})

    useEffect(() => {
        const validateQueries = (queries: GetFootprintQueryResponse): FootprintQuery[] => {
            const validatedQueries: FootprintQuery[] = []
            for (const query of queries) {
                if (query.result) {
                    if (typeof query.result === 'object' && isArray(query.result)) {
                        validatedQueries.push({
                            ...query,
                            result: {
                                type: FootprintResultType.ARRAY,
                                array: query.result
                            }
                        })
                    }
                }
            }
            return  validatedQueries
        }

        if (data && data.content) {
            dispatch(diagramEditorActions.setFootprintQueries({
                queries: validateQueries(data.content)
            }))
        }
    }, [data]);

    return data
}