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
