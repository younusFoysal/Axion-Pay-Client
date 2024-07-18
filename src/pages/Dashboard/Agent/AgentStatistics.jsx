import React, {useEffect, useState} from 'react';
import {useAuth} from "../../../context/AuthContext.jsx";
import {Link} from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure.jsx";
import {FaPhoneFlip} from "react-icons/fa6";
import {MdEmail} from "react-icons/md";
import {FaGoogle} from "react-icons/fa";

const AgentStatistics = () => {

    const { user  } = useAuth();
    console.log(user)

    const axiosSecure = useAxiosSecure();
    const [userBalance, setUserBalance] = useState(null);
    const [error, setError] = useState('');
    const [phone, setPhone] = useState(null);
    const [email, setEmail] = useState(null);



    // useEffect(() => {
    //     const fetchuserBalance = async () => {
    //         try {
    //             const response = await axiosSecure.get(`/user/${user.user.email}`);
    //             if (response.data.success) {
    //                 setuserBalance(response.data.balance);
    //                 console.log(response.data);
    //             } else {
    //                 setError('Error retrieving balance');
    //             }
    //         } catch (error) {
    //             setError('Error retrieving balance');
    //             console.error('There was an error!', error);
    //         }
    //     };
    //
    //     fetchuserBalance();
    // }, [userBalance]);



    const fetchUserBalance = async () => {
        try {
            const response = await axiosSecure.get(`/user/${user.user.email}`);
            //console.log(response.data)
            if (response.data) {
                setUserBalance(response.data.balance);
                setPhone(response.data.phone)
                setEmail(response.data.email)
                //console.log(response.data);
            } else {
                setError('Error retrieving balance');
            }
        } catch (error) {
            setError('Error retrieving balance');
            console.error('There was an error!', error);
        }
    };


    return (
        <div className="animated-background bg-gradient-to-tr from-[#bae6fd] via-[#bfdbfe] to-[#c7d2fe] min-h-screen">
            <div className="flex flex-col md:flex-row pt-24 px-4 md:px-10 pb-4">
                <div className="w-full mx-auto">
                    <div className="flex flex-col md:flex-row">
                        <div
                            className="bg-no-repeat animated-background bg-gradient-to-tr from-[#bae6fd] via-[#bfdbfe] to-[#c7d2fe] border border-blue-400 rounded-xl shadow-xl w-full md:w-7/12 mb-4 md:mr-2 p-6">
                            <div className="flex justify-between flex-col md:flex-row">
                                <div>
                                    <p className="text-3xl md:text-5xl text-indigo-900">Welcome <br/>
                                        <strong>{user?.user.name}</strong>
                                    </p>
                                </div>
                                <div
                                    className="flex justify-center items-center h-10 md:h-20 mt-2 text-white rounded-xl shadow-md p-6 max-w-[240px] bg-sky-500 backdrop-filter backdrop-blur-lg">
                                    <div className="font-semibold text-3xl md:text-5xl tracking-tight -mt-2">Agent</div>
                                </div>
                            </div>
                            <div
                                className="flex justify-between h-20 md:h-32 rounded-xl mt-5 md:mt-11 shadow-md p-6 text-white bg-sky-500">
                                <div>
                                    <div className="font-semibold md:mb-1 text-sm md:text-xl -mt-2 ">Account
                                        Balance
                                    </div>
                                    <div className="font-semibold text-2xl sm:text-3xl md:text-6xl tracking-tight ">
                                        {error ? (
                                            error
                                        ) : (
                                            userBalance !== null ? userBalance.toFixed(2) : user?.user.balance.toFixed(2)
                                        )}
                                    </div>
                                </div>
                                <div>
                                    <button
                                        className="btn btn-sm btn-outline bg-sky-400 border-0 shadow text-white hover:bg-sky-500 hover:scale-105"
                                        onClick={fetchUserBalance}>
                                        Refresh Balance
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div
                            className="bg-no-repeat animated-background bg-gradient-to-tr from-[#bae6fd] via-[#bfdbfe] to-[#c7d2fe] shadow-xl border border-blue-400 rounded-xl w-full md:w-5/12 mb-4 md:ml-2 p-6">
                            <div className="h-20 md:h-32 rounded-xl mt-11 shadow-md p-6 bg-orange-500">
                                <div
                                    className="flex items-center font-semibold mb-2 -mt-3 md:-mt-3 text-lg md:text-xl text-white">
                                    <FaPhoneFlip className="mr-2 text-2xl"/>
                                    Phone
                                </div>
                                <div
                                    className="font-semibold -mt-2 md:-mt-0 text-3xl md:text-5xl tracking-tight text-white">
                                    {error ? (
                                        error
                                    ) : (
                                        phone !== null ? phone : user?.user.phone
                                    )}
                                </div>
                            </div>
                            <Link to={'/transactions'}>
                                <div
                                    className="btn border-0 hover:scale-105 text-center my-auto bg-orange-400 text-lg md:text-xl text-white hover:bg-orange-500 rounded-xl mt-6 md:mt-12 px-4 md:px-8 py-1 md:py-2 flex items-center justify-center">
                                    <span>See All Transactions</span>
                                </div>

                            </Link>
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row h-64 mt-6">
                        <div className="bg-white rounded-xl shadow-lg mb-4 md:mb-0 px-6 py-4 w-full md:w-4/12">

                            <div className="h-10 md:h-10 rounded-xl mt-2 shadow-md p-6 bg-orange-500">
                                <div
                                    className=" flex items-center font-semibold mb-1 -mt-4 md:-mt-4 text-lg md:text-xl text-white">
                                    <MdEmail className="mr-4 text-3xl"></MdEmail>
                                    Contact Info
                                </div>
                            </div>

                            <div
                                className="flex justify-between flex-col h-30 md:h-32 rounded-xl mt-7 shadow-md p-6 bg-orange-500">
                                <div
                                    className="flex items-center  font-semibold mb-1 -mt-3 md:-mt-3 text-lg md:text-xl text-white">
                                    <FaGoogle className="mr-4 text-3xl"/>
                                    Gmail
                                </div>
                                <div
                                    className="font-semibold text-3xl md:text-3xl tracking-tight text-white">
                                    {error ? (
                                        error
                                    ) : (
                                        email !== null ? email : user?.user.email
                                    )}
                                </div>
                            </div>


                        </div>
                        <div className="bg-white rounded-xl shadow-lg md:mx-6 px-6 py-4 w-full md:w-4/12">


                            <div className="bg-white cursor-pointer shadow rounded-lg mt-3 flex">

                                <div className="w-2.5 h-auto bg-sky-500 rounded-tl-md rounded-bl-md"></div>
                                <div className="w-full p-4">
                                    <div className="md:flex items-center justify-between">
                                        <h2 className="text-2xl font-semibold leading-6 text-gray-800 ">Cash-Out</h2>


                                    </div>
                                    <p className="w-full text-base leading-6 mt-4 text-gray-600 ">
                                        For every cash out, there will be a fee which is 1.5% of the transaction
                                        amount and the fee will be deducted from the user's balance.


                                    </p>
                                </div>

                            </div>


                        </div>
                        <div className="bg-white rounded-xl shadow-lg px-6 py-4 w-full md:w-4/12">


                            <div className="bg-white cursor-pointer shadow rounded-lg mt-3 flex">

                                <div className="w-2.5 h-auto bg-sky-500 rounded-tl-md rounded-bl-md"></div>
                                <div className="w-full p-4">
                                    <div className="md:flex items-center justify-between">
                                        <h2 className="text-2xl font-semibold leading-6 text-gray-800 ">Send Money</h2>


                                    </div>
                                    <p className="w-full text-base leading-6 mt-4 text-gray-600 ">
                                        For every transaction over $100, a user has to pay a fee of $5 .
                                        An user needs to do a transaction with at least $50. Less than $50 is not
                                        allowed for transactions.


                                    </p>
                                </div>

                            </div>


                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AgentStatistics;