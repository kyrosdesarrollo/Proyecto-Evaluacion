import { collection, doc, setDoc, getDocs } from "@firebase/firestore/lite";
import { FirebaseDB } from "../../firebase/config";
import { loadNotes } from "../../helpers";
import { loadMenus } from "../../helpers/loadMenus";
import { setActiveNote, setNotes } from "../journal";
import { addNewEmptyMenu, savingNewMenu, setActiveMenu, setMenus } from "./menuSlice";
import { thunkmenu } from "./thunksmenu";

export const startNewMenu = ( nombre )=>{
    return async (dispatch, getSate) =>{
        dispatch(savingNewMenu);
        //Rescate de informción de redux en auth
        const { displayName, email, uid } = getSate().auth;
        const newUser = {
            nombre: displayName,
            email: email,
            perfil: nombre,
            date: new Date().getTime(),
            estado: 'Activo'
        }

        // //Verificación de menu de usuario     
        // const verificaMenu = collection(FirebaseDB,`${ uid }/evaluacion/menu`);
        // const datoMenu = await getDocs(verificaMenu);
        // let valida = '';
        // datoMenu.forEach(doc => {
        //     valida = doc.data();
        // });
        // console.log('valida');
        // console.log(valida);
        // if (!valida){return};
        //Verificación de datos de usuario     
        const verificaUser = collection(FirebaseDB,`${ uid }/evaluacion/usuario`);
        const datoUser = await getDocs(verificaUser);
        let valida = '';
        datoUser.forEach(doc => {
            valida = doc.data();
        });
        if (valida){return};
        //Ingreso de datos Usuario
        const newDoc = doc (collection(FirebaseDB, `${ uid }/evaluacion/usuario`));
        await setDoc(newDoc, newUser);
        //Ingreso de datos Menu, búsqueda de parametros de seleccion directo a FireBase
        const collectionRef = collection(FirebaseDB,`menu/MyhIglVpgD6g2AkXQdxu/${ nombre }`);
        const docs = await getDocs(collectionRef);
        let newMenu = ''
        docs.forEach(doc => {
            newMenu = {
                title: doc.data().title,
                body:  doc.data().body,
                date:  new Date().getTime(),
            }
                const retorno = thunkmenu(newMenu, uid);
          
            //menus.push({ id: doc.id, ...doc.data() });
           // console.log({ id: doc.id, ...doc.data() });
    
        });

        // const notes = await loadNotes (uid);
        // dispatch(setNotes(notes));
        //Dispatch
        // dispatch(addNewEmptyMenu(newUser));
        // dispatch(setActiveMenu(newUser));
        //dispatch(setActiveNote());
       // }
        
      

       
    }
}
export const startLoadingMenus = ()=>{
    return async (dispatch, getState) =>{
        const { uid } = getState().auth;
        if(!uid) throw new Error('El UID del usuario no existe');
       
        const menus = await loadMenus (uid);

        dispatch(setNotes(menus));
        //dispatch(setMenus(menus));
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