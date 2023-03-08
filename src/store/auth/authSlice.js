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
        perfil:null,
    },
    reducers: {
        login: (state, {payload} ) => {
            console.log('cheking login' )
            state.status     = 'authenticated',
            state.uid        = payload.uid;
            state.email      =payload.email;
            state.displayName=payload.displayName;
            state.photoURL   =payload.photoURL;
            state.errorMessage = null;
            state.perfil = state.perfil;
            
           
        },
        logout: (state, {payload} ) => {
            state.status = 'not-authenticated',
            state.uid = null;
            state.email=null;
            state.displayName=null;
            state.photoURL=null;
            state.errorMessage = payload?.errorMessage;
            state.perfil=null;
        },
        chekingCredentials: (state, action ) => {

            state.status = 'checking';
        },
        chekingPerfil: (state,  {payload} ) => {

            console.log('cheking Perfil' )
            console.log(payload)
            state.perfil = payload.perfil;
        },
        ingresoPerfil: (state, action ) => {
           
            state.perfil = 'Listo...';
        },
    }
});
// Action creators are generated for each case reducer function
export const { login, logout, chekingCredentials, chekingPerfil, ingresoPerfil } = authSlice.actions;