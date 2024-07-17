import React, { useState } from 'react';
import axios from 'axios';
import useAxiosSecure from "../../../hooks/useAxiosSecure.jsx";
import {useAuth} from "../../../context/AuthContext.jsx";
import toast from "react-hot-toast";
import ConfirmPassword from "../../../components/ConfirmPassword.jsx";

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
                toast.success('Cash-in request created successfully')
                setMessage('Cash-in request created successfully');
            } else {
                setMessage('Error creating cash-in request');
                toast.success('Error creating cash-in request')
            }
        } catch (error) {
            setMessage('Error creating cash-in request');
            console.error('There was an error!', error);
            toast.error('Failed to creating cash-in request: ' + error.response?.data?.message || 'Server error');
        }
    };

    return (
        <>

            <div className="max-w-md mx-auto bg-gray-100 shadow-md rounded-md overflow-hidden mt-16">
                <div className="bg-blue-600 text-white p-4 flex justify-between">
                    <div className="font-bold text-lg">Request Cash-In</div>
                    <div className="text-lg"><i className="fab fa-cc-visa"></i></div>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="p-6">
                        <div className="mb-4">
                            <label className="block text-gray-700 font-bold mb-2" htmlFor="email">
                                Agent Email:
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="email"
                                type="email"
                                value={agentEmail}
                                onChange={(e) => setAgentEmail(e.target.value)}
                                placeholder="Agent Email"
                                required
                            />
                        </div>
                        <div className="mb-4 flex justify-between">
                            <div>
                                <label className="block text-gray-700 font-bold mb-2" htmlFor="number">
                                    Amount
                                </label>
                                <input
                                    className="shadow appearance-none border rounded w-24 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="number"
                                    type="number"
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                    placeholder="Amount"
                                    required
                                />
                            </div>

                        </div>
                        <button
                            className="bg-blue-600 text-white py-2 px-4 rounded font-bold hover:bg-blue-700 focus:outline-none focus:shadow-outline"
                            type="submit"
                        >
                            Request Cash-In
                        </button>

                    </div>
                </form>


                {message && <div role="alert" className="alert alert-info">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        className="h-6 w-6 shrink-0 stroke-current">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    <span>{message}</span>
                </div>}

                {/*<div>*/}
                {/*    <h2>Request Cash-In</h2>*/}
                {/*    <form onSubmit={handleSubmit}>*/}
                {/*        <div>*/}
                {/*            <label>Agent Email:</label>*/}
                {/*            <input*/}
                {/*                type="email"*/}
                {/*                value={agentEmail}*/}
                {/*                onChange={(e) => setAgentEmail(e.target.value)}*/}
                {/*                required*/}
                {/*            />*/}
                {/*        </div>*/}
                {/*        <div>*/}
                {/*            <label>Amount:</label>*/}
                {/*            <input*/}
                {/*                type="number"*/}
                {/*                value={amount}*/}
                {/*                onChange={(e) => setAmount(e.target.value)}*/}
                {/*                required*/}
                {/*            />*/}
                {/*        </div>*/}
                {/*        <button type="submit">Request Cash-In</button>*/}
                {/*    </form>*/}
                {/*    {message && <p>{message}</p>}*/}
                {/*</div>*/}

            </div>

        </>
    );
};

export default CashIn;