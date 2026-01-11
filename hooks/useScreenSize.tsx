'use client';

import { useState, useLayoutEffect } from 'react';

const useScreenSize = (): { width: number; height: number; } => {
    const [screenWidth, setScreenWidth] = useState<number>(400);
    const [screenHeight, setScreenHeight] = useState<number>(400);

    useLayoutEffect(() => {
        const handleResize = () => {
            setScreenWidth(window.innerWidth);
            setScreenHeight(window.innerHeight);
        };

        handleResize();
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return { width: screenWidth, height: screenHeight };
};

export default useScreenSize;
