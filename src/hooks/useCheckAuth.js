import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { onAuthStateChanged } from 'firebase/auth';
import { login, logout } from '../store/auth';
import { FirebaseAuth } from "../firebase/config";

import { startLoadingMenus } from "../store/menu/thunks";
import { startLoadingPautas } from "../store/pauta/thunks";
import { startLoadingPerfil } from "../store/perfil";
import { startLoadingFormatos } from "../store/formato";
import { startLoadingFuncionarios } from "../store/funcionario/thunks";

export const useCheckAuth = () => {
  
    const status  = useSelector (state => state.auth);
    const dispatch = useDispatch();
  
    useEffect(() => {
      console.log('Veamos si pasa por aca')
        onAuthStateChanged (FirebaseAuth, async ( user ) =>{
        if(!user) return dispatch (logout());
  
        const { uid, email, displayName, photoURL } = user;
        dispatch ( login( { uid, email, displayName, photoURL } ));

       // dispatch( startLoadingNotes());
        dispatch( startLoadingMenus());
        dispatch( startLoadingFuncionarios());
        //Benjamin
        dispatch (startLoadingPautas());
        dispatch(startLoadingPerfil());
        dispatch(startLoadingFormatos());
      
        
      })
    }, []);

    return  status 
}
