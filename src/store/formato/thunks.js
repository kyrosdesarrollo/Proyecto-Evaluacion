import { collection, doc, setDoc, deleteDoc,getDocs, where, query,updateDoc } from "@firebase/firestore/lite";
import { FirebaseDB } from "../../firebase/config";
import { loadExcelFormatos } from "../../helpers/loadExcelFormatos";
import { addNewEmptyExcelFormato, deleteFormatoById, savingNewExcelFormato, setFormatos } from "./formatoSlice";
import { format, compareAsc } from 'date-fns'

export const startNewExcelFormato =( lista , listaJson, formato )=>{
    return async (dispatch, getSate) =>{
        dispatch(savingNewExcelFormato());
        const { uid, displayName } = getSate().auth;
        //uid este lo genera solo firebase database
        //Estructrura de información
        const newObject = Object.assign({}, lista);
        const date = format(new Date(), 'dd/MM/yyyy HH:mm:ss ')
        const head = lista[0];
        // console.log(newArreglo)
        const newExcel = {
            idusuario: uid ,
            nombre :displayName,
            body:'Ingreso de formato',
            formato: formato,
            date: date,
            detalle : newObject,
            detalleJson: listaJson,
            cabezaJson: head,
            estado: 'Carga',
        }
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
export const startUpdateFormato = (arreglo, id = '')=>{

    return async(dispatch, getState) =>{
        //Deja estado saving en true
        dispatch(savingNewExcelFormato());
        const { uid, displayName } = getState().auth;
        if(!uid) throw new Error('El UID del usuario no existe');
        try {
            const date = format(new Date(), 'dd/MM/yyyy HH:mm:ss ')
            const documento = doc(FirebaseDB, `/plantilla/excel/formato/${ id }`);
            console.log(documento)
            await updateDoc(documento, {
                usuarioActualizador: displayName,
                fechaActualizacion: date,
                detalleJson: arreglo});
        } catch (error) {
            console.log(error)
        }
        
        //Descarga de formatos actuakizados
        dispatch(startLoadingFormatos());
         //Cambia de estado el saving a false
        dispatch( deleteFormatoById());
    }
}