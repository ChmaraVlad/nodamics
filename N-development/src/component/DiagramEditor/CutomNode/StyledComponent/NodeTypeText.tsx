import {SxProps, Theme, Typography, TypographyProps} from "@mui/material";
import {EFontColor} from "../../../../constant";
import React from "react";




const baseSx: SxProps<Theme> = {
    wordBreak: 'break-word',
    color: EFontColor.grey10,
    fontWeight: 400,
    fontSize: 16,
    lineHeight: '15px',
    letterSpacing: '-0.02em',
}


export const NodeTypeText: React.FC<{
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