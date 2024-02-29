import * as React from "react";
import {ControlledSvg} from "../../interface";
export const HomeIcon: React.FC<ControlledSvg> = ({color}) => (
    <svg
        width="100%"
        height="100%"
        viewBox="0 0 20 21"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <g clipPath="url(#clip0_533_10483)">
            <path
                d="M4.16667 10.0464H2.5L8.58579 3.9606C9.36683 3.17955 10.6332 3.17955 11.4142 3.9606L17.5 10.0464H15.8333"
                stroke={color}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M4.1665 10.0464V15.8797C4.1665 16.3217 4.3421 16.7457 4.65466 17.0582C4.96722 17.3708 5.39114 17.5464 5.83317 17.5464H14.1665C14.6085 17.5464 15.0325 17.3708 15.345 17.0582C15.6576 16.7457 15.8332 16.3217 15.8332 15.8797V10.0464"
                stroke={color}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M8 17V12.5C8 12.1022 8.14048 11.7206 8.39052 11.4393C8.64057 11.158 8.97971 11 9.33333 11H10.6667C11.0203 11 11.3594 11.158 11.6095 11.4393C11.8595 11.7206 12 12.1022 12 12.5V17"
                stroke={color}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </g>
        <defs>
            <clipPath id="clip0_533_10483">
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
