import React from 'react';
import {Link} from "react-router-dom";
import {TbBrandGoogleHome, TbHeartRateMonitor} from "react-icons/tb";
import {FaSackDollar, FaUsersGear} from "react-icons/fa6";

const AdminMenu = () => {
    return (
        <div className="bg-white rounded-xl shadow-lg mb-6 px-6 py-4">

            <Link to={'/'}>
                <div className="flex ml-4 items-center text-gray-600 hover:text-black my-4 w-full">
                    <TbBrandGoogleHome className="mr-4"/>
                    Home
                </div>
            </Link>

            <Link to={'/ManageUsers'}>
                <div className="flex ml-4  items-center text-gray-600 hover:text-black my-4 w-full">
                    <FaUsersGear className="mr-4"/>
                    User Management
                </div>
            </Link>

            <Link to={'/allTransactions'}>
                <div className="flex ml-4  items-center text-gray-600 hover:text-black my-4 w-full">
                    <TbHeartRateMonitor className="mr-4"/>
                    System Monitoring
                </div>
            </Link>


        </div>
    );
};

export default AdminMenu;