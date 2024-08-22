import React from "react";
import "./CarLoan1.css";
import calculatePayments from "../../Utility/Loan/CarLoan/CarLoanCalc";
export default function CarLoan() {
  return (
    <>
        <h1 className ="loanOfferHeader">Offers on Loans</h1>
        <hr className="loanhr"/><br/>
      <div class="card-group">
        <div class="card mr-2">
          <img
            src="https://source.unsplash.com/1600x900/?cars,wheels"
            class="card-img-top"
            alt="..."
          />
          <div class="card-body">
            <h3 class="card-title">Car Loans</h3>
            <p class="card-text">
              Car loans are available at very low interest rate of 5.8% , also with extended time frame of upto two years and low down payment
            </p>
            <p class="card-text">
              <small class="text-muted">Terms and conditions apply</small>
            </p>
          </div>
        </div>
        <div class="card mr-2">
          <img
            src="https://source.unsplash.com/1600x900/?building,property"
            class="card-img-top"
            alt="..."
          />
          <div class="card-body">
            <h3 class="card-title">Home Loans</h3>
            <p class="card-text">
                          Home loans are available at attractive interest rate of 8.1% , also with extended time frame of upto two years and low down payment
            </p>
            <p class="card-text">
              <small class="text-muted">Terms and conditions apply</small>
            </p>
          </div>
        </div>
        <div class="card">
          <img
            src="https://source.unsplash.com/1600x900/?student,university"
            class="card-img-top"
            alt="..."
          />
          <div class="card-body">
            <h3 class="card-title">Student Loans</h3>
            <p class="card-text">
              Bankers support students to achieve their goals and study abroad. No collateral loans available at offer price. Loans guaranteed below 10Lakhs.
            </p>
            <p class="card-text">
              <small class="text-muted">Terms and conditions apply</small>
            </p>
          </div>
        </div>
      </div>

      <div class="card-group row">
        <div class="card col-4 p-1 mt-3">
                  <img src="https://source.unsplash.com/1600x900/?corporate,business" class="card-img-top" alt="..." />
          <div class="card-body">
            <h3 class="card-title">Corporate Loans</h3>
            <p class="card-text">
              We also help corporates to expand their business further at very attractive interest rates and easy return policy.
            </p>
            <p class="card-text">
                          <small class="text-muted">Terms and conditions apply</small>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
