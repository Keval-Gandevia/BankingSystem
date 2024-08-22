import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom';
import './TopNavbarComponent.css'
// import Cookies from 'universal-cookie';
import Cookies from 'js-cookie';


export default function TopNavbarComponent({ property_name }) {

    const capitalize = (str) => {

        return str[0].toUpperCase() + str.slice(1, str.lengh)
    }

    const useFetch = url => {
        const [data, setData] = useState(null);
        const [loading, setLoading] = useState(true);

        // Similar to componentDidMount and componentDidUpdate:
        useEffect(async () => {
            const response = await fetch(url, { method: "POST" });
            // console.log("her")
            const data = await response.json();
            setData(data);
            // console.log(data)
            setLoading(false);
        }, []);

        return { data, loading };
    };
    const { data, loading } = useFetch("/home/getDetails")

    // console.log(loading ? "Loading......" : data)


    // console.log(userCookies.get("UserName"));
    // console.log(document.cookie.split(";"))
    // console.log(Cookies.get("Username"))
    // console.log(Cookies.get('UserName'))
    const spinJSX = <><div class="spinner-border text-info" role="status">
        <span class="visually-hidden">Loading...</span>
    </div></>
    return (
        <div>
            <nav class="navbar ">
                <div class="container topnav">
                    <p className="navText">{capitalize(property_name)}</p>
                    <p className="float-left" style={{ "margin-right":"-50%" }}>Welcome, {loading ? spinJSX : capitalize(data["data"]["firstName"])}</p>
                    <NavLink to="/logout" style={{ "text-decoration": "none", "display": "flex", "justify-content": "center", "align-items": "center", "width": "14%", "margin-top": "-20px"}}>
                        
                            <button class="btn btn-danger" style={{"height":"40px"}}>
                                Log Out
                            </button>
                    
                    </NavLink>
                </div>

            </nav>
        </div>
    )
}
