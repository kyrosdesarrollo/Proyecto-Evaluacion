import { collection, doc, setDoc } from "@firebase/firestore/lite";
import { FirebaseDB } from "../../firebase/config";
import { loadExcelFormatos } from "../../helpers/loadExcelFormatos";
import { addNewEmptyExcelFormato, savingNewExcelFormato } from "./formatoSlice";

export const startNewExcelFormato =( lista , formato )=>{
    return async (dispatch, getSate) =>{
        dispatch(savingNewExcelFormato());
    
        const { uid, displayName } = getSate().auth;
        // //uid este lo genera solo firebase database
        // //Estructrura de información

        console.log('Metodo Start New Excel')
        console.log(uid)
        console.log('Formato')
        console.log(formato)
        console.log('Lista')
        console.log(lista)
        //const newArreglo = lista;
        //const newArreglo = Object.fromEntries(lista);
        const newObject = Object.assign({}, lista);
        // console.log(newArreglo)
        const newExcel = {

            idusuario: {uid} ,
            nombre :{displayName},
            body:'Ingreso de formato',
            formato: formato,
            date: new Date().getTime(),
            detalle : newObject,
            estado: 'Carga',
            

        }

        try {
            
            const newDoc = doc (collection(FirebaseDB,  `/plantilla/excel/formato`));
            const set = await setDoc(newDoc, newExcel);
            console.log(set);
            newExcel.id = newDoc.id;
            console.log(newExcel.id)
            //Dispatch
            dispatch(addNewEmptyExcelFormato(newExcel));
            
        } catch (error) {
            console.log(error)
        }
       
        // dispatch(setActiveNote(newNote));
        //Dispatch activación de nota
    }
}


export const startLoadingFormatos = ()=>{
    return async (dispatch, getState) =>{
        const { uid } = getState().auth;
        if(!uid) throw new Error('El UID del usuario no existe');
       
        const formatos = await loadExcelFormatos (uid);
        console.log('loadExcelFormatos');
        console.log(formatos);

        //dispatch(setNotes(notes));
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