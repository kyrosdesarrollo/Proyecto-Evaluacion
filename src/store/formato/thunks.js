import { collection, doc, setDoc } from "@firebase/firestore/lite";
import { FirebaseDB } from "../../firebase/config";
import { loadExcelFormatos } from "../../helpers/loadExcelFormatos";
import { addNewEmptyExcelFormato, savingNewExcelFormato, setFormatos } from "./formatoSlice";

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

// export const startSaveNote = ()=>{

//     return async(dispatch, getState) =>{
//         dispatch(setSaving);

//         const { uid } = getState().auth;
//         const { active:note } = getState().journal;

//         const noteToFireStore = { ...note };
//         delete noteToFireStore.id;

//         const docRef = doc(FirebaseDB, `${ uid }/journal/notes/${ note.id }` );
//         await setDoc (docRef, noteToFireStore, {merge: true})
        
//         dispatch( updateNote( note ));
//     }
// }