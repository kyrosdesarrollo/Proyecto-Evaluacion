import { singWithGoogle , registerUserWithEmailPassword, loginWithEmailPassword, logoutFirebase, registrarUsuario} from "../../firebase/providers";
import { loadPerfil } from "../../helpers/loadPerfil";
import { setDesActiveNote } from "../journal";
import { chekingCredentials, chekingPerfil, login, logout } from "./authSlice";

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
export const startCreateUsers = ({ Correo, Password, Nombre }) => {
    return async( dispatch ) => {
        console.log('Estoy en startCreateUsers')
        console.log({ Correo, Password, Nombre })
        let email = Correo, password = Password, displayName = Nombre;
       // dispatch( chekingCredentials() );
        const {ok, uid, photoURL, errorMessage, } = await registrarUsuario({ email, password, displayName });
       // if ( !ok ) return dispatch( logout( { errorMessage } ) );
        //dispatch( login( {uid, displayName, email, photoURL} ));

    }

} 

export const starLoginWithEmailPassword = ({ email, password})=>{
    return async( dispatch ) => {
        dispatch( chekingCredentials() );
        const result = await loginWithEmailPassword({ email, password });
        if ( !result.ok ) return dispatch( logout( result ) ); 
        dispatch( login( result ));

        const usuarioPerfil = await loadPerfil(result);
        dispatch( chekingPerfil(usuarioPerfil) );
        
    }
}

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
       
       // const notes = await loa (uid);
        
        // const result = await loginWithEmailPassword({ email, password });
        // if ( !result.ok ) return dispatch( logout( result ) ); 
        // dispatch( login( result ));

        // const usuarioPerfil = await loadPerfil(uid);
        // dispatch( chekingPerfil(usuarioPerfil) );
        //dispatch(setNotes(notes));
    }
}