import React, { useState } from 'react';
import axios from 'axios';
import {useAuth} from "../../../context/AuthContext.jsx";
import ConfirmPassword from "../../../components/ConfirmPassword.jsx";


const SendMoney = () => {
    const { user } = useAuth();
    const [recipientEmail, setRecipientEmail] = useState('');
    const [amount, setAmount] = useState('');
    const [showConfirm, setShowConfirm] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setShowConfirm(true);
    };

    const handleConfirmPassword = async (password) => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/send-money`, {
                fromEmail: user.email,
                toEmail: recipientEmail,
                amount: parseFloat(amount),
                password,
            });
            console.log(response);

            if (response.data.success) {
                alert('Money sent successfully');
            } else {
                alert(response.data.message);
            }
        } catch (error) {
            console.error('Error sending money:', error);
            alert('Failed to send money: ' + error.response?.data?.message || 'Server error');
        } finally {
            setShowConfirm(false);
            setRecipientEmail('');
            setAmount('');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <h2 className="text-xl font-semibold">Send Money</h2>
            <input
                type="email"
                placeholder="Recipient Email"
                value={recipientEmail}
                onChange={(e) => setRecipientEmail(e.target.value)}
                className="input input-bordered w-full"
                required
            />
            <input
                type="number"
                placeholder="Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="input input-bordered w-full"
                required
            />
            <button type="submit" className="btn btn-primary">Send</button>

            {showConfirm && (
                <ConfirmPassword
                    onConfirm={handleConfirmPassword}
                    onCancel={() => setShowConfirm(false)}
                />
            )}
        </form>
    );
};

export default SendMoney;
