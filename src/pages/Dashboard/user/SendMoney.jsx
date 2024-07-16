import React, { useState } from 'react';
import axios from 'axios';
import {useAuth} from "../../../context/AuthContext.jsx";
import ConfirmPassword from "../../../components/ConfirmPassword.jsx";
import toast from 'react-hot-toast'


const SendMoney = () => {
    const { user } = useAuth();
    const [recipientEmail, setRecipientEmail] = useState('');
    const [amount, setAmount] = useState('');
    const [showConfirm, setShowConfirm] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (amount < 49){
            return toast.error('Less then $50 is not allowed for transactions.')
        }else if (amount > 100){
            const saveAmount = amount - 5;
            setAmount(saveAmount)
        }

        setShowConfirm(true);
    };

    const handleConfirmPassword = async (password) => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/send-money`, {
                fromEmail: user?.user?.email,
                toEmail: recipientEmail,
                amount: parseFloat(amount),
                password,
            });
            console.log(response);

            if (response.data.success) {
                toast.success('Money sent successfully')
            } else {
                toast.success(response.data.message)
            }
        } catch (error) {
            console.error('Error sending money:', error);
            toast.error('Failed to send money: ' + error.response?.data?.message || 'Server error');
        } finally {
            setShowConfirm(false);
            setRecipientEmail('');
            setAmount('');
        }
    };

    return (
        <>


            <div className="max-w-md mx-auto bg-gray-100 shadow-md rounded-md overflow-hidden mt-16">
                <div className="bg-blue-600 text-white p-4 flex justify-between">
                    <div className="font-bold text-lg">Send Money to any User</div>
                    <div className="text-lg"><i className="fab fa-cc-visa"></i></div>
                </div>

                <form onSubmit={handleSubmit}>
                <div className="p-6">
                    <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2" htmlFor="email">
                            Recipient Email
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="email"
                            type="email"
                            value={recipientEmail}
                            onChange={(e) => setRecipientEmail(e.target.value)}
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
                       Send Money
                    </button>

                    {showConfirm && (
                        <ConfirmPassword
                            onConfirm={handleConfirmPassword}
                            onCancel={() => setShowConfirm(false)}
                        />
                    )}

                </div>
                </form>

            </div>


        </>
    );
};

export default SendMoney;
