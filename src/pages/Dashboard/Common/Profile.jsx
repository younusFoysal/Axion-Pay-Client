import React, {useEffect, useState} from 'react';
import {useAuth} from "../../../context/AuthContext.jsx";
import {FaUserEdit} from "react-icons/fa";
import useAxiosSecure from "../../../hooks/useAxiosSecure.jsx";

const Profile = () => {

    const { user } = useAuth();
    const [userData, setUserData] = React.useState(null);
    const [error, setError] = useState('');
    const axiosSecure = useAxiosSecure();


    // const fetchUser = async () => {
    //     try {
    //         const response = await axiosSecure.get(`/user/${user.user.email}`);
    //         //console.log(response.data)
    //         if (response.data) {
    //             setUserData(response.data);
    //             //console.log(response.data);
    //         } else {
    //             setError('Error retrieving balance');
    //         }
    //     } catch (error) {
    //         setError('Error retrieving balance');
    //         console.error('There was an error!', error);
    //     }
    // };


    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axiosSecure.get(`/user/${user.user.email}`);
                if (response.data) {
                    setUserData(response.data);
                } else {
                    setError('Error retrieving User Data');
                }
            } catch (error) {
                setError('Error retrieving User Data');
                console.error('There was an error!', error);
            }
        };

        fetchUser();
    }, []);



    return (
        <div className=" animated-background bg-gradient-to-tr from-[#172554] via-[#2563eb] to-[#38bdf8] min-h-screen">
            <div className=" pt-10 px-4 md:px-10 pb-4 w-full items-center justify-center ">


                <div className=" bg-white mx-auto rounded-xl  hover:shadow-sm shadow-md border border-l-4 hover:border-blue-500 relative w-60  border-gray-200 pb-1 transition duration-200 hover:scale-105">

                    <div className="p-2">
                        <div className="relative w-52 h-40 mx-auto ">
                            <img className=" h-full  rounded-lg mx-auto object-cover"
                                 src="https://i.ibb.co/c282ZCm/man-waiter-icon.jpg"
                                 alt=""/>


                            <div
                                className="btn btn-sm border-0 w-9 h-9 p-2 absolute right-2 -bottom-3 rounded-full  bg-slate-300  hover:to-blue-400 ">
                                <FaUserEdit className="items-center w-full mx-auto" />
                            </div>
                        </div>

                    </div>
                    <div className="">
                        <div className="p-1.5 bg-blue-500  w-44 rounded-tr-full rounded-br-full mt-2">
                            <div className=" text-center">
                                <p className="text-white text-sm font-medium tracking-wide">{userData?.name}</p>
                            </div>
                        </div>
                        <div className="flex items-center justify-center gap-3 mt-4">
                            <p className="text-slate-500 text-sm font-medium  tracking-wide ">
                                Email :
                            </p>
                            <p className="text-black text-sm font-semibold text-center tracking-wide">
                                {userData?.email}
                            </p>
                        </div>

                        <div className="flex items-center justify-center gap-3 mt-4">
                            <p className="text-slate-500 text-sm font-medium  tracking-wide ">
                                Phone :
                            </p>
                            <p className="text-black text-sm font-semibold text-center tracking-wide">
                                {userData?.phone}
                            </p>
                        </div>
                        <div className="flex items-center mb-2 justify-center gap-3 mt-4">
                            <p className="text-slate-500 text-sm font-medium  tracking-wide ">
                                Role :
                            </p>
                            <p className="text-black text-sm font-semibold  text-center tracking-wide">
                                {userData?.role}
                            </p>
                        </div>

                        {
                            userData?.role === "admin" ? ''
                                :
                                <div className="w-full text-center mx-auto mt-3">
                                    <button
                                        className=" border-indigo-500 bg-cyan-500 text-white rounded-md px-4 py-1.5 m-2 transition duration-500 ease select-none hover:bg-indigo-600 focus:outline-none focus:shadow-outline text-xs font-medium">
                                        Balance: ${userData?.balance}
                                    </button>

                                </div>
                        }


                    </div>
                </div>


            </div>
        </div>
    );
};

export default Profile;