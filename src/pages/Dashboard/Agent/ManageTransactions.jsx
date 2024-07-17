import React, { useState, useEffect } from 'react';
import axios from 'axios';
import useAxiosSecure from "../../../hooks/useAxiosSecure.jsx";
import {useAuth} from "../../../context/AuthContext.jsx";
import toast from "react-hot-toast";
import Swal from 'sweetalert2';

const ManageTransactions = () => {

    const { user } = useAuth();

    const [cashInRequests, setCashInRequests] = useState([]);
    const [cashOutRequests, setCashOutRequests] = useState([]);
    const [error, setError] = useState('');
    const axiosSecure = useAxiosSecure();
    const [userEmail, setuserEmail] = useState('');
    const [tab, setTab] = useState('cashin');



    useEffect(() => {
        const fetchCashInRequests = async () => {
            try {
                const response = await axiosSecure.get(`/request-cash-in/${user.user.email}`);
                if (response.data.success) {
                    setCashInRequests(response.data.cashInRequests);
                } else {
                    setError('Error retrieving cash-in requests');
                }
            } catch (error) {
                setError('Error retrieving cash-in requests');
                console.error('There was an error!', error);
            }
        };

        fetchCashInRequests();
    }, [cashInRequests]);




    useEffect(() => {
        const fetchCashOutRequests = async () => {
            try {
                const response = await axiosSecure.get(`/request-cash-out/${user.user.email}`);
                if (response.data.success) {
                    setCashOutRequests(response.data.cashOutRequests);
                } else {
                    setError('Error retrieving cash-out requests');
                }
            } catch (error) {
                setError('Error retrieving cash-out requests');
                console.error('There was an error!', error);
            }
        };

        fetchCashOutRequests();
    }, [cashOutRequests]);


    // Approve Cash in
    const handleApproveIn = async (id, uid) => {
        console.log(id, uid)
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Approve!"
        }).then(async (result) => { // Make this callback async
            if (result.isConfirmed) {
                try {
                    setuserEmail(uid);

                    const response = await axiosSecure.post(`/approve-cash-in`, {
                        agentEmail: user.user.email,
                        userEmail: uid,
                        requestId: id,
                    });
                    console.log(response);

                    if (response.data.success) {
                        toast.success('Cash In successful');
                        Swal.fire({
                            title: "Approved!",
                            text: "Cash In successful.",
                            icon: "success"
                        });
                    } else {
                        toast.success(response.data.message);
                    }
                } catch (error) {
                    console.error('Error Cash In money:', error);
                    toast.error('Failed to Cash In: ' + error.response?.data?.message || 'Server error');
                } finally {
                    setuserEmail('');
                }


            }
        });
    };


    // Approve Cash Out
    const handleApproveOut = async (id, uid) => {
        console.log(id, uid)
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Approve!"
        }).then(async (result) => { // Make this callback async
            if (result.isConfirmed) {
                try {
                    setuserEmail(uid);

                    const response = await axiosSecure.post(`/approve-cash-out`, {
                        agentEmail: user.user.email,
                        userEmail: uid,
                        requestId: id,
                    });
                    console.log(response);

                    if (response.data.success) {
                        toast.success('Cash Out successful');
                        Swal.fire({
                            title: "Approved!",
                            text: "Cash Out successful.",
                            icon: "success"
                        });
                    } else {
                        toast.success(response.data.message);
                    }
                } catch (error) {
                    console.error('Error Cash Out money:', error);
                    toast.error('Failed to Cash Out: ' + error.response?.data?.message || 'Server error');
                } finally {
                    setuserEmail('');
                }


            }
        });
    };


    // /reject-cash-in
    const handleRejectIn = async (id, uid) => {
        console.log(id, uid)
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Reject!"
        }).then(async (result) => { // Make this callback async
            if (result.isConfirmed) {
                try {
                    setuserEmail(uid);

                    const response = await axiosSecure.post(`/reject-cash-in`, {
                        agentEmail: user.user.email,
                        userEmail: uid,
                        requestId: id,
                    });
                    console.log(response);
                    toast.success(response.data.message);

                    if (response.data.success) {
                        toast.success('Rejection successful');
                        Swal.fire({
                            title: "Rejected!",
                            text: "Rejection successful.",
                            icon: "success"
                        });
                    } else {
                        console.log(response.data.message);
                        //toast.success(response.data.message);
                    }
                } catch (error) {
                    console.error('Error Rejection:', error);
                    toast.error('Failed to Rejection: ' + error.response?.data?.message || 'Server error');
                } finally {
                    setuserEmail('');
                }


            }
        });
    };

    // /reject-cash-in
    const handleRejectOut = async (id, uid) => {
        console.log(id, uid)
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Reject!"
        }).then(async (result) => { // Make this callback async
            if (result.isConfirmed) {
                try {
                    setuserEmail(uid);

                    const response = await axiosSecure.post(`/reject-cash-out`, {
                        agentEmail: user.user.email,
                        userEmail: uid,
                        requestId: id,
                    });
                    console.log(response);
                    toast.success(response.data.message);

                    if (response.data.success) {
                        toast.success('Rejection successful');
                        Swal.fire({
                            title: "Rejected!",
                            text: "Rejection successful.",
                            icon: "success"
                        });
                    } else {
                        console.log(response.data.message);
                        //toast.success(response.data.message);
                    }
                } catch (error) {
                    console.error('Error Rejection:', error);
                    toast.error('Failed to Rejection: ' + error.response?.data?.message || 'Server error');
                } finally {
                    setuserEmail('');
                }


            }
        });
    };




    return (
        <div className="bg-indigo-100 min-h-screen">
            <div className=" pt-10 px-4 md:px-10 pb-4 w-full items-center justify-center">


                <div
                    className="bg-indigo-100 min-h-screen flex items-center justify-center">
                    <div className="container mx-auto px-4">
                        <div
                            className=" mx-auto bg-white rounded-lg overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-300">
                            <div className="text-center py-6 bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                                <h1 className="text-3xl font-bold">Transaction Management</h1>
                                <p className="mt-2">Manage Cash-In and Cash-Out Requests</p>
                            </div>
                            <div className="p-8">
                                <div className="flex justify-center mb-6">
                                    <button
                                        onClick={() => setTab('cashin')}
                                        className={`px-4 py-2 rounded-l-md focus:outline-none transition-colors duration-300 ${
                                            tab === 'cashin' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
                                        }`}
                                    >
                                        Cash In
                                    </button>
                                    <button
                                        onClick={() => setTab('cashout')}
                                        data-tip="Cashout Fee 1.5%"
                                        className={`px-4 py-2 rounded-r-md focus:outline-none transition-colors duration-300 tooltip tooltip-info tooltip-bottom ${
                                            tab === 'cashout' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
                                        }`}
                                    >
                                        Cash out
                                    </button>
                                </div>
                                {tab === 'cashin' && (
                                    <table
                                        className="min-w-full divide-y divide-gray-200 bg-gray-100 rounded-lg shadow-xl sm:rounded-lg">
                                        <thead>
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">From</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                                        </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">

                                        {
                                            cashInRequests.map((request, index) => (
                                                <tr key={index}>

                                                    <td className="px-6 py-4 whitespace-nowrap">{request.userEmail}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap">{request.amount}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap">{new Date(request.requestedAt).toLocaleString()}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        {request.status === "pending" ? <span
                                                            className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">Pending</span> : request.status === "rejected" ?
                                                            <span
                                                                className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-200 text-red-900">Rejected</span> :
                                                            <span
                                                                className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Approved</span>}

                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <button
                                                            className="btn btn-sm px-4 py-2 font-medium text-white bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:shadow-outline-blue active:bg-blue-600 transition duration-150 ease-in-out"
                                                            disabled={request.status === "approved" || request.status === "rejected" }
                                                            onClick={() => handleApproveIn(request._id, request.userEmail)}
                                                        >
                                                            Approve
                                                        </button>
                                                        <button
                                                            className="btn btn-sm ml-2 px-4 py-2 font-medium text-white bg-red-600 rounded-md hover:bg-red-500 focus:outline-none focus:shadow-outline-red active:bg-red-600 transition duration-150 ease-in-out"
                                                            disabled={request.status === "approved" || request.status === "rejected" }
                                                            onClick={() => handleRejectIn(request._id, request.userEmail)}
                                                        >
                                                            Reject
                                                        </button>
                                                    </td>
                                                </tr>))
                                        }


                                        </tbody>
                                    </table>
                                )}
                                {tab === 'cashout' && (
                                    <table
                                        className="min-w-full divide-y divide-gray-200 bg-gray-100 rounded-lg shadow-xl sm:rounded-lg">
                                        <thead>
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">From</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fee</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                                        </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">

                                        {
                                            cashOutRequests.map((request, index) => (
                                                <tr key={index}>

                                                    <td className="px-6 py-4 whitespace-nowrap">{request.userEmail}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap">{request.amount}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap">{request.fee}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap">{new Date(request.requestedAt).toLocaleString()}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        {request.status === "pending" ? <span
                                                            className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">Pending</span> : request.status === "rejected" ?
                                                            <span
                                                                className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-200 text-red-900">Rejected</span> :
                                                            <span
                                                                className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Approved</span>}

                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <button
                                                            className="btn btn-sm px-4 py-2 font-medium text-white bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:shadow-outline-blue active:bg-blue-600 transition duration-150 ease-in-out"
                                                            onClick={() => handleApproveOut(request._id, request.userEmail)}
                                                            disabled={request.status === "approved" || request.status === "rejected" }
                                                        >
                                                            Approve
                                                        </button>
                                                        <button
                                                            className="btn btn-sm ml-2 px-4 py-2 font-medium text-white bg-red-600 rounded-md hover:bg-red-500 focus:outline-none focus:shadow-outline-red active:bg-red-600 transition duration-150 ease-in-out"
                                                            disabled={request.status === "approved" || request.status === "rejected" }
                                                            onClick={() => handleRejectOut(request._id, request.userEmail)}

                                                        >
                                                            Reject
                                                        </button>
                                                    </td>
                                                </tr>))
                                        }


                                        </tbody>
                                    </table>
                                )}

                            </div>
                        </div>
                    </div>
                </div>


            </div>

        </div>
    );
};

export default ManageTransactions;