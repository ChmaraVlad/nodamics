import * as React from "react";
import {ControlledSvg} from "../../interface";
import {EColor} from "../../constant";
export const ProjectsIcon: React.FC<ControlledSvg> = ({color = EColor.grey5}) => (
    <svg
        width="100%"
        height="100%"
        viewBox="0 0 20 21"
        fill="none"
    >
        <g clipPath="url(#clip0_533_10492)">
            <path
                d="M11.6665 2.54639V5.87972C11.6665 6.10073 11.7543 6.3127 11.9106 6.46898C12.0669 6.62526 12.2788 6.71305 12.4998 6.71305H15.8332"
                stroke={color}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M14.1665 17.5464H5.83317C5.39114 17.5464 4.96722 17.3708 4.65466 17.0582C4.3421 16.7457 4.1665 16.3217 4.1665 15.8797V4.21305C4.1665 3.77103 4.3421 3.3471 4.65466 3.03454C4.96722 2.72198 5.39114 2.54639 5.83317 2.54639H11.6665L15.8332 6.71305V15.8797C15.8332 16.3217 15.6576 16.7457 15.345 17.0582C15.0325 17.3708 14.6085 17.5464 14.1665 17.5464Z"
                stroke={color}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </g>
        <defs>
            <clipPath id="clip0_533_10492">
                <rect
                    width={20}
                    height={20}
                    fill="white"
                    transform="translate(0 0.0463867)"
                />
            </clipPath>
        </defs>
    </svg>
);
