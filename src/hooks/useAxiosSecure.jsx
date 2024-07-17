import axios from 'axios'
import { useEffect } from 'react'

import { useNavigate } from 'react-router-dom'
import {useAuth} from "../context/AuthContext.jsx";
import toast from "react-hot-toast";

export const axiosSecure = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true,
})
const useAxiosSecure = () => {
    const { logOut } = useAuth()
    const navigate = useNavigate()
    useEffect(() => {
        axiosSecure.interceptors.response.use(
            res => {
                return res
            },
            async error => {
                console.log('error tracked in the interceptor', error.response)
                toast.error(error.response.data.message)
                if (error.response.status === 401 || error.response.status === 403) {
                    await logOut()
                    navigate('/login')
                }
                return Promise.reject(error)
            }
        )
    }, [logOut, navigate])

    return axiosSecure
}

export default useAxiosSecure
