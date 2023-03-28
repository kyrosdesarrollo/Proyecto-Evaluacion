import { collection, doc, setDoc, deleteDoc } from "@firebase/firestore/lite";
import { FirebaseDB } from "../../firebase/config";
import { loadExcelFormatos } from "../../helpers/loadExcelFormatos";
import { addNewEmptyExcelFormato, deleteFormatoById, savingNewExcelFormato, setFormatos } from "./formatoSlice";

export const startNewExcelFormato =( lista , listaJson, formato )=>{
    return async (dispatch, getSate) =>{
        dispatch(savingNewExcelFormato());
    
        const { uid, displayName } = getSate().auth;
        //uid este lo genera solo firebase database
        //Estructrura de información
        console.log('Carga Lista *** Aqui debiera venir archivo ')
        console.log(lista);


        const newObject = Object.assign({}, lista);

        console.log(listaJson);
       
        const head = lista[0];
        // console.log(newArreglo)
        const newExcel = {

            idusuario: {uid} ,
            nombre :{displayName},
            body:'Ingreso de formato',
            formato: formato,
            date: new Date().getTime(),
            detalle : newObject,
            detalleJson: listaJson,
            cabezaJson: head,
            estado: 'Carga',
        }
        console.log('Estructura de Carga completa ...');
        console.log(newExcel);


        try {
            
            const newDoc = doc (collection(FirebaseDB,  `/plantilla/excel/formato`));
            await setDoc(newDoc, newExcel);

            newExcel.id = newDoc.id;
            //Dispatch
            dispatch(addNewEmptyExcelFormato(newExcel));
            
        } catch (error) {
            console.log(error)
        }
       
    }
}


export const startLoadingFormatos = ()=>{
    return async (dispatch, getState) =>{
        const { uid } = getState().auth;
        if(!uid) throw new Error('El UID del usuario no existe');
       
        const formatos = await loadExcelFormatos (uid);
        dispatch(setFormatos(formatos));
    }
}

export const startDeleteFormato = (id = '')=>{

    return async(dispatch, getState) =>{
        dispatch(savingNewExcelFormato());
        const { uid } = getState().auth;
        if(!uid) throw new Error('El UID del usuario no existe');
        console.log('Estoy en eliminar viene con ID de fire')
        console.log(id)

        try {

        const docRef = doc(FirebaseDB, `/plantilla/excel/formato/${ id }` );
        await deleteDoc (docRef, {merge: true})
            
        } catch (error) {
            console.log(error)
        }
        
        
        dispatch( deleteFormatoById());
    }
}