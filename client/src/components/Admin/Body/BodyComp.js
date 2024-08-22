import React from 'react'
import AdminHome from "../Home/AdminHome"
import CreateUser from '../User/CreateUser';
import BlockUserComp from '../User/BlockUserComp';
import CreateUserAccount from '../User/CreateUserAccount'
import SanctionLoan from '../Loan/SanctionLoan';
import ViewLoanRequest from '../Loan/ViewLoanRequest';
import AddCashToUser from '../Cash/AddCashToUser';
import AddAnotherAdmin from '../AddAdmin/addAnotherAdmin';
import ViewProfile from '../Profile/ViewProfile';
import MakeDebitCard from "../User/MakeDebitCard"
import Logout from "../Logout/logout"
import "./Body.css"
import { NavLink } from 'react-router-dom';

export default function BodyComp(props) {
    const component_name = props.name;
    const component_mapping = {
        "home": <AdminHome />,
        "createUser": <CreateUser />,
        "createUserAccount": <CreateUserAccount />,
        "blockUserAccount": <BlockUserComp />,
        "viewLoanRequest": <ViewLoanRequest />,
        "sanctionLoan": <SanctionLoan />,
        "addCashToUser": <AddCashToUser />,
        "addAnotherAdmin": <AddAnotherAdmin />,
        "viewProfile": <ViewProfile />,
        "logout": <Logout />,
        "makeDebitCard": <MakeDebitCard />
    }
    return (
        <>
            <div className="topNavBarWrapper">
                <div className="topNavbar">
                    <div className="brand">

                        <NavLink to="/admin/home" style={{ "color": "#f5f5f7", "background": "rgba(44, 44, 44, 1)" }}>Bankers Admin</NavLink>
                    </div>

                    <ul style={{ "margin-bottom": "0px", "listStyle": "none" }}>
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle choosers" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Users
                            </a>
                            <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                                <li><NavLink class="dropdown-item" to="/admin/createUser">Create User</NavLink></li>
                                <li><NavLink class="dropdown-item" to="/admin/makeDebitCard">Issue Debit Card</NavLink></li>
                                <li><NavLink class="dropdown-item" to="/admin/createUserAccount">Create User Account</NavLink></li>

                                <li><NavLink class="dropdown-item" to="/admin/blockUserAccount">Block User Account</NavLink></li>

                            </ul>
                        </li>
                    </ul>

                    <ul style={{ "margin-bottom": "0px", "listStyle": "none" }}>
                        <li class="nav-item dropdown whitefyMe">
                            <a class="nav-link dropdown-toggle choosers" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Loan
                            </a>
                            <ul class="dropdown-menu" aria-labelledby="navbarDropdown">

                                <li><NavLink class="dropdown-item" to="/admin/viewLoanRequest">View Loan Requests</NavLink></li>
                                {/* <li><hr class="dropdown-divider" /></li> */}
                                <li><NavLink class="dropdown-item" to="/admin/sanctionLoan">Sanction Loan</NavLink></li>
                            </ul>
                        </li>
                    </ul>
                    <ul style={{ "margin-bottom": "0px", "listStyle": "none" }}>
                        <li class="nav-item dropdown whitefyMe">
                            <a class="nav-link dropdown-toggle choosers" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Admin
                            </a>
                            <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                                <li><NavLink class="dropdown-item" to="/admin/viewProfile">View Profile</NavLink></li>
                                <li><NavLink class="dropdown-item" to="/admin/addCashToUser">Add Cash to Users AC</NavLink></li>
                                <li><NavLink class="dropdown-item" to="/admin/addAnotherAdmin">Add Another Admin</NavLink></li>
                                <li><NavLink class="dropdown-item bg-danger text-white" to="/admin/logout">Logout</NavLink></li>

                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="makeMeWhite">
                {component_mapping[component_name]}
            </div>

        </>
    )
}
