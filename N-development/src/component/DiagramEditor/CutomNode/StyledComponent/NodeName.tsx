import {SxProps, Theme, Typography, TypographyProps} from "@mui/material";
import {EFontColor} from "../../../../constant";
import React from "react";


const baseSx: SxProps<Theme> = {
    wordBreak: 'break-word',
    color: EFontColor.white,
    fontWeight: 600,
    fontSize: 16,
    lineHeight: '19px',
    letterSpacing: '0.02em',
}



export const NodeTextName: React.FC<{
    children: React.ReactNode,
} & TypographyProps> = (
    {
        children,
        sx,
        ...props
    }
) => {

    const outerSx = sx || {}
    const textSx: TypographyProps['sx'] = {
        ...baseSx,
        ...outerSx,
        // color: EFontColor.grey2,
    } as TypographyProps['sx']

    return (<Typography
        sx={textSx}
        {...props}
    >
        {children}
    </Typography>)
}