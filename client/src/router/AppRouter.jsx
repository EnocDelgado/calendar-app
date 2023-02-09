import { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import { LoginPage } from '../auth';
import { CalendarPage } from '../calendar';
import { useAuthStore } from '../hooks';

export const AppRouter = () => {


    const { status, checkAuthToken } = useAuthStore();

    useEffect( () => {
        checkAuthToken();
    }, [])

    //
    if ( status === 'checking' ) {
        return (
            <h3>Loading...</h3>
        )
    }

    return (
        <Routes>
            {
                ( status === 'not-authenticated' )
                // If user is not authenticated go to login
                ? (
                     <>
                        <Route path="/auth/*" element={ <LoginPage/> } />
                        <Route path="/*" element={ <Navigate to="/auth/login" /> } />
                    </>
                )
                // Else go to calendar page
                : (
                    <>
                        <Route path="/" element={ <CalendarPage/> } />
                        <Route path="/*" element={ <Navigate to="/" /> } />
                    </>
                )
            }
            

        </Routes>
    )
}
