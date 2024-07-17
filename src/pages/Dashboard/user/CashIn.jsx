import React, { useState } from 'react';
import axios from 'axios';
import useAxiosSecure from "../../../hooks/useAxiosSecure.jsx";
import {useAuth} from "../../../context/AuthContext.jsx";

const CashIn = () => {

    const { user } = useAuth();

    const [agentEmail, setAgentEmail] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [amount, setAmount] = useState('');
    const [message, setMessage] = useState('');
    const axiosSecure = useAxiosSecure();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axiosSecure.post('/request-cash-in', {
                agentEmail,
                userEmail: user.user.email,
                amount: parseFloat(amount),
            });

            if (response.data.success) {
                setMessage('Cash-in request created successfully');
            } else {
                setMessage('Error creating cash-in request');
            }
        } catch (error) {
            setMessage('Error creating cash-in request');
            console.error('There was an error!', error);
        }
    };

    return (
        <>

            <div className="max-w-md mx-auto bg-gray-100 shadow-md rounded-md overflow-hidden mt-16">

            <div>
                <h2>Request Cash-In</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Agent Email:</label>
                        <input
                            type="email"
                            value={agentEmail}
                            onChange={(e) => setAgentEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label>Amount:</label>
                        <input
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit">Request Cash-In</button>
                </form>
                {message && <p>{message}</p>}
            </div>

            </div>

        </>
    );
};

export default CashIn;