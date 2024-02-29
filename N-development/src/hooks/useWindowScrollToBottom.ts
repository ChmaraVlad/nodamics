import {useEffect, useState} from "react";

export const useWindowScrollToBottom = () => {
    const[isBottom, setIsBottom] = useState(false);
    const handleScroll = () => {
        // Get the current scroll position and window height
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const windowHeight = window.innerHeight || document.documentElement.clientHeight;

        // Get the total height of the document
        const totalHeight = document.documentElement.scrollHeight;

        // Check if the user has scrolled to the bottom
        const isAtBottom = scrollTop + windowHeight >= totalHeight;

       setIsBottom(isAtBottom)
    };

    useEffect(() => {
        // Attach the scroll event listener when the component mounts
        window.addEventListener('scroll', handleScroll);

        // Clean up the event listener when the component unmounts
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return isBottom;
}
