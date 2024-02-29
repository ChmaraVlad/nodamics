import {IDataNodeData, IResource} from "../interface";
import {generateResource} from "../service";
import {useUpdateNode} from "./useUpdateNode";
import {diagramEditorActions, useAppDispatch} from "../redux";
import {useOffHistoryExecuted} from "./useOffHistoryExecuted";

export const useChangeNodeDefaultResources = ()=>{
    const dispatch = useAppDispatch()
    const offHistoryExecuted = useOffHistoryExecuted()

    const changeValueWithId = (data: { value: number | string, nodeId: string }) => {
        const countToGenerate = Number(data.value)
        const newResources: IResource = generateResource(countToGenerate)
        offHistoryExecuted(`useChangeNodeDefaultResources nodeId: ${data.nodeId}`)
        dispatch(diagramEditorActions.updateNodeData({
            id: data.nodeId,
            resources: newResources,
            initialResources: newResources,
            resourcesToProvide: newResources,
        }))
    }
    return {
        changeValueWithId
    }
}