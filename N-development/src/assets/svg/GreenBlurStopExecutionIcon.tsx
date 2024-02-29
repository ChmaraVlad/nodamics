import React from 'react';

export const GreenBlurStopExecutionIcon = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
            <g filter="url(#filter0_f_218_23973)">
                <ellipse cx="16" cy="23" rx="16" ry="21" fill="#287B27" fillOpacity="0.6"/>
            </g>
            <defs>
                <filter id="filter0_f_218_23973" x="-12" y="-10" width="56" height="66" filterUnits="userSpaceOnUse"
                        color-interpolation-filters="sRGB">
                    <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                    <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
                    <feGaussianBlur stdDeviation="6" result="effect1_foregroundBlur_218_23973"/>
                </filter>
            </defs>
        </svg>
    );
};

