import React from 'react'
import { NavLink } from 'react-router-dom'
import { useEffect } from 'react'
import { useState } from 'react'
import './SideNavbar.css'
import TRX_SVG from './Asset/trx_icon.svg'
import ACD_SVG from './Asset/account_details.svg'
import E_CARD_SVG from './Asset/e_cards_icon.svg'
import Q_T_SVG from './Asset/quick_transfer.svg'
import H_ASSIT from './Asset/24_7_assistance.svg'
import BANK_LOGO from './Asset/Bankers_logo.svg'

function SideNavbar() {

    const [loading, setLoading] = useState(true);
    const [navlist, setNavlist] = useState([])
    useEffect(() => {
        const navbar_json = [
            {
                "id": "Transactions",
                "text": "Transactions",
                "vector-asset": TRX_SVG,
                "vector-asset-color": "#ccff00",
                "background-color": "purple",
                "text-color": "purpleText",
                "is_drop": true,
                "href": "/home",
                "dropdown_menu": [
                    {
                        "text": "RTGS",
                        "vector-asset": "link",
                        "text-color": "green",
                        "background-color": "purple",
                        "href": "link to the page"
                    },
                    {
                        "text": "NEFT",
                        "vector-asset": "link",
                        "text-color": "green",
                        "background-color": "purple",
                        "href": "link to the page"
                    }
                ]
            },
            {
                "id": "ACDetails",
                "text": "Account Details",
                "vector-asset": ACD_SVG,
                "vector-asset-color": "#ccff00",
                "background-color": "blue",
                "text-color": "blueText",
                "href": "/home",
                "is_drop": true,
                "dropdown_menu": [
                    {
                        "text": "Balance",
                        "vector-asset": "link",
                        "text-color": "green",
                        "background-color": "purple",
                        "href": "link to the page"
                    },
                    {
                        "text": "General Info",
                        "vector-asset": "link",
                        "text-color": "green",
                        "background-color": "purple",
                        "href": "link to the page"
                    }
                ]
            },
            {
                "id": "ecard",
                "text": "Your E-cards",
                "vector-asset": E_CARD_SVG,
                "vector-asset-color": "#ccff00",
                "background-color": "purple",
                "text-color": "purpleText",
                "href": "/home",
                "is_drop": true,
                "dropdown_menu": [
                    {
                        "text": "jenils",
                        "vector-asset": "",
                        "text-color": "green",
                        "background-color": "purple",
                        "href": "link to the page"
                    }
                ]
            },
            {
                "text": "Quick Transfer",
                "vector-asset": Q_T_SVG,
                "vector-asset-color": "#ccff00",
                "background-color": "blue",
                "text-color": "blueText",
                "href": "/home",
                "is_drop": true,
                "dropdown_menu": []
            },
            {
                "text": "24 X 7 Assistance",
                "vector-asset": H_ASSIT,
                "vector-asset-color": "#ccff00",
                "background-color": "purple",
                "text-color": "purpleText",
                "href": "/login",
                "is_drop": true,
                "dropdown_menu": []
            }

        ]
        setNavlist(navbar_json);
        setLoading(false);

    }, [])
    return (
        <div class="SideNav sidenav_head flex-column flex-shrink-0 p-3 " >
            <div className="radius-1">
                <a href="/" class="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none">
                    <img className="Headlogo" src={BANK_LOGO} />
                    <span class="fs-3 heading_sidenav">Bankers</span>

                </a>
            </div>
            <hr className="custHR" />
            <ul class="nav nav-pills nav-pills-design flex-column mb-auto">
                {loading ? <div class="spinner-border" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div> : navlist.map((e) => {
                    return (

                        e["is_drop"] ? <>


                            <li class="libutton">
                                <button className={"btn dropbtns btn-toggle align-items-center  " + e["background-color"] + " " + e["text-color"]} data-bs-toggle="collapse" data-bs-target={"#" + e["id"]} >
                                    <div className="row">
                                        <img className="col-3  leading_icon" src={e["vector-asset"]} />
                                        <div className="col-9  ">{e["text"]}</div>
                                    </div>
                                </button>
                            </li>
                            {/* <div class="collapse show" id={e["id"]}>
                                {e["is_drop"] ?
                                    <ul class=" btn-toggle-nav  list-unstyled   ">
                                        {e["dropdown_menu"].map((e1) => {
                                            return (
                                                <>

                                                    <li className="dropListShow col-8" ><a className={"droplink "} href="#" >{e1["text"]}</a></li>

                                                </>
                                            )
                                        })}


                                    </ul> : <></>}
                            </div> */}


                        </> :

                            <li class={"nav-item " + e["background-color"]}>
                                <NavLink to={e["href"]} className={"navigation-link " + e["text-color"]} aria-current="page">
                                    <svg class="bi me-2" width="16" height="16"><use href="#home"></use></svg>
                                    {e["text"]}
                                </NavLink>

                            </li>


                    )
                })}

            </ul >
            <hr />

        </div >
    )
}

export default SideNavbar