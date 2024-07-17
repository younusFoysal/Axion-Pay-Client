import React, { useState } from 'react';
import axios from 'axios';
import {useAuth} from "../../../context/AuthContext.jsx";
import ConfirmPassword from "../../../components/ConfirmPassword.jsx";
import toast from 'react-hot-toast'
import useAxiosSecure from "../../../hooks/useAxiosSecure.jsx";

const CashOut = () => {

    const { user } = useAuth();
    const [agentEmail, setAgentEmail] = useState('');
    const [amount, setAmount] = useState('');
    const [message, setMessage] = useState('');
    const [showConfirm, setShowConfirm] = useState(false);
    const axiosSecure = useAxiosSecure();


    const handleSubmit = (e) => {
        e.preventDefault();

        setShowConfirm(true);
    };

    const handleConfirmPassword = async (password) => {


        try {


            const response = await axiosSecure.post(`/request-cash-out`, {
                agentEmail,
                userEmail: user.user.email,
                amount: parseFloat(amount),
                password,
            });
            console.log(response);

            if (response.data.success) {
                toast.success('Cash-Out request created successfully')
                setMessage('Cash-Out request created successfully');
            } else {
                setMessage('Error creating cash-Out request');
                //toast.error('Error creating cash-Out request')
                toast.error('Failed to creating cash-Out request: ' + response.data.message )
            }
        } catch (error) {
            console.error('Error creating cash-Out request:', error?.response);
            toast.error('Failed to creating cash-Out request: ' + error?.response?.data?.message || 'Server error');
        } finally {
            setShowConfirm(false);
            setAgentEmail('');
            setAmount('');
        }
    };


    return (
        <>


            <div className="max-w-md mx-auto bg-gray-100 shadow-md rounded-md overflow-hidden mt-16">
                <div className="bg-blue-600 text-white p-4 flex justify-between">
                    <div className="font-bold text-lg">Request Cash Out - Fee 1.5%</div>
                    <div className="text-lg"><i className="fab fa-cc-visa"></i></div>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="p-6">
                        <div className="mb-4">
                            <label className="block text-gray-700 font-bold mb-2" htmlFor="email">
                                Agent Email
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="email"
                                type="email"
                                value={agentEmail}
                                onChange={(e) => setAgentEmail(e.target.value)}
                                placeholder="Recipient Email"
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
                            Request Cash-Out
                        </button>

                        {showConfirm && (
                            <ConfirmPassword
                                onConfirm={handleConfirmPassword}
                                onCancel={() => setShowConfirm(false)}
                            />
                        )}

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

            </div>


        </>
    );
};

export default CashOut;