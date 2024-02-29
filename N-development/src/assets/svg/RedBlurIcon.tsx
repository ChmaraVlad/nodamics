import React from 'react';

export const RedBlurIcon = () => {
    return (
        <svg width="32" height="19" viewBox="0 0 32 19" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g filter="url(#filter0_f_218_23956)">
                <ellipse cx="16" cy="22.5" rx="16" ry="10.5" fill="#7B2727" fillOpacity="0.6"/>
            </g>
            <defs>
                <filter id="filter0_f_218_23956" x="-12" y="0" width="56" height="45" filterUnits="userSpaceOnUse"
                        color-interpolation-filters="sRGB">
                    <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                    <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
                    <feGaussianBlur stdDeviation="6" result="effect1_foregroundBlur_218_23956"/>
                </filter>
            </defs>
        </svg>

    );
};

