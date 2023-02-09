import { useEffect } from 'react';
import Swal from 'sweetalert2';
import { useAuthStore, useForm } from '../../hooks';
import './LoginPage.css';

// Withhold registration
const loginFormFields = {
    loginEmail:     '',
    loginPassword:  '',
} 


const registerFromFields = {
    registerName:       '',
    registerEmail:      '',
    registerPassword:   '',
    registerPassword2:  '',
}

export const LoginPage = () => {

    // invocking authStore
    const { startLogin, errorMessage, startRegister } = useAuthStore();

    //invoke our customHook
    const { loginEmail, loginPassword, onInputChange: onLoginInputChange } = useForm( loginFormFields );
    const { registerName, registerEmail, registerPassword, registerPassword2, onInputChange: onRegisterInputChange } = useForm( registerFromFields );

    //
    const loginSubmit = ( event ) => {
        event.preventDefault();
        // authStore revice our information
        startLogin({  email: loginEmail, password: loginPassword  });
    }

    const registerSubmit = ( event ) => {
        event.preventDefault();

        if ( registerPassword !== registerPassword2 ) {
            Swal.fire('Register Error', 'Passwords are not the same ', 'error');
            return;
        }
        startRegister({ name: registerName, email: registerEmail, password: registerPassword });
    }

    // Display error when authentication fails
    useEffect( () => {
        if ( errorMessage !== undefined ) {
            Swal.fire('Authentication Error', errorMessage, 'error');
        }
    }, [ errorMessage ] )

    return (
        <div className="container login-container">
            <div className="row">
                <div className="col-md-6 login-form-1">
                    <h3>Sign In</h3>
                    <form onSubmit={ loginSubmit }>
                        <div className="form-group mb-2">
                            <input 
                                type="text"
                                className="form-control"
                                placeholder="Email"
                                name='loginEmail'
                                value={ loginEmail }
                                onChange={ onLoginInputChange }
                            />
                        </div>
                        <div className="form-group mb-2">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Password"
                                name='loginPassword'
                                value={ loginPassword }
                                onChange={ onLoginInputChange }
                            />
                        </div>
                        <div className="d-grid gap-2">
                            <input 
                                type="submit"
                                className="btnSubmit"
                                value="Login" 
                            />
                        </div>
                    </form>
                </div>

                <div className="col-md-6 login-form-2">
                    <h3>Sign Up</h3>
                    <form onSubmit={ registerSubmit }>
                        <div className="form-group mb-2">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Full Name"
                                name='registerName'
                                value={ registerName }
                                onChange={ onRegisterInputChange }
                            />
                        </div>
                        <div className="form-group mb-2">
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Email"
                                name='registerEmail'
                                value={ registerEmail }
                                onChange={ onRegisterInputChange }
                            />
                        </div>
                        <div className="form-group mb-2">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Password"
                                name='registerPassword'
                                value={ registerPassword }
                                onChange={ onRegisterInputChange }
                            />
                        </div>

                        <div className="form-group mb-2">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Repeat Password"
                                name='registerPassword2'
                                value={ registerPassword2 }
                                onChange={ onRegisterInputChange } 
                            />
                        </div>

                        <div className="d-grid gap-2">
                            <input 
                                type="submit" 
                                className="btnSubmit" 
                                value="Create account" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}