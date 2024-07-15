
import React, {useEffect, useState} from 'react';
import { Outlet } from 'react-router-dom';
import Logout from "../Logout.jsx";
import Signup from "../pages/Signup.jsx";
import Login from "../pages/Login.jsx";
import axios from 'axios';

const Main = () => {

    const [user, setUser] = useState(null);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/user`, {
                    withCredentials: true
                });
                if (data.email) {
                    setUser(data);
                }
            } catch (err) {
                console.log('Not authenticated');
            }
        };

        checkAuth();
    }, []);

    return (
        <div>
            <header>
                <h1>My Application</h1>
            </header>
            {/*<main>*/}
            {/*    <Outlet/>*/}
            {/*</main>*/}

            <div className="App">
                {user ? (
                    <div>
                        <h1>Welcome, {user.email}</h1>
                        <Logout setUser={setUser}/>
                    </div>
                ) : (
                    <div>
                        <Signup/>
                        <Login setUser={setUser}/>
                    </div>
                )}
            </div>

        </div>
    );
};

export default Main;
