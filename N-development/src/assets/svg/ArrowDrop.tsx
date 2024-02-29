import * as React from "react";
export const ArrowDrop: React.FC<{
    svgProps?: React.SVGProps<SVGSVGElement>;
}> = ({svgProps}) => (
    <svg
        width={6}
        height={3}
        viewBox="0 0 6 3"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...svgProps}
    >
        <path
            d="M6 0L3.70711 2.29289C3.31658 2.68342 2.68342 2.68342 2.29289 2.29289L0 -3.00516e-07"
            fill="white"
        />
    </svg>
);
