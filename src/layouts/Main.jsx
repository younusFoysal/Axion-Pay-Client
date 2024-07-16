
import React, {useEffect, useState} from 'react';
import {Outlet, useNavigate} from 'react-router-dom';
import Logout from "../Logout.jsx";
import Signup from "../pages/Signup.jsx";
import Login from "../pages/Login.jsx";
import axios from 'axios';
import {useAuth} from "../context/AuthContext.jsx";
import SendMoney from "../pages/Dashboard/user/SendMoney.jsx";
import TransactionHistory from "../pages/Dashboard/Common/TransactionHistory.jsx";

const Main = () => {

    const { user, setUser } = useAuth();
    const navigate = useNavigate()

    useEffect(() => {
        if (!user) {
            navigate('/login');
        }
    }, [user, navigate]);

    return (
        <div>
            <header>
                <h1>My Application</h1>
            </header>
            <main>
                <Outlet/>
            </main>

            <div className="App">
                {user && (
                    <div className="container mx-auto p-4">
                        <h1>Welcome, {user.email}</h1>
                        <p>Balance: ${user.balance}</p>
                        <Logout setUser={setUser}/>
                        <SendMoney user={user}/>
                        <TransactionHistory/>
                    </div>
                )}
            </div>

        </div>
    );
};

export default Main;
