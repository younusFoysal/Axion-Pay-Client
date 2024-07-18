import React, {useState} from 'react';
import {Link} from "react-router-dom";
import logo from '/AxionPay.png'
import {AiOutlineBars} from "react-icons/ai";
import {TbClockDollar, TbLogout} from "react-icons/tb";
import {CgProfile} from "react-icons/cg";
import Logout from "../Logout.jsx";
import {useAuth} from "../context/AuthContext.jsx";
import UserMenu from "./Menu/UserMenu.jsx";
import AgentMenu from "./Menu/AgentMenu.jsx";
import AdminMenu from "./Menu/AdminMenu.jsx";

const Sidebar = () => {

    const [isActive, setActive] = useState(false)
    const [toggle, setToggle] = useState(true)
    const { user , setUser  } = useAuth();

    // Sidebar Responsive Handler
    const handleToggle = () => {
        setActive(!isActive)
    }

    const toggleHandler = event => {
        setToggle(event.target.checked)
    }


    return (
        <>
            {/* Small Screen Navbar */}
            <div className='bg-gray-100 text-gray-800 flex justify-between md:hidden'>

                <div>
                    <div className='block cursor-pointer p-4 font-bold'>
                        <Link to='/'>
                            <img
                                // className='hidden md:block'
                                src={logo}
                                alt='logo'
                                className='w-48 h-12'
                            />
                        </Link>
                    </div>
                </div>

                <button
                    onClick={handleToggle}
                    className='mobile-menu-button fixed bottom-0 right-0 z-[9999] p-4 focus:outline-none focus:bg-gray-200 bg-white rounded-full'
                    style={{zIndex: 9999}} // Ensuring high z-index
                >
                    <AiOutlineBars className='h-5 w-5'/>
                </button>
            </div>

            {/* Sidebar */}
            <div
                className={`z-10 md:fixed flex flex-col overflow-x-hidden bg-gray-100 w-64 space-y-2 px-2 py-4 absolute inset-y-0 left-0 transform ${
                    isActive && '-translate-x-full'
                }  md:translate-x-0  transition duration-200 ease-in-out`}
            >
                <div>
                    <div>
                        <div className='w-full hidden md:flex px-4 py-2 shadow-lg rounded-lg justify-center items-center bg-sky-50 mx-auto'>
                            <Link to='/'>
                                <img
                                    // className='hidden md:block'
                                    src={logo}
                                    alt='logo'
                                    className='w-48 h-10'
                                />
                            </Link>
                        </div>
                    </div>

                    {/* Nav Items */}
                    <div className='flex flex-col justify-between flex-1 mt-6'>


                        {/*  Menu Items */}
                        <nav>

                                {user?.user?.role === 'user' ? <UserMenu/> : undefined}
                                {user?.user?.role === 'agent' ? <AgentMenu /> : undefined}
                                {user?.user?.role === 'admin' ? <AdminMenu /> : undefined}
                                {/*{role === 'admin' ? <AdminMenu /> : undefined}*/}


                        </nav>
                    </div>
                </div>

                <div>
                    <hr className="bg-sky-400 h-1 mb-8"/>


                    <div className="bg-white rounded-xl shadow-lg mb-6 px-6 py-4">


                        {user?.user?.role === 'admin' ? '' :
                            <Link to={'/transactions'}>
                                <div className="flex ml-3  items-center text-gray-600 hover:text-black my-4 w-full">
                                    <TbClockDollar className="mr-4"/>
                                    All Transactions
                                </div>
                            </Link>
                        }


                        <Link to={'/profile'}>
                            <div className="flex ml-3  items-center text-gray-600 hover:text-black my-4 w-full">
                                <CgProfile className="mr-4"/>
                                Profile
                            </div>
                        </Link>


                        <div className="flex ml-3  items-center text-gray-600 hover:text-black my-4 w-full">
                            <TbLogout className="mr-4"/>
                            <Logout setUser={setUser}/>
                        </div>


                    </div>

                </div>
            </div>
        </>
    );
};

export default Sidebar;