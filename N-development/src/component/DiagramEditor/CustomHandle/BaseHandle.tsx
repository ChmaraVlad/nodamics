import React, {CSSProperties} from 'react';
// eslint-disable-next-line import/named
import {Handle, HandleProps, Position} from "reactflow";
import {EConnection, EConnectionMode} from "../../../interface";
import {Box} from "@mui/material";
import {EColor} from "../../../constant";
import {createHandleId} from "../../../service";

const transformStyles: { [key in Position]: string } = {
    left: 'translate(14%, -50%)',
    right: 'translate(-14%, -50%)',
    top: 'translate(-50%, 25%)',
    bottom: 'translate(-50%, -25%)',
}

const transformStylesStroke: { [key in Position]: string } = {
    left: 'translate(1px, -4px)',
    right: 'translate(-1px, -4px)',
    top: 'translate(-4px, -1px)',
    bottom: 'translate(-5.25px, -2px)',
}



export const BaseHandle: React.FC<Pick<HandleProps, 'isConnectable' | 'type' | 'position'> & {
    style?: React.CSSProperties
    connectionMode: EConnection
    color: EColor
    mode?: EConnectionMode
    isStroke?: boolean
}> = ({
          isConnectable,
          type,
          style,
          position,
          mode,
          connectionMode,
          color,
    isStroke
      }) => {
    // const id = `${connectionMode}.${mode}.${position}`;
    const id = createHandleId(connectionMode, position, mode);
    const size = '7px';

    const selectedStyle: CSSProperties = isStroke ? {
        width: size,
        height: size,
        borderWidth: '2px',
        borderColor: color,
        background: 'none',
        transform: transformStylesStroke[position],
        boxSizing: 'border-box',
    } : {
        width: size,
        height: size,
        background: color,
        transform: transformStyles[position],
        border: 'none',
    }

    return (
        <Box sx={{
            position: 'relative',
            height: size,
            width: size,
        }}>
            <Handle
                type={type}
                position={position}
                isConnectable={isConnectable}
                id={id}
                style={{
                    ...selectedStyle,
                    ...style
                }}
            />
        </Box>
    );
};

