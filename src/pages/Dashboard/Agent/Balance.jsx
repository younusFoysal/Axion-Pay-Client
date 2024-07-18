import React, {useState} from 'react';
import {useAuth} from "../../../context/AuthContext.jsx";
import useAxiosSecure from "../../../hooks/useAxiosSecure.jsx";

const Balance = () => {

    const { user  } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [userBalance, setUserBalance] = useState(null);
    const [error, setError] = useState('');


    const fetchUserBalance = async () => {
        try {
            const response = await axiosSecure.get(`/user/${user.user.email}`);
            //console.log(response.data)
            if (response.data) {
                setUserBalance(response.data.balance);
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

            <div
                className="bg-no-repeat animated-background ml-12 bg-gradient-to-tr from-[#bae6fd] via-[#bfdbfe] to-[#c7d2fe] border border-blue-400 rounded-xl shadow-xl w-full md:w-7/12 mb-4 md:mr-2 p-6">
                <div className="flex justify-between flex-col md:flex-row">
                    <div>
                        <p className="text-3xl md:text-5xl text-indigo-900">Current <br/>
                            <strong>Balance</strong>
                        </p>
                    </div>
                    <div
                        className="flex justify-center items-center h-10 md:h-20 mt-2 text-white rounded-xl shadow-md p-6 max-w-[240px] bg-sky-500 backdrop-filter backdrop-blur-lg">
                        <div className="font-semibold text-3xl md:text-5xl tracking-tight -mt-2">User</div>
                    </div>
                </div>
                <div
                    className="flex justify-between h-20 md:h-32 rounded-xl mt-5 md:mt-11 shadow-md p-6 text-white bg-sky-500">
                    <div>
                        <div className="font-semibold md:mb-1 text-sm md:text-xl -mt-2 ">
                            Account
                            of {user?.user.name}
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


            </div>

        </div>
    );
};

export default Balance;