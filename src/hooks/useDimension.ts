import { WindSong } from "next/font/google";
import React, { use, useEffect, useState } from "react";
import { set } from "zod";



export default function useDimension(containerRef: React.RefObject<HTMLDivElement | null>){    
    const [dimensions, setDemensions] = useState({Width: 0, Height: 0});

    useEffect(() => {
        const currentRef = containerRef.current;

        function getDimensions() {
            return {
                Width: currentRef?.offsetWidth || 0,
                Height: currentRef?.offsetHeight || 0
            }
        }

        const resizeObserver = new ResizeObserver((entries) => {
            const entry = entries[0];
            if (entry) {
                setDemensions(getDimensions());

            }
        })
        if (currentRef) {
            resizeObserver.observe(currentRef);
            setDemensions(getDimensions());
        }
        return () => {
            if (currentRef) {
                resizeObserver.unobserve(currentRef);
            }
            resizeObserver.disconnect();
        }


    },[containerRef]);
    return dimensions;
}