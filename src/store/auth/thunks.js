import { singWithGoogle , registerUserWithEmailPassword, loginWithEmailPassword, logoutFirebase} from "../../firebase/providers";
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
        console.log('first');
        const usuarioPerfil = await loadPerfil(result);
        console.log(usuarioPerfil)
        dispatch( chekingPerfil(usuarioPerfil) );
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
        console.log('first');
        const usuarioPerfil = await loadPerfil(result);
        console.log(usuarioPerfil)
        window.$perfil = usuarioPerfil;
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
       console.log('startLoadingUser')
        const notes = await loadUsers (uid);
        //dispatch(setNotes(notes));
    }
}