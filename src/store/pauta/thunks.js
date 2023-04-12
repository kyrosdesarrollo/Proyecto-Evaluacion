import { collection, doc, setDoc } from "@firebase/firestore/lite";
import { FirebaseDB } from "../../firebase/config";
import  {loadExcelPautas} from "../../helpers/loadExcelPautas";
import { addNewEmptyExcel, savingNewExcel, setPautas } from "./pautaSlice";


export const pautaStartNewExcel =( lista,listaJson , formato )=>{
    return async (dispatch, getSate) =>{
        dispatch(savingNewExcel());
        const head = lista[0];
        const { uid, displayName } = getSate().auth;
        // //uid este lo genera solo firebase database
        // //Estructrura de información
        const newObject = Object.assign({}, lista);
        // Creación de archivo JSON pauta
        const newExcel = {

            idusuario: {uid} ,
            nombre :{displayName},
            body:'Ingreso',
            formato: formato,
            date: new Date().getTime(),
            detalle : newObject,
            detalleJson: listaJson,
            cabezaJson: head,
            status: 'Activo',
            

        }

      
        try {
            //Ruta de ingreso de datos JSON pauta
            const newDoc = doc (collection(FirebaseDB,`pauta/formato/tipo`));
            const set = await setDoc(newDoc, newExcel);
            //Extrae el id del Documento
            newExcel.id = newDoc.id;
            //Dispatch
            dispatch(addNewEmptyExcel(newExcel));
            
        } catch (error) {
            console.log(error)
        }
       
        // dispatch(setActiveNote(newNote));
        //Dispatch activación de nota
    }
}
export const startLoadingPautas = ()=>{
    return async (dispatch, getState) =>{
        const { uid } = getState().auth;
        if(!uid) throw new Error('El UID del usuario no existe');
       
       const pauta = await loadExcelPautas (uid);
       //console.log('ingresando set pauta');
        dispatch(setPautas(pauta));
        //console.log('saliendo set pauta');
        //console.log(pauta);

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