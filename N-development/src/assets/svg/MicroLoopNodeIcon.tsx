import React from 'react';

export const MicroLoopNodeIcon = () => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="100%"
            height="100%"
            // width={24}
            // height={24}
            fill="none"
        >
            <g
                stroke="#fff"
                strokeLinecap="round"
                strokeLinejoin="round"
                clipPath="url(#a)"
            >
                <path d="M12 21v-6m0-6V8a4 4 0 1 0-4 4h13" />
                <path d="m17 16 4-4-4-4" />
            </g>
            <defs>
                <clipPath id="a">
                    <path fill="#fff" d="M0 0h24v24H0z" />
                </clipPath>
            </defs>
        </svg>
    );
};

