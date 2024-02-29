import {Box, styled} from "@mui/material";
import {EColor, nodeActiveColorMap} from "../../../../constant";
import React from "react";
import {IMicroLoopNodeData, IWhileLoopNodeData} from "../../../../interface";
import {useIsElementExecuted} from "../../../../hooks";

const sideStyles = {
    left: {
        left: 0,
        transform: 'translate(-50%, -50%)',
    },
    right: {
        right: 0,
        transform: 'translate(50%, -50%)',
    }

}

const LoopConnectionHandlerInnerLeftGroup = styled(Box)(() => ({
    position: 'absolute',
    top: '50%',
    left: '-3.5px',
    transform: 'translate(50%, -50%)',
    display: 'flex',
    flexDirection: 'column',
    gap: '32px',
}))

const LoopConnectionHandlerInnerRightGroup = styled(Box)(() => ({
    position: 'absolute',
    top: '50%',
    right: '-3.5px',
    transform: 'translate(-50%, -50%)',
    display: 'flex',
    flexDirection: 'column',
    gap: '32px',
}))

type CompoundProps = {
    RightGroup: typeof LoopConnectionHandlerInnerRightGroup
    LeftGroup: typeof LoopConnectionHandlerInnerLeftGroup
}

interface LoopConnectionHandlerProps {
    side: 'left' | 'right'
    children: React.ReactNode
    loop: IWhileLoopNodeData | IMicroLoopNodeData
}

export const LoopConnectionHandler: React.FC<LoopConnectionHandlerProps> & CompoundProps = ({
                                                                                                children,
                                                                                                side,
                                                                                                loop
                                                                                            }) => {
    // we need random to ser animation id

    const animationId = `loop-container-blink-${side}-${loop.id}`
    const isPlayAnimation = useIsElementExecuted(loop)

    const activeBorderColor = nodeActiveColorMap[loop.type]
    const sideStyle = sideStyles[side]
    return (<Box sx={{
        position: 'absolute',
        backdropFilter: 'blur(1.5px)',
        top: '50%',
        background: 'linear-gradient(103.06deg, rgba(84, 84, 84, 0.25) 0%, rgba(48, 48, 48, 0.35) 52.6%, rgba(48, 48, 48, 0.25) 100%)',
        width: 42,
        height: 58,
        borderRadius: '6px',
        borderColor: loop.style.borderColor || EColor.lightBrown,
        borderStyle: 'solid',
        borderWidth: 1,
        animation: isPlayAnimation ? `${animationId} 0.2s linear 3` : 'none',
        [`@keyframes ${animationId}`]: {
            "50%": {
                borderColor: activeBorderColor,
            }
        },
        ...sideStyle,
    }}>
        <Box sx={{
            position: 'relative',
            width: '100%',
            height: '100%',
        }}>
            {children}
        </Box>

    </Box>)
}

LoopConnectionHandler.LeftGroup = LoopConnectionHandlerInnerLeftGroup
LoopConnectionHandler.RightGroup = LoopConnectionHandlerInnerRightGroup