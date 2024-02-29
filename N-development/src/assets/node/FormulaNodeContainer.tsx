import * as React from "react"
import {
    SvgNodeContainerProps,
    SvgNodeContainerPropsAggregator,
    SvgNodeContainerSize
} from "../../interface/busines/diagram/nodeContainer";
import styles from "./animation.module.scss";


const FormulaNodeContainerCommon: React.FC<SvgNodeContainerProps> = ({borderColor, isPlayAnimation}) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={336}
            height={133}
            fill="none"
        >
            <g>
                <path
                    fill="url(#b)"
                    fillOpacity={0.5}
                    d="m1.287 69.134 25.231 51.645A20 20 0 0 0 44.488 132h247.024a20 20 0 0 0 17.97-11.221l25.231-51.645a6 6 0 0 0 0-5.268l-25.231-51.645A20 20 0 0 0 291.512 1H44.488a20 20 0 0 0-17.97 11.22L1.287 63.867a6 6 0 0 0 0 5.268Z"
                />
                <path
                    stroke={borderColor}
                    className={isPlayAnimation ? styles.blinkAnimation : undefined}
                    strokeLinecap="round"
                    d="m1.287 69.134 25.231 51.645A20 20 0 0 0 44.488 132h247.024a20 20 0 0 0 17.97-11.221l25.231-51.645a6 6 0 0 0 0-5.268l-25.231-51.645A20 20 0 0 0 291.512 1H44.488a20 20 0 0 0-17.97 11.22L1.287 63.867a6 6 0 0 0 0 5.268Z"
                />
            </g>
            <defs>
                <linearGradient
                    id="b"
                    x1={0}
                    x2={336}
                    y1={1}
                    y2={132}
                    gradientUnits="userSpaceOnUse"
                >
                    <stop stopColor="#545454" stopOpacity={0.5}/>
                    <stop offset={0.49} stopColor="#303030" stopOpacity={0.7}/>
                    <stop offset={1} stopColor="#303030" stopOpacity={0.5}/>
                </linearGradient>
                <filter
                    id="a"
                    width={341.645}
                    height={138}
                    x={-2.822}
                    y={-2.5}
                    colorInterpolationFilters="sRGB"
                    filterUnits="userSpaceOnUse"
                >
                    <feFlood floodOpacity={0} result="BackgroundImageFix"/>
                    <feGaussianBlur in="BackgroundImageFix" stdDeviation={1.5}/>
                    <feComposite
                        in2="SourceAlpha"
                        operator="in"
                        result="effect1_backgroundBlur_198_42478"
                    />
                    <feBlend
                        in="SourceGraphic"
                        in2="effect1_backgroundBlur_198_42478"
                        result="shape"
                    />
                </filter>
            </defs>
        </svg>
    );
};


const FormulaNodeContainerTall: React.FC<SvgNodeContainerProps> = ({borderColor, isPlayAnimation}) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={336}
        height={194}
        fill="none"
    >
        <g >
            <path
                fill="url(#b)"
                fillOpacity={0.5}
                d="m2.108 103.325 25.334 76A20 20 0 0 0 46.415 193h243.17a20 20 0 0 0 18.973-13.675l25.334-76a20.008 20.008 0 0 0 0-12.65l-25.334-76A20 20 0 0 0 289.585 1H46.415a20 20 0 0 0-18.973 13.675l-25.334 76a20.002 20.002 0 0 0 0 12.65Z"
            />
            <path
                stroke={borderColor}
                className={isPlayAnimation ? styles.blinkAnimation : undefined}
                strokeLinecap="round"
                strokeWidth={2}
                d="m2.108 103.325 25.334 76A20 20 0 0 0 46.415 193h243.17a20 20 0 0 0 18.973-13.675l25.334-76a20.008 20.008 0 0 0 0-12.65l-25.334-76A20 20 0 0 0 289.585 1H46.415a20 20 0 0 0-18.973 13.675l-25.334 76a20.002 20.002 0 0 0 0 12.65Z"
            />
        </g>
        <defs>
            <linearGradient
                id="b"
                x1={0}
                x2={336}
                y1={1}
                y2={193}
                gradientUnits="userSpaceOnUse"
            >
                <stop stopColor="#545454" stopOpacity={0.5} />
                <stop offset={0.5} stopColor="#303030" stopOpacity={0.7} />
                <stop offset={1} stopColor="#303030" stopOpacity={0.5} />
            </linearGradient>
            <filter
                id="a"
                width={341.836}
                height={200}
                x={-2.918}
                y={-3}
                colorInterpolationFilters="sRGB"
                filterUnits="userSpaceOnUse"
            >
                <feFlood floodOpacity={0} result="BackgroundImageFix" />
                <feGaussianBlur in="BackgroundImageFix" stdDeviation={1.5} />
                <feComposite
                    in2="SourceAlpha"
                    operator="in"
                    result="effect1_backgroundBlur_202_39517"
                />
                <feBlend
                    in="SourceGraphic"
                    in2="effect1_backgroundBlur_202_39517"
                    result="shape"
                />
            </filter>
        </defs>
    </svg>
)
export const FormulaNodeContainer: React.FC<SvgNodeContainerPropsAggregator> = ({borderColor, isPlayAnimation, size= SvgNodeContainerSize.Common}) => {
    if(size === SvgNodeContainerSize.Tall){
        return (
            <FormulaNodeContainerTall borderColor={borderColor} isPlayAnimation={isPlayAnimation}/>
        )
    }
    return (
        <FormulaNodeContainerCommon borderColor={borderColor} isPlayAnimation={isPlayAnimation}/>
    )
}
