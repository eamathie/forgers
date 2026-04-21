import { useEffect, useState } from "react"

interface UseFetchState<T> {
    data: T | null;
    loading: boolean;
    error: Error | null;
}

export const useFetch = <T>(url: string | null): UseFetchState<T> => {
    const [state, setState] = useState<UseFetchState<T>>({
        data: null,
        loading: true,
        error: null
    });

    useEffect(() => {
        // makes it possible to run useFetch based on external factors by passing url = null, like when a user logs in and out, in that case to fetch their carts or return null if not signed in
        if (!url) {
            setState({
                data: null,
                loading: false,
                error: null
            })
            return;
        }     
        
        let isMounted = true;
        const fetchData = async () => {
            try {
                const response = await fetch(url);
                
                if (!response.ok)
                    throw new Error(`HTTP ${response.status}`);

                const json = await response.json();
                if (isMounted)
                    setState({data: json, loading: false, error: null});
            } catch (error) {
                if (isMounted){
                    setState({
                        data: null,
                        loading: false,
                        error: error instanceof Error ? error : new Error('Unknown error')
                    });
                }
            }
        };

        fetchData();

        return () => {
            isMounted = false;
        };
    }, [url]);

    return state;
} 