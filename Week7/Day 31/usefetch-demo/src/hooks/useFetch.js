import { useEffect, useState } from "react";

function useFetch(url) {

    const [data, setData] = useState([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    const [reload, setReload] = useState(0);

    function refetch() {
        setReload(reload + 1);
    }

    useEffect(() => {

        async function fetchData() {

            setLoading(true);

            setError("");

            try {

                const response = await fetch(url);

                if (!response.ok) {
                    throw new Error("Failed to fetch");
                }

                const result = await response.json();

                setData(result);

            }

            catch (err) {

                setError(err.message);

            }

            finally {

                setLoading(false);

            }

        }

        fetchData();

    }, [url, reload]);

    return { data, loading, error, refetch };

}

export default useFetch;