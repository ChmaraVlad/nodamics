import * as React from "react"
export const PerformanceIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={18}
        height={18}
        fill="none"
    >
        <mask id="a" fill="#fff">
            <path d="M17.5 9a.48.48 0 0 0 .486-.5 9 9 0 0 0-17.972 0A.48.48 0 0 0 .5 9h17Z" />
        </mask>
        <path
            stroke="#fff"
            strokeWidth={2}
            d="M17.5 9a.48.48 0 0 0 .486-.5 9 9 0 0 0-17.972 0A.48.48 0 0 0 .5 9h17Z"
            mask="url(#a)"
        />
        <path
            stroke="#fff"
            strokeLinecap="round"
            d="M9 8.438 7.5 5M9 .563v1.125M3.938 2.813l.562.562M14.063 2.813l-.563.562"
        />
        <circle cx={9} cy={8} r={1} fill="#fff" />
    </svg>
)
