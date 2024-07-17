import React, {useEffect, useState} from 'react';
import {useAuth} from "../../../context/AuthContext.jsx";
import {Link} from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure.jsx";

const AgentStatistics = () => {

    const { user , refetch  } = useAuth();
    console.log(user)

    const axiosSecure = useAxiosSecure();
    const [userBalance, setUserBalance] = useState(null);
    const [error, setError] = useState('');
    const [phone, setPhone] = useState(null);



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
        <div className="bg-orange-100 min-h-screen">

            {/*<div className="pt-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">*/}
            {/*    <h3 className="mx-4 mb-0 text-center capitalize text-2xl md:text-4xl font-bold text-indigo-900 ">*/}
            {/*        Agent Statistics*/}
            {/*    </h3>*/}
            {/*</div>*/}

            <div className="flex flex-col md:flex-row pt-12 px-4 md:px-10 pb-4">


                <div className="w-full mx-auto">
                    <div className="flex flex-col md:flex-row">
                        <div
                            className="bg-no-repeat bg-red-200 border border-red-300 rounded-xl w-full md:w-7/12 mb-4 md:mr-2 p-6">

                            <div className="flex justify-between flex-col md:flex-row">
                                <div><p className="text-3xl md:text-5xl text-indigo-900">Welcome <br/>

                                    <strong>
                                        {user?.user.name}
                                    </strong></p></div>
                                <div
                                    className="flex justify-center items-center h-20 text-white rounded-xl shadow-md p-6 max-w-[240px] bg-red-500 bg-opacity-30 backdrop-filter backdrop-blur-lg">
                                    <div className="font-semibold text-5xl tracking-tight -mt-2">Agent</div>
                                </div>


                            </div>


                            <div className=" flex justify-between h-20 md:h-32 rounded-xl mt-11 shadow-md p-6 bg-red-300">


                                <div>
                                    <div className="font-semibold mb-1 text-lg md:text-xl text-indigo-900">Account
                                        Balance
                                    </div>
                                    <div
                                        className="font-semibold text-5xl md:text-6xl tracking-tight text-indigo-900">

                                        {error ? (
                                            error
                                        ) : (
                                            userBalance !== null ? userBalance.toFixed(2) : user?.user.balance.toFixed(2)
                                        )}

                                    </div>
                                </div>

                                <div>
                                    <button className="btn btn-sm btn-outline bg-red-500 bg-opacity-30 border-0 text-white hover:bg-red-500"
                                    onClick={fetchUserBalance}
                                    >Refresh Balance</button>
                                </div>

                            </div>


                        </div>

                        <div
                            className="bg-no-repeat bg-orange-200 border border-orange-300 rounded-xl w-full md:w-5/12 mb-4 md:ml-2 p-6">

                            <div className="h-20 md:h-32 rounded-xl mt-11 shadow-md p-6 bg-orange-400">
                                <div className="font-semibold mb-1 text-lg md:text-xl text-white">Phone
                                </div>
                                <div
                                    className="font-semibold text-4xl md:text-5xl tracking-tight text-white">

                                    {error ? (
                                        error
                                    ) : (
                                        phone !== null ? phone : user.user.phone
                                    )}
                                </div>
                            </div>

                            <Link to={'/transactions'}>
                                <div
                                    className="btn border-0 bg-orange-400 text-lg md:text-xl text-white  hover:bg-orange-500 inline-block rounded-full mt-6 md:mt-12 px-4 md:px-8 py-1 md:py-2">

                                    See All Transactions
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

export default AgentStatistics;