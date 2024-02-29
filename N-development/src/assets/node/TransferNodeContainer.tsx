import * as React from "react"
import {
    SvgNodeContainerProps,
    SvgNodeContainerPropsAggregator,
    SvgNodeContainerSize
} from "../../interface/busines/diagram/nodeContainer";
import styles from "./animation.module.scss";


const TransferNodeContainerCommon: React.FC<SvgNodeContainerProps> = ({borderColor, isPlayAnimation}) =>{
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={356}
            height={133}
            fill="none"
        >
            <g >
                <path
                    fill="url(#b)"
                    fillOpacity={0.5}
                    d="M16.71 75.28 3.06 103.22C-3.43 116.507 6.243 132 21.03 132h291.482a20 20 0 0 0 17.97-11.221l22.229-45.5a20.004 20.004 0 0 0 0-17.558l-22.229-45.5A20 20 0 0 0 312.512 1H21.03C6.243 1-3.43 16.493 3.06 29.78l13.65 27.94a20 20 0 0 1 0 17.56Z"
                />
                <path
                    stroke={borderColor}
                    className={isPlayAnimation ? styles.blinkAnimation : undefined}
                    strokeLinecap="round"
                    strokeWidth={2}
                    d="M16.71 75.28 3.06 103.22C-3.43 116.507 6.243 132 21.03 132h291.482a20 20 0 0 0 17.97-11.221l22.229-45.5a20.004 20.004 0 0 0 0-17.558l-22.229-45.5A20 20 0 0 0 312.512 1H21.03C6.243 1-3.43 16.493 3.06 29.78l13.65 27.94a20 20 0 0 1 0 17.56Z"
                />
            </g>
            <defs>
                <linearGradient
                    id="b"
                    x1={-11}
                    x2={357}
                    y1={1}
                    y2={132}
                    gradientUnits="userSpaceOnUse"
                >
                    <stop stopColor="#545454" stopOpacity={0.5}/>
                    <stop offset={0.483} stopColor="#303030" stopOpacity={0.7}/>
                    <stop offset={1} stopColor="#303030" stopOpacity={0.5}/>
                </linearGradient>
                <filter
                    id="a"
                    width={360.736}
                    height={138}
                    x={-2.496}
                    y={-2.5}
                    colorInterpolationFilters="sRGB"
                    filterUnits="userSpaceOnUse"
                >
                    <feFlood floodOpacity={0} result="BackgroundImageFix"/>
                    <feGaussianBlur in="BackgroundImageFix" stdDeviation={1.5}/>
                    <feComposite
                        in2="SourceAlpha"
                        operator="in"
                        result="effect1_backgroundBlur_198_42638"
                    />
                    <feBlend
                        in="SourceGraphic"
                        in2="effect1_backgroundBlur_198_42638"
                        result="shape"
                    />
                </filter>
            </defs>
        </svg>
    );
};

const TransferNodeContainerTall: React.FC<SvgNodeContainerProps> = ({borderColor, isPlayAnimation})=> {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={362}
            height={194}
            fill="none"
        >
            <g>
                <path
                    fill="url(#b)"
                    fillOpacity={0.5}
                    d="m23.892 103.325-21.117 63.35C-1.542 179.626 8.097 193 21.749 193h293.836a20 20 0 0 0 18.973-13.675l25.334-76a20.008 20.008 0 0 0 0-12.65l-25.334-76A20 20 0 0 0 315.585 1H21.748C8.098 1-1.542 14.374 2.775 27.325l21.117 63.35a20 20 0 0 1 0 12.65Z"
                />
                <path
                    stroke={borderColor}
                    className={isPlayAnimation ? styles.blinkAnimation : undefined}
                    strokeLinecap="round"
                    strokeWidth={2}
                    d="m23.892 103.325-21.117 63.35C-1.542 179.626 8.097 193 21.749 193h293.836a20 20 0 0 0 18.973-13.675l25.334-76a20.008 20.008 0 0 0 0-12.65l-25.334-76A20 20 0 0 0 315.585 1H21.748C8.098 1-1.542 14.374 2.775 27.325l21.117 63.35a20 20 0 0 1 0 12.65Z"
                />
            </g>
            <defs>
                <linearGradient
                    id="b"
                    x1={-6}
                    x2={362}
                    y1={1}
                    y2={193}
                    gradientUnits="userSpaceOnUse"
                >
                    <stop stopColor="#545454" stopOpacity={0.5}/>
                    <stop offset={0.522} stopColor="#303030" stopOpacity={0.7}/>
                    <stop offset={1} stopColor="#303030" stopOpacity={0.5}/>
                </linearGradient>
                <filter
                    id="a"
                    width={367.186}
                    height={200}
                    x={-2.268}
                    y={-3}
                    colorInterpolationFilters="sRGB"
                    filterUnits="userSpaceOnUse"
                >
                    <feFlood floodOpacity={0} result="BackgroundImageFix"/>
                    <feGaussianBlur in="BackgroundImageFix" stdDeviation={1.5}/>
                    <feComposite
                        in2="SourceAlpha"
                        operator="in"
                        result="effect1_backgroundBlur_202_39564"
                    />
                    <feBlend
                        in="SourceGraphic"
                        in2="effect1_backgroundBlur_202_39564"
                        result="shape"
                    />
                </filter>
            </defs>
        </svg>
    );
};

export const TransferNodeContainer: React.FC<SvgNodeContainerPropsAggregator> = ({
                                                                                     borderColor,
                                                                                     isPlayAnimation,
                                                                                     size = SvgNodeContainerSize.Common
                                                                                 }) => {
    if (size === SvgNodeContainerSize.Tall) {
        return (
            <TransferNodeContainerTall borderColor={borderColor} isPlayAnimation={isPlayAnimation}/>
        )
    }
    return (
        <TransferNodeContainerCommon borderColor={borderColor} isPlayAnimation={isPlayAnimation}/>
    )
}
