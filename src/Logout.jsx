import React from 'react';
import axios from 'axios';

const Logout = ({ setUser }) => {
    const handleLogout = async () => {
        try {
            await axios.get(`${import.meta.env.VITE_API_URL}/logout`, {
                withCredentials: true
            });
            setUser(null);
            console.log('Logged out');
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    return (
        <button onClick={handleLogout}>Logout</button>
    );
};

export default Logout;
