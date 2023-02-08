
import { collection, getDocs } from "@firebase/firestore/lite";
import { FirebaseDB } from "../firebase/config";

import * as app from "../global";



export const loadPerfil = async ( uid = '') => {
    //Si queremos podemos omitir esta validación
    if(!uid) throw new Error('El UID del usuario no existe');
        console.log('loadPerfil UID')
        console.log(uid)
        const cargaPerfil = collection(FirebaseDB,`${ uid.uid }/evaluacion/usuario`);
        const perfil = await getDocs(cargaPerfil);
    
        //Extraer perfil de Usuario
        let auth = [];
        perfil.forEach(doc => {
            auth.push({ id: doc.id, ...doc.data() });
        });
       
    return auth[0].perfil ;

}

