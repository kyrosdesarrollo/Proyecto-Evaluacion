import { collection, doc, setDoc  } from "@firebase/firestore/lite";
import { FirebaseDB } from "../../firebase/config";
import { loadRols } from "../../helpers";
import { addNewEmptyRol, savingNewRol, setActiveRol, setRols } from "./rolSlice";

export const startNewRol =()=>{
    return async (dispatch, getSate) =>{

        dispatch(savingNewRol());
        const { uid } = getSate().auth;
        //uid este lo genera solo firebase database
        //Estructrura de información
        const newRol = {

            nombre:'Gato',
            id:'0',
            estado: 'ACTIVO',

        }
        const newDoc = doc (collection(FirebaseDB, 'rol'));
        await setDoc(newDoc, newRol);
        console.log(newDoc.id);
        // //Dispatch
        dispatch(addNewEmptyRol(newRol));
        dispatch(setActiveRol(newRol));
        // //Dispatch activación de nota
    }
}

export const startLoadingRoles = ()=>{
    return async (dispatch, getState) =>{
        const { uid } = getState().auth;
        if(!uid) throw new Error('El UID del usuario no existe');
        
        const rols = await loadRols ('rol');
       
        dispatch(setRols(rols));
    }
}
