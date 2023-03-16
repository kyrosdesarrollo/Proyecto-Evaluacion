import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { onAuthStateChanged } from 'firebase/auth';
import { login, logout, startLoadingUser } from '../store/auth';
import { FirebaseAuth } from "../firebase/config";

import { startLoadingMenus } from "../store/menu/thunks";
import { startLoadingPautas } from "../store/pauta/thunks";
import { startLoadingPerfil } from "../store/perfil";
import { startLoadingFormatos } from "../store/formato";

export const useCheckAuth = () => {
  
    const status  = useSelector (state => state.auth);
    const dispatch = useDispatch();
  
    useEffect(() => {
        onAuthStateChanged (FirebaseAuth, async ( user ) =>{
        if(!user) return dispatch (logout());
  
        const { uid, email, displayName, photoURL } = user;
        dispatch ( login( { uid, email, displayName, photoURL } ));

       // dispatch( startLoadingNotes());
        dispatch( startLoadingMenus());
        //Benjamin
        dispatch (startLoadingPautas());
        dispatch(startLoadingPerfil());
        dispatch(startLoadingFormatos());
      
        
      })
    }, []);

    return  status 
}
