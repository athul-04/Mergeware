
import { useParams } from "react-router-dom";
import React, { useState } from 'react';
import './Lender.css'; 

const Lender = () => {
    const [loanAmount, setLoanAmount] = useState('');
    const [requests, setRequests] = useState([]);

    const handleLoanRequest = () => {
        if (loanAmount.trim() !== '') {
            setRequests((prevRequests) => [...prevRequests, loanAmount]);
            setLoanAmount('');
        }
    };

    return (
        <div className="lender-container">
            <h2>Lender</h2>
            <div className="loan-request-form">
                <input
                    type="text"
                    placeholder="Enter loan amount"
                    value={loanAmount}
                    onChange={(e) => setLoanAmount(e.target.value)}
                />
                <button onClick={handleLoanRequest}>Ask for Lending</button>
            </div>
            <div className="loan-requests">
                <h3>Loan Requests:</h3>
                <ul>
                    {requests.map((request, index) => (
                        <li key={index}>{request}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Lender;
