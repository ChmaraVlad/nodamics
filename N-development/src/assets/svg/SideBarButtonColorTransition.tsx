import * as React from "react";

export const SideBarButtonColorTransition: React.FC<{
    bgColor: string,
}> = ({ bgColor }) => (
    <svg
        width={153}
        height={41}
        viewBox="0 0 153 41"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <g id="Ellipse 5312" filter="url(#filter0_f_533_10490)">
            <path
                d="M246 17.9634C246 35.6567 221.123 50 190.437 50C174.167 50 108.798 39.7111 98.6362 33.2853C89.6327 27.5917 117.963 22.0968 117.963 13.7847C117.963 5.4724 31.6545 5.54942 40.6585 -0.144213C50.82 -6.5698 174.167 -0.144108 190.437 -0.144108C221.123 -0.144108 246 0.270145 246 17.9634Z"
                fill={bgColor}
                fillOpacity={0.4}
            />
        </g>
        <defs>
            <filter
                id="filter0_f_533_10490"
                x={0}
                y={-43}
                width={286}
                height={133}
                filterUnits="userSpaceOnUse"
                colorInterpolationFilters="sRGB"
            >
                <feFlood floodOpacity={0} result="BackgroundImageFix" />
                <feBlend
                    mode="normal"
                    in="SourceGraphic"
                    in2="BackgroundImageFix"
                    result="shape"
                />
                <feGaussianBlur
                    stdDeviation={20}
                    result="effect1_foregroundBlur_533_10490"
                />
            </filter>
        </defs>
    </svg>
);
