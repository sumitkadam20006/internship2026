import { useState, useEffect, useCallback } from "react";

export function useFetch(url) {

    const [data, setData] = useState(null);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState(null);

    const [reloadKey, setReloadKey] = useState(0);

    const refetch = useCallback(() => {

        setReloadKey(prev => prev + 1);

    }, []);

    useEffect(() => {

        if (!url) return;

        let ignore = false;

        async function fetchData() {

            try {

                setLoading(true);

                setError(null);

                const response = await fetch(url);

                if (!response.ok) {

                    throw new Error("Failed to fetch data");

                }

                const result = await response.json();

                if (!ignore) {

                    setData(result);

                }

            }

            catch (err) {

                if (!ignore) {

                    setError(err.message);

                }

            }

            finally {

                if (!ignore) {

                    setLoading(false);

                }

            }

        }

        fetchData();

        return () => {

            ignore = true;

        };

    }, [url, reloadKey]);

    return {

        data,

        loading,

        error,

        refetch

    };

}