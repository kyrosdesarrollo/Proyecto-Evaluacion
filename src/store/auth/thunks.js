import { appBarClasses } from "@mui/material";
import { singWithGoogle , registerUserWithEmailPassword, loginWithEmailPassword, logoutFirebase} from "../../firebase/providers";
import { loadPerfil } from "../../helpers/loadPerfil";
import { setDesActiveNote } from "../journal";
import { chekingCredentials, chekingPerfil, login, logout } from "./authSlice";


import * as app from "../../global";



export const checkingAuthentication = (email , password) =>{
    return async (dispatch) =>{
        dispatch( chekingCredentials() );
    }
}

export const startGoogleSignIn = () =>{
    return async (dispatch) =>{
        dispatch( chekingCredentials() );
        const result = await singWithGoogle();
        if(!result.ok) return dispatch(logout(result.errorMessage));
    //delete result.ok
        dispatch (login(result));
    }
}

export const startCreatingUserWithEmailPassword = ({ email, password, displayName }) => {
    return async( dispatch ) => {
        dispatch( chekingCredentials() );
        const {ok, uid, photoURL, errorMessage, } = await registerUserWithEmailPassword({ email, password, displayName });
        if ( !ok ) return dispatch( logout( { errorMessage } ) );
        dispatch( login( {uid, displayName, email, photoURL} ));

    }

} 

export const starLoginWithEmailPassword = ({ email, password})=>{
    return async( dispatch ) => {
        dispatch( chekingCredentials() );
        const result = await loginWithEmailPassword({ email, password });
        if ( !result.ok ) return dispatch( logout( result ) ); 
        dispatch( login( result ));

        // console.log('Variable resultado')
        // console.log(result);
        // const perfilUsuario = loadPerfil(result.uid);
        // console.log('Perfil de usuario start' + perfilUsuario)
        
        console.log('Usuario startLoginWithEmail')
        const usuarioPerfil = await loadPerfil(result)
        console.log('verfica si hay perfil -->')
        console.log(usuarioPerfil)
       // app.perfilUsuario = usuarioPerfil;

        
        dispatch( chekingPerfil(usuarioPerfil) );
        
    //     dispatch(ingresoPerfil());
    //   //  dispatch (check)

       // Disparo();
    }
}
// const Disparo = () => {
//     console.log('Disparo')
//     dispatch(ingresoPerfil());
//     }

export const startLogout = () => {
    return async( dispatch ) => {
        await logoutFirebase();
        dispatch( logout() );
        dispatch(setDesActiveNote());
    }
}

export const startLoadingUser = ()=>{
    return async (dispatch, getState) =>{
        const { uid } = getState().auth;
        if(!uid) throw new Error('El UID del usuario no existe');
       
        const notes = await loadUsers (uid);
        //dispatch(setNotes(notes));
    }
}