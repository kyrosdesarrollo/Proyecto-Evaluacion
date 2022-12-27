import { collection, doc, setDoc } from "@firebase/firestore/lite";
import { FirebaseDB } from "../../firebase/config";

import { loadNotes } from "../../helpers";
import { addNewEmptyNote, setActiveNote ,savingNewNote} from ".";
import { setNotes, setSaving, updateNote } from "./journalSlice";

export const startNewNote =()=>{
    return async (dispatch, getSate) =>{
        dispatch(savingNewNote());
        const { uid } = getSate().auth;
        //uid este lo genera solo firebase database
        //Estructrura de información
        const newNote = {

            title:'',
            body:'',
            date: new Date().getTime(),

        }
        const newDoc = doc (collection(FirebaseDB, `${ uid }/journal/notes`));
        const set = await setDoc(newDoc, newNote);
        
        newNote.id = newDoc.id;
       
        //Dispatch
        dispatch(addNewEmptyNote(newNote));
        dispatch(setActiveNote(newNote));
        //Dispatch activación de nota
    }
}


export const startLoadingNotes = ()=>{
    return async (dispatch, getState) =>{
        const { uid } = getState().auth;
        if(!uid) throw new Error('El UID del usuario no existe');
       
        const notes = await loadNotes (uid);

        dispatch(setNotes(notes));
    }
}

export const startSaveNote = ()=>{

    return async(dispatch, getState) =>{
        dispatch(setSaving);

        const { uid } = getState().auth;
        const { active:note } = getState().journal;

        const noteToFireStore = { ...note };
        delete noteToFireStore.id;

        const docRef = doc(FirebaseDB, `${ uid }/journal/notes/${ note.id }` );
        await setDoc (docRef, noteToFireStore, {merge: true})
        
        dispatch( updateNote( note ));
    }
}