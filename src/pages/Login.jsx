import React, { useState } from 'react';
import axios from 'axios';
import {SiSpinrilla} from "react-icons/si";
import {Link, useNavigate} from "react-router-dom";
import {useQuery} from "@tanstack/react-query";
import toast from 'react-hot-toast'
import {AiOutlineLogin} from "react-icons/ai";
import {GrLogin} from "react-icons/gr";
import {useAuth} from "../context/AuthContext.jsx";

const Login = () => {
    const { setUser } = useAuth();
    const [identifier, setIdentifier] = useState('');
    const [password, setPassword] = useState('');

    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()


    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/jwt`, {
                identifier,
                password,
            }, { withCredentials: true });

            if (response.data.success) {
                setUser({ identifier });
                console.log('Login successful');
            } else {
                console.log('Login failed');
            }
        } catch (error) {
            console.error('Error logging in:', error);
        }
    };


    const divStyle = {
        backgroundImage: "url('https://storage.googleapis.com/devitary-image-host.appspot.com/15848031292911696601-undraw_designer_life_w96d.svg')",
    };



    // Fetch Employees
    const { data: userL = [], isLoading, refetch } = useQuery({
        queryKey: ['status', identifier],
        queryFn: async () => {
            const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/user/${identifier}`);
            console.log("Identifier:", identifier, "Status:", data.status);
            return data;
        },
    });

    //console.log("Outside", userL)

    const handleSubmit = async e => {
        e.preventDefault()


        // Validate password
        if (password.length !== 5) {
            console.log(password.length, password)
            toast.error('Pin must be 5 digit')
            return
        }

        if (!/^\d+$/.test(password)) {
            toast.error('Pin can be only numbers')
            return
        }


        try {
            setLoading(true)

            if (userL.status === false){
                setLoading(false)
                return toast.error('Wait for Admin Approval ✋ ')
            }else {
                const response = await axios.post(`${import.meta.env.VITE_API_URL}/jwt`, {
                    identifier,
                    password,
                }, { withCredentials: true });

                if (response.data.success) {
                    setUser({ identifier });
                    console.log('Login successful');
                    toast.success('Login Successful')
                    navigate('/')
                } else {
                    console.log('Login failed');
                    toast.error('Login failed')
                }
            }


            //toast.success('Signup Successful')
        } catch (err) {
            console.log(err)
            toast.error(err.message)
            setLoading(false)
        } finally {
            setLoading(false)
        }
    }





    return (
        <>
            {/*<form onSubmit={handleLogin} className="space-y-4">*/}
            {/*    <h2 className="text-xl font-semibold">Login</h2>*/}
            {/*    <input*/}
            {/*        type="text"*/}
            {/*        placeholder="Email or Mobile Number"*/}
            {/*        value={identifier}*/}
            {/*        onChange={(e) => setIdentifier(e.target.value)}*/}
            {/*        className="input input-bordered w-full"*/}
            {/*        required*/}
            {/*    />*/}
            {/*    <input*/}
            {/*        type="password"*/}
            {/*        placeholder="PIN"*/}
            {/*        value={password}*/}
            {/*        onChange={(e) => setPassword(e.target.value)}*/}
            {/*        className="input input-bordered w-full"*/}
            {/*        required*/}
            {/*    />*/}
            {/*    <button type="submit" className="btn btn-primary">Login</button>*/}
            {/*</form>*/}


            <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
                <div
                    className="max-w-screen-xl m-0 sm:m-10 bg-white sm:rounded-lg flex justify-center flex-1 shadow-2xl shadow-gray-500 duration-500 hover:scale-105">
                    <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12 ">
                        <div className="flex flex-col items-center">
                            <img src="/AxionPay.png"
                                 className="w-48 mx-auto"/>
                            <p className='text-sm text-gray-400'>A Better Way to Pay</p>
                        </div>
                        <div className="mt-8 flex flex-col items-center">
                            <div className='mb-8 text-center'>
                                <h1 className='my-3 text-4xl font-bold'>Login Now</h1>
                            </div>
                            <div className="w-full flex-1">
                                <div className="flex flex-col items-center">


                                    <div className='flex justify-center items-center min-h-screen'>
                                        <div
                                            className='flex flex-col max-w-md p-6 rounded-md sm:p-10 bg-gray-100 text-gray-900 '>
                                            <form onSubmit={handleSubmit} className='space-y-6'>
                                                <div className='space-y-4'>


                                                    <div>
                                                        <label htmlFor='identifier' className='block mb-2 text-sm'>
                                                            Email or Mobile Number
                                                        </label>
                                                        <input
                                                            type='text'
                                                            title="Ex: 1600373716"
                                                            name='identifier'
                                                            id='identifier'
                                                            value={identifier}
                                                            onChange={(e) => setIdentifier(e.target.value)}
                                                            placeholder="Email or Mobile Number"
                                                            className='w-full tooltip tooltip-open tooltip-right tooltip-info px-3 py-2 border rounded-md border-gray-300 focus:outline-green-500 bg-gray-200 text-gray-900 shadow-lg duration-200 hover:scale-105 hover:shadow-2xl'
                                                            data-tip="Ex: 1600373716"
                                                            data-temp-mail-org='0'
                                                            required
                                                        />
                                                    </div>

                                                    <div>
                                                        <div className='flex justify-between'>
                                                            <label htmlFor='pin' className='text-sm mb-2'>
                                                                5 Digit PIN
                                                            </label>
                                                        </div>
                                                        <input
                                                            type='password'
                                                            name='password'
                                                            autoComplete='new-password'
                                                            id='password'
                                                            value={password}
                                                            onChange={(e) => setPassword(e.target.value)}
                                                            required
                                                            placeholder='*****'
                                                            className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-green-500 bg-gray-200 text-gray-900 shadow-lg duration-200 hover:scale-105 hover:shadow-2xl'
                                                        />
                                                    </div>
                                                </div>

                                                <div>
                                                    <button
                                                        disabled={loading}
                                                        type='submit'
                                                        className='bg-indigo-500 flex items-center justify-center font-semibold w-full rounded-md py-3 text-white shadow-xl duration-200 hover:scale-105 hover:shadow-2xl'
                                                    >
                                                        {loading ? (
                                                            <SiSpinrilla className='animate-spin m-auto'/>
                                                        ) : (<div className="flex flex-row">
                                                                <GrLogin className="w-6 h-6 mr-2"/>
                                                                <span>Continue</span>
                                                            </div>
                                                        )}
                                                    </button>
                                                </div>
                                            </form>
                                            <div className='flex items-center pt-4 space-x-1'>
                                                <div className='flex-1 h-px sm:w-16 dark:bg-gray-700'></div>
                                                <p className='px-3 text-sm dark:text-gray-400'>
                                                    Signup with new account
                                                </p>
                                                <div className='flex-1 h-px sm:w-16 dark:bg-gray-700'></div>
                                            </div>

                                            <p className='px-6 mt-4 text-sm text-center text-gray-400'>
                                                Dont have an account?{' '}
                                                <Link
                                                    to='/signup'
                                                    className='text-indigo-500 hover:underline hover:text-indigo-400 font-bold'
                                                >
                                                    Signup
                                                </Link>
                                                .
                                            </p>
                                        </div>
                                    </div>


                                </div>

                            </div>
                        </div>
                    </div>
                    <div className="flex-1 bg-indigo-100 text-center hidden lg:flex">
                        <div className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat" style={divStyle}>
                        </div>
                    </div>
                </div>
            </div>


        </>
    );
};

export default Login;