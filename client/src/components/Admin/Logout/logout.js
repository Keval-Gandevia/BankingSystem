import React, { useEffect } from 'react'
import { Redirect, useHistory } from 'react-router-dom'
import $ from "jquery"

export default function LogoutComponent() {

    // By Rikin
    const history = useHistory()
    useEffect(() => {
        $.ajax({
            type: "post",
            url: "/admin/logout",
            success: (res) => {
                // console.log(res);
                if (res == "user logout!!") {
                    history.push("/admin/login")
                }
                else {
                    console.log("error")
                }
            }
        })
    }, [])



    return (
        <div style={{ "display": "flex", "justifyContent": "center", "alignContent": "center" }}>
            <h1>Logging You Out</h1>
        </div>
    )
}
