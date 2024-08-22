import React from 'react'
import './CardComponentBalance.css'

function CardComponentBalance(props) {
    const styles = {
        "background-image": props.lg
    }
    return (
        <div class="main_card  balance_card ">
            <div class="card-body p-0 d-flex flex-fill">
                <div class="row g-0 w-100">
                    <div class="">
                        <div class="balance_card-text p-3 m-1">
                            {props.iscustom ? props.topjsx :
                                <h4 class="balance_card-text">{props.info}</h4>
                            }
                        </div>
                        <div>
                            {props.iscustom ? props.lowerjsx : ""}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CardComponentBalance
