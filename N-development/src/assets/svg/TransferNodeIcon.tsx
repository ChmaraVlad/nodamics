import React from 'react';

export const TransferNodeIcon = () => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 25 24"
            width="100%"
            height="100%"
            // width={25}
            // height={24}
            fill="none"
        >
            <g
                stroke="#fff"
                strokeLinecap="round"
                strokeLinejoin="round"
                clipPath="url(#a)"
            >
                <path d="m16.5 12.5-5-3 5-3 5 3V15l-5 3v-5.5Z" />
                <path d="M11.5 9.5V15l5 3M16.5 12.545l5-3.03M7.5 9h-5M7.5 12h-3M7.5 15h-1" />
            </g>
            <defs>
                <clipPath id="a">
                    <path fill="#fff" d="M.5 0h24v24H.5z" />
                </clipPath>
            </defs>
        </svg>
    );
};

