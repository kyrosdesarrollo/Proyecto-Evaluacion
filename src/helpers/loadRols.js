import { collection, getDocs } from "@firebase/firestore/lite";
import { FirebaseDB } from "../firebase/config";


export const loadRols = async ( uid = '') => {
    //Si queremos podemos omitir esta validación
    if(!uid) throw new Error('El UID del usuario no existe');


    console.log('Busqueda de rol')
    const collectionRef = collection(FirebaseDB,'rol');
    const docs = await getDocs(collectionRef);

    const rols = [];
    docs.forEach(doc => {
        rols.push({ id: doc.id, ...doc.data() });

    });


    console.log(rols);
    // const notes = [];
    // docs.forEach(doc => {
    //     notes.push({ id: doc.id, ...doc.data() });

    // });

    
    return rols;

}
