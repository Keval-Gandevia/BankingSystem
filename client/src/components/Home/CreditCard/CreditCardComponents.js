import React from 'react'
import EcardComponent from '../ECard/EcardComponent'
import '../EcardsComponent.css'
import CarouselComponent from '../CarouselComponent'
import { useState, useEffect } from 'react'

export default function EcardsComponent() {

    const useFetch = url => {
        const [data, setData] = useState(null);
        const [loading, setLoading] = useState(true);

        // Similar to componentDidMount and componentDidUpdate:
        useEffect(async () => {
            const response = await fetch(url, { method: "POST" });
            const data = await response.json();
            setData(data);
            // console.log(data)
            setLoading(false);
        }, []);

        return { data, loading };
    };
    const { data, loading } = useFetch("/")
    // Data fetching here 

    return (
        <div className="row">
            <CarouselComponent></CarouselComponent>
        </div>
    )
}