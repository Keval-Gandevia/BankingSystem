import React from 'react'
import EcardComponent from './ECard/EcardComponent'
import './EcardsComponent.css'
import CarouselComponent from './CarouselComponent'

export default function EcardsComponent() {

    // Data fetching here 
    return (
        <div className="row">
            <CarouselComponent></CarouselComponent>
        </div>
    )
}