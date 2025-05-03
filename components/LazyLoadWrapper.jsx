// components/LazyLoadWrapper.jsx
'use client';

import { useInView } from 'react-intersection-observer';
import { useState, useEffect } from 'react';
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils"; // Import cn jika belum ada

// Terima prop 'id'
const LazyLoadWrapper = ({ children, threshold = 0.1, triggerOnce = true, forceLoad = false, minHeight = '50vh', id, className }) => {
    const [hasBeenInView, setHasBeenInView] = useState(forceLoad);
    const { ref, inView } = useInView({
        threshold: threshold,
        disabled: forceLoad,
        triggerOnce: triggerOnce,
    });

    useEffect(() => {
        if (forceLoad) {
            setHasBeenInView(true);
        }
    }, [forceLoad]);

    useEffect(() => {
        if (inView && !forceLoad) {
            setHasBeenInView(true);
        }
    }, [inView, forceLoad]);

    const shouldRenderContent = hasBeenInView || forceLoad;

    return (
        <div
            id={id}
            ref={ref}
            className={cn(className)}
            style={{ minHeight: shouldRenderContent ? 'auto' : minHeight }}
        >
            {shouldRenderContent ? children : <Skeleton className={`w-full`} style={{ height: minHeight }} />}
        </div>
    );
};

export default LazyLoadWrapper;