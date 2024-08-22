import React from 'react'
import EcardComponent from './ECard/EcardComponent'

export default function TempComponent() {
    const styles = {
        "myinner": {
            "padding": "0px",
            "margin": "0%",
            // "border": "2px solid red"
        },
        "outerwrapper": {
            "display": "flex",
            "justify-content": "center",
            "padding": "-10px",
            // "margin": "-10px",
            "align-items": "center",
            // "border": "2px solid green"
        },
        "innerwrapper": {
            // "display": "flex",
            // "justify-content": "center",
            "width": "95%",
            "margin-left": "30px",
            "padding": "5px",
            "padding-left": "20px",
            "align-items": "center",
            // "border": "2px solid yellow",
            "background-color": "rgba(255, 255, 255, 0)",
            "opacity": "1"
        },
        "sideComp": {
            // "display": "flex",
            // "justify-content": "center",
            "margin-top": "0%",
            "padding-top": "6%",
            // "border": "1px solid blue"
        }
    }
    return (
        <div id="demo" style={styles["outerwrapper"]} className="carousel slide" data-ride="carousel">

            {/* <!-- Indicators --> */}
            <ul class="carousel-indicators">
                <li data-target="#demo" data-slide-to="0" class="active"></li>
                <li data-target="#demo" data-slide-to="1"></li>
                <li data-target="#demo" data-slide-to="2"></li>
                <li data-target="#demo" data-slide-to="3"></li>
            </ul>

            {/* <!-- The slideshow --> */}
            <div class="carousel-inner" style={styles["myinner"]}>
                <div class="carousel-item row active" style={styles["innerwrapper"]}>
                    <div className="row">
                        <EcardComponent cvv="588" className="col-6" type_card="credit" valid_thru="06/21" name="Jenil J Gandhi" cardnumber="1234-3456-2234-9900"></EcardComponent>
                        <div className="col-4" style={styles["sideComp"]}>
                            <h3>A/C No. : 98987452666649</h3>
                            <h3>Balance : $98987452666649</h3>
                            <h3>make transaction</h3>
                        </div>
                    </div>
                </div>
                <div class="carousel-item" style={styles["innerwrapper"]}>
                    <div className="row">
                        <EcardComponent cvv="588" className="col-6" type_card="credit" valid_thru="06/21" name="Parishi J Gandhi" cardnumber="1234-3456-2234-9900"></EcardComponent>
                        <div className="col-4" style={styles["sideComp"]}>
                            <h3>A/C No. : 98987452666649</h3>
                            <h3>Balance : $98987452666649</h3>
                            <h3>make transaction</h3>
                        </div>
                    </div>
                </div>
                <div class="carousel-item" style={styles["innerwrapper"]}>
                    <div className="row">
                        <EcardComponent cvv="588" className="col-6" type_card="credit" valid_thru="06/21" name="Jignesh V Gandhi" cardnumber="1234-5555-2234-9900"></EcardComponent>
                        <div className="col-4" style={styles["sideComp"]}>
                            <h3>A/C No. : 98987452666649</h3>
                            <h3>Balance : $98987452666649</h3>
                            <h3>make transaction</h3>
                        </div>
                    </div>
                </div>
                <div class="carousel-item" style={styles["innerwrapper"]}>
                    <div className="row">
                        <EcardComponent cvv="588" className="col-6" type_card="credit" valid_thru="06/21" name="Jayen V Gandhi" cardnumber="1234-5555-2234-9900"></EcardComponent>
                        <div className="col-4" style={styles["sideComp"]}>
                            <h3>A/C No. : 98987452666649</h3>
                            <h3>Balance : $98987452666649</h3>
                            <h3>make transaction</h3>
                        </div>
                    </div>
                </div>
            </div>

            {/* <!-- Left and right controls --> */}
            <a class="carousel-control-prev" href="#demo" data-slide="prev">
                <span class="carousel-control-prev-icon"></span>
            </a>
            <a class="carousel-control-next" href="#demo" data-slide="next">
                <span class="carousel-control-next-icon"></span>
            </a>
        </div>
    )
}
