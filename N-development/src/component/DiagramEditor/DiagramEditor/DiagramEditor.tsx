import React, {useEffect, useState} from 'react';
import {DiagramCanvas} from "../DiagramCanvas";
import style from './DiagramEditor.module.scss'
import {CanvasControl, RightMenuBar, ElementToolbar, LeftToolbar} from "../toolbar";
import {
    ReactFlowInstanceProvider, useCurrentEditElement,
    useGetEditDiagramFromServer,
    useSetAllSpreadSheetsToState,
    useWidthAndHeight
} from "../../../hooks";
import {Box} from "@mui/material";
import {DiagramEditorHeader} from "../DiagramEditorHeader";
import {CONFIG} from "../../../utils";
import {useGetFootprintQueries} from "../../../hooks/useGetFootprintQueries";
import {EColor} from "../../../constant";
import {DataMenu} from "../DataMenu";
import {diagramEditorActions, useAppDispatch, useDiagramEditorState} from "../../../redux";
import AIHelper from '../../AIHelper/AIHelper';


export const DiagramEditor = () => {
    const {isShowDiagram} = useGetEditDiagramFromServer()
    const dispatch = useAppDispatch()
    useGetFootprintQueries()
    const [isCanvasShow, setIsCanvasShow] = useState(false)

    // TODO after downloading the diagram from the server,
    //  it takes some time to display new elements instead of the old ones.
    //  Therefore, setTimeout is used
    useEffect(() => {
        if (!CONFIG.IS_OFFLINE) {
            let timeout: NodeJS.Timeout

            if (isShowDiagram && !isCanvasShow) {
                setTimeout(() => {
                    setIsCanvasShow(true)
                }, 150)
            } else {
                setIsCanvasShow(false)
            }
            return () => {
                clearTimeout(timeout)
            }
        } else {
            setIsCanvasShow(true)
        }
    }, [isShowDiagram])

    const {elementSize: diagramCanvasContainerSize, elementRef: diagramCanvasContainerRef} = useWidthAndHeight()

    useSetAllSpreadSheetsToState()
    const isRightMenuOpen = useDiagramEditorState().rightMenu




    return (
        <Box
            className={style.diagramEditorContainer}
        >
            <ReactFlowInstanceProvider>
                <DiagramEditorHeader/>
                <Box
                    ref={diagramCanvasContainerRef}
                    className={style.canvasContainer}>
                    {isCanvasShow && <DiagramCanvas/>}
                    <Box
                    className='toolbars__container'
                    sx={{
                        position: 'absolute',
                        width: diagramCanvasContainerSize.width,
                        height: diagramCanvasContainerSize.height,
                        pointerEvents: 'none',
                    }}>
                        {/*<Box sx={{*/}
                        {/*    position: 'absolute',*/}
                        {/*    right: 20,*/}
                        {/*    width: '100%',*/}
                        {/*    height: '100%',*/}
                        {/*}}>*/}
                        {/*    */}
                        {/*</Box>*/}
                        <Box
                            sx={{
                                display: 'flex',
                                width: '100%',
                                height: '100%',
                            }}
                        >
                            <LeftToolbar/>
                            {/*<Box sx={{*/}
                            {/*    position: 'absolute',*/}
                            {/*    left: 12,*/}
                            {/*    bottom: 12,*/}
                            {/*}}>*/}
                            {/*    <CanvasControl/>*/}
                            {/*</Box>*/}
                            <Box
                                sx={{
                                    position: 'relative',
                                    flex: 1,
                                }}
                            >

                                <Box
                                    sx={{
                                        position: 'absolute',
                                        bottom: 15,
                                        left: '40%',
                                        transform: 'translateX(-50%)',
                                    }}
                                >
                                    <ElementToolbar/>
                                </Box>
                                <Box
                                sx={{
                                    position: 'absolute',
                                    display: 'flex',
                                    right: 0,
                                    top: 0,
                                    height: diagramCanvasContainerSize.height,
                                }}>
                                    {isRightMenuOpen && <RightMenuBar/>}
                                    <DataMenu/>
                                </Box>

                                <AIHelper />
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </ReactFlowInstanceProvider>
        </Box>
    );
};
