'use client';

import { useInView } from 'react-intersection-observer';
import { useState, useEffect } from 'react';
import { Skeleton } from "@/components/ui/skeleton"; // Import Skeleton

const LazyLoadWrapper = ({ children, threshold = 0.1, triggerOnce = true, forceLoad = false, minHeight = '50vh' }) => {
    const [hasBeenInView, setHasBeenInView] = useState(forceLoad);
    const { ref, inView } = useInView({
        threshold: threshold,
        disabled: forceLoad, // Disable observer if forceLoad is true
        triggerOnce: triggerOnce,
    });

    useEffect(() => {
        // If forceLoad becomes true later, update the state
        if (forceLoad) {
            setHasBeenInView(true);
        }
    }, [forceLoad]);

    useEffect(() => {
        // Original effect for when component scrolls into view
        if (inView && !forceLoad) {
            setHasBeenInView(true);
        }
    }, [inView, forceLoad]);

    // Determine if content should be rendered
    const shouldRenderContent = hasBeenInView || forceLoad;

    return (
        <div ref={ref} style={{ minHeight: shouldRenderContent ? 'auto' : minHeight }}> {/* Apply minHeight to the wrapper */}
            {shouldRenderContent ? children : <Skeleton className={`w-full`} style={{ height: minHeight }} />} {/* Use Skeleton with dynamic height */}
        </div>
    );
};

export default LazyLoadWrapper;
