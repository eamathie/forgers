import { useEffect, useState } from "react"

interface UseFetchState<T> {
    data: T[];
    first: T | null;
    loading: boolean;
    error: Error | null;
}

// optional parameter iterateOn makes useFetch fetch multiple times, like if fetching several objects using their ID's in succession
export const useFetch = <T>(url?: string, iterateOn?: string[]): UseFetchState<T> => {
    const [data, setData] = useState<T[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        // makes it possible to run useFetch based on external factors by passing url = null, like when a user logs in and out, in that case to fetch their carts or return null if not signed in
        if (!url) {
            setData([]);
            setLoading(false);
            setError(null);
            return;
        }     
        
        let isMounted = true;

        const fetchData = async () => {
            setLoading(true);
            setError(null),
            setData([]);

            try {
                const targets = iterateOn ?? [null];

                for (const id of targets) {
                    const response = await fetch(id ? `${url}/${id}` : url);
                    if (!response.ok) 
                        throw new Error(`HTTP ${response.status}`);

                    const json: T = await response.json();

                    if (!isMounted) return;
                    setData(prev => Array.isArray(json) ? json : [...prev, json]);
                }
            } catch (error) {
                if (isMounted){
                    setError(error instanceof Error ? error : new Error("Unknown error"));
                }
            } finally {
                if (isMounted)
                    setLoading(false);
            }
        };

        fetchData();        

        return () => {
            isMounted = false;
        };
    }, [url, iterateOn?.join(",")]);

    return {
        data,
        first: data[0] ?? null,
        loading,
        error
    };
} 