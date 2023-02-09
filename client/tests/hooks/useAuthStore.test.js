import { configureStore } from '@reduxjs/toolkit';
import { act, renderHook, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { calendarApi } from '../../src/api';
import { useAuthStore } from '../../src/hooks/useAuthStore';
import { authSlice } from '../../src/store/';
import { initialState, notAuthenticatedState } from '../fixtures/authState';
import { testUserCredentials } from '../fixtures/testUser';



const getMockStore = ( initialState ) => {
    return configureStore({
        reducer: {
            auth: authSlice.reducer,
        },
        preloadedState: {
            auth: { ...initialState }
        }
    });
}


describe('Test in useAuthStore', () => {

    beforeEach(() => localStorage.clear() );


    test('should return the default values', () => {
        
        const mockStore = getMockStore({...initialState });

        const { result } = renderHook( () => useAuthStore(), {
            wrapper: ({ children }) => <Provider store={ mockStore } >{ children }</Provider>
        });

        expect(result.current).toEqual({
            errorMessage: undefined,
            status: 'checking',
            user: {},
            checkAuthToken: expect.any(Function),
            startLogin: expect.any(Function),
            startLogout: expect.any(Function),
            startRegister: expect.any(Function),
        });
    });

    test('startLogin should login correctly', async() => {
        // clean localstorage
        localStorage.clear();
        const mockStore = getMockStore({ ...notAuthenticatedState });
        const { result } = renderHook( () => useAuthStore(), {
            wrapper: ({ children }) => <Provider store={ mockStore } >{ children }</Provider>
        });

        await act(async() => {
            await result.current.startLogin( testUserCredentials )
        });

        const { errorMessage, status, user } = result.current;
        expect({ errorMessage, status, user }).toEqual({
            errorMessage: undefined,
            status: 'authenticated',
            user: { name: 'Test User', uid: '63e25211ee67cb99514a3a00' }
        });

        expect( localStorage.getItem('token') ).toEqual( expect.any(String) );
        expect( localStorage.getItem('token-init-date') ).toEqual( expect.any(String) );

    });

    test('startLogin authentication should fail', async() => {
        // clean localstorage
        localStorage.clear();
        const mockStore = getMockStore({ ...notAuthenticatedState });
        const { result } = renderHook( () => useAuthStore(), {
            wrapper: ({ children }) => <Provider store={ mockStore } >{ children }</Provider>
        });

        await act(async() => {
            await result.current.startLogin({ email: 'any@google.com', password: '123456789' })
        });

        const { errorMessage, status, user } = result.current;
        // console.log({ errorMessage, status, user })
        expect(localStorage.getItem('token')).toBe(null);
        expect({ errorMessage, status, user }).toEqual({
            errorMessage: 'Incorrect credentials',
            status: 'not-authenticated',
            user: {}
        });
        
        await waitFor( 
            () => expect( result.current.errorMessage ).toBe(undefined)
        );
        
    });


    test('startRegister should create a user', async() => {
        
        const newUser = { email: 'any@google.com', password: '123456789', name: 'Test User 2' };

        const mockStore = getMockStore({ ...notAuthenticatedState });
        const { result } = renderHook( () => useAuthStore(), {
            wrapper: ({ children }) => <Provider store={ mockStore } >{ children }</Provider>
        });
        // 
        const spy = jest.spyOn( calendarApi, 'post' ).mockReturnValue({
            data: {
                ok: true,
                uid: '1263781293',
                name: 'Test User',
                token: 'any-TOKEN'
            }
        });

        await act(async() => {
            await result.current.startRegister(newUser)
        });

        const { errorMessage, status, user } = result.current;

        expect({ errorMessage, status, user }).toEqual({
            errorMessage: undefined,
            status: 'authenticated',
            user: { name: 'Test User', uid: '1263781293' }
        });
        // BE CAREFULL destroy spy ( NEED IT)
        spy.mockRestore();

    });

    test('startRegister creation should fail', async() => {
        
        const mockStore = getMockStore({ ...notAuthenticatedState });
        const { result } = renderHook( () => useAuthStore(), {
            wrapper: ({ children }) => <Provider store={ mockStore } >{ children }</Provider>
        });

        await act(async() => {
            await result.current.startRegister(testUserCredentials)
        });

        const { errorMessage, status, user } = result.current;

        expect({ errorMessage, status, user }).toEqual({
            errorMessage: 'Incorrect email or password',
            status: 'not-authenticated',
            user: {}
        });
    });


    test('checkAuthToken should fail if token does not exists', async() => {
        const mockStore = getMockStore({ ...initialState }); // 'checking'
        const { result } = renderHook( () => useAuthStore(), {
            wrapper: ({ children }) => <Provider store={ mockStore } >{ children }</Provider>
        });

        await act(async() => {
            await result.current.checkAuthToken()
        });

        const { errorMessage, status, user } = result.current;
        expect({ errorMessage, status, user }).toEqual({
            errorMessage: undefined,
            status: 'not-authenticated',
            user: {}
        });
    });


    test('checkAuthToken should authenticate the user if there is a token', async() => {
        
        const { data } = await calendarApi.post('/auth', testUserCredentials );
        localStorage.setItem('token', data.token );

        const mockStore = getMockStore({ ...initialState });
        const { result } = renderHook( () => useAuthStore(), {
            wrapper: ({ children }) => <Provider store={ mockStore } >{ children }</Provider>
        });

        await act(async() => {
            await result.current.checkAuthToken()
        });

        const { errorMessage, status, user } = result.current;
        expect({ errorMessage, status, user }).toEqual({
            errorMessage: undefined,
            status: 'authenticated',
            user: { name: 'Test User', uid: '63e25211ee67cb99514a3a00' }
        });
    });


});