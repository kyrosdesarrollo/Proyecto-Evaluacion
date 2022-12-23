import { collection, getDocs } from "@firebase/firestore/lite";
import { getAuth, getAdditionalUserInfo } from "firebase/auth";
import { FirebaseDB } from "../firebase/config";

 
export const loadUsers = async ( uid = '') => {
    //Si queremos podemos omitir esta validación
    if(!uid) throw new Error('El UID del usuario no existe');


    console.log('Buscar usuarios en FireBase')
    
    // const auth = getAuth();

    // console.log(auth);

    // const users = [];
    // docs.forEach(doc => {
    //     rols.push({ id: doc.id, ...doc.data() });

    // });


    // console.log(rols);
    // const notes = [];
    // docs.forEach(doc => {
    //     notes.push({ id: doc.id, ...doc.data() });

    // });

    
    return auth;

}
