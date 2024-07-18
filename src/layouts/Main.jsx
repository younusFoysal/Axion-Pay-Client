
import React, {useEffect, useState} from 'react';
import {Outlet, useNavigate} from 'react-router-dom';
import Logout from "../Logout.jsx";
import Signup from "../pages/Signup.jsx";
import Login from "../pages/Login.jsx";
import axios from 'axios';
import {useAuth} from "../context/AuthContext.jsx";
import SendMoney from "../pages/Dashboard/user/SendMoney.jsx";
import TransactionHistory from "../pages/Dashboard/Common/TransactionHistory.jsx";
import Sidebar from "../components/Sidebar.jsx";

const Main = () => {

    // const { user, setUser } = useAuth();
    // console.log(user)
    // const navigate = useNavigate()
    //
    // useEffect(() => {
    //     if (!user) {
    //         navigate('/login');
    //     }
    // }, [user, navigate]);







    return (
        <div className='relative min-h-screen md:flex'>
            {/*<header>*/}
            {/*    <h1>A Better Way to Pay</h1>*/}
            {/*</header>*/}

            <Sidebar></Sidebar>

            <div className='flex-1 md:ml-64'>
            <div>
                <Outlet/>
            </div>

            </div>





            {/*<div className="App">*/}
            {/*    {user && (*/}
            {/*        <div className="container mx-auto p-4">*/}
            {/*            <h1>Welcome, {user.email}</h1>*/}
            {/*            <p>Balance: ${user.balance}</p>*/}
            {/*            /!*<Logout setUser={setUser}/>*!/*/}
            {/*            /!*<SendMoney user={user}/>*!/*/}
            {/*            /!*<TransactionHistory/>*!/*/}
            {/*        </div>*/}
            {/*    )}*/}
            {/*</div>*/}

        </div>
    );
};

export default Main;
