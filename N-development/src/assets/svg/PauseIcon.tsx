import React from 'react';

export const PauseIcon: React.FC<{
    svg?: React.SVGProps<SVGSVGElement>;
}> = ({svg}) => {
    return (
        <svg {...svg} width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="0.5" y="0.5" width="9" height="9" rx="1.5" stroke="white"/>
        </svg>

    );
};

