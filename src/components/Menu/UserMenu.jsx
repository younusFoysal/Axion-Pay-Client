import React from 'react';
import {Link} from "react-router-dom";
import {TbBrandGoogleHome} from "react-icons/tb";
import {BsFillSendCheckFill} from "react-icons/bs";
import {LiaMoneyBillWaveAltSolid} from "react-icons/lia";
import {FaCircleDollarToSlot} from "react-icons/fa6";

const UserMenu = () => {
    return (
        <div className="bg-white rounded-xl shadow-lg mb-6 px-6 py-4">

            <Link to={'/'}>
                <div className="flex ml-4 items-center text-gray-600 hover:text-black my-4 w-full">
                    <TbBrandGoogleHome className="mr-4"/>
                    Home
                </div>
            </Link>

            <Link to={'/sendmoney'}>
                <div className="flex ml-4  items-center text-gray-600 hover:text-black my-4 w-full">
                    <BsFillSendCheckFill className="mr-4"/>
                    Send Money
                </div>
            </Link>

            <Link to={'/sendmoney'}>
                <div className="flex ml-4  items-center text-gray-600 hover:text-black my-4 w-full">
                    <LiaMoneyBillWaveAltSolid className="mr-4"/>
                    Cash Out
                </div>
            </Link>

            <Link to={'/sendmoney'}>
                <div className="flex ml-4  items-center text-gray-600 hover:text-black my-4 w-full">
                    <FaCircleDollarToSlot className="mr-4"/>
                    Cash In
                </div>
            </Link>

        </div>
    );
};

export default UserMenu;