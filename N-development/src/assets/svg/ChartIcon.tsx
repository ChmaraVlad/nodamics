import * as React from "react"
export const ChartIcon: React.FC<{
    svg?: React.SVGProps<SVGSVGElement>;
}> = ({svg}) => {
return (<svg
    xmlns="http://www.w3.org/2000/svg"
    width={18}
    height={14}
    fill="none"
    {...svg}
>
    <path stroke="#fff" strokeLinecap="round" d="M1 .5v12a1 1 0 0 0 1 1h15"/>
    <path
        stroke="#fff"
        strokeLinecap="round"
        d="m3 11.5 3.414-5.12a1 1 0 0 1 1.432-.246l2.308 1.732a1 1 0 0 0 1.432-.246L15 2.5"
    />
</svg>)
}
