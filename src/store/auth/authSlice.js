import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        status: 'checking', // Estados 'checking' 'not-authenticated'. 'authentication'
        uid: null,
        email: null,
        displayName: null,
        photoURL: null,
        errorMessage:null,
        menu: [],
        
    },
    reducers: {
        login: (state, {payload} ) => {
            console.log(payload)
            state.status     = 'authenticated',
            state.uid        = payload.uid;
            state.email      =payload.email;
            state.displayName=payload.displayName;
            state.photoURL   =payload.photoURL;
            state.errorMessage = null;
        },
        logout: (state, {payload} ) => {
            state.status = 'not-authenticated',
            state.uid = null;
            state.email=null;
            state.displayName=null;
            state.photoURL=null;
            state.errorMessage = payload?.errorMessage;
        },
        chekingCredentials: (state, action ) => {

            state.status = 'checking';
        },
    }
});
// Action creators are generated for each case reducer function
export const { login, logout, chekingCredentials } = authSlice.actions;