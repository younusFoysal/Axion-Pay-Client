import React from 'react';
import AdminStatistics from "../Admin/AdminStatistics.jsx";


const Statistics = () => {
    // const [role, isLoading] = useRole()
    // if (isLoading) return <LoadingSpinner />

    const role = "admin"


    return (
        <>
            <h2>This is Dashboad all</h2>
            {role === 'admin' && <AdminStatistics />}
            {/*{role === 'hr' && <HrStatistics/>}*/}
            {/*{role === 'employee' && <EmployeeStatistics/>}*/}
        </>
    );
};

export default Statistics;