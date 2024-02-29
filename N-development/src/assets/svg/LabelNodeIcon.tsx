import React from 'react';

export const LabelNodeIcon = () => {
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
            <g clipPath="url(#a)">
                <path
                    stroke="#fff"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M18 7v14l-6-4-6 4V7a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4Z"
                />
            </g>
            <defs>
                <clipPath id="a">
                    <path fill="#fff" d="M0 0h24v24H0z" />
                </clipPath>
            </defs>
        </svg>
    );
};

