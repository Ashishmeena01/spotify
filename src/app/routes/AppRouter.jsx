
import { RouterProvider, createBrowserRouter } from 'react-router'
import { lazy, useMemo } from 'react'

// const AuthLayout = lazy(()=>import('@/app/layouts/AuthLayout.jsx'))
const HomeLayout = lazy(()=>import('@/app/layouts/HomeLayout'))
const Error = lazy(()=>import('@/app/NotFound.jsx'))
const HomePage = lazy(()=>import('@/features/home/pages/HomePage'))
const TrackPage = lazy(()=>import('@/features/player/pages/TrackPage'))
const RegisterPage = lazy(()=>import('@/features/auth/pages/RegisterPage'))
const LoginPage = lazy(()=>import('@/features/auth/pages/LoginPage'))
import AuthLayout from '../layouts/AuthLayout'

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
    return (
        <RouterProvider router={router} />
    )
}

export default AppRouter
