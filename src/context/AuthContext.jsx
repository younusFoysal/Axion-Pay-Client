import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

const fetchUser = async () => {
    const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/user`, {
        withCredentials: true,
    });
    return data;
};

export const AuthProvider = ({ children }) => {
    const queryClient = useQueryClient();
    //const navigate = useNavigate();
    const [isAuthChecked, setIsAuthChecked] = useState(false);

    const { data: user, refetch } = useQuery({
        queryKey: ['user'],
        queryFn: fetchUser,
        enabled: false,
        retry: false,
        onError: () => {
            console.log('Not authenticated');
            //navigate('/login');
        },
    });

    useEffect(() => {
        const checkAuth = async () => {
            try {
                await refetch();
            } catch (err) {
                console.log('Not authenticated');
                //navigate('/login');
            } finally {
                setIsAuthChecked(true);
            }
        };

        checkAuth();
    }, [refetch,]);

    const setUser = (newUser) => {
        queryClient.setQueryData(['user'], newUser);
    };

    return (
        <AuthContext.Provider value={{ user, setUser, refetch, isAuthChecked }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};

















