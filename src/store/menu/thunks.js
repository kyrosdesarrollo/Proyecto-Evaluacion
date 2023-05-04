import { collection, doc, setDoc, getDocs } from "@firebase/firestore/lite";
import { FirebaseDB } from "../../firebase/config";
import { loadNotes } from "../../helpers";
import { loadMenus } from "../../helpers/loadMenus";
import { funcionarioStartNewRegister } from "../funcionario/thunks";
import { setActiveNote, setNotes } from "../journal";
import { addNewEmptyMenu, savingNewMenu, savingNewMenuEnd, setActiveMenu, setMenus } from "./menuSlice";
import { thunkmenu } from "./thunksmenu";



function transformarCadena(cadena) {
    switch (cadena) {
      case 'ADMINISTRADOR':
        return 3;
      case 'CALIDAD':
        return 2;
      case 'PLATAFORMA':
        return 4;
      case 'MONITOR':
        return 1;
      default:
        return cadena;
    }
  }

export const startNewMenu = ( nombre, todo )=>{
    return async (dispatch, getState) =>{
        dispatch(savingNewMenu());
        console.log('startNewMenu')

        console.log(nombre)
        console.log(todo)
        //Rescate de informción de redux en auth
        const { displayName, email, uid } = getState().auth;
        
        const newUser = {
            nombre: displayName,
            email: email,
            perfil: nombre,
            date: new Date().getTime(),
            estado: 'Activo',
            iniciado:'Si',
        }

        console.log(newUser)
        
        //Verificación de datos de usuario    
        const verificaUser = collection(FirebaseDB,`${ uid }/evaluacion/usuario`);
        const datoUser = await getDocs(verificaUser);
        let valida = '';
        let activoUser='';
        datoUser.forEach(doc => {
            valida = doc.data();
            activoUser = valida.estado;
        });
        //Valida información
        if (!valida){ 
            try {
            //PROCESO 1 : CARGA USUARIO 
            const newDoc = doc (collection(FirebaseDB, `${ uid }/evaluacion/usuario`));
            await setDoc(newDoc, newUser);
            } catch (error) {
                console.log('problema con ingreso : ' + error)
        }};
        //PROCESO 2 : CARGA DE MENU EN BASE A PERFIL
        try {
            //Ingreso de datos Menu, búsqueda de parametros de seleccion directo a FireBase
        const collectionRef = collection(FirebaseDB,`menu/MyhIglVpgD6g2AkXQdxu/${ nombre }`);
        const docs = await getDocs(collectionRef);
        let newMenu = ''
        docs.forEach(doc => {
            newMenu = {
                title: doc.data().title,
                body:  doc.data().body,
                date:  new Date().getTime(),
                order: doc.data().order,
            }
                const retorno = thunkmenu(newMenu, uid);
            });

            
        } catch (error) {
            console.log('Problema menu : '+error)
        }
        
         //PROCESO 3 : CARGA DE FUNCIONARIO ruta : maestros/funcionario
        try {
             dispatch(funcionarioStartNewRegister(todo, displayName));

        } catch (error) {
            console.log('Error detectado en proceso de creación Funcionario ' + error)
        }
        dispatch(savingNewMenuEnd());
        // const notes = await loadNotes (uid);
        // dispatch(setNotes(notes));
        //Dispatch
        // dispatch(addNewEmptyMenu(newUser));
        //dispatch(setActiveMenu(newUser));
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