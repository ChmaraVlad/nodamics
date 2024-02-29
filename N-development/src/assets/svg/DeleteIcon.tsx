import * as React from "react"
import {ControlledSvg} from "../../interface";
export const DeleteIcon: React.FC<ControlledSvg> = ({color = '#DD6363'}) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={16}
        height={17}
        fill="none"
    >
        <path
            stroke={color}
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M1.333 4.333h13.333M6.333 7.667v5M9.667 7.667v5M2.167 4.333l.833 10A1.667 1.667 0 0 0 4.667 16h6.667A1.667 1.667 0 0 0 13 14.333l.834-10M5.5 4.333v-2.5A.833.833 0 0 1 6.333 1h3.334a.833.833 0 0 1 .833.833v2.5"
        />
    </svg>
)
