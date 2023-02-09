import { authSlice, clearErrorMessages, onLogin, onLogout } from '../../../src/store/auth/authSlice';
import { authenticatedState, initialState } from '../../fixtures/authState';
import { testUserCredentials } from '../../fixtures/testUser';


describe('Test in authSlice', () => {
    
    test('should return to the initial state', () => {
        // authenticated or checking
        expect( authSlice.getInitialState() ).toEqual( initialState );
    });

    test('should log in', () => {
        
        const state = authSlice.reducer( initialState, onLogin( testUserCredentials ) );
        expect( state ).toEqual({
            status: 'authenticated',
            user: testUserCredentials,
            errorMessage: undefined
        })
    });

    test('should logout', () => {
        // should recive logout
        const state = authSlice.reducer( authenticatedState, onLogout() );
        expect( state ).toEqual({
            status: 'not-authenticated',
            user: {},
            errorMessage: undefined
        });
    });

    test('should logout', () => {
        const errorMessage = 'Invalid credentials'
        const state = authSlice.reducer( authenticatedState, onLogout(errorMessage) );
        expect( state ).toEqual({
            status: 'not-authenticated',
            user: {},
            errorMessage: errorMessage
        });
    });

    test('should clear the error message', () => {

        const errorMessage = 'Invalid credentials'
        const state = authSlice.reducer( authenticatedState, onLogout(errorMessage) );
        const newState = authSlice.reducer( state, clearErrorMessages() )

        expect( newState.errorMessage ).toBe( undefined );
        
    });

});