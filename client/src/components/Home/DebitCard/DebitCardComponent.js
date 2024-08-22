import React from 'react'
import EcardComponent from '../ECard/EcardComponent'
import '../EcardsComponent.css'
import CarouselComponent from '../CarouselComponent'

export default function EcardsComponent({ cvv, valid_thru, cardnumber, name }) {

    // Data fetching here 

    return (
        <div className="row">
            <EcardComponent cvv={cvv} type_card="credit" valid_thru={valid_thru} name={name} cardnumber={cardnumber}></EcardComponent>
        </div>
    )
}