import React from 'react';
import {Box} from "@mui/material";
// /* Frame 91 */
//
// /* Auto layout */
// display: flex;
// flex-direction: row;
// align-items: flex-start;
// padding: 8px;
// gap: 10px;
//
// width: 52px;
// height: 52px;
//
// background: #1AA8AD;
// /* Small shadow */
// box-shadow: 0px 25px 10px rgba(0, 0, 0, 0.01), 0px 14px 8px rgba(0, 0, 0, 0.03), 0px 6px 6px rgba(0, 0, 0, 0.04), 0px 2px 3px rgba(0, 0, 0, 0.05);
// border-radius: 4px;
//
// /* Inside auto layout */
// flex: none;
// order: 0;
// flex-grow: 0;
//
//
// /* database 1 */
//
// width: 36px;
// height: 36px;
//
// filter: drop-shadow(0px 16px 6px rgba(0, 0, 0, 0.01)) drop-shadow(0px 9px 5px rgba(0, 0, 0, 0.05)) drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.09)) drop-shadow(0px 1px 2px rgba(0, 0, 0, 0.1));
//
// /* Inside auto layout */
// flex: none;
// order: 0;
// flex-grow: 0;
//
//
// /* Vector */
//
// position: absolute;
// left: 0%;
// right: 0%;
// top: 0%;
// bottom: 0%;
//
//
//
// /* Vector */
//
// position: absolute;
// left: 16.67%;
// right: 16.67%;
// top: 12.5%;
// bottom: 62.5%;
//
// border: 2px solid #FFFFFF;
//
//
// /* Vector */
//
// position: absolute;
// left: 16.67%;
// right: 16.67%;
// top: 25%;
// bottom: 37.5%;
//
// border: 2px solid #FFFFFF;
//
//
// /* Vector */
//
// position: absolute;
// left: 16.67%;
// right: 16.67%;
// top: 50%;
// bottom: 12.5%;
//
// border: 2px solid #FFFFFF;
export const NodeIconContainer: React.FC<{
    children: React.ReactNode
    color?: string
}> = ({color, children}) => {
    return (
        <Box sx={{
            boxSizing: 'border-box',
            padding: '10px',
            backgroundColor: color,
            borderRadius: '4px',
            width: '52px',
            minWidth: '52px',
            maxWidth: '52px',
            minHeight: '52px',
            maxHeight: '52px',
            height: '52px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            boxShadow: '0px 25px 10px rgba(0, 0, 0, 0.01), 0px 14px 8px rgba(0, 0, 0, 0.03), 0px 6px 6px rgba(0, 0, 0, 0.04), 0px 2px 3px rgba(0, 0, 0, 0.05)',
            filter: 'drop-shadow(0px 16px 6px rgba(0, 0, 0, 0.01)) drop-shadow(0px 9px 5px rgba(0, 0, 0, 0.05)) drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.09)) drop-shadow(0px 1px 2px rgba(0, 0, 0, 0.1))'
        }}>
            {children}
        </Box>
    );
};
