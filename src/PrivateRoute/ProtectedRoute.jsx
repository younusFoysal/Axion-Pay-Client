
import React from 'react';
import { Navigate } from 'react-router-dom';
import {useAuth} from "../context/AuthContext.jsx";


const ProtectedRoute = ({ children }) => {
    const { user, isAuthChecked } = useAuth();

    if (!isAuthChecked) {
        return <div>Loading...</div>;
    }

    return user ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
