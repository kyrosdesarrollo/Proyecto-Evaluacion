import { collection, doc, setDoc } from "@firebase/firestore/lite";
import { FirebaseDB } from "../../firebase/config";
import { addNewEmptyExcel, savingNewExcel } from "./excelSlice";

export const startNewExcel =( lista )=>{
    return async (dispatch, getSate) =>{
        dispatch(savingNewExcel());
    
        const { uid, displayName } = getSate().auth;
        // //uid este lo genera solo firebase database
        // //Estructrura de información
        const newArreglo = lista;
        const newExcel = {

            idusuario: {uid} ,
            nombre :{displayName},
            body:'Ingreso',
            date: new Date().getTime(),
            detalle : newArreglo,
            

        }

        try {
            
            const newDoc = doc (collection(FirebaseDB,  `plantilla/excel/${ uid }`));
            await setDoc(newDoc, newExcel);
            
            newExcel.id = newDoc.id;
            console.log(newExcel.id)
            //Dispatch
            dispatch(addNewEmptyExcel(newExcel));
            
        } catch (error) {
            console.log(error)
        }
       
        // dispatch(setActiveNote(newNote));
        //Dispatch activación de nota
    }
}


// export const startLoadingNotes = ()=>{
//     return async (dispatch, getState) =>{
//         const { uid } = getState().auth;
//         if(!uid) throw new Error('El UID del usuario no existe');
       
//         const notes = await loadNotes (uid);

//         dispatch(setNotes(notes));
//     }
// }

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