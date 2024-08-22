import { useState, useEffect } from 'react'
const useFetch = url => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(async () => {
        const response = await fetch(url, { method: "POST" });
        const data = await response.json();
        setData(data);
        // console.log(data)
        setLoading(false);
    }, []);

    return { data, loading };
};
export default useFetch