import * as React from "react"
export const NodeArrow = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={16}
        height={17}
        fill="none"
    >
        <g
            stroke="#fff"
            strokeLinecap="round"
            strokeLinejoin="round"
            clipPath="url(#a)"
        >
            <path d="M5.333 8.5H14M12 6.5l2 2-2 2M3.667 6.833 2 8.5l1.667 1.667L5.333 8.5 3.667 6.833Z" />
        </g>
        <defs>
            <clipPath id="a">
                <path fill="#fff" d="M0 .5h16v16H0z" />
            </clipPath>
        </defs>
    </svg>
)
