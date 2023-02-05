import { Routes, Route, Navigate } from 'react-router-dom'
import { LoginPage } from '../auth';
import { CalendarPage } from '../calendar';

export const AppRouter = () => {

    const authStatus = 'not-authenticated';

    return (
        <Routes>
            {
                ( authStatus === 'authenticated' )
                // If user is not authenticated go to login
                ? <Route path="/auth/*" element={ <LoginPage/> } />
                // Else go to calendar page
                : <Route path="/*" element={ <CalendarPage/> } />
            }
            

            <Route path="/*" element={ <Navigate to='/auth/login' /> } />
        </Routes>
    )
}
