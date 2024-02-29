import * as React from "react"

export const ResetIcon: React.FC<{
    svg?: React.SVGProps<SVGSVGElement>;
}> = ({svg}) => {
    return (<svg xmlns="http://www.w3.org/2000/svg" width="14" height="16" viewBox="0 0 14 16" fill="none">
        <path
            d="M6.99998 3.15382C8.17145 3.15382 9.31662 3.5012 10.2907 4.15204C11.2647 4.80287 12.0239 5.72793 12.4722 6.81023C12.9205 7.89253 13.0378 9.08346 12.8092 10.2324C12.5807 11.3814 12.0166 12.4368 11.1882 13.2651C10.3599 14.0935 9.30448 14.6576 8.15551 14.8862C7.00655 15.1147 5.81562 14.9974 4.73332 14.5491C3.65102 14.1008 2.72596 13.3416 2.07512 12.3676C1.42429 11.3935 1.0769 10.2484 1.0769 9.07689"
            stroke="white" strokeLinecap="round"/>
        <path d="M8.61539 1L6.46155 3.15385L8.61539 5.30769" stroke="white" strokeLinecap="round"/>
    </svg>)
}
