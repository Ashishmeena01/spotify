
import { RouterProvider,createBrowserRouter  } from 'react-router'
import AuthLayout from '@/app/layouts/AuthLayout.jsx'
import Error from '@/app/NotFound.jsx'
import HomeLayout from '@/app/layouts/HomeLayout.jsx'
import LoginPage from '@/features/auth/pages/LoginPage.jsx'
import RegisterPage from '@/features/auth/pages/RegisterPage.jsx'
import HomePage from '@/features/home/pages/HomePage.jsx'
import TrackPage from '@/features/player/pages/TrackPage.jsx'
import { useCallback, useState } from 'react'


const router = createBrowserRouter([
    {
        element: <AuthLayout />,
        children: [
            {
                path: '/login',
                element: <LoginPage />
            },
            {
                path: '/register',
                element: <RegisterPage />
            }
        ],
    },
    {
        path: '/',
        element: <HomeLayout />,
        children: [
            {
                index: true,
                element: <HomePage />,
            },
            {
                path: 'tracks/:trackId',
                element: <TrackPage />,
            },
        ],
    },
    {
        path: '*',
        element: <Error />  
    },
 
])

function AppRouter() {
    const [count, setCount] = useState(0)
    console.log("app router rendered")
    return (
        <RouterProvider router={router} />
    )
}

export default AppRouter
