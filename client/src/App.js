import logo from './logo.svg';
import './App.css';
import { Route } from 'react-router';
import LoginComponent from './components/Login/LoginComponent'
import SideNavbar from './components/Home/SideNavbar';
import HomeComponent from './components/Home/HomeComponent';
import CardComponent from './components/Home/CardComponent';
import RightComponent from './components/Home/RightComponent';
import TempSideNavbar from './components/Home/TempSideNavbar';
import YourLoans from './components/Home/YourLoans/YourLoans';
import AdminLogin from './components/Admin/Login/AdminLogin';
import BodyComp from "./components/Admin/Body/BodyComp"
import { injectStyle } from "react-toastify/dist/inject-style";


function App() {
  if (typeof window !== "undefined") {
    injectStyle();
  }
  return (
    <>
      <Route exact path="/">
        <LoginComponent></LoginComponent>
      </Route>
      <Route path="/login">
        <LoginComponent></LoginComponent>
      </Route>
      <Route path="/admin/login">
        <AdminLogin></AdminLogin>
      </Route>
      <Route path="/admin/home">
        <BodyComp name="home" />
      </Route>

      <Route path="/admin/makeDebitCard">
        <BodyComp name="makeDebitCard" />
      </Route>
      <Route path="/admin/createUser">
        <BodyComp name="createUser" />
      </Route>
      <Route path="/admin/createUserAccount">
        <BodyComp name="createUserAccount" />
      </Route>
      <Route path="/admin/blockUserAccount">
        <BodyComp name="blockUserAccount" />
      </Route>
      <Route path="/admin/viewLoanRequest">
        <BodyComp name="viewLoanRequest" />
      </Route>
      <Route path="/admin/sanctionLoan">
        <BodyComp name="sanctionLoan" />
      </Route>
      <Route path="/admin/addCashToUser">
        <BodyComp name="addCashToUser" />
      </Route>
      <Route path="/admin/addAnotherAdmin">
        <BodyComp name="addAnotherAdmin" />
      </Route>
      <Route path="/admin/viewProfile">
        <BodyComp name="viewProfile" />
      </Route>
      <Route path="/admin/logout">
        <BodyComp name="logout" />
      </Route>



      <div class="row">
        <div className="col-2">
          <Route path="/home">
            {/* <SideNavbar></SideNavbar> */}
            <TempSideNavbar></TempSideNavbar>

          </Route>
          <Route path="/transaction">
            <TempSideNavbar></TempSideNavbar>
          </Route>
          <Route path="/otp">
            <TempSideNavbar></TempSideNavbar>
          </Route>
          <Route path="/yourLoans">
            <TempSideNavbar></TempSideNavbar>
          </Route>
          <Route path="/quickTransfer">
            <TempSideNavbar></TempSideNavbar>
          </Route>
          <Route path="/balance">
            {/* <SideNavbar></SideNavbar> */}
            <TempSideNavbar></TempSideNavbar>
          </Route>
          <Route path="/ecard">
            <TempSideNavbar></TempSideNavbar>
          </Route>
          <Route path="/account">
            <TempSideNavbar></TempSideNavbar>
          </Route>
          <Route path="/makePayment">
            <TempSideNavbar></TempSideNavbar>
          </Route>
          <Route path="/loan/carLoan">
            <TempSideNavbar></TempSideNavbar>
          </Route>
          <Route path="/loan">
            <TempSideNavbar></TempSideNavbar>
          </Route>
          <Route path="/viewfixedDeposits">
            <TempSideNavbar></TempSideNavbar>
          </Route>
          <Route path="/applyfixedDeposits">
            <TempSideNavbar></TempSideNavbar>
          </Route>
          <Route path="/assistance">
            <TempSideNavbar></TempSideNavbar>
          </Route>
          <Route path="/RTGS">
            <TempSideNavbar></TempSideNavbar>
          </Route>
          <Route path="/NEFT">
            <TempSideNavbar></TempSideNavbar>
          </Route>
        </div>
        <div className="col-9 custcol9">

          <Route path="/home">
            <RightComponent component_name="home"></RightComponent>
          </Route>
          <Route path="/otp">
            <RightComponent component_name="otp"></RightComponent>
          </Route>
          <Route path="/transaction">
            <RightComponent component_name="transaction"></RightComponent>
          </Route>
          <Route path="/quickTransfer">
            <RightComponent component_name="quickTransfer"></RightComponent>
          </Route>
          <Route path="/balance">
            <RightComponent component_name="balance"></RightComponent>
          </Route>
          <Route path="/ecard/debitcards">
            <RightComponent component_name="ecards"></RightComponent>
          </Route>
          <Route path="/ecard/creditcards">
            <RightComponent component_name="ecards"></RightComponent>
          </Route>
          <Route path="/Account/:slug">
            <RightComponent component_name="account"></RightComponent>
          </Route>
          <Route path="/makePayment">
            <RightComponent component_name="makePayment"></RightComponent>
          </Route>
          <Route path="/loan/carLoan">
            <RightComponent component_name="carLoan"></RightComponent>
          </Route>
          <Route path="/loan/loanInquiry">
            <RightComponent component_name="loanInquiry"></RightComponent>
          </Route>
          <Route path="/viewfixedDeposits">
            <RightComponent component_name="viewfixedDeposits"></RightComponent>
          </Route>
          <Route path="/applyfixedDeposits">
            <RightComponent component_name="applyfixedDeposits"></RightComponent>
          </Route>
          <Route path="/assistance">
            <RightComponent component_name="assistance"></RightComponent>
          </Route>
          <Route path="/RTGS">
            <RightComponent component_name="RTGS"></RightComponent>
          </Route>
          <Route path="/NEFT">
            <RightComponent component_name="NEFT"></RightComponent>
          </Route>
          <Route path="/yourLoans">
            <RightComponent component_name="yourLoans"></RightComponent>
          </Route>
          <Route path="/logout">
            <RightComponent component_name="logout"></RightComponent>
          </Route>
        </div>
      </div>
    </>
  );
}

export default App;
