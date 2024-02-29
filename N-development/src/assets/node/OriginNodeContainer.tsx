import * as React from "react"
import {
    SvgNodeContainerProps,
    SvgNodeContainerPropsAggregator,
    SvgNodeContainerSize
} from "../../interface/busines/diagram/nodeContainer";
import styles from './animation.module.scss'

const OriginNodeContainerCommon: React.FC<SvgNodeContainerProps> = ({borderColor, isPlayAnimation}) => (
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
                d="M1 37.855V158a6 6 0 0 0 6 6h288a6 6 0 0 0 6-6V37.855a6 6 0 0 0-4.748-5.868l-144-30.72a6.002 6.002 0 0 0-2.504 0l-144 30.72A6 6 0 0 0 1 37.855Z"
            />
            <path
                stroke={borderColor}
                className={isPlayAnimation ? styles.blinkAnimation : undefined}
                strokeLinecap="round"
                strokeWidth={2}
                d="M1 37.855V158a6 6 0 0 0 6 6h288a6 6 0 0 0 6-6V37.855a6 6 0 0 0-4.748-5.868l-144-30.72a6.002 6.002 0 0 0-2.504 0l-144 30.72A6 6 0 0 0 1 37.855Z"
            />
        </g>
        <defs>
            <linearGradient
                id="b"
                x1={1}
                x2={301}
                y1={1}
                y2={164}
                gradientUnits="userSpaceOnUse"
            >
                <stop stopColor="#545454" stopOpacity={0.5}/>
                <stop offset={0.464} stopColor="#303030" stopOpacity={0.7}/>
                <stop offset={1} stopColor="#303030" stopOpacity={0.5}/>
            </linearGradient>
            <filter
                id="a"
                width={308}
                height={170.865}
                x={-3}
                y={-2.865}
                colorInterpolationFilters="sRGB"
                filterUnits="userSpaceOnUse"
            >
                <feFlood floodOpacity={0} result="BackgroundImageFix"/>
                <feGaussianBlur in="BackgroundImageFix" stdDeviation={1.5}/>
                <feComposite
                    in2="SourceAlpha"
                    operator="in"
                    result="effect1_backgroundBlur_202_39419"
                />
                <feBlend
                    in="SourceGraphic"
                    in2="effect1_backgroundBlur_202_39419"
                    result="shape"
                />
            </filter>
        </defs>
    </svg>
)
const OriginNodeContainerTall : React.FC<SvgNodeContainerProps> = ({borderColor, isPlayAnimation}) => (
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
                d="M1 37.855V219a6 6 0 0 0 6 6h288a6 6 0 0 0 6-6V37.855a6 6 0 0 0-4.748-5.868l-144-30.72a6.002 6.002 0 0 0-2.504 0l-144 30.72A6 6 0 0 0 1 37.855Z"
            />
            <path
                stroke={borderColor}
                className={isPlayAnimation ? styles.blinkAnimation : undefined}
                strokeLinecap="round"
                strokeWidth={2}
                d="M1 37.855V219a6 6 0 0 0 6 6h288a6 6 0 0 0 6-6V37.855a6 6 0 0 0-4.748-5.868l-144-30.72a6.002 6.002 0 0 0-2.504 0l-144 30.72A6 6 0 0 0 1 37.855Z"
            />
        </g>
        <defs>
            <linearGradient
                id="b"
                x1={1}
                x2={301}
                y1={1}
                y2={225}
                gradientUnits="userSpaceOnUse"
            >
                <stop stopColor="#545454" stopOpacity={0.5} />
                <stop offset={0.5} stopColor="#303030" stopOpacity={0.7} />
                <stop offset={1} stopColor="#303030" stopOpacity={0.5} />
            </linearGradient>
            <filter
                id="a"
                width={342}
                height={265.865}
                x={-20}
                y={-19.865}
                colorInterpolationFilters="sRGB"
                filterUnits="userSpaceOnUse"
            >
                <feFlood floodOpacity={0} result="BackgroundImageFix" />
                <feGaussianBlur in="BackgroundImageFix" stdDeviation={10} />
                <feComposite
                    in2="SourceAlpha"
                    operator="in"
                    result="effect1_backgroundBlur_202_39436"
                />
                <feBlend
                    in="SourceGraphic"
                    in2="effect1_backgroundBlur_202_39436"
                    result="shape"
                />
            </filter>
        </defs>
    </svg>
)

export const OriginNodeContainer: React.FC<SvgNodeContainerPropsAggregator> = ({borderColor, isPlayAnimation, size = SvgNodeContainerSize.Common}) => {
    if(size === SvgNodeContainerSize.Tall) return (
        <OriginNodeContainerTall borderColor={borderColor} isPlayAnimation={isPlayAnimation}/>
    )
    return (
        <OriginNodeContainerCommon borderColor={borderColor} isPlayAnimation={isPlayAnimation}/>
    )
}
