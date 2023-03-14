import { collection, doc, setDoc } from "@firebase/firestore/lite";
import { FirebaseDB } from "../../firebase/config";
import  {loadExcelPautas} from "../../helpers/loadExcelPautas";
import { addNewEmptyExcel, savingNewExcel, setPautas } from "./pautaSlice";


export const pautaStartNewExcel =( lista , formato )=>{
    return async (dispatch, getSate) =>{
        dispatch(savingNewExcel());
    
        const { uid, displayName } = getSate().auth;
        // //uid este lo genera solo firebase database
        // //Estructrura de información

        // console.log('Metodo Start New Excel')
        // console.log(uid)
        // console.log('Formato')
        // console.log(formato)
        // console.log('Lista')
        // console.log(lista)
        //const newArreglo = lista;
        //const newArreglo = Object.fromEntries(lista);
        const newObject = Object.assign({}, lista);
        // console.log(newArreglo)
        const newExcel = {

            idusuario: {uid} ,
            nombre :{displayName},
            body:'Ingreso',
            formato: formato,
            date: new Date().getTime(),
            detalle : newObject,
            status: 'Activo',
            

        }

        try {
            
            const newDoc = doc (collection(FirebaseDB,`pauta/formato/${ uid }`));
            const set = await setDoc(newDoc, newExcel);
            //console.log(set);
            newExcel.id = newDoc.id;
            //console.log(newExcel.id)
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