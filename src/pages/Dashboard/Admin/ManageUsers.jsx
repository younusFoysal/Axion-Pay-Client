import React, {useEffect, useState} from 'react';
import {useAuth} from "../../../context/AuthContext.jsx";
import useAxiosSecure from "../../../hooks/useAxiosSecure.jsx";
import toast from "react-hot-toast";

const ManageUsers = () => {

    const { user } = useAuth();
    const [error, setError] = useState('');
    const axiosSecure = useAxiosSecure();
    const [userEmail, setuserEmail] = useState('');
    const [tab, setTab] = useState('user');
    const [usersUser, setUsersUser] = useState([]);
    const [usersAgent, setUsersAgent] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');


    useEffect(() => {
        const fetchUsersUser = async () => {
            try {
                const response = await axiosSecure.get(`/usersUser`);
                //console.log(response.data);
                if (response.data) {
                    setUsersUser(response.data);
                } else {
                    setError('Error retrieving cash-in requests');
                }
            } catch (error) {
                setError('Error retrieving cash-in requests');
                console.error('There was an error!', error);
            }
        };

        fetchUsersUser();
    }, [usersUser]);




    useEffect(() => {
        const fetchUsersAgent = async () => {
            try {
                const response = await axiosSecure.get(`/usersAgent`);
                if (response.data) {
                    setUsersAgent(response.data);
                } else {
                    setError('Error retrieving cash-out requests');
                }
            } catch (error) {
                setError('Error retrieving cash-out requests');
                console.error('There was an error!', error);
            }
        };

        fetchUsersAgent();
    }, [usersAgent]);


    // Approve Cash in
    const handleUpdateStatus = async (email, currentStatus) => {
        console.log(email, currentStatus);

        try {
            const newStatus = !currentStatus; // Toggle the status

            const response = await axiosSecure.patch(`/users/update/${email}`, {
                status: newStatus,
            });

            console.log(response);

            if (response.data.success) {
                toast.success('User Status Updated.');
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.error('Error updating status:', error);
            toast.error('Failed to update status: ' + (error.response?.data?.message || 'Server error'));
        }
    };

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const filteredUsers = usersUser?.filter(user => user.name.toLowerCase().includes(searchQuery.toLowerCase()));
    const filteredAgents = usersAgent?.filter(user => user.name.toLowerCase().includes(searchQuery.toLowerCase()));


    return (
        <div className="bg-indigo-100 min-h-screen">
            <div className=" pt-10 px-4 md:px-10 pb-4 w-full items-center justify-center">


                <div
                    className="bg-indigo-100 min-h-screen flex items-center justify-center">
                    <div className="container mx-auto px-4">
                        <div
                            className=" mx-auto bg-white rounded-lg overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-300">
                            <div className="text-center py-6 bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                                <h1 className="text-3xl font-bold">Users Management</h1>
                                <p className="mt-2">Manage Users and Agents Accounts</p>
                            </div>


                            <div className="p-8">
                                <div className="flex justify-center mb-4">
                                    <button
                                        onClick={() => setTab('user')}
                                        className={`px-4 py-2 rounded-l-md focus:outline-none transition-colors duration-300 ${
                                            tab === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
                                        }`}
                                    >
                                        Users
                                    </button>
                                    <button
                                        onClick={() => setTab('agent')}

                                        className={`px-4 py-2 rounded-r-md focus:outline-none transition-colors duration-300 ${
                                            tab === 'agent' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
                                        }`}
                                    >
                                        Agents
                                    </button>
                                </div>
                                {tab === 'user' && (<>


                                        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                                            <div
                                                className="relative isolate overflow-hidden px-6 py-4 text-center sm:px-16 sm:shadow-sm">

                                                <label
                                                    className="mx-auto bg-white relative min-w-sm max-w-2xl flex flex-col md:flex-row items-center justify-center border py-2 px-2 rounded-2xl gap-2 shadow-2xl focus-within:border-gray-300"
                                                    htmlFor="search-bar">

                                                    <input id="search-bar"
                                                           type="text"
                                                           placeholder="Search by name"
                                                           value={searchQuery}
                                                           onChange={handleSearchChange}
                                                           className="px-6 py-2 w-full rounded-md flex-1 outline-none bg-white"
                                                    />


                                                    <button type="submit"
                                                            className="w-full md:w-auto px-6 py-3 bg-blue-500 hover:bg-sky-600 border-sky-500 text-white fill-white active:scale-95 duration-100 border will-change-transform overflow-hidden relative rounded-xl transition-all">
                                                        <div className="flex items-center transition-all opacity-1">
                                        <span className="text-sm font-semibold whitespace-nowrap truncate mx-auto">
                                            Search
                                        </span>
                                                        </div>
                                                    </button>

                                                </label>


                                                <svg viewBox="0 0 1024 1024"
                                                     className="absolute left-1/2 top-1/2 -z-10 h-[64rem] w-[64rem] -translate-x-1/2 [mask-image:radial-gradient(closest-side,white,transparent)]"
                                                     aria-hidden="true">
                                                    <circle cx="512" cy="512" r="512"
                                                            fill="url(#827591b1-ce8c-4110-b064-7cb85a0b1217)"
                                                            fill-opacity="0.7">
                                                    </circle>
                                                    <defs>
                                                        <radialGradient id="827591b1-ce8c-4110-b064-7cb85a0b1217">
                                                            <stop stop-color="#3b82f6"></stop>
                                                            <stop offset="1" stop-color="#1d4ed8"></stop>
                                                        </radialGradient>
                                                    </defs>
                                                </svg>
                                            </div>
                                        </div>


                                        <table
                                            className="min-w-full divide-y divide-gray-200 bg-gray-100 rounded-lg shadow-xl sm:rounded-lg">
                                            <thead>
                                            <tr>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Balance</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last
                                                    Updated
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                                            </tr>
                                            </thead>
                                            <tbody className="bg-white divide-y divide-gray-200">

                                            {
                                                filteredUsers?.map((request, index) => (
                                                    <tr key={index}>

                                                        <td className="px-6 py-4 whitespace-nowrap">{request.name}</td>
                                                        <td className="px-6 py-4 whitespace-nowrap">{request.email}</td>
                                                        <td className="px-6 py-4 whitespace-nowrap">{request.phone}</td>
                                                        <td className="px-6 py-4 whitespace-nowrap">{request.balance.toFixed(2)}</td>
                                                        <td className="px-6 py-4 whitespace-nowrap">{new Date(request.timestamp).toLocaleString()}</td>


                                                        <td className="px-6 py-4 whitespace-nowrap">

                                                            {request.status === true ? <button
                                                                    className="btn btn-sm ml-2 px-4 py-2 font-medium text-white bg-red-600 rounded-md hover:bg-red-500 focus:outline-none focus:shadow-outline-red active:bg-red-600 transition duration-150 ease-in-out"
                                                                    onClick={() => handleUpdateStatus(request.email, request.status)}
                                                                >
                                                                    Block Account
                                                                </button>
                                                                :
                                                                <button
                                                                    className="btn btn-sm px-4 py-2 font-medium text-white bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:shadow-outline-blue active:bg-blue-600 transition duration-150 ease-in-out"
                                                                    onClick={() => handleUpdateStatus(request.email, request.status)}
                                                                >
                                                                    Active Account
                                                                </button>}

                                                        </td>


                                                    </tr>))
                                            }


                                            </tbody>
                                        </table>
                                    </>
                                )}
                                {tab === 'agent' && (<>


                                        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                                            <div
                                                className="relative isolate overflow-hidden px-6 py-4 text-center sm:px-16 sm:shadow-sm">

                                                <label
                                                    className="mx-auto bg-white relative min-w-sm max-w-2xl flex flex-col md:flex-row items-center justify-center border py-2 px-2 rounded-2xl gap-2 shadow-2xl focus-within:border-gray-300"
                                                    htmlFor="search-bar">

                                                    <input id="search-bar"
                                                           type="text"
                                                           placeholder="Search by name"
                                                           value={searchQuery}
                                                           onChange={handleSearchChange}
                                                           className="px-6 py-2 w-full rounded-md flex-1 outline-none bg-white"
                                                    />


                                                    <button type="submit"
                                                            className="w-full md:w-auto px-6 py-3 bg-blue-500 text-white hover:bg-sky-600 border-sky-500 fill-white active:scale-95 duration-100 border will-change-transform overflow-hidden relative rounded-xl transition-all">
                                                        <div className="flex items-center transition-all opacity-1">
                                        <span className="text-sm font-semibold whitespace-nowrap truncate mx-auto">
                                            Search
                                        </span>
                                                        </div>
                                                    </button>

                                                </label>


                                                <svg viewBox="0 0 1024 1024"
                                                     className="absolute left-1/2 top-1/2 -z-10 h-[64rem] w-[64rem] -translate-x-1/2 [mask-image:radial-gradient(closest-side,white,transparent)]"
                                                     aria-hidden="true">
                                                    <circle cx="512" cy="512" r="512"
                                                            fill="url(#827591b1-ce8c-4110-b064-7cb85a0b1217)"
                                                            fill-opacity="0.7">
                                                    </circle>
                                                    <defs>
                                                        <radialGradient id="827591b1-ce8c-4110-b064-7cb85a0b1217">
                                                            <stop stop-color="#3b82f6"></stop>
                                                            <stop offset="1" stop-color="#1d4ed8"></stop>
                                                        </radialGradient>
                                                    </defs>
                                                </svg>
                                            </div>
                                        </div>


                                        <table
                                            className="min-w-full divide-y divide-gray-200 bg-gray-100 rounded-lg shadow-xl sm:rounded-lg">
                                            <thead>
                                            <tr>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Balance</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last
                                                    Updated
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                                            </tr>
                                            </thead>
                                            <tbody className="bg-white divide-y divide-gray-200">

                                            {
                                                filteredAgents?.map((request, index) => (
                                                    <tr key={index}>

                                                        <td className="px-6 py-4 whitespace-nowrap">{request.name}</td>
                                                        <td className="px-6 py-4 whitespace-nowrap">{request.email}</td>
                                                        <td className="px-6 py-4 whitespace-nowrap">{request.phone}</td>
                                                        <td className="px-6 py-4 whitespace-nowrap">{request.balance.toFixed(2)}</td>
                                                        <td className="px-6 py-4 whitespace-nowrap">{new Date(request.timestamp).toLocaleString()}</td>


                                                        <td className="px-6 py-4 whitespace-nowrap">

                                                            {request.status === true ? <button
                                                                    className="btn btn-sm ml-2 px-4 py-2 font-medium text-white bg-red-600 rounded-md hover:bg-red-500 focus:outline-none focus:shadow-outline-red active:bg-red-600 transition duration-150 ease-in-out"
                                                                    onClick={() => handleUpdateStatus(request.email, request.status)}
                                                                >
                                                                    Block Account
                                                                </button>
                                                                :
                                                                <button
                                                                    className="btn btn-sm px-4 py-2 font-medium text-white bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:shadow-outline-blue active:bg-blue-600 transition duration-150 ease-in-out"
                                                                    onClick={() => handleUpdateStatus(request.email, request.status)}
                                                                >
                                                                    Active Account
                                                                </button>}

                                                        </td>


                                                    </tr>))
                                            }


                                            </tbody>
                                        </table>
                                    </>
                                )}

                            </div>
                        </div>
                    </div>
                </div>


            </div>

        </div>
    );
};

export default ManageUsers;