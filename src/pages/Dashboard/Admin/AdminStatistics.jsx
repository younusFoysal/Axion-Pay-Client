import React, {useEffect, useState} from 'react';
import {useAuth} from "../../../context/AuthContext.jsx";
import {Link} from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure.jsx";
import {FaCircleDollarToSlot, FaHandHoldingDollar, FaPhoneFlip} from "react-icons/fa6";
import {MdEmail} from "react-icons/md";
import {FaGoogle} from "react-icons/fa";
import {TbLocationDollar} from "react-icons/tb";
import {LuSendToBack} from "react-icons/lu";
import toast from "react-hot-toast";

const AdminStatistics = () => {

    const { user , refetch  } = useAuth();
    //console.log(user)

    const axiosSecure = useAxiosSecure();
    const [userBalance, setUserBalance] = useState(null);
    const [error, setError] = useState('');
    const [phone, setPhone] = useState(null);
    const [email, setEmail] = useState(null);

    const [stats, setStats] = useState({
        totalTransactions: 0,
        sendMoneyCount: 0,
        cashInCount: 0,
        cashOutCount: 0
    });


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




    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const response = await axiosSecure.get(`/transactionsStats`);
                setStats(response.data);
            } catch (error) {
                console.error('Error fetching transactions:', error);
            }
        };

        fetchTransactions();
    }, [stats]);



    const handleStatusChange = () => {
        console.log("Status updating...");

        const updateStatus = new Promise((resolve, reject) => {
            try {
                setStats('');
                resolve('Status updated');
            } catch (error) {
                reject('Could not update status');
            }
        });

        toast.promise(
            updateStatus,
            {
                loading: 'Status updating...',
                success: <b>Status updated!</b>,
                error: <b>Could not update status.</b>,
            }
        );
    }







    return (
        <div className="animated-background bg-gradient-to-tr from-[#bae6fd] via-[#bfdbfe] to-[#c7d2fe] min-h-screen">
            <div className="flex flex-col md:flex-row pt-4 px-4 md:px-10 pb-4 ">
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
                                    <div className="font-semibold text-3xl md:text-5xl tracking-tight -mt-2">Admin</div>
                                </div>
                            </div>
                            <div
                                className="flex justify-between h-20 md:h-32 rounded-xl mt-5 md:mt-11 shadow-md p-6 text-white bg-sky-500">
                                <div>
                                    <div className="font-semibold md:mb-1 text-sm md:text-xl -mt-2 ">
                                        Total Transactions
                                    </div>
                                    <div className="font-semibold text-2xl sm:text-3xl md:text-6xl tracking-tight ">
                                        {stats.totalTransactions}
                                    </div>
                                </div>
                                <div>
                                    <button
                                        className="btn btn-sm btn-outline bg-sky-400 border-0 shadow text-white hover:bg-sky-500 hover:scale-105 hidden"
                                        onClick={fetchUserBalance}>
                                        Refresh Balance
                                    </button>
                                    <button
                                        className="btn btn-sm btn-outline bg-sky-400 border-0 shadow text-white hover:bg-sky-500 hover:scale-105"
                                        onClick={handleStatusChange}>
                                        Refresh Status
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/*<div*/}
                        {/*    className="text-center p-4 mb-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg shadow-xl shadow-indigo-200">*/}
                        {/*    <h1 className="font-bold text-4xl mb-4">All Transactions</h1>*/}
                        {/*    <h1 className="text-3xl">Monitor All the Transactions on the System</h1>*/}
                        {/*    <div className="mt-4">*/}
                        {/*        <p>Total Transactions: {stats.totalTransactions}</p>*/}
                        {/*        <p>Send Money: {stats.sendMoneyCount}</p>*/}
                        {/*        <p>Cash In: {stats.cashInCount}</p>*/}
                        {/*        <p>Cash Out: {stats.cashOutCount}</p>*/}
                        {/*    </div>*/}
                        {/*</div>*/}

                        <div
                            className="bg-no-repeat flex flex-col justify-evenly animated-background bg-gradient-to-tr from-[#bae6fd] via-[#bfdbfe] to-[#c7d2fe] shadow-xl border border-blue-400 rounded-xl w-full md:w-5/12 mb-4 md:ml-2 p-6">


                            <div className=" rounded-xl  shadow-md p-6 bg-orange-500">
                                <div
                                    className="flex items-center font-semibold  -mt-3 md:-mt-3 text-lg md:text-xl text-white">
                                    <FaPhoneFlip className="mr-2 text-xl"/>
                                    Phone
                                </div>
                                <div
                                    className="font-semibold -mt-2 md:-mt-0 text-2xl md:text-3xl tracking-tight text-white">
                                    {error ? (
                                        error
                                    ) : (
                                        phone !== null ? phone : user?.user.phone
                                    )}
                                </div>
                            </div>


                            <div className=" rounded-xl mt-2 shadow-md p-6 bg-orange-500">
                                <div
                                    className="flex items-center font-semibold -mt-3 md:-mt-3 text-lg md:text-xl text-white">
                                    <MdEmail className="mr-2 text-xl" />
                                    Email
                                </div>
                                <div
                                    className="font-semibold -mt-2 md:-mt-0 text-2xl md:text-3xl tracking-tight text-white">
                                    {error ? (
                                        error
                                    ) : (
                                        email !== null ? email : user?.user.email
                                    )}
                                </div>
                            </div>

                            <Link to={'/allTransactions'}>
                                <div
                                    className="btn border-0 hover:scale-105 text-center my-auto bg-orange-400 text-lg md:text-xl text-white hover:bg-orange-500 rounded-xl mt-2 md:mt-4 px-4 md:px-8 py-1 md:py-2 flex items-center justify-center">
                                    <span>See All Transactions</span>
                                </div>

                            </Link>
                        </div>
                    </div>
                    <div className="flex flex-col justify-between gap-8 md:flex-row h-64 mt-6">

                        <div className="bg-white rounded-xl shadow-lg mb-4 md:mb-0 px-6 py-4 w-full md:w-1/3">

                            <div className="h-10 md:h-10 rounded-xl mt-2 shadow-md p-6 bg-orange-500">
                                <div
                                    className=" flex items-center font-semibold mb-1 -mt-4 md:-mt-4 text-lg md:text-xl text-white">
                                    <TbLocationDollar className="mr-4 text-3xl"/>
                                    Send Money
                                </div>
                            </div>

                            <div
                                className="flex justify-between flex-col h-30 md:h-32 rounded-xl mt-7 shadow-md p-6 bg-orange-500">
                            <div
                                    className="flex items-center  font-semibold mb-1 -mt-3 md:-mt-3 text-lg md:text-xl text-white">
                                    <LuSendToBack className="mr-4 text-3xl"/>
                                    Transactions
                                </div>
                                <div
                                    className="font-semibold text-3xl md:text-5xl tracking-tight text-white">
                                    {stats.sendMoneyCount}
                                </div>
                            </div>


                        </div>

                        <div className="bg-white rounded-xl shadow-lg mb-4 md:mb-0 px-6 py-4 w-full md:w-1/3">

                            <div className="h-10 md:h-10 rounded-xl mt-2 shadow-md p-6 bg-orange-500">
                                <div
                                    className=" flex items-center font-semibold mb-1 -mt-4 md:-mt-4 text-lg md:text-xl text-white">
                                    <FaCircleDollarToSlot className="mr-4 text-3xl" />
                                    Cash In
                                </div>
                            </div>

                            <div
                                className="flex justify-between flex-col h-30 md:h-32 rounded-xl mt-7 shadow-md p-6 bg-orange-500">
                                <div
                                    className="flex items-center  font-semibold mb-1 -mt-3 md:-mt-3 text-lg md:text-xl text-white">
                                    <LuSendToBack className="mr-4 text-3xl"/>
                                    Transactions
                                </div>
                                <div
                                    className="font-semibold text-3xl md:text-5xl tracking-tight text-white">
                                    {stats.cashInCount}
                                </div>
                            </div>


                        </div>


                        <div className="bg-white rounded-xl shadow-lg mb-4 md:mb-0 px-6 py-4 w-full md:w-1/3">

                            <div className="h-10 md:h-10 rounded-xl mt-2 shadow-md p-6 bg-orange-500">
                                <div
                                    className=" flex items-center font-semibold mb-1 -mt-4 md:-mt-4 text-lg md:text-xl text-white">
                                    <FaHandHoldingDollar className="mr-4 text-3xl" />
                                    Cash Out
                                </div>
                            </div>

                            <div
                                className="flex justify-between flex-col h-30 md:h-32 rounded-xl mt-7 shadow-md p-6 bg-orange-500">
                                <div
                                    className="flex items-center  font-semibold mb-1 -mt-3 md:-mt-3 text-lg md:text-xl text-white">
                                    <LuSendToBack className="mr-4 text-3xl"/>
                                    Transactions
                                </div>
                                <div
                                    className="font-semibold text-3xl md:text-5xl tracking-tight text-white">
                                    {stats.cashOutCount}
                                </div>
                            </div>


                        </div>


                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminStatistics;