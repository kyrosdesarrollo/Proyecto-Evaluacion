import { createSlice } from '@reduxjs/toolkit';
import { loadPerfil } from '../../helpers/loadPerfil';

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
            state.status     = 'authenticated',
            state.uid        = payload.uid;
            state.email      =payload.email;
            state.displayName=payload.displayName;
            state.photoURL   =payload.photoURL;
            state.errorMessage = null;
            state.perfil   =null;
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
            state.perfil = payload;
        },
        chekingEstado: (state,  {payload} ) => {
            state.estado = payload;
        },
        ingresoPerfil: (state, action ) => {
            state.perfil = 'Listo...';
        },
    }
});
// Action creators are generated for each case reducer function
export const { login, logout, chekingCredentials,chekingEstado, chekingPerfil, ingresoPerfil } = authSlice.actions;