import { collection, doc, setDoc } from "@firebase/firestore/lite";
import { FirebaseDB } from "../../firebase/config";
import  {loadExcelPautas} from "../../helpers/loadExcelPautas";
import { loadPerfil } from "../../helpers/loadPerfil";
import { savingOutPerfil, savingPerfil, setPerfil } from "./perfilSlice";

export const startLoadingPerfil = ()=>{
    return async (dispatch, getState) =>{
        dispatch(savingPerfil());
        const { uid } = getState().auth;
        if(!uid) throw new Error('El UID del usuario no existe');
        const perfil = await loadPerfil (uid);
        dispatch(setPerfil(perfil));
        dispatch(savingOutPerfil());
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