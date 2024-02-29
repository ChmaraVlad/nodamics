import React from 'react';

export const LatencyIcon : React.FC<{
    svg?: React.SVGProps<SVGSVGElement>;
}> = ({svg}) => {
    return (
        <svg {...svg} width="100%" height="100%" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M6.36041 16.2007C9.2327 19.073 13.8896 19.073 16.7619 16.2007C19.6342 13.3285 19.6342 8.67155 16.7619 5.79926C13.8896 2.92696 9.2327 2.92696 6.36041 5.79926"
                stroke="white" strokeLinecap="round"/>
            <path d="M11.2666 11L14.7666 7.5" stroke="white" strokeLinecap="round"/>
            <path d="M2.28662 11.0736H5.71804" stroke="white" strokeLinecap="round"/>
            <path d="M0.570801 13.6472H4.00222" stroke="white" strokeLinecap="round"/>
            <path d="M4.00244 8.5H7.43386" stroke="white" strokeLinecap="round"/>
        </svg>


    );
};

