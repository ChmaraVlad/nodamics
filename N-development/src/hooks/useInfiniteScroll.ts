import {useEffect, useRef, useState} from "react";
import {useComponentScrollToBottom} from "./usePageBottom";

export const useInfiniteScroll = () => {
    const [params, setParams] = useState<{ lastProjectId?: string, isLoading?: boolean }>({})
    const {lastProjectId, isLoading} = params
    const [cursorId, setCursorId] = useState<string>();
    const scrollRef = useRef<HTMLDivElement>(null);
    const prevProjectCursorId = useRef<string>();
    const reachedBottom = useComponentScrollToBottom(scrollRef)

    // make request when reached bottom
    useEffect(() => {
        if (reachedBottom && lastProjectId && lastProjectId !== prevProjectCursorId.current && !isLoading) {
            prevProjectCursorId.current = lastProjectId
            setCursorId(lastProjectId)
        }
    }, [reachedBottom])

    // make request until fill the screen
    useEffect(() => {
        if (lastProjectId && !isLoading && reachedBottom) {

            const lastProjectRef = scrollRef.current?.lastElementChild
            if (lastProjectRef && lastProjectId) {
                const lastProjectRefRect = lastProjectRef.getBoundingClientRect()
                if (lastProjectRefRect.y < window.innerHeight) {
                    prevProjectCursorId.current = lastProjectId
                    setCursorId(lastProjectId)
                }
            }

        }
    }, [lastProjectId, reachedBottom, isLoading])

    const clearCursor = () => {
        setCursorId(undefined)
    }

    return {
        cursorId,
        scrollRef,
        setParams,
        clearCursor,
    }
}
