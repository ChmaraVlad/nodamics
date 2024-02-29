import React from 'react';

export const LayoutIcon: React.FC<{
    svg?: React.SVGProps<SVGSVGElement>;
}> = ({svg}) => {
    return (
        <svg {...svg} width="19" height="20" viewBox="0 0 19 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="0.766602" y="3.5" width="17" height="5" rx="0.5" stroke="white"/>
            <rect x="3.7666" y="11.5" width="11" height="5" rx="0.5" stroke="white"/>
            <path d="M9.2666 1L9.2666 3" stroke="white" strokeLinecap="round"/>
            <path d="M9.2666 9L9.2666 11" stroke="white" strokeLinecap="round"/>
            <path d="M9.2666 17L9.2666 19" stroke="white" strokeLinecap="round"/>
        </svg>

    );
};

