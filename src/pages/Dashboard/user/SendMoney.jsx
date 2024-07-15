import React, { useState } from 'react';
import axios from 'axios';

const SendMoney = ({ user }) => {
    const [recipientEmail, setRecipientEmail] = useState('');
    const [amount, setAmount] = useState('');

    const handleSendMoney = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/send-money`, {
                fromEmail: user.email,
                toEmail: recipientEmail,
                amount: parseFloat(amount),
            });

            if (response.data.success) {
                alert('Money sent successfully');
            } else {
                alert(response.data.message);
            }
        } catch (error) {
            console.error('Error sending money:', error);
            alert('Failed to send money');
        }
    };

    return (
        <form onSubmit={handleSendMoney}>
            <h2>Send Money</h2>
            <input
                type="email"
                placeholder="Recipient Email"
                value={recipientEmail}
                onChange={(e) => setRecipientEmail(e.target.value)}
                required
            />
            <input
                type="number"
                placeholder="Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
            />
            <button type="submit">Send</button>
        </form>
    );
};

export default SendMoney;
