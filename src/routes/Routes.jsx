import { createBrowserRouter } from 'react-router-dom';
import Main from '../layouts/Main.jsx';
import ErrorPage from '../pages/ErrorPage.jsx';
import Login from '../pages/Login.jsx';
import Signup from '../pages/Signup.jsx';
import Statistics from '../pages/Dashboard/Common/Statistics.jsx';
import SendMoney from '../pages/Dashboard/user/SendMoney.jsx';
import ProtectedRoute from '../PrivateRoute/ProtectedRoute.jsx';
import TransactionHistory from "../pages/Dashboard/Common/TransactionHistory.jsx";
import CashIn from "../pages/Dashboard/user/CashIn.jsx";
import ManageTransactions from "../pages/Dashboard/Agent/ManageTransactions.jsx";
import CashOut from "../pages/Dashboard/user/CashOut.jsx";
import ManageUsers from "../pages/Dashboard/Admin/ManageUsers.jsx";
import AllTransactions from "../pages/Dashboard/Admin/AllTransactions.jsx";
import Profile from "../pages/Dashboard/Common/Profile.jsx";
import Balance from "../pages/Dashboard/Agent/Balance.jsx";


export const router = createBrowserRouter([
    {
        path: '/',
        element: <Main />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: '/',
                element: <ProtectedRoute><Statistics /></ProtectedRoute>,
            },
            {
                path: '/sendmoney',
                element: <ProtectedRoute><SendMoney /></ProtectedRoute>,
            },
            {
                path: '/transactions',
                element: <ProtectedRoute><TransactionHistory /></ProtectedRoute>,
            },
            {
                path: '/cashin',
                element: <ProtectedRoute><CashIn /></ProtectedRoute>,
            },
            {
                path: '/cashout',
                element: <ProtectedRoute><CashOut /></ProtectedRoute>,
            },
            {
                path: '/ManageTransactions',
                element: <ProtectedRoute><ManageTransactions /></ProtectedRoute>,
            },
            {
                path: '/ManageUsers',
                element: <ProtectedRoute><ManageUsers /></ProtectedRoute>,
            },
            {
                path: '/allTransactions',
                element: <ProtectedRoute><AllTransactions /></ProtectedRoute>,
            },
            {
                path: '/profile',
                element: <ProtectedRoute><Profile /></ProtectedRoute>,
            },
            {
                path: '/balance',
                element: <ProtectedRoute><Balance /></ProtectedRoute>,
            },



        ],
    },
    {
        path: '/login',
        element: <Login />,
    },
    {
        path: '/signup',
        element: <Signup />,
    },
]);
