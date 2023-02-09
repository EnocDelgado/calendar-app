import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        status: 'checking', // 'authenticated', 'not authenticated'
        user: {},
        errorMessage: undefined,
    },
    reducers: {
        // Check if our user is authenticated
        onChecking: ( state ) => {
            state.status = 'checking';
            state.user = {};
            state.errorMessage = undefined;
        },
        onLogin: ( state, { payload } ) => {
            state.status = 'authenticated';
            state.user = payload;
            state.errorMessage = undefined;
        },
        onLogout: ( state, { payload } ) => {
            state.status = 'not-authenticated';
            state.user = payload;
            state.errorMessage = payload;
        },
        clearErrorMessages: ( state ) => {
            state.errorMessage = undefined;
        }
    }
})

export const { onChecking, onLogin, onLogout,clearErrorMessages } = authSlice.actions;