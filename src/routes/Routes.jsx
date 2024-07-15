import { createBrowserRouter } from 'react-router-dom'

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Main />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: '/',
                element: <Home />,
            },
            {
                path: '/contact-us',
                element: <ContactUs />
            }

        ],
    },
    { path: '/login', element: <Login /> },
    { path: '/signup', element: <SignUp /> },
])