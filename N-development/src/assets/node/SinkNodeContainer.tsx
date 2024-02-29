import * as React from "react"
import {SvgNodeContainerPropsAggregator, SvgNodeContainerSize} from "../../interface/busines/diagram/nodeContainer";
import styles from "./animation.module.scss";


const SinkNodeContainerCommon: React.FC<SvgNodeContainerPropsAggregator> = ({borderColor, isPlayAnimation}) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={302}
            height={165}
            fill="none"
        >
            <g >
                <path
                    fill="url(#b)"
                    fillOpacity={0.5}
                    d="M301 127.145V7a6 6 0 0 0-6-6H7a6 6 0 0 0-6 6v120.145a6 6 0 0 0 4.748 5.868l144 30.72a6.004 6.004 0 0 0 2.504 0l144-30.72a6 6 0 0 0 4.748-5.868Z"
                />
                <path
                    stroke={borderColor}
                    className={isPlayAnimation ? styles.blinkAnimation : undefined}
                    strokeWidth={2}
                    strokeLinecap="round"
                    d="M301 127.145V7a6 6 0 0 0-6-6H7a6 6 0 0 0-6 6v120.145a6 6 0 0 0 4.748 5.868l144 30.72a6.004 6.004 0 0 0 2.504 0l144-30.72a6 6 0 0 0 4.748-5.868Z"
                />
            </g>
            <defs>
                <linearGradient
                    id="b"
                    x1={301}
                    x2={1}
                    y1={164}
                    y2={1}
                    gradientUnits="userSpaceOnUse"
                >
                    <stop stopColor="#303030" stopOpacity={0.5}/>
                    <stop offset={0.516} stopColor="#303030" stopOpacity={0.7}/>
                    <stop offset={1} stopColor="#545454" stopOpacity={0.5}/>
                </linearGradient>
                <filter
                    id="a"
                    width={308}
                    height={170.865}
                    x={-3}
                    y={-3}
                    colorInterpolationFilters="sRGB"
                    filterUnits="userSpaceOnUse"
                >
                    <feFlood floodOpacity={0} result="BackgroundImageFix"/>
                    <feGaussianBlur in="BackgroundImageFix" stdDeviation={1.5}/>
                    <feComposite
                        in2="SourceAlpha"
                        operator="in"
                        result="effect1_backgroundBlur_202_39456"
                    />
                    <feBlend
                        in="SourceGraphic"
                        in2="effect1_backgroundBlur_202_39456"
                        result="shape"
                    />
                </filter>
            </defs>
        </svg>
    );
};


const SinkNodeContainerTall: React.FC<SvgNodeContainerPropsAggregator> = ({borderColor, isPlayAnimation}) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={302}
            height={226}
            fill="none"
        >
            <g >
                <path
                    fill="url(#b)"
                    fillOpacity={0.5}
                    d="M301 188.145V7a6 6 0 0 0-6-6H7a6 6 0 0 0-6 6v181.145a6 6 0 0 0 4.748 5.868l144 30.72a6.004 6.004 0 0 0 2.504 0l144-30.72a6 6 0 0 0 4.748-5.868Z"
                />
                <path
                    stroke={borderColor}
                    className={isPlayAnimation ? styles.blinkAnimation : undefined}
                    strokeLinecap="round"
                    strokeWidth={2}
                    d="M301 188.145V7a6 6 0 0 0-6-6H7a6 6 0 0 0-6 6v181.145a6 6 0 0 0 4.748 5.868l144 30.72a6.004 6.004 0 0 0 2.504 0l144-30.72a6 6 0 0 0 4.748-5.868Z"
                />
            </g>
            <defs>
                <linearGradient
                    id="b"
                    x1={301}
                    x2={1}
                    y1={225}
                    y2={1}
                    gradientUnits="userSpaceOnUse"
                >
                    <stop stopColor="#303030" stopOpacity={0.5}/>
                    <stop offset={0.5} stopColor="#303030" stopOpacity={0.7}/>
                    <stop offset={1} stopColor="#545454" stopOpacity={0.5}/>
                </linearGradient>
                <filter
                    id="a"
                    width={308}
                    height={231.865}
                    x={-3}
                    y={-3}
                    colorInterpolationFilters="sRGB"
                    filterUnits="userSpaceOnUse"
                >
                    <feFlood floodOpacity={0} result="BackgroundImageFix"/>
                    <feGaussianBlur in="BackgroundImageFix" stdDeviation={1.5}/>
                    <feComposite
                        in2="SourceAlpha"
                        operator="in"
                        result="effect1_backgroundBlur_202_39473"
                    />
                    <feBlend
                        in="SourceGraphic"
                        in2="effect1_backgroundBlur_202_39473"
                        result="shape"
                    />
                </filter>
            </defs>
        </svg>
    );
};


export const SinkNodeContainer: React.FC<SvgNodeContainerPropsAggregator> = ({
                                                                                 borderColor,
                                                                                 isPlayAnimation,
                                                                                 size = SvgNodeContainerSize.Common
                                                                             }) => {

    if (size === SvgNodeContainerSize.Tall) {
        return (
            <SinkNodeContainerTall borderColor={borderColor} isPlayAnimation={isPlayAnimation}/>
        );
    }

    return (
        <SinkNodeContainerCommon borderColor={borderColor} isPlayAnimation={isPlayAnimation}/>
    );
}
