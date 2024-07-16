import React from 'react';
import AdminStatistics from "../Admin/AdminStatistics.jsx";
import {useAuth} from "../../../context/AuthContext.jsx";
import {useNavigate} from "react-router-dom";
import UserStatistics from "../user/UserStatistics.jsx";


const Statistics = () => {

    const { user  } = useAuth();
    const navigate = useNavigate()
    console.log(user?.user.role)
    //console.log(user?.role)

    // const [role, isLoading] = useRole()
    // if (isLoading) return <LoadingSpinner />

    // const role = "admin"


    return (
        <>
            {/*{role === 'admin' && <AdminStatistics />}*/}
            {/*{role === 'hr' && <HrStatistics/>}*/}
            {user?.user?.role === 'user' && <UserStatistics />}
        </>
    );
};

export default Statistics;