import React, { useState, useEffect } from 'react';
import axios from 'axios';
import useAxiosSecure from "../../../hooks/useAxiosSecure.jsx";
import {useAuth} from "../../../context/AuthContext.jsx";
import toast from "react-hot-toast";
import Swal from 'sweetalert2';

const ManageTransactions = () => {

    const { user } = useAuth();

    const [cashInRequests, setCashInRequests] = useState([]);
    const [error, setError] = useState('');
    const axiosSecure = useAxiosSecure();
    const [userEmail, setuserEmail] = useState('');



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
    }, []);



    const handleApprove = async (id, uid) => {
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




    return (
        <div className="bg-indigo-100 min-h-screen">
            <div className="flex flex-col md:flex-row pt-10 px-4 md:px-10 pb-4 w-full items-center justify-center">



            <table className="min-w-full divide-y divide-gray-200 bg-gray-100 rounded-lg shadow-xl sm:rounded-lg">
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
                                    className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">Pending</span> :
                                <span
                                    className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Approved</span>}

                        </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                            <button
                                className="px-4 py-2 font-medium text-white bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:shadow-outline-blue active:bg-blue-600 transition duration-150 ease-in-out"
                                onClick={()=>handleApprove(request._id, request.userEmail)}
                            >
                                 Approve
                            </button>
                            <button
                                className="ml-2 px-4 py-2 font-medium text-white bg-red-600 rounded-md hover:bg-red-500 focus:outline-none focus:shadow-outline-red active:bg-red-600 transition duration-150 ease-in-out">
                                Reject
                            </button>
                        </td>
                    </tr>))
                }



                </tbody>
            </table>

            </div>

        </div>
    );
};

export default ManageTransactions;