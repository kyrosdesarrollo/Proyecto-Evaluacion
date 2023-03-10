import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { onAuthStateChanged } from 'firebase/auth';
import { login, logout } from '../store/auth';
import { FirebaseAuth } from "../firebase/config";
import { startLoadingNotes } from "../store/journal";
import { startLoadingMenus } from "../store/menu/thunks";
import { loadPerfil } from "../helpers/loadPerfil";
import { startLoadingPautas } from "../store/pauta/thunks";

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
        //Nelson estuvo aqui
        // Ojo
        //Hola mi nombre es polo
        
      })
    }, []);

    return  status 
}
