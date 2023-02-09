import { useDispatch, useSelector } from "react-redux"
import calendarApi from "../api/calendarApi";
import { clearErrorMessages, onChecking, onLogin, onLogout, onLogoutCalendar } from "../store";


export const useAuthStore = () => {

    // use information from store
    const { status, user, errorMessage } = useSelector( state => state.auth );

    const dispatch = useDispatch();

    // get specific object from store
    const startLogin = async({ email, password }) => {

        // verify credentials
        dispatch( onChecking() )

        // Getting our Backend
        try {
            // Conecting our CRUD operations 
            const { data } = await calendarApi.post('/auth', { email, password })
            // stablish token on local storage
            localStorage.setItem('token', data.token );
            // save date to know if toke is valid
            localStorage.setItem('token-init-date', new Date().getTime() ); 
            // the specified things that will save
            dispatch( onLogin({ name: data.name, uid: data.uid }) );


        } catch ( error ) {
            dispatch( onLogout('Incorrect credentials') )
            setTimeout( () => {
                dispatch( clearErrorMessages() );
            }, 10);
        }
    }   

    const startRegister = async({ email, password, name }) => {

        // verify credentials
        dispatch( onChecking() )

        // Getting our Backend
        try {
            // Conecting our CRUD operations 
            const { data } = await calendarApi.post('/auth/register', { email, password, name })
            // stablish token on local storage
            localStorage.setItem('token', data.token );
            // save date to know if toke is valid
            localStorage.setItem('token-init-date', new Date().getTime() ); 
            // the specified things that will save
            dispatch( onLogin({ name: data.name, uid: data.uid }) );


        } catch ( error ) {
            dispatch( onLogout( error.response.data?.msg || '--' ) );
            setTimeout( () => {
                dispatch( clearErrorMessages() );
            }, 10);
        }
    }   

    const checkAuthToken = async() => {

        // verify if exists token
        const token = localStorage.getItem( 'token' );
        if ( !token ) return dispatch( onLogout() );


        // Getting our Backend
        try {
            // Conecting our CRUD operations 
            const { data } = await calendarApi.get('/auth/renew');
            // stablish token on local storage
            localStorage.setItem('token', data.token );
            // save date to know if toke is valid
            localStorage.setItem('token-init-date', new Date().getTime() ); 
            // the specified things that will save
            dispatch( onLogin({ name: data.name, uid: data.uid }) );


        } catch ( error ) {
            localStorage.clear();
            dispatch( onLogout() );
        }
    } 

    const startLogout = () => {
        localStorage.clear();
        dispatch( onLogoutCalendar() );
        dispatch( onLogout() );
    }

    return {
        // * Properties 
        status, 
        user, 
        errorMessage,

        //* Methods
        startLogin,
        startRegister,
        checkAuthToken,
        startLogout
    }
}
