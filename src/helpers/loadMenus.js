import { collection, getDocs } from "@firebase/firestore/lite";
import { FirebaseDB } from "../firebase/config";


export const loadMenus = async ( uid = '') => {
    //Si queremos podemos omitir esta validación
    if(!uid) throw new Error('El UID del usuario no existe');

    const collectionRef = collection(FirebaseDB,`${ uid }/evaluacion/usuario`);
    const docs = await getDocs(collectionRef);
    const menus = [];
   
    docs.forEach(doc => {
        menus.push({ id: doc.id, ...doc.data().menu });
    });
    
    return menus;

}
