
import { createBrowserRouter } from 'react-router-dom';
import Main from '../layouts/Main.jsx';
import ErrorPage from '../pages/ErrorPage.jsx';
import Login from '../pages/Login.jsx';
import Signup from '../pages/Signup.jsx';
import Statistics from "../pages/Dashboard/Common/Statistics.jsx";
import SendMoney from "../pages/Dashboard/user/SendMoney.jsx";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Main />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: '/',
                element: <Statistics />,
            },
            {
                path: '/sendmoney',
                element: <SendMoney></SendMoney>
            }
        ],
    },
    { path: '/login', element: <Login /> },
    { path: '/signup', element: <Signup /> },
]);
