import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {useAuth} from "../../../context/AuthContext.jsx";

const TransactionHistory = () => {
    const { user } = useAuth();
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/transactions/${user.email}`);
                setTransactions(response.data);
            } catch (error) {
                console.error('Error fetching transactions:', error);
            }
        };

        fetchTransactions();
    }, [user.email]);

    return (
        <div className="mt-4">
            <h2 className="text-xl font-semibold">Transaction History</h2>
            <ul className="list-disc pl-5">
                {transactions.map((transaction, index) => (
                    <li key={index} className="my-2">
                        <span>{transaction.amount} to {transaction.toEmail} on {new Date(transaction.timestamp).toLocaleString()}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TransactionHistory;
