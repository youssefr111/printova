import { useState, useEffect, useCallback } from 'react';
import api from "../api/axios";

const useAxiosFetch = (dataUrl) => {
    const [data, setData] = useState();
    const [response, setResponse] = useState();
    const [fetchError, setFetchError] = useState();
    const [isLoading, setIsLoading] = useState(false);

    const fetchData = useCallback(async () => {
        if (!dataUrl) return;

        const controller = new AbortController();
        setIsLoading(true);
        setFetchError(null);

        try {
        const res = await api.get(dataUrl, { signal: controller.signal });
        setResponse(res);
        setData(res.data);
        } catch (err) {
        if (err.name !== 'CanceledError') {
            setFetchError(err.message);
        }
        } finally {
        setIsLoading(false);
        }

        return () => controller.abort();
    }, [dataUrl]);
    
    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const refetch = async () => {
        await fetchData();
    };

    return { data, response, fetchError, isLoading, refetch };
};

export default useAxiosFetch;