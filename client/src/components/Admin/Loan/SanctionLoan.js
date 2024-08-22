import React, { useState, useEffect } from 'react'
import "./SanctionLoan.css"

// Loan-ID: 6141c83047cfde0d281c1e61
// Lender: Bankers small finance Bank Ltd.
// Receiver: Jenil J Gandhi.
// Receiver A/C: 611e8dd6fb5f5152fc2c5860.
// Loan Amount: $132181
// Interest Rate: $8.98
// Loan Duration: 60 months
// Months Completed: 0 months
// Amount to be paid: $191537.65
// Amount paid till now: $0
// Remarks: None

export default function SanctionLoan() {
    return (
        <>
            <div className="form-wrapper container">
                <form className="mt-3">
                    <p>Sanction Loan</p>
                    <div>
                        <input className="ddu-input my-2" placeholder="Loan-ID" />
                        <input className="ddu-input my-2" placeholder="Lender" />
                        <input className="ddu-input my-2" placeholder="Receiver" />
                        <input className="ddu-input my-2" placeholder="Receiver A/C" />
                        <input className="ddu-input my-2" placeholder="Loan Amount" type="number" />
                        <input className="ddu-input my-2" placeholder="Interest Rate" type="number" />
                        <input className="ddu-input my-2" placeholder="Loan Duration" type="number" />
                        <input className="ddu-input my-2" placeholder="Months Completed" type="number" /><br />
                        <input className="ddu-input my-2" placeholder="Amount to be paid" type="number" />
                        <input className="ddu-input my-2" placeholder="Amount paid till now" type="number" />
                        <input className="ddu-input my-2" placeholder="Remarks" type="number" />
                        <button type="submit" className="btn btn-primary subBtn1">Approve Loan</button>
                        <button type="submit" className="btn btn-primary subBtn1">Decline Loan</button>
                    </div>
                </form>
            </div>
        </>
    )
}
