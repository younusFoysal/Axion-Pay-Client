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


    const [selectedRole, setSelectedRole] = useState('')


    // Fetch Employees
    const { data: userL = [], isLoading, refetch } = useQuery({
        queryKey: ['userIsFired', email],
        queryFn: async () => {
            const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/user/${email}`);
            console.log("Email:", email);
            return data;
        },
    });

    console.log("Outside", userL)

    const handleSubmit = async e => {
        e.preventDefault()
        const form = e.target

        const email = form.email.value
        const pin = form.pin.value
        const role = selectedRole


        // Validate password
        if (password.length < 6) {
            toast.error('Pin is less than 6 number')
            return
        }

        if (!/[0-9]/.test(password)) {
            toast.error('Pin can not be a character')
            return
        }


        if (!role) {
            toast.error('Please select a role')
            return
        }

        try {
            setLoading(true)

            e.preventDefault();
            try {
                const response = await axios.post(`${import.meta.env.VITE_API_URL}/jwt`, {
                    email,
                    pin,
                }, { withCredentials: true });

                if (response.data.success) {
                    setUser({ email });
                    toast.success('Login successful');
                } else {
                    toast.error('Login failed')
                }
            } catch (error) {
                console.error('Error logging in:', error);
            }


            navigate('/')
            toast.success('Signup Successful')
        } catch (err) {
            console.log(err)
            toast.error(err.message)
        } finally {
            setLoading(false)
        }
    }


    const handleRoleSelect = (role) => {
        setSelectedRole(role)
    }





    return (
        <>
            <form onSubmit={handleLogin} className="space-y-4">
                <h2 className="text-xl font-semibold">Login</h2>
                <input
                    type="text"
                    placeholder="Email or Mobile Number"
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    className="input input-bordered w-full"
                    required
                />
                <input
                    type="password"
                    placeholder="PIN"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="input input-bordered w-full"
                    required
                />
                <button type="submit" className="btn btn-primary">Login</button>
            </form>


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


                                                    <div className='relative inline-block text-left w-full'>
                                                        <label htmlFor='role' className='block mb-2 text-sm'>
                                                            Select Role
                                                        </label>
                                                        <div className='group w-full'>
                                                            <button
                                                                type='button'
                                                                className='inline-flex rounded justify-center items-center w-full px-4 py-2 text-sm font-medium text-white bg-indigo-500 hover:bg-indigo-700 focus:outline-none focus:bg-indigo-700 shadow-lg duration-200 hover:scale-105 hover:shadow-2xl'
                                                            >
                                                                {selectedRole ? selectedRole : 'Select Role'}
                                                                <svg
                                                                    className='w-4 h-4 ml-2 -mr-1'
                                                                    xmlns='http://www.w3.org/2000/svg'
                                                                    viewBox='0 0 20 20'
                                                                    fill='currentColor'
                                                                >
                                                                    <path
                                                                        fillRule='evenodd'
                                                                        d='M10 12l-5-5h10l-5 5z'
                                                                    />
                                                                </svg>
                                                            </button>
                                                            <div
                                                                className='w-full absolute left-0  mt-1 origin-top-left bg-white divide-y divide-gray-100 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition duration-300'>
                                                                <div className='py-1'>
                                                                    <a
                                                                        href='#'
                                                                        className='w-full block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
                                                                        onClick={() => handleRoleSelect('user')}
                                                                    >
                                                                        User
                                                                    </a>
                                                                    <a
                                                                        href='#'
                                                                        className='w-full block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 '
                                                                        onClick={() => handleRoleSelect('agent')}
                                                                    >
                                                                        Agent
                                                                    </a>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>


                                                    <div>
                                                        <label htmlFor='name' className='block mb-2 text-sm'>
                                                            Name
                                                        </label>
                                                        <input
                                                            type='text'
                                                            name='name'
                                                            id='name'
                                                            placeholder='Enter Your Name Here'
                                                            className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-green-500 bg-gray-200 text-gray-900 shadow-lg duration-200 hover:scale-105 hover:shadow-2xl'
                                                            data-temp-mail-org='0'
                                                            required
                                                        />
                                                    </div>

                                                    <div>
                                                        <label htmlFor='phone' className='block mb-2 text-sm'>
                                                            Mobile Number
                                                        </label>
                                                        <input
                                                            type='number'
                                                            name='phone'
                                                            id='phone'
                                                            placeholder='016********'
                                                            className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-green-500 bg-gray-200 text-gray-900 shadow-lg duration-200 hover:scale-105 hover:shadow-2xl'
                                                            data-temp-mail-org='0'
                                                            required
                                                        />
                                                    </div>

                                                    <div>
                                                        <label htmlFor='email' className='block mb-2 text-sm'>
                                                            Email address
                                                        </label>
                                                        <input
                                                            type='email'
                                                            name='email'
                                                            id='email'
                                                            required
                                                            placeholder='Enter Your Email Here'
                                                            className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-green-500 bg-gray-200 text-gray-900 shadow-lg duration-200 hover:scale-105 hover:shadow-2xl'
                                                            data-temp-mail-org='0'

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
                                                            name='pin'
                                                            autoComplete='new-password'
                                                            id='pin'
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