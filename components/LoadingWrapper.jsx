'use client';
import { useState, useEffect } from 'react';

export default function LoadingWrapper({ children }) {
    const [loading, setLoading] = useState(true); // State variable to track loading status

    useEffect(() => {
        // Simulate a delay of 2 seconds
        const timer = setTimeout(() => {
            setLoading(false); // Set loading to false after the delay
        }, 2000);

        return () => clearTimeout(timer);

    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <p className="text-2xl font-semibold">Loading...</p>
            </div>
        );
    }

    // Render the children if loading is false
    return <>{children}</>;
}