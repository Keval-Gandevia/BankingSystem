import React from 'react'
import './TFAssistance.css'

export default function TFAssistanceComponent() {
    return (
        <>
            <div className="row allCardsWrapper">
                <div className="card">
                    <img src="https://source.unsplash.com/1600x900/?money,help" className="card-img-top " alt="..." />
                    <div className="card-body">
                        <h2 className="card-title">Get 24 X 7 Assistance</h2>
                        <p className="card-text">We value our customers and strive for perfection in service.You could talk to a customer reperentative at</p>
                        <br />
                        <p className="cardp"><b>+91 1800-800-800</b></p>
                    </div>
                </div>
                <div className="card">
                    <img src="https://source.unsplash.com/1600x900/?mail,mail" className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h2 className="card-title">Email us</h2><br />
                        <p className="card-text">Having some security issue or need some assistance on loan you could mail us or even contact us. Mail us at</p>
                        <br />
                        <p className="cardp"><b>offical@bankers.com</b></p>
                    </div>
                </div>
                <div className="card">
                    <img src="https://source.unsplash.com/1600x900/?india,map" className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h2 className="card-title">Visit us</h2><br />
                        <p className="card-text">Well this may be little tiring but our staff would be very happy to solve your problems. Find a store</p>
                        <br />
                        <p className="cardp"><b>Maps.google.com</b></p>
                    </div>
                </div>
            </div>
            <div className="normals">
                <div className="">
                    <div className="chatAbove col">


                    </div>
                </div>
            </div>
        </>
    )
}
