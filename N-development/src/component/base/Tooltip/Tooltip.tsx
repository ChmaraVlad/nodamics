import React, {ReactFragment} from 'react';
import {Tooltip as MuiTooltip} from "@mui/material";
import {TooltipProps} from "@mui/material/Tooltip/Tooltip";
import {TooltipBodyTitleAndText} from "./TooltipBodyTitleAndText";


type CompoundTooltipProps = {
    TitleAndText: typeof TooltipBodyTitleAndText,
}

export const Tooltip: CompoundTooltipProps & React.FC<TooltipProps>   = (props: TooltipProps) => {
    return (
        <MuiTooltip
            slotProps={{
                tooltip: {
                    sx: {
                        backgroundColor: 'transparent',
                        p: 0,
                    }
                }
            }}
            {...props}
        />

    );
};


Tooltip.TitleAndText = TooltipBodyTitleAndText;
