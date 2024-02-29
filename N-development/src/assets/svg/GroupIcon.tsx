import React from 'react';

export const GroupIcon : React.FC<{
    svg?: React.SVGProps<SVGSVGElement>;
}> = ({svg}) => {
    return (
        <svg {...svg} width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="4.5" y="4.5" width="8" height="8" rx="0.5" stroke="white"/>
            <path
                d="M12.5 7.75H14.75C15.0261 7.75 15.25 7.97386 15.25 8.25V14.75C15.25 15.0261 15.0261 15.25 14.75 15.25H8.25C7.97386 15.25 7.75 15.0261 7.75 14.75V12.5"
                stroke="white"/>
            <rect x="0.5" y="0.5" width="19" height="19" rx="0.5" stroke="white" strokeDasharray="2 2"/>
        </svg>

    );
};

