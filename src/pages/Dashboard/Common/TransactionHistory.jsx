import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {useAuth} from "../../../context/AuthContext.jsx";
import useAxiosSecure from "../../../hooks/useAxiosSecure.jsx";

const TransactionHistory = () => {
    const { user } = useAuth();
    const [transactions, setTransactions] = useState([]);
    const axiosSecure = useAxiosSecure();

    //console.log(user.user.role)

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const response = await axiosSecure.get(`/transactions/${user?.user?.email}`);
                setTransactions(response.data);
            } catch (error) {
                console.error('Error fetching transactions:', error);
            }
        };

        fetchTransactions();
    }, [user.email]);


    let listLimit = 0;
    if (user.user.role === 'user'){
        listLimit = 10;
    }else if (user.user.role === 'agent'){
        listLimit = 20;
    }else{
        listLimit =99999;
    }

    let num = 1;

    return (
        <div className="animated-background bg-gradient-to-tr from-[#bae6fd] via-[#bfdbfe] to-[#c7d2fe] min-h-screen pt-2">
            <div className="flex flex-col md:flex-row pt-10 px-4 md:px-10 pb-4 w-full items-center justify-center">

                {/*<div className="mt-4">*/}
                {/*    <h2 className="text-xl font-semibold">Transaction History</h2>*/}
                {/*    <ul className="list-disc pl-5">*/}
                {/*        {transactions.map((transaction, index) => (*/}
                {/*            <li key={index} className="my-2">*/}
                {/*                <span>{transaction.amount} to {transaction.toEmail} on {new Date(transaction.timestamp).toLocaleString()}</span>*/}
                {/*            </li>*/}
                {/*        ))}*/}
                {/*    </ul>*/}
                {/*</div>*/}


                <div className="flex flex-col">
                    <div className=" overflow-x-auto">
                        <div className="min-w-full inline-block align-middle">


                            <h1 className="text-4xl text-center border-1 rounded text-white shadow-md mb-6 p-4 font-bold text-transparentanimated-background bg-gradient-to-tr from-blue-500 via-sky-500 to-sky-300 ">
                                <span className=" -mb-4 ">Transaction History</span>
                            </h1>


                            <div className="overflow-hidden w-full rounded-xl shadow-xl">
                                <table className=" min-w-full rounded">
                                    <thead>
                                    <tr className="bg-gray-50">
                                        <th scope="col"
                                            className="p-5 text-left text-sm leading-6 font-semibold text-gray-900 capitalize rounded-t-xl">
                                            Num
                                        </th>
                                        <th scope="col"
                                            className="p-5 text-left text-sm leading-6 font-semibold text-gray-900 capitalize rounded-t-xl">
                                            From
                                        </th>
                                        <th scope="col"
                                            className="p-5 text-left text-sm leading-6 font-semibold text-gray-900 capitalize rounded-t-xl">
                                            To

                                        </th>
                                        <th scope="col"
                                            className="p-5 text-left text-sm leading-6 font-semibold text-gray-900 capitalize">
                                            Amount

                                        </th>
                                        <th scope="col"
                                            className="p-5 text-left text-sm leading-6 font-semibold text-gray-900 capitalize">
                                            Type

                                        </th>
                                        <th scope="col"
                                            className="p-5 text-left text-sm leading-6 font-semibold text-gray-900 capitalize">
                                            Date
                                        </th>
                                        <th scope="col"
                                            className="p-5 text-left text-sm leading-6 font-semibold text-gray-900 capitalize">
                                            TrxID
                                        </th>

                                    </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-300 ">

                                    {
                                        transactions?.slice(0, listLimit)?.map((transaction, index) => (
                                            <tr key={index}
                                                className="bg-white transition-all duration-500 hover:bg-gray-50">

                                                <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900 ">
                                                    {num++}
                                                </td>

                                                <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900 ">
                                                    {transaction.fromEmail}
                                                </td>


                                                <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900 ">
                                                    {transaction.toEmail}
                                                </td>

                                                <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900">
                                                    {transaction.amount}
                                                </td>
                                                <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900">
                                                    {transaction.transType}
                                                </td>
                                                <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900">
                                                    {new Date(transaction.timestamp).toLocaleString()}
                                                </td>
                                                <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900">
                                                    {transaction._id}
                                                </td>

                                            </tr>))
                                    }


                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>


            </div>


        </div>
    );
};

export default TransactionHistory;
