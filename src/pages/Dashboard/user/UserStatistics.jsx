import React, {useEffect} from 'react';
import SendMoney from "./SendMoney.jsx";
import {IoIosArrowForward, IoMdHome} from "react-icons/io";
import {TbBrandGoogleHome, TbClockDollar, TbLogout} from "react-icons/tb";
import {Link} from "react-router-dom";
import {BsFillSendCheckFill} from "react-icons/bs";
import {LiaMoneyBillWaveAltSolid} from "react-icons/lia";
import {FaCircleDollarToSlot} from "react-icons/fa6";
import {useAuth} from "../../../context/AuthContext.jsx";
import {BiDollar} from "react-icons/bi";
import {CgProfile} from "react-icons/cg";
import Logout from "../../../Logout.jsx";
import LoadingSpinner from "../../../components/LoadingSpinner.jsx";
import axios from "axios";
import {useQuery} from "@tanstack/react-query";

const UserStatistics = () => {
    const { user , refetch  } = useAuth();

    // useEffect(() => {
    //     fetchUser();
    // }, [fetchUser]);




    // // Fetch Employees
    // const { data: userL = [], isLoading, refetch } = useQuery({
    //     queryKey: ['status', user],
    //     queryFn: async () => {
    //         const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/user/${user?.user?.email}`);
    //         console.log("Identifier:", user.user.email, "Status:", data.status);
    //         return data;
    //     },
    // });

    // if (isLoading) return <LoadingSpinner />
    // console.log(userL)



    return (
        <div className="bg-orange-100 min-h-screen">

            <div className="flex flex-col md:flex-row pt-24 px-4 md:px-10 pb-4">


                <div className="w-full mx-auto">
                    <div className="flex flex-col md:flex-row">
                        <div
                            className="bg-no-repeat bg-red-200 border border-red-300 rounded-xl w-full md:w-7/12 mb-4 md:mr-2 p-6">
                            <p className="text-3xl md:text-5xl text-indigo-900">Welcome <br/>

                                <strong>
                                    {user?.user.name}
                                </strong></p>

                            <div className="h-20 md:h-32 rounded-xl mt-11 shadow-md p-6 bg-red-300">
                                <div className="font-semibold mb-1 text-lg md:text-xl text-indigo-900">Account Balance
                                </div>
                                <div
                                    className="font-semibold text-5xl md:text-6xl tracking-tight text-indigo-900">${user?.user.balance}
                                </div>
                            </div>


                        </div>

                        <div
                            className="bg-no-repeat bg-orange-200 border border-orange-300 rounded-xl w-full md:w-5/12 mb-4 md:ml-2 p-6">

                            <div className="h-20 md:h-32 rounded-xl mt-11 shadow-md p-6 bg-orange-400">
                                <div className="font-semibold mb-1 text-lg md:text-xl text-white">Total Transactions
                                </div>
                                <div
                                    className="font-semibold text-5xl md:text-6xl tracking-tight text-white">{user?.user.balance}
                                </div>
                            </div>

                            <Link to={'/utransactions'}>
                            <div
                               className="btn border-0 bg-orange-400 text-lg md:text-xl text-white  hover:bg-orange-500 inline-block rounded-full mt-6 md:mt-12 px-4 md:px-8 py-1 md:py-2">

                                    See Transactions
                                </div>
                            </Link>
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row h-64 mt-6">
                        <div className="bg-white rounded-xl shadow-lg mb-4 md:mb-0 px-6 py-4 w-full md:w-4/12">
                            a
                        </div>
                        <div className="bg-white rounded-xl shadow-lg mb-4 md:mx-6 px-6 py-4 w-full md:w-4/12">
                            b
                        </div>
                        <div className="bg-white rounded-xl shadow-lg px-6 py-4 w-full md:w-4/12">
                            c
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserStatistics;