import React from 'react'
import "./ViewLoanRequest.css"

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

export default function ViewLoanRequest() {
    return (
        <>
            <br />
            <table class="table table-hover table-bordered viewLoanTable text-center">
                <thead>
                    <tr>
                        <th scope="col">Loan-ID</th>
                        <th scope="col">Receiver A/C</th>
                        <th scope="col">FirstName</th>
                        <th scope="col">MiddleName</th>
                        <th scope="col">LastName</th>
                        <th scope="col">Loan Amount</th>
                        <th scope="col">Interest Rate</th>
                        <th scope="col">Loan Duration</th>
                        <th scope="col">Approve Loan</th>
                        <th scope="col">Decline Loan</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th scope="row">6141c83047cfde0d281c1e61</th>
                        <th >611e8dd6fb5f5152fc2c5860</th>
                        <td>Jenil</td>
                        <td>J</td>
                        <td>Gandhi</td>
                        <td>132181</td>
                        <td>8.98</td>
                        <td>60</td>
                        <td><button type="submit" className="btn btn-primary subBtn2">Approve Loan</button></td>
                        <td><button type="submit" className="btn btn-primary subBtn2">Decline Loan</button></td>
                    </tr>
                    <tr>
                        <th scope="row">6141c83047cfde0d281c1e61</th>
                        <th >611e8dd6fb5f5152fc2c5860</th>
                        <td>Rikin</td>
                        <td>Dipakkumar</td>
                        <td>Chauhan</td>
                        <td>1181</td>
                        <td>9.98</td>
                        <td>12</td>
                        <td><button type="submit" className="btn btn-primary subBtn2">Approve Loan</button></td>
                        <td><button type="submit" className="btn btn-primary subBtn2">Decline Loan</button></td>
                    </tr>
                    <tr>
                        <th scope="row">6141c83047cfde0d281c1e61</th>
                        <th >611e8dd6fb5f5152fc2c5860</th>
                        <td>Keval</td>
                        <td>Dharmeshbhai</td>
                        <td>Gandevia</td>
                        <td>13218121</td>
                        <td>6.98</td>
                        <td>124</td>
                        <td><button type="submit" className="btn btn-primary subBtn2">Approve Loan</button></td>
                        <td><button type="submit" className="btn btn-primary subBtn2">Decline Loan</button></td>
                    </tr>
                </tbody>
            </table>
        </>
    )
}
